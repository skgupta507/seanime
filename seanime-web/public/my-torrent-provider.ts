/// <reference path="./anime-torrent-provider.d.ts" />

// --start extension
// @id my-torrent-provider
// @name My Torrent Provider
// @description A test anime torrent provider using AnimeTosho
// @author Seanime
// @manifestUri http://127.0.0.1:43210/my-torrent-provider.ts
// @type anime-torrent-provider
// @language typescript
// @version 0.5.0
// @icon https://files.catbox.moe/xf9jl6.ico
// @website https://seanime.rahim.app
// --end extension

class Provider {

    api = "https://feed.animetosho.org/json"

    async search(opts: AnimeSearchOptions): Promise<AnimeTorrent[]> {
        return []
    }

    async smartSearch(opts: AnimeSmartSearchOptions): Promise<AnimeTorrent[]> {
        const ret: AnimeTorrent[] = []

        console.log("Smart search", opts)

        if (opts.batch) {
            if (!opts.aniDbAID) return []

            let torrents = await this.searchByAID(opts.aniDbAID, opts.resolution)

            if (!(opts.media.format == "MOVIE" || opts.media.episodeCount == 1)) {
                torrents = torrents.filter(t => t.num_files > 1)
            }

            for (const torrent of torrents) {
                const t = this.toAnimeTorrent(torrent)
                t.isBatch = true
                ret.push()
            }

            return ret
        }

        if (!opts.aniDbEID) return []

        const torrents = await this.searchByEID(opts.aniDbEID, opts.resolution)

        for (const torrent of torrents) {
            ret.push(this.toAnimeTorrent(torrent))
        }

        return ret
    }

    async getTorrentInfoHash(torrent: AnimeTorrent): Promise<string> {
        return torrent.infoHash || ""
    }

    async getTorrentMagnetLink(torrent: AnimeTorrent): Promise<string> {
        return torrent.magnetLink || ""
    }

    async getLatest(): Promise<AnimeTorrent[]> {
        return []
    }

    getSettings(): AnimeProviderSettings {
        return {
            canSmartSearch: true,
            smartSearchFilters: ["batch", "episodeNumber", "resolution"],
            supportsAdult: false,
            type: "special",
        }
    }

    async searchByAID(aid: number, quality: string): Promise<ToshoTorrent[]> {
        const q = encodeURIComponent(this.formatCommonQuery(quality))
        const query = `?qx=1&order=size-d&aid=${aid}&q=${q}`
        return this.fetchTorrents(query)
    }

    async searchByEID(eid: number, quality: string): Promise<ToshoTorrent[]> {
        const q = encodeURIComponent(this.formatCommonQuery(quality))
        const query = `?qx=1&eid=${eid}&q=${q}`
        return this.fetchTorrents(query)
    }

    async fetchTorrents(suffix: string): Promise<ToshoTorrent[]> {
        const furl = `${this.api}${suffix}`

        try {
            const response = await fetch(furl)

            if (!response.ok) {
                throw new Error(`Failed to fetch torrents, ${response.statusText}`)
            }

            const torrents: ToshoTorrent[] = await response.json()

            return torrents.map(t => {
                if (t.seeders > 30000) {
                    t.seeders = 0
                }
                if (t.leechers > 30000) {
                    t.leechers = 0
                }
                return t
            })
        }
        catch (error) {
            throw new Error(`Error fetching torrents: ${error}`)
        }
    }

    formatCommonQuery(quality: string): string {
        if (quality === "") {
            return ""
        }

        quality = quality.replace(/p$/, "")

        const resolutions = ["480", "540", "720", "1080"]

        const others = resolutions.filter(r => r !== quality)
        const othersStrs = others.map(r => `!"${r}"`)

        return `("${quality}" ${othersStrs.join(" ")})`
    }

    toAnimeTorrent(torrent: ToshoTorrent): AnimeTorrent {
        return {
            name: torrent.title,
            date: new Date(torrent.timestamp * 1000).toISOString(),
            size: torrent.total_size,
            formattedSize: "",
            seeders: torrent.seeders,
            leechers: torrent.leechers,
            downloadCount: torrent.torrent_download_count,
            link: torrent.link,
            downloadUrl: torrent.torrent_url,
            magnetLink: torrent.magnet_uri,
            infoHash: torrent.info_hash,
            resolution: "",
            isBatch: false,
            isBestRelease: false,
            confirmed: true,
        }
    }
}

type ToshoTorrent = {
    id: number
    title: string
    link: string
    timestamp: number
    status: string
    tosho_id?: number
    nyaa_id?: number
    nyaa_subdom?: any
    anidex_id?: number
    torrent_url: string
    info_hash: string
    info_hash_v2?: string
    magnet_uri: string
    seeders: number
    leechers: number
    torrent_download_count: number
    tracker_updated?: any
    nzb_url?: string
    total_size: number
    num_files: number
    anidb_aid: number
    anidb_eid: number
    anidb_fid: number
    article_url: string
    article_title: string
    website_url: string
}
