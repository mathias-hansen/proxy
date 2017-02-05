import * as http from "http"
import { readFileSync } from "fs"
import { IncomingMessage, ServerResponse } from "http"

interface Config {
    host_port: number
    proxies: { host: string, proxy: string }[]
}

const config: Config = JSON.parse(readFileSync(__dirname + "/../config.json", "utf8"))

console.log(config)

http.createServer((req: IncomingMessage, res: ServerResponse) => {
    console.log(req.url)
    console.log(req.method)
    console.log(req.headers)

    res.end()
}).listen(config.host_port, () => {
    console.log("listening http://localhost:" + config.host_port)
})