const { EmbedBuilder } = require('discord.js');

module.exports = (target, duration, reason = null) => {
	// TODO add verbose messages setting handling
    // TODO add duration and reason
    target.timeout(60_000);
};
