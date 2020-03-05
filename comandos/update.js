const Discord = require("discord.js");
const tz = require("moment-timezone")
const moment = require("moment")
require("moment-duration-format")
moment.locale('pt-BR')
const mysql = require('mysql');

const con = mysql.createConnection({
  host     : '213.190.6.127',
  user     : 'u810777998_botbasico',
  password : 'aezakmi4751',
  database : 'u810777998_botbasico'
});
module.exports.run = async (bot, message, args, guild) => {
    if (message.author.id !== `394147438006370304`) return message.channel.send("> Você não tem permissão para usar esse comando!");
    const hook = new Discord.WebhookClient('677523452168634436', 'HrZt4ne2wxpNcpf8eGO0TLRuHkF1urqQoyiF737nIv0vOkUgCcSNLH9tyzo91AWFbKRG');
    var sql = `SELECT Prefix from ServerConfig WHERE ServerID = ${message.guild.id}`;

    con.query(sql, function (err, result, fields) {
      if (err) throw err;
      const Prefix = result[0].Prefix;
      console.log(`Prefix localizado com sucesso!`);

    let [Titulo, Corpo, CorHex, Thumbnail, Link] = args.join(' ').split(/ *\| */);
           if(!Titulo) return message.channel.send(`> **Como utilizar:** *${Prefix}update [TÍTULO]* **|** *[CORPO]*`);
           if(!Corpo) return message.channel.send(`> **Como utilizar:** *${Prefix}update [TÍTULO]* **|** *[CORPO]*`);
           message.delete().catch();

                let webhooktext = new Discord.RichEmbed()
                .setColor(`RANDOM`)
                .setAuthor(`${message.author.username}`, `${message.author.displayAvatarURL}`, `https://oglle.com.br`)
                .setTitle(`**${Titulo}**`)
                .setDescription(`${Corpo}`)
                hook.send(webhooktext)
              })
            }
  
module.exports.help = {
    name:"update",
    adm: true
}