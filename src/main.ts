import * as http from "http"
import { readFileSync } from "fs"
import { IncomingMessage, ServerResponse } from "http"

type Config = { host: string | string[], proxy: string }[]

const config: Config = JSON.parse(readFileSync(__dirname + "/../config.json", "utf8"))

http.createServer((req: IncomingMessage, res: ServerResponse) => {
    const method = req.method
    const headers = req.headers
    const host = headers["host"]
    const path = req.url

    const proxy = config.find(proxy => {
        if (typeof proxy.host === "string") {
            return proxy.host === host
        }
        else {
            return proxy.host.includes(host)
        }
    })

    if (proxy) {
        const match = proxy.proxy.match(/(localhost|(?:\d+\.?){4})(?::(\d{1,4}))?/)

        if (match) {
            const [host, port] = match.slice(1)
            const options = {
                method,
                host,
                port: +port,
                path
            }

            http.request(options, (r => r.pipe(res))).end()

            return
        }
    }

    res.end("ERROR")
}).listen(8888, () => {
    console.log("listening http://localhost/")
})