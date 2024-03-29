const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');
const fs = require('fs');
const path = require('path');
const { getSettingName } = require('../modules/settings-name');
const { getSettingDescription } = require('../modules/settings-description');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('settings')
        .setDescription('Configure the settings of this bot.')
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild),
    async execute(interaction) {
        await interaction.reply(":thinking:");

        const settingsPath = path.join(__dirname, '..', 'settings.json');

        fs.readFile(settingsPath, 'utf8', (err, data) => {
            console.log(data)
            if (err) {
                console.error(err);
                interaction.followUp('Failed to read `settings.json`. Please tell the guild owner to fix this.');
                return;
            }
            try {
                const settings = JSON.parse(data);
                let settingsEmbed = new EmbedBuilder()
                    .setTitle(":wrench: Settings");

                for (const key in settings) {
                      if (Object.hasOwnProperty.call(settings, key)) {
                        // console.log(settings, key)
                        const value = settings[key];
                        const emoji = value ? ':white_check_mark:' : ':x:';
                        const name = getSettingName(key);
                        const description = getSettingDescription(key)
                        settingsEmbed.addFields({ name: `${emoji} ${name}`, value: `${description}\n` });
                    }
                }
                    
                // TODO make the settings configurable

                interaction.followUp({ embeds: [settingsEmbed] });
            } catch (error) {
                console.error(error);
                interaction.followUp('Failed to read `settings.json`. Please tell the guild owner to fix this.');
            }
        });
    }    
};
