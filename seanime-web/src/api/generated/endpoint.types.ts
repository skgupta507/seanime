// This code was generated by codegen/main.go. DO NOT EDIT.

import type {
    AL_BaseAnime,
    AL_FuzzyDateInput,
    AL_MediaFormat,
    AL_MediaListStatus,
    AL_MediaSeason,
    AL_MediaSort,
    AL_MediaStatus,
    Anime_AutoDownloaderRule,
    Anime_AutoDownloaderRuleEpisodeType,
    Anime_AutoDownloaderRuleTitleComparisonType,
    Anime_LocalFileMetadata,
    ChapterDownloader_DownloadID,
    HibikeTorrent_AnimeTorrent,
    Mediastream_StreamType,
    Models_AnilistSettings,
    Models_DiscordSettings,
    Models_LibrarySettings,
    Models_MediaPlayerSettings,
    Models_MediastreamSettings,
    Models_Theme,
    Models_TorrentSettings,
    Models_TorrentstreamSettings,
} from "@/api/generated/types.ts"

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// anilist
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * - Filepath: internal/handlers/anilist.go
 * - Filename: anilist.go
 * - Endpoint: /api/v1/anilist/list-entry
 * @description
 * Route updates the user's list entry on Anilist.
 */
export type EditAnilistListEntry_Variables = {
    mediaId?: number
    status?: AL_MediaListStatus
    score?: number
    progress?: number
    startedAt?: AL_FuzzyDateInput
    completedAt?: AL_FuzzyDateInput
    type: string
}

/**
 * - Filepath: internal/handlers/anilist.go
 * - Filename: anilist.go
 * - Endpoint: /api/v1/anilist/media-details/{id}
 * @description
 * Route returns more details about an AniList anime entry.
 */
export type GetAnilistAnimeDetails_Variables = {
    /**
     *  The AniList anime ID
     */
    id: number
}

/**
 * - Filepath: internal/handlers/anilist.go
 * - Filename: anilist.go
 * - Endpoint: /api/v1/anilist/studio-details/{id}
 * @description
 * Route returns details about a studio.
 */
export type GetAnilistStudioDetails_Variables = {
    /**
     *  The AniList studio ID
     */
    id: number
}

/**
 * - Filepath: internal/handlers/anilist.go
 * - Filename: anilist.go
 * - Endpoint: /api/v1/anilist/list-entry
 * @description
 * Route deletes an entry from the user's AniList list.
 */
export type DeleteAnilistListEntry_Variables = {
    mediaId?: number
    type?: string
}

/**
 * - Filepath: internal/handlers/anilist.go
 * - Filename: anilist.go
 * - Endpoint: /api/v1/anilist/list-anime
 * @description
 * Route returns a list of anime based on the search parameters.
 */
export type AnilistListAnime_Variables = {
    page?: number
    search?: string
    perPage?: number
    sort?: Array<AL_MediaSort>
    status?: Array<AL_MediaStatus>
    genres?: Array<string>
    averageScore_greater?: number
    season?: AL_MediaSeason
    seasonYear?: number
    format?: AL_MediaFormat
    isAdult?: boolean
}

/**
 * - Filepath: internal/handlers/anilist.go
 * - Filename: anilist.go
 * - Endpoint: /api/v1/anilist/list-recent-anime
 * @description
 * Route returns a list of recently aired anime.
 */
export type AnilistListRecentAiringAnime_Variables = {
    page?: number
    search?: string
    perPage?: number
    airingAt_greater?: number
    airingAt_lesser?: number
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// anime_collection
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * - Filepath: internal/handlers/anime_collection.go
 * - Filename: anime_collection.go
 * - Endpoint: /api/v1/library/unknown-media
 * @description
 * Route adds the given media to the user's AniList planning collections
 */
export type AddUnknownMedia_Variables = {
    mediaIds: Array<number>
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// anime_entries
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * - Filepath: internal/handlers/anime_entries.go
 * - Filename: anime_entries.go
 * - Endpoint: /api/v1/library/anime-entry/{id}
 * @description
 * Route return a media entry for the given AniList anime media id.
 */
export type GetAnimeEntry_Variables = {
    /**
     *  AniList anime media ID
     */
    id: number
}

/**
 * - Filepath: internal/handlers/anime_entries.go
 * - Filename: anime_entries.go
 * - Endpoint: /api/v1/library/anime-entry/bulk-action
 * @description
 * Route perform given action on all the local files for the given media id.
 */
export type AnimeEntryBulkAction_Variables = {
    mediaId: number
    action: string
}

/**
 * - Filepath: internal/handlers/anime_entries.go
 * - Filename: anime_entries.go
 * - Endpoint: /api/v1/library/anime-entry/open-in-explorer
 * @description
 * Route opens the directory of a media entry in the file explorer.
 */
export type OpenAnimeEntryInExplorer_Variables = {
    mediaId: number
}

/**
 * - Filepath: internal/handlers/anime_entries.go
 * - Filename: anime_entries.go
 * - Endpoint: /api/v1/library/anime-entry/suggestions
 * @description
 * Route returns a list of media suggestions for files in the given directory.
 */
export type FetchAnimeEntrySuggestions_Variables = {
    dir: string
}

/**
 * - Filepath: internal/handlers/anime_entries.go
 * - Filename: anime_entries.go
 * - Endpoint: /api/v1/library/anime-entry/manual-match
 * @description
 * Route matches un-matched local files in the given directory to the given media.
 */
export type AnimeEntryManualMatch_Variables = {
    dir: string
    mediaId: number
}

/**
 * - Filepath: internal/handlers/anime_entries.go
 * - Filename: anime_entries.go
 * - Endpoint: /api/v1/library/anime-entry/silence/{id}
 * @description
 * Route returns the silence status of a media entry.
 */
export type GetAnimeEntrySilenceStatus_Variables = {
    /**
     *  The ID of the media entry.
     */
    id: number
}

/**
 * - Filepath: internal/handlers/anime_entries.go
 * - Filename: anime_entries.go
 * - Endpoint: /api/v1/library/anime-entry/silence
 * @description
 * Route toggles the silence status of a media entry.
 */
export type ToggleAnimeEntrySilenceStatus_Variables = {
    mediaId: number
}

/**
 * - Filepath: internal/handlers/anime_entries.go
 * - Filename: anime_entries.go
 * - Endpoint: /api/v1/library/anime-entry/update-progress
 * @description
 * Route update the progress of the given anime media entry.
 */
export type UpdateAnimeEntryProgress_Variables = {
    mediaId: number
    malId?: number
    episodeNumber: number
    totalEpisodes: number
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// auth
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * - Filepath: internal/handlers/auth.go
 * - Filename: auth.go
 * - Endpoint: /api/v1/auth/login
 * @description
 * Route logs in the user by saving the JWT token in the database.
 */
export type Login_Variables = {
    token: string
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// auto_downloader
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * - Filepath: internal/handlers/auto_downloader.go
 * - Filename: auto_downloader.go
 * - Endpoint: /api/v1/auto-downloader/rule/{id}
 * @description
 * Route returns the rule with the given DB id.
 */
export type GetAutoDownloaderRule_Variables = {
    /**
     *  The DB id of the rule
     */
    id: number
}

/**
 * - Filepath: internal/handlers/auto_downloader.go
 * - Filename: auto_downloader.go
 * - Endpoint: /api/v1/auto-downloader/rule
 * @description
 * Route creates a new rule.
 */
export type CreateAutoDownloaderRule_Variables = {
    enabled: boolean
    mediaId: number
    releaseGroups: Array<string>
    resolutions: Array<string>
    comparisonTitle: string
    titleComparisonType: Anime_AutoDownloaderRuleTitleComparisonType
    episodeType: Anime_AutoDownloaderRuleEpisodeType
    episodeNumbers?: Array<number>
    destination: string
}

/**
 * - Filepath: internal/handlers/auto_downloader.go
 * - Filename: auto_downloader.go
 * - Endpoint: /api/v1/auto-downloader/rule
 * @description
 * Route updates a rule.
 */
export type UpdateAutoDownloaderRule_Variables = {
    rule?: Anime_AutoDownloaderRule
}

/**
 * - Filepath: internal/handlers/auto_downloader.go
 * - Filename: auto_downloader.go
 * - Endpoint: /api/v1/auto-downloader/rule/{id}
 * @description
 * Route deletes a rule.
 */
export type DeleteAutoDownloaderRule_Variables = {
    /**
     *  The DB id of the rule
     */
    id: number
}

/**
 * - Filepath: internal/handlers/auto_downloader.go
 * - Filename: auto_downloader.go
 * - Endpoint: /api/v1/auto-downloader/item
 * @description
 * Route delete a queued item.
 */
export type DeleteAutoDownloaderItem_Variables = {
    id: number
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// directory_selector
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * - Filepath: internal/handlers/directory_selector.go
 * - Filename: directory_selector.go
 * - Endpoint: /api/v1/directory-selector
 * @description
 * Route returns directory content based on the input path.
 */
export type DirectorySelector_Variables = {
    input: string
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// discord
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * - Filepath: internal/handlers/discord.go
 * - Filename: discord.go
 * - Endpoint: /api/v1/discord/presence/manga
 * @description
 * Route sets manga activity for discord rich presence.
 */
export type SetDiscordMangaActivity_Variables = {
    title: string
    image: string
    chapter: string
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// docs
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// download
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * - Filepath: internal/handlers/download.go
 * - Filename: download.go
 * - Endpoint: /api/v1/download-torrent-file
 * @description
 * Route downloads torrent files to the destination folder
 */
export type DownloadTorrentFile_Variables = {
    download_urls: Array<string>
    destination: string
    media?: AL_BaseAnime
}

/**
 * - Filepath: internal/handlers/download.go
 * - Filename: download.go
 * - Endpoint: /api/v1/download-release
 * @description
 * Route downloads selected release asset to the destination folder.
 */
export type DownloadRelease_Variables = {
    download_url: string
    destination: string
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// explorer
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * - Filepath: internal/handlers/explorer.go
 * - Filename: explorer.go
 * - Endpoint: /api/v1/open-in-explorer
 * @description
 * Route opens the given directory in the file explorer.
 */
export type OpenInExplorer_Variables = {
    path: string
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// extensions
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * - Filepath: internal/handlers/extensions.go
 * - Filename: extensions.go
 * - Endpoint: /api/v1/extensions/external/fetch
 * @description
 * Route returns the extension data from the given manifest uri.
 */
export type FetchExternalExtensionData_Variables = {
    manifestUri: string
}

/**
 * - Filepath: internal/handlers/extensions.go
 * - Filename: extensions.go
 * - Endpoint: /api/v1/extensions/external/install
 * @description
 * Route installs the extension from the given manifest uri.
 */
export type InstallExternalExtension_Variables = {
    manifestUri: string
}

/**
 * - Filepath: internal/handlers/extensions.go
 * - Filename: extensions.go
 * - Endpoint: /api/v1/extensions/external/uninstall
 * @description
 * Route uninstalls the extension with the given ID.
 */
export type UninstallExternalExtension_Variables = {
    id: string
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// filecache
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * - Filepath: internal/handlers/filecache.go
 * - Filename: filecache.go
 * - Endpoint: /api/v1/filecache/bucket
 * @description
 * Route deletes all buckets with the given prefix.
 */
export type RemoveFileCacheBucket_Variables = {
    bucket: string
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// localfiles
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * - Filepath: internal/handlers/localfiles.go
 * - Filename: localfiles.go
 * - Endpoint: /api/v1/library/local-files
 * @description
 * Route performs an action on all local files.
 */
export type LocalFileBulkAction_Variables = {
    action: string
}

/**
 * - Filepath: internal/handlers/localfiles.go
 * - Filename: localfiles.go
 * - Endpoint: /api/v1/library/local-file
 * @description
 * Route updates the local file with the given path.
 */
export type UpdateLocalFileData_Variables = {
    path: string
    metadata?: Anime_LocalFileMetadata
    locked: boolean
    ignored: boolean
    mediaId: number
}

/**
 * - Filepath: internal/handlers/localfiles.go
 * - Filename: localfiles.go
 * - Endpoint: /api/v1/library/local-files
 * @description
 * Route deletes the local file with the given paths.
 */
export type DeleteLocalFiles_Variables = {
    paths: Array<string>
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// mal
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * - Filepath: internal/handlers/mal.go
 * - Filename: mal.go
 * - Endpoint: /api/v1/mal/auth
 * @description
 * Route fetches the access and refresh tokens for the given code.
 */
export type MALAuth_Variables = {
    code: string
    state: string
    code_verifier: string
}

/**
 * - Filepath: internal/handlers/mal.go
 * - Filename: mal.go
 * - Endpoint: /api/v1/mal/list-entry/progress
 * @description
 * Route updates the progress of a MAL list entry.
 */
export type EditMALListEntryProgress_Variables = {
    mediaId?: number
    progress?: number
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// manga
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * - Filepath: internal/handlers/manga.go
 * - Filename: manga.go
 * - Endpoint: /api/v1/manga/anilist/collection
 * @description
 * Route returns the user's AniList manga collection.
 */
export type GetAnilistMangaCollection_Variables = {
    bypassCache: boolean
}

/**
 * - Filepath: internal/handlers/manga.go
 * - Filename: manga.go
 * - Endpoint: /api/v1/manga/entry/{id}
 * @description
 * Route returns a manga entry for the given AniList manga id.
 */
export type GetMangaEntry_Variables = {
    /**
     *  AniList manga media ID
     */
    id: number
}

/**
 * - Filepath: internal/handlers/manga.go
 * - Filename: manga.go
 * - Endpoint: /api/v1/manga/entry/{id}/details
 * @description
 * Route returns more details about an AniList manga entry.
 */
export type GetMangaEntryDetails_Variables = {
    /**
     *  AniList manga media ID
     */
    id: number
}

/**
 * - Filepath: internal/handlers/manga.go
 * - Filename: manga.go
 * - Endpoint: /api/v1/manga/entry/cache
 * @description
 * Route empties the cache for a manga entry.
 */
export type EmptyMangaEntryCache_Variables = {
    mediaId: number
}

/**
 * - Filepath: internal/handlers/manga.go
 * - Filename: manga.go
 * - Endpoint: /api/v1/manga/chapters
 * @description
 * Route returns the chapters for a manga entry based on the provider.
 */
export type GetMangaEntryChapters_Variables = {
    mediaId: number
    provider: string
}

/**
 * - Filepath: internal/handlers/manga.go
 * - Filename: manga.go
 * - Endpoint: /api/v1/manga/pages
 * @description
 * Route returns the pages for a manga entry based on the provider and chapter id.
 */
export type GetMangaEntryPages_Variables = {
    mediaId: number
    provider: string
    chapterId: string
    doublePage: boolean
}

/**
 * - Filepath: internal/handlers/manga.go
 * - Filename: manga.go
 * - Endpoint: /api/v1/manga/anilist/list
 * @description
 * Route returns a list of manga based on the search parameters.
 */
export type AnilistListManga_Variables = {
    page?: number
    search?: string
    perPage?: number
    sort?: Array<AL_MediaSort>
    status?: Array<AL_MediaStatus>
    genres?: Array<string>
    averageScore_greater?: number
    year?: number
    isAdult?: boolean
    format?: AL_MediaFormat
}

/**
 * - Filepath: internal/handlers/manga.go
 * - Filename: manga.go
 * - Endpoint: /api/v1/manga/update-progress
 * @description
 * Route updates the progress of a manga entry.
 */
export type UpdateMangaProgress_Variables = {
    mediaId: number
    malId?: number
    chapterNumber: number
    totalChapters: number
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// manga_download
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * - Filepath: internal/handlers/manga_download.go
 * - Filename: manga_download.go
 * - Endpoint: /api/v1/manga/download-chapters
 * @description
 * Route adds chapters to the download queue.
 */
export type DownloadMangaChapters_Variables = {
    mediaId: number
    provider: string
    chapterIds: Array<string>
    startNow: boolean
}

/**
 * - Filepath: internal/handlers/manga_download.go
 * - Filename: manga_download.go
 * - Endpoint: /api/v1/manga/download-data
 * @description
 * Route returns the download data for a specific media.
 */
export type GetMangaDownloadData_Variables = {
    mediaId: number
    cached: boolean
}

/**
 * - Filepath: internal/handlers/manga_download.go
 * - Filename: manga_download.go
 * - Endpoint: /api/v1/manga/download-chapter
 * @description
 * Route deletes downloaded chapters.
 */
export type DeleteMangaDownloadedChapters_Variables = {
    downloadIds: Array<ChapterDownloader_DownloadID>
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// manual_dump
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// mediaplayer
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// mediastream
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * - Filepath: internal/handlers/mediastream.go
 * - Filename: mediastream.go
 * - Endpoint: /api/v1/mediastream/settings
 * @description
 * Route save mediastream settings.
 */
export type SaveMediastreamSettings_Variables = {
    settings: Models_MediastreamSettings
}

/**
 * - Filepath: internal/handlers/mediastream.go
 * - Filename: mediastream.go
 * - Endpoint: /api/v1/mediastream/request
 * @description
 * Route request media stream.
 */
export type RequestMediastreamMediaContainer_Variables = {
    path: string
    streamType: Mediastream_StreamType
    audioStreamIndex: number
    clientId: string
}

/**
 * - Filepath: internal/handlers/mediastream.go
 * - Filename: mediastream.go
 * - Endpoint: /api/v1/mediastream/preload
 * @description
 * Route preloads media stream for playback.
 */
export type PreloadMediastreamMediaContainer_Variables = {
    path: string
    streamType: Mediastream_StreamType
    audioStreamIndex: number
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// metadata
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * - Filepath: internal/handlers/metadata.go
 * - Filename: metadata.go
 * - Endpoint: /api/v1/metadata-provider/tvdb-episodes
 * @description
 * Route populate cache with TVDB episode metadata.
 */
export type PopulateTVDBEpisodes_Variables = {
    mediaId: number
}

/**
 * - Filepath: internal/handlers/metadata.go
 * - Filename: metadata.go
 * - Endpoint: /api/v1/metadata-provider/tvdb-episodes
 * @description
 * Route empties TVDB episode metadata cache.
 */
export type EmptyTVDBEpisodes_Variables = {
    mediaId: number
}

/**
 * - Filepath: internal/handlers/metadata.go
 * - Filename: metadata.go
 * - Endpoint: /api/v1/metadata-provider/filler
 * @description
 * Route fetches and caches filler data for the given media.
 */
export type PopulateFillerData_Variables = {
    mediaId: number
}

/**
 * - Filepath: internal/handlers/metadata.go
 * - Filename: metadata.go
 * - Endpoint: /api/v1/metadata-provider/filler
 * @description
 * Route removes filler data cache.
 */
export type RemoveFillerData_Variables = {
    mediaId: number
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// offline
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * - Filepath: internal/handlers/offline.go
 * - Filename: offline.go
 * - Endpoint: /api/v1/offline/snapshot
 * @description
 * Route creates an offline snapshot.
 */
export type CreateOfflineSnapshot_Variables = {
    animeMediaIds: Array<number>
}

/**
 * - Filepath: internal/handlers/offline.go
 * - Filename: offline.go
 * - Endpoint: /api/v1/offline/snapshot-entry
 * @description
 * Route updates data for an offline entry list.
 */
export type UpdateOfflineEntryListData_Variables = {
    mediaId?: number
    status?: AL_MediaListStatus
    score?: number
    progress?: number
    startDate?: string
    endDate?: string
    type: string
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// onlinestream
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * - Filepath: internal/handlers/onlinestream.go
 * - Filename: onlinestream.go
 * - Endpoint: /api/v1/onlinestream/episode-list
 * @description
 * Route returns the episode list for the given media and provider.
 */
export type GetOnlineStreamEpisodeList_Variables = {
    mediaId: number
    dubbed: boolean
    provider?: string
}

/**
 * - Filepath: internal/handlers/onlinestream.go
 * - Filename: onlinestream.go
 * - Endpoint: /api/v1/onlinestream/episode-source
 * @description
 * Route returns the video sources for the given media, episode number and provider.
 */
export type GetOnlineStreamEpisodeSource_Variables = {
    episodeNumber: number
    mediaId: number
    provider: string
    dubbed: boolean
}

/**
 * - Filepath: internal/handlers/onlinestream.go
 * - Filename: onlinestream.go
 * - Endpoint: /api/v1/onlinestream/cache
 * @description
 * Route empties the cache for the given media.
 */
export type OnlineStreamEmptyCache_Variables = {
    mediaId: number
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// playback_manager
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * - Filepath: internal/handlers/playback_manager.go
 * - Filename: playback_manager.go
 * - Endpoint: /api/v1/playback-manager/play
 * @description
 * Route plays the video with the given path using the default media player.
 */
export type PlaybackPlayVideo_Variables = {
    path: string
}

/**
 * - Filepath: internal/handlers/playback_manager.go
 * - Filename: playback_manager.go
 * - Endpoint: /api/v1/playback-manager/start-playlist
 * @description
 * Route starts playing a playlist.
 */
export type PlaybackStartPlaylist_Variables = {
    dbId: number
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// playlist
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * - Filepath: internal/handlers/playlist.go
 * - Filename: playlist.go
 * - Endpoint: /api/v1/playlist
 * @description
 * Route creates a new playlist.
 */
export type CreatePlaylist_Variables = {
    name: string
    paths: Array<string>
}

/**
 * - Filepath: internal/handlers/playlist.go
 * - Filename: playlist.go
 * - Endpoint: /api/v1/playlist
 * @description
 * Route updates a playlist.
 */
export type UpdatePlaylist_Variables = {
    dbId: number
    name: string
    paths: Array<string>
}

/**
 * - Filepath: internal/handlers/playlist.go
 * - Filename: playlist.go
 * - Endpoint: /api/v1/playlist
 * @description
 * Route deletes a playlist.
 */
export type DeletePlaylist_Variables = {
    dbId: number
}

/**
 * - Filepath: internal/handlers/playlist.go
 * - Filename: playlist.go
 * - Endpoint: /api/v1/playlist/episodes/{id}/{progress}
 * @description
 * Route returns all the local files of a playlist media entry that have not been watched.
 */
export type GetPlaylistEpisodes_Variables = {
    /**
     *  The ID of the media entry.
     */
    id: number
    /**
     *  The progress of the media entry.
     */
    progress: number
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// releases
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * - Filepath: internal/handlers/releases.go
 * - Filename: releases.go
 * - Endpoint: /api/v1/install-update
 * @description
 * Route installs the latest update.
 */
export type InstallLatestUpdate_Variables = {
    fallback_destination: string
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// routes
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// scan
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * - Filepath: internal/handlers/scan.go
 * - Filename: scan.go
 * - Endpoint: /api/v1/library/scan
 * @description
 * Route scans the user's library.
 */
export type ScanLocalFiles_Variables = {
    enhanced: boolean
    skipLockedFiles: boolean
    skipIgnoredFiles: boolean
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// scan_summary
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// settings
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * - Filepath: internal/handlers/settings.go
 * - Filename: settings.go
 * - Endpoint: /api/v1/start
 * @description
 * Route updates the app settings.
 */
export type GettingStarted_Variables = {
    library: Models_LibrarySettings
    mediaPlayer: Models_MediaPlayerSettings
    torrent: Models_TorrentSettings
    anilist: Models_AnilistSettings
    discord: Models_DiscordSettings
    enableTranscode: boolean
    enableTorrentStreaming: boolean
}

/**
 * - Filepath: internal/handlers/settings.go
 * - Filename: settings.go
 * - Endpoint: /api/v1/settings
 * @description
 * Route updates the app settings.
 */
export type SaveSettings_Variables = {
    library: Models_LibrarySettings
    mediaPlayer: Models_MediaPlayerSettings
    torrent: Models_TorrentSettings
    anilist: Models_AnilistSettings
    discord: Models_DiscordSettings
}

/**
 * - Filepath: internal/handlers/settings.go
 * - Filename: settings.go
 * - Endpoint: /api/v1/settings/auto-downloader
 * @description
 * Route updates the auto-downloader settings.
 */
export type SaveAutoDownloaderSettings_Variables = {
    interval: number
    enabled: boolean
    downloadAutomatically: boolean
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// status
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// theme
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * - Filepath: internal/handlers/theme.go
 * - Filename: theme.go
 * - Endpoint: /api/v1/theme
 * @description
 * Route updates the theme settings.
 */
export type UpdateTheme_Variables = {
    theme: Models_Theme
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// torrent_client
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * - Filepath: internal/handlers/torrent_client.go
 * - Filename: torrent_client.go
 * - Endpoint: /api/v1/torrent-client/action
 * @description
 * Route performs an action on a torrent.
 */
export type TorrentClientAction_Variables = {
    hash: string
    action: string
    dir: string
}

/**
 * - Filepath: internal/handlers/torrent_client.go
 * - Filename: torrent_client.go
 * - Endpoint: /api/v1/torrent-client/download
 * @description
 * Route adds torrents to the torrent client.
 */
export type TorrentClientDownload_Variables = {
    torrents: Array<HibikeTorrent_AnimeTorrent>
    destination: string
    smartSelect: any
    media?: AL_BaseAnime
}

/**
 * - Filepath: internal/handlers/torrent_client.go
 * - Filename: torrent_client.go
 * - Endpoint: /api/v1/torrent-client/rule-magnet
 * @description
 * Route adds magnets to the torrent client based on the AutoDownloader item.
 */
export type TorrentClientAddMagnetFromRule_Variables = {
    magnetUrl: string
    ruleId: number
    queuedItemId: number
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// torrent_search
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * - Filepath: internal/handlers/torrent_search.go
 * - Filename: torrent_search.go
 * - Endpoint: /api/v1/torrent/search
 * @description
 * Route searches torrents and returns a list of torrents and their previews.
 */
export type SearchTorrent_Variables = {
    /**
     *  "smart" or "simple"
     *  
     *  "smart" or "simple"
     */
    type?: string
    provider?: string
    query?: string
    episodeNumber?: number
    batch?: boolean
    media?: AL_BaseAnime
    absoluteOffset?: number
    resolution?: string
    bestRelease?: boolean
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// torrentstream
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * - Filepath: internal/handlers/torrentstream.go
 * - Filename: torrentstream.go
 * - Endpoint: /api/v1/torrentstream/episodes/{id}
 * @description
 * Route get list of episodes
 */
export type GetTorrentstreamEpisodeCollection_Variables = {
    /**
     *  AniList anime media ID
     */
    id: number
}

/**
 * - Filepath: internal/handlers/torrentstream.go
 * - Filename: torrentstream.go
 * - Endpoint: /api/v1/torrentstream/settings
 * @description
 * Route save torrentstream settings.
 */
export type SaveTorrentstreamSettings_Variables = {
    settings: Models_TorrentstreamSettings
}

/**
 * - Filepath: internal/handlers/torrentstream.go
 * - Filename: torrentstream.go
 * - Endpoint: /api/v1/torrentstream/torrent-file-previews
 * @description
 * Route get list of torrent files from a batch
 */
export type GetTorrentstreamTorrentFilePreviews_Variables = {
    torrent?: HibikeTorrent_AnimeTorrent
    episodeNumber: number
    media?: AL_BaseAnime
}

/**
 * - Filepath: internal/handlers/torrentstream.go
 * - Filename: torrentstream.go
 * - Endpoint: /api/v1/torrentstream/start
 * @description
 * Route starts a torrent stream.
 */
export type TorrentstreamStartStream_Variables = {
    mediaId: number
    episodeNumber: number
    aniDBEpisode: string
    autoSelect: boolean
    torrent?: HibikeTorrent_AnimeTorrent
    fileIndex?: number
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// websocket
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

