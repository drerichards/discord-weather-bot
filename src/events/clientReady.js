const { REST, Routes } = require("discord.js");

const rest = new REST({ version: "10" }).setToken(process.env.DISCORD_TOKEN);

const clientReadyHandler = async (client) => {
  console.log(`Logged in as: ${client.user.tag}`);

  try {
    console.log(`Commands refreshed: ${client.commands.size}`);

    const data = await rest.put(
      Routes.applicationGuildCommands(
        process.env.CLIENT_APPLICATION_ID,
        process.env.GUILD_SERVER_ID,
      ),
      {
        body: client.commands.map((command) => {
          return command.data.toJSON();
        }),
      },
    );

    console.log(`Commands reloaded: ${data.length}`);
  } catch (error) {
    console.error(error);
  }
};

module.exports = { clientReadyHandler };
