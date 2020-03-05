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

module.exports.run = async (bot, message, args) => {
  var sql = `SELECT Prefix from ServerConfig WHERE ServerID = ${message.guild.id}`;
  
  con.query(sql, function (err, result, fields) {
    if (err) throw err;
    const prefix = result[0].Prefix;
    console.log(`Prefix localizado com sucesso!`);

  let avatarbot = bot.user.displayAvatarURL;
  let botcmdembed = new Discord.RichEmbed()
  .setDescription("Comandos:")
  .setColor(`RANDOM`)
  .setThumbnail(avatarbot)
  .addField(`${prefix}kick = Expulsa um usuário especifico de seu servidor.`, `Exemplo: *${prefix}kick [MENCIONE O USUÁRIO] [MOTIVO]*`)
  .addField(`${prefix}ban = Bane um usuário especifico de seu servior.`, `Exemplo: *${prefix}ban [MENCIONE O USUÁRIO] [MOTIVO]*`)
  .addField(`${prefix}limpar = Limpa uma quantidade de mensagens em um canal.`, `Exemplo: *${prefix}limpar [Número de 1 a 100]*`)
  .addField(`${prefix}votekick = Utilizado para expulsar um usuário do servidor por meio de votos.`, `Exemplo: *${prefix}votekick [MENCIONE O USUÁRIO]*`)
  .addField(`${prefix}configurar = Utilizado para configurar canais e sistemas.`, `Exemplo: *${prefix}configurar*`)
  .addField(`${prefix}serverinfo = Utilizado para ver as informações do servidor.`, `Exemplo: *${prefix}serverinfo*`)
  //.addField(`${prefix}report = Reporta um usuário especifico.`, `Exemplo: *${prefix}report [MENCIONE O USUÁRIO] [MOTIVO]*`)
  
  let quemfoi = message.author;
  let botavcmdembed = new Discord.RichEmbed()
  .setDescription(`Hey ${quemfoi.username},`)
  .setColor(`RANDOM`)
  .addField(`> **Mandei meus comandos em seu privado!**`, `*Comando executado: ${prefix}comandos*`)
  .setTimestamp()
  .setFooter(`Executado por: ${message.author.username}`, message.author.displayAvatarURL);
  message.delete().catch();
  message.channel.send(botavcmdembed)
  message.author.send(botcmdembed);
});
}

module.exports.help = {
  name:"comandos",
  adm: false
}