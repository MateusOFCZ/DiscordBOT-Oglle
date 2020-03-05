const Discord = require("discord.js");
const tz = require("moment-timezone")
const moment = require("moment")
require("moment-duration-format")
moment.locale('pt-BR')

module.exports.run = async (bot, message, args) => {
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("> Você não tem permissão para executar este comando!");
    if(!args[0]) return message.channel.send("> Você não específicou o número de mensagens para apagar!");
    let aplicador = message.author;
    message.channel.bulkDelete(args[0]).then(() => {
    message.channel.send(`> ${args[0]} mensagens apagadas por ${aplicador}!`).then(msg => msg.delete(2000));
    message.delete().catch();
})}

module.exports.help = {
  name:"limpar",
  adm: true
}