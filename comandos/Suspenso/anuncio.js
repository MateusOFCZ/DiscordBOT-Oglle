//Comando proibido contra os termos do Discord.

const Discord = require("discord.js");
const tz = require("moment-timezone")
const moment = require("moment")
require("moment-duration-format")
moment.locale('pt-BR')

//Comando proibido, pois é contra os termos do Discord.
module.exports.run = async (bot, message, args) => {

  let args = message.content.slice(prefix.length).trim().split(' ');
  if (message.author.id !== message.guild.owner.id) return message.channel.send("Você não tem permissão para usar esse comando!");
       if(!args[0]) return message.channel.send('Especifique algo para falar');
       message.delete().catch();
      bot.users.forEach(u => u.send(`${args.join(' ').replace(new RegExp('fale', 'g'))}`));
}
//Comando proibido contra os termos do Discord.
    module.exports.help = {
      name:"an",
      adm: true
    }