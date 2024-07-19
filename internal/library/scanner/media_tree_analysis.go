package scanner

import (
	"errors"
	"fmt"
	"github.com/samber/lo"
	"github.com/sourcegraph/conc/pool"
	"seanime/internal/api/anilist"
	"seanime/internal/api/anizip"
	"seanime/internal/util/limiter"
)

type (
	MediaTreeAnalysisOptions struct {
		tree        *anilist.CompleteAnimeRelationTree
		anizipCache *anizip.Cache
		rateLimiter *limiter.Limiter
	}

	MediaTreeAnalysis struct {
		branches []*MediaTreeAnalysisBranch
	}

	MediaTreeAnalysisBranch struct {
		media       *anilist.CompleteAnime
		anizipMedia *anizip.Media
		// The second absolute episode number of the first episode
		// Sometimes, the metadata provider may have a 'true' absolute episode number and a 'part' absolute episode number
		// 'part' absolute episode numbers might be used for "Part 2s" of a season
		minPartAbsoluteEpisodeNumber int
		maxPartAbsoluteEpisodeNumber int
		minAbsoluteEpisode           int
		maxAbsoluteEpisode           int
		totalEpisodeCount            int
	}
)

// NewMediaTreeAnalysis will analyze the media tree and create and store a MediaTreeAnalysisBranch for each media in the tree.
// Each MediaTreeAnalysisBranch will contain the min and max absolute episode number for the media.
// The min and max absolute episode numbers are used to get the relative episode number from an absolute episode number.
func NewMediaTreeAnalysis(opts *MediaTreeAnalysisOptions) (*MediaTreeAnalysis, error) {

	relations := make([]*anilist.CompleteAnime, 0)
	opts.tree.Range(func(key int, value *anilist.CompleteAnime) bool {
		relations = append(relations, value)
		return true
	})

	// Get Anizip data for all related media in the tree
	// With each Anizip media, get the min and max absolute episode number
	// Create new MediaTreeAnalysisBranch for each Anizip media
	p := pool.NewWithResults[*MediaTreeAnalysisBranch]().WithErrors()
	for _, rel := range relations {
		p.Go(func() (*MediaTreeAnalysisBranch, error) {
			opts.rateLimiter.Wait()
			azm, err := anizip.FetchAniZipMediaC("anilist", rel.ID, opts.anizipCache)
			if err != nil {
				return nil, err
			}
			// Get the first episode
			firstEp, ok := azm.Episodes["1"]
			if !ok {
				return nil, errors.New("no first episode")
			}

			// discrepancy: "seasonNumber":1,"episodeNumber":12,"absoluteEpisodeNumber":13,
			// this happens when the media has a separate entry but is technically the same season
			// when we detect this, we should use the "episodeNumber" as the absoluteEpisodeNumber
			// this is a hacky fix, but it works for the cases I've seen so far
			usePartEpisodeNumber := firstEp.EpisodeNumber > 1 && firstEp.AbsoluteEpisodeNumber-firstEp.EpisodeNumber > 1
			partAbsoluteEpisodeNumber := 0
			maxPartAbsoluteEpisodeNumber := 0
			if usePartEpisodeNumber {
				partAbsoluteEpisodeNumber = firstEp.EpisodeNumber
				maxPartAbsoluteEpisodeNumber = partAbsoluteEpisodeNumber + azm.GetMainEpisodeCount() - 1
			}

			// If the first episode exists and has a valid absolute episode number, create a new MediaTreeAnalysisBranch
			if azm.Episodes != nil && firstEp.AbsoluteEpisodeNumber > 0 {
				return &MediaTreeAnalysisBranch{
					media:                        rel,
					anizipMedia:                  azm,
					minPartAbsoluteEpisodeNumber: partAbsoluteEpisodeNumber,
					maxPartAbsoluteEpisodeNumber: maxPartAbsoluteEpisodeNumber,
					minAbsoluteEpisode:           firstEp.AbsoluteEpisodeNumber,
					// The max absolute episode number is the first episode's absolute episode number plus the total episode count minus 1
					// We subtract 1 because the first episode's absolute episode number is already included in the total episode count
					// e.g, if the first episode's absolute episode number is 13 and the total episode count is 12, the max absolute episode number is 24
					maxAbsoluteEpisode: firstEp.AbsoluteEpisodeNumber + (azm.GetMainEpisodeCount() - 1),
					totalEpisodeCount:  azm.GetMainEpisodeCount(),
				}, nil
			}

			return nil, errors.New("could not analyze media tree branch")

		})
	}
	branches, _ := p.Wait()

	if branches == nil || len(branches) == 0 {
		return nil, errors.New("no branches found")
	}

	return &MediaTreeAnalysis{branches: branches}, nil

}

// getRelativeEpisodeNumber uses the MediaTreeAnalysis to get the relative episode number for an absolute episode number
func (o *MediaTreeAnalysis) getRelativeEpisodeNumber(abs int) (relativeEp int, mediaId int, ok bool) {

	isPartAbsolute := false

	// Find the MediaTreeAnalysisBranch that contains the absolute episode number
	branch, ok := lo.Find(o.branches, func(n *MediaTreeAnalysisBranch) bool {
		// First check if the partAbsoluteEpisodeNumber is set
		if n.minPartAbsoluteEpisodeNumber > 0 && n.maxPartAbsoluteEpisodeNumber > 0 {
			// If it is, check if the absolute episode number given is the same as the partAbsoluteEpisodeNumber
			// If it is, return true
			if n.minPartAbsoluteEpisodeNumber <= abs && n.maxPartAbsoluteEpisodeNumber >= abs {
				isPartAbsolute = true
				return true
			}
		}

		// Else, check if the absolute episode number given is within the min and max absolute episode numbers of the branch
		if n.minAbsoluteEpisode <= abs && n.maxAbsoluteEpisode >= abs {
			return true
		}
		return false
	})
	if !ok {
		return 0, 0, false
	}

	if isPartAbsolute {
		// Let's say the media has 12 episodes and the file is "episode 13"
		// If the [partAbsoluteEpisodeNumber] is 13, then the [relativeEp] will be 1, we can safely ignore the [absoluteEpisodeNumber]
		// e.g. 13 - (13-1) = 1
		relativeEp = abs - (branch.minPartAbsoluteEpisodeNumber - 1)
	} else {
		// Let's say the media has 12 episodes and the file is "episode 38"
		// The [minAbsoluteEpisode] will be 38 and the [relativeEp] will be 1
		// e.g. 38 - (38-1) = 1
		relativeEp = abs - (branch.minAbsoluteEpisode - 1)
	}

	mediaId = branch.media.ID

	return
}

func (o *MediaTreeAnalysis) printBranches() (str string) {
	str = "["
	for _, branch := range o.branches {
		str += fmt.Sprintf("media: '%s', minAbsoluteEpisode: %d, maxAbsoluteEpisode: %d, totalEpisodeCount: %d; ", branch.media.GetTitleSafe(), branch.minAbsoluteEpisode, branch.maxAbsoluteEpisode, branch.totalEpisodeCount)
	}
	if len(o.branches) > 0 {
		str = str[:len(str)-2]
	}
	str += "]"
	return str

}
