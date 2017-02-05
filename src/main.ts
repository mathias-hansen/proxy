import * as http from "http"
import { readFileSync } from "fs"
import { IncomingMessage, ServerResponse } from "http"

type Config = { host: string | string[], proxy: string }[]

const config: Config = JSON.parse(readFileSync(__dirname + "/../config.json", "utf8"))

config

http.createServer((req: IncomingMessage, res: ServerResponse) => {
    res.end(req.method + " http://" + req.headers["host"] + req.url)
}).listen(8888, () => {
    console.log("listening http://localhost/")
})