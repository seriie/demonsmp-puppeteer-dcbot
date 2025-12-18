import "./config/env.js"
import "./events/ready.js"
import "./events/interaction.js"
import { client } from "./client.js"
import { registerInteraction } from "./events/interaction.js"
import { REST, Routes } from "discord.js"
import { aternosCommand } from "./commands/aternos.command.js"
import { mylogs } from "./lib/utils/mylogs.js"

const rest = new REST({ version: "10" })
  .setToken(process.env.DISCORD_TOKEN)

await rest.put(
  Routes.applicationCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
  { body: [aternosCommand.toJSON()] }
)

mylogs("✅", "Slash command registered")

registerInteraction(client)

client.login(process.env.DISCORD_TOKEN)