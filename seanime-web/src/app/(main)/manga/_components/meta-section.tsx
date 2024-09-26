"use client"
import { AL_MangaDetailsById_Media, Manga_Entry } from "@/api/generated/types"
import {
    AnimeEntryRankings,
    MediaEntryAudienceScore,
    MediaEntryGenresList,
} from "@/app/(main)/_features/media/_components/media-entry-metadata-components"
import {
    MediaPageHeader,
    MediaPageHeaderDetailsContainer,
    MediaPageHeaderEntryDetails,
} from "@/app/(main)/_features/media/_components/media-page-header-components"
import { SeaLink } from "@/components/shared/sea-link"
import { Button } from "@/components/ui/button"
import React from "react"


export function MetaSection(props: { entry: Manga_Entry | undefined, details: AL_MangaDetailsById_Media | undefined }) {

    const { entry, details } = props

    if (!entry?.media) return null

    return (
        <MediaPageHeader
            backgroundImage={entry.media?.bannerImage || entry.media?.coverImage?.extraLarge}
        >

            <MediaPageHeaderDetailsContainer>

                <MediaPageHeaderEntryDetails
                    coverImage={entry.media?.coverImage?.extraLarge || entry.media?.coverImage?.large}
                    title={entry.media?.title?.userPreferred}
                    englishTitle={entry.media?.title?.english}
                    romajiTitle={entry.media?.title?.romaji}
                    startDate={entry.media?.startDate}
                    season={entry.media?.season}
                    color={entry.media?.coverImage?.color}
                    progressTotal={entry.media?.chapters}
                    status={entry.media?.status}
                    description={entry.media?.description}
                    listData={entry.listData}
                    media={entry.media}
                    type="manga"
                />


                <div className="flex gap-2 items-center">
                    <MediaEntryAudienceScore meanScore={entry.media?.meanScore} />

                    <MediaEntryGenresList genres={details?.genres} />
                </div>

                <AnimeEntryRankings rankings={details?.rankings} />


                <div className="w-full flex justify-between flex-wrap gap-4 items-center">

                    <SeaLink href={`https://anilist.co/manga/${entry.mediaId}`} target="_blank">
                        <Button intent="gray-link" className="px-0">
                            AniList
                        </Button>
                    </SeaLink>

                    <div className="flex flex-1"></div>
                </div>

            </MediaPageHeaderDetailsContainer>
        </MediaPageHeader>

    )

}
