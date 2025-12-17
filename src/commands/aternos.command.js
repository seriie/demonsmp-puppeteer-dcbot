import { SlashCommandBuilder } from "discord.js"

export const aternosCommand = new SlashCommandBuilder()
  .setName("aternos")
  .setDescription("Manage Aternos server")
  .addSubcommand(sub =>
    sub
      .setName("start")
      .setDescription("Start the server")
  )
  
  .addSubcommand(sub =>
    sub
      .setName("status")
      .setDescription("Check server status")
  )