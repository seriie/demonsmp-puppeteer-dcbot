import "./config/env.js"
import "./events/ready.js"
import "./events/interaction.js"
import { client } from "./client.js"

import { REST, Routes } from "discord.js"
import { aternosCommand } from "./commands/aternos.command.js"

const rest = new REST({ version: "10" })
  .setToken(process.env.DISCORD_TOKEN)

await rest.put(
  Routes.applicationCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
  { body: [aternosCommand.toJSON()] }
)

console.log("✅ Slash command registered")


client.login(process.env.DISCORD_TOKEN)