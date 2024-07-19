package manga

import (
	"context"
	"path/filepath"
	"seanime/internal/api/anilist"
	"seanime/internal/events"
	"seanime/internal/test_utils"
	"seanime/internal/util"
	"seanime/internal/util/filecache"
	"testing"
)

func TestGetDownloadedChapterContainers(t *testing.T) {
	test_utils.SetTwoLevelDeep()
	test_utils.InitTestProvider(t, test_utils.Anilist())

	anilistClient := anilist.TestGetMockAnilistClient()

	mangaCollection, err := anilistClient.MangaCollection(context.Background(), &test_utils.ConfigData.Provider.AnilistUsername)
	if err != nil {
		t.Fatal(err)
	}

	logger := util.NewLogger()
	fileCacher, err := filecache.NewCacher(filepath.Join(test_utils.ConfigData.Path.DataDir, "cache"))
	if err != nil {
		t.Fatal(err)
	}

	repository := NewRepository(&NewRepositoryOptions{
		Logger:         logger,
		FileCacher:     fileCacher,
		BackupDir:      "",
		ServerURI:      "",
		WsEventManager: events.NewMockWSEventManager(logger),
		DownloadDir:    filepath.Join(test_utils.ConfigData.Path.DataDir, "manga"),
	})

	// Test
	containers, err := repository.GetDownloadedChapterContainers(mangaCollection)
	if err != nil {
		t.Fatal(err)
	}

	for _, container := range containers {
		t.Logf("MediaId: %d", container.MediaId)
		t.Logf("Provider: %s", container.Provider)
		t.Logf("Chapters: ")
		for _, chapter := range container.Chapters {
			t.Logf("  %s", chapter.Title)
		}
		t.Log("-----------------------------------")
		t.Log("")
	}

}
