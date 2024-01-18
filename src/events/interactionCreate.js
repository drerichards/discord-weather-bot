const interactionCreateHandler = async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const command = interaction.client.commands.get(interaction.commandName);
  if (!command) return;

  try {
    await command.execute(interaction);
    console.log(
      `${interaction.user.username} used command: ${interaction.commandName}`,
    );
  } catch (error) {
    console.error(error);
    if (interaction.replied || interaction.deferred) {
      await interaction.followUp({
        content: "Something went wrong...",
        ephemeral: true,
      });
    } else {
      await interaction.reply({
        content: "Something went wrong...",
        ephemeral: true,
      });
    }
  }
};

module.exports = { interactionCreateHandler };
