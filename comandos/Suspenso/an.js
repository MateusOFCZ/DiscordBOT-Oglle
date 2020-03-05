const Discord = require("discord.js");
const tz = require("moment-timezone")
const moment = require("moment")
require("moment-duration-format")
moment.locale('pt-BR')

module.exports.run = async (bot, message, args) => {
              message.channel.send(`Hey ${message.author} este comando foi desabilitado pois infringia os Termos e Condições do Discord!`)
}

    module.exports.help = {
      name:"an",
      adm: true
    }