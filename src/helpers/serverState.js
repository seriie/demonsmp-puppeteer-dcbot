import fs from "fs/promises"
import path from "path"

const FILE = path.resolve("src/data/server.json")

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