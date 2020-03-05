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
    const hook = new Discord.WebhookClient('676230309603442731', 'o8SZNgTi8TLRT6xjRIo2BWAeimWkLbhHrRtFO5AqGoLcLRo2k6xdRCTfzDRD3LDW6KIB');
    var sql = `SELECT Prefix from ServerConfig WHERE ServerID = ${message.guild.id}`;

    con.query(sql, function (err, result, fields) {
      if (err) throw err;
      const Prefix = result[0].Prefix;
      console.log(`Prefix localizado com sucesso!`);

    let [Titulo, Corpo, CorHex, Thumbnail, Link] = args.join(' ').split(/ *\| */);
           if(!Titulo) return message.channel.send(`> **Como utilizar:** *${Prefix}update [TÍTULO]* **|** *[CORPO]* **|** *[COR EM HEXADECIMAL]* **|** *[LINK PARA THUMBNAIL]* **|** *[TÍTULO LINK]*\n> *OBS.: A cor, thumbnail e link são opcionais!*`);
           if(!Corpo) return message.channel.send(`> **Como utilizar:** *${Prefix}update [TÍTULO]* **|** *[CORPO]* **|** *[COR EM HEXADECIMAL]* **|** *[LINK PARA THUMBNAIL]* **|** *[TÍTULO LINK]*\n> *OBS.: A cor, thumbnail e link são opcionais!*`);
           message.delete().catch();
                if(!CorHex){
                  CorHex = `RANDOM`;
                }
                if(!Thumbnail){
                  Thumbnail = bot.user.displayAvatarURL;
                }
                if(!Link){
                  Link = `https://oglle.com.br/`;
                }

                let webhooktext = new Discord.RichEmbed()
                .setColor(`${CorHex}`)
                .setTitle(`> **${Titulo}**`)
                .setURL(`${Link}`)
                .setDescription(`${Corpo}`)
                .setThumbnail(`${Thumbnail}`)
                .setTimestamp()
                .setFooter(`Enviado por: ${message.author.username}`, message.author.displayAvatarURL);
                hook.send(webhooktext)
              })
            }
  
module.exports.help = {
    name:"update",
    adm: true
}