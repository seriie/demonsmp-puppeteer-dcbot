import fs from "fs/promises"
import path from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const FILE = path.join(__dirname, "../data/server.json")

export async function writeServerState(data) {
  await fs.writeFile(
    FILE,
    JSON.stringify(data, null, 2)
  )
}

export async function readServerState() {
  try {
    const raw = await fs.readFile(FILE, "utf-8")
    return JSON.parse(raw)
  } catch {
    return null
  }
}