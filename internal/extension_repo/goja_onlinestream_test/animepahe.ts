/// <reference path="./onlinestream-provider.d.ts" />
/// <reference path="../goja_bindings/doc.d.ts" />
/// <reference path="../goja_bindings/crypto.d.ts" />

type EpisodeData = {
    id: number; episode: number; title: string; snapshot: string; filler: number; created_at?: string
}

type AnimeData = {
    id: number; title: string; type: string; year: number; poster: string; session: string
}

class Provider {

    api = "https://animepahe.ru"
    headers = { Referer: "https://kwik.si" }

    getSettings(): Settings {
        return {
            episodeServers: ["kwik"],
            supportsDub: false,
        }
    }

    async search(opts: SearchOptions): Promise<SearchResult[]> {
        const req = await fetch(`${this.api}/api?m=search&q=${encodeURIComponent(opts.query)}`, {
            headers: {
                Cookie: "__ddg1_=;__ddg2_=;",
            },
        })

        if (!req.ok) {
            return []
        }
        const data = (await req.json()) as { data: AnimeData[] }
        const results: SearchResult[] = []

        if (!data?.data) {
            return []
        }

        console.log(data)

        data.data.map((item: AnimeData) => {
            results.push({
                subOrDub: "sub",
                id: String(item.id) ?? item.session,
                title: item.title,
                url: "",
            })
        })

        return results
    }

    async findEpisodes(id: string): Promise<EpisodeDetails[]> {
        const episodes: EpisodeDetails[] = []

        const req =
            await fetch(
                `${this.api}${id.includes("-") ? `/anime/${id}` : `/a/${id}`}`,
                {
                    headers: {
                        Cookie: "__ddg1_=;__ddg2_=;",
                    },
                },
            )

        const html = await req.text()


        function pushData(data: EpisodeData[]) {
            for (const item of data) {
                console.log(item)
                episodes.push({
                    id: item.id + "$" + id,
                    number: item.episode,
                    title: item.title && item.title.length > 0 ? item.title : "Episode " + item.episode,
                    url: req.url,
                })
            }
        }

        const $ = LoadDoc(html)

        const tempId = $("head > meta[property='og:url']").attr("content")!.split("/").pop()!

        const { last_page, data } = (await (
            await fetch(`${this.api}/api?m=release&id=${tempId}&sort=episode_asc&page=1`, {
                headers: {
                    Cookie: "__ddg1_=;__ddg2_=;",
                },
            })
        ).json()) as {
            last_page: number;
            data: EpisodeData[]
        }

        pushData(data)

        const pageNumbers = Array.from({ length: last_page - 1 }, (_, i) => i + 2)

        const promises = pageNumbers.map((pageNumber) =>
            fetch(`${this.api}/api?m=release&id=${tempId}&sort=episode_asc&page=${pageNumber}`, {
                headers: {
                    Cookie: "__ddg1_=;__ddg2_=;",
                },
            }).then((res) => res.json()),
        )
        const results = (await Promise.all(promises)) as {
            data: EpisodeData[]
        }[]

        results.forEach((showData) => {
            for (const data of showData.data) {
                if (data) {
                    pushData([data])
                }
            }
        });
        (data as any[]).sort((a, b) => a.number - b.number)

        if (episodes.length === 0) {
            throw new Error("No episodes found.")
        }

        const lowest = episodes[0].number
        if (lowest > 1) {
            for (let i = 0; i < episodes.length; i++) {
                episodes[i].number = episodes[i].number - lowest + 1
            }
        }

        return episodes
    }

    async findEpisodeServer(episode: EpisodeDetails, _server: string): Promise<EpisodeServer> {
        const episodeId = episode.id.split("$")[0]
        const animeId = episode.id.split("$")[1]

        console.log(episodeId, animeId)

        const req = await fetch(
            `${this.api}${animeId.includes("-") ? `/anime/${animeId}` : `/a/${animeId}`}`,
            {
                headers: {
                    Cookie: "__ddg1_=;__ddg2_=;",
                },
            },
        )

        try {
            const url = req.url
            // Need session id to fetch the watch page
            const sessionId = url.split("/anime/").pop()?.split("?")[0] ?? ""

            const $ = LoadDoc(await req.text())
            const tempId = $("head > meta[property='og:url']").attr("content")!.split("/").pop()!
            const { last_page, data } = (await (
                await fetch(
                    `${this.api}/api?m=release&id=${tempId}&sort=episode_asc&page=1`,
                    {
                        headers: {
                            Cookie: "__ddg1_=;__ddg2_=;",
                        },
                    },
                )
            ).json()) as { last_page: number; data: { id: number; session: string }[] }


            let episodeSession = ""

            for (let i = 0; i < data.length; i++) {
                if (String(data[i].id) === episodeId) {
                    episodeSession = data[i].session
                    break
                }
            }

            if (episodeSession === "") {
                for (let i = 1; i < last_page; i++) {
                    const data = (await (
                        await fetch(`${this.api}/api?m=release&id=${tempId}&sort=episode_asc&page=${i + 1}`, {
                            headers: {
                                Cookie: "__ddg1_=;__ddg2_=;",
                            },
                        })
                    ).json()) as { last_page: number; data: { id: number; session: string }[] }["data"]

                    for (let j = 0; j < data.length; j++) {
                        if (String(data[j].id) === episodeId) {
                            episodeSession = data[j].session
                            break
                        }
                    }

                    if (episodeSession !== "") break
                }
            }

            if (episodeSession === "") {
                throw new Error("Episode not found.")
            }

            const watchReq = await (
                await fetch(
                    `${this.api}/play/${sessionId}/${episodeSession}`,
                    {
                        headers: {
                            Cookie: "__ddg1_=;__ddg2_=;",
                        },
                    },
                )
            ).text()

            const regex = /https:\/\/kwik\.si\/e\/\w+/g
            const matches = watchReq.match(regex)

            if (matches === null) {
                throw new Error("Failed to fetch episode server.")
            }

            const result: EpisodeServer = {
                videoSources: [],
                headers: this.headers ?? {},
                server: "kwik",
            }

            return this.extractKwik(matches[0], result)
        }
        catch (e) {
            console.error(e)
            throw new Error("Failed to fetch episode server.")
        }
    }

    format(p: any, a: any, c: any, k: any, e: any, d: any) {
        k = k.split("|")
        e = (c: any) => {
            return (c < a ? "" : e(parseInt((c / a).toString()))) + ((c = c % a) > 35 ? String.fromCharCode(c + 29) : c.toString(36))
        }
        if (!"".replace(/^/, String)) {
            while (c--) {
                d[e(c)] = k[c] || e(c)
            }
            k = [
                (e: any) => {
                    return d[e]
                },
            ]
            e = () => {
                return "\\w+"
            }
            c = 1
        }
        while (c--) {
            if (k[c]) {
                p = p.replace(new RegExp("\\b" + e(c) + "\\b", "g"), k[c])
            }
        }
        return p
    }

    async extractKwik(url: string, result: EpisodeServer): Promise<EpisodeServer> {

        const host = "https://animepahe.ru"
        const req = await fetch(url, {
            headers: {
                Referer: host,
            },
        })
        const $ = LoadDoc(await req.text())
        // console.log($("html").html())
        const match = $("html").html()?.match(/p\}.*kwik.*/g)
        if (!match) {
            throw new Error("Video not found.")
        }
        let arr: string[] = match[0].split("return p}(")[1].split(",")

        const l = arr.slice(0, arr.length - 5).join("")
        arr = arr.slice(arr.length - 5, -1)
        arr.unshift(l)

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const [p, a, c, k, e, d] = arr.map((x) => x.split(".sp")[0])

        const formatted = this.format(p, a, c, k, e, {})

        console.log(formatted)

        const source = formatted
            .match(/source=\\(.*?)\\'/g)[0]
            .replace(/\'/g, "")
            .replace(/source=/g, "")
            .replace(/\\/g, "")

        result.videoSources.push({
            type: "m3u8",
            url: source,
            quality: "auto",
            subtitles: [],
        })

        return result

    }


}

