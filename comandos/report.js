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
  var sql = `SELECT CanalAvisos from ServerConfig WHERE ServerID = ${message.guild.id}`;
  
  con.query(sql, function (err, result, fields) {
    if (err) throw err;
    const Canal = result[0].CanalAvisos;
    console.log(`Canal localizado com sucesso!`);

    let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!rUser) return message.channel.send("> Usuário não encontrado ou não inserido!");
    let rreason = args.join(" ").slice(22);

    let reportEmbed = new Discord.RichEmbed()
    .setDescription("Reports")
    .setColor("RANDOM")
    .addField("Usuário Reportado: ", `${rUser} com o ID ${rUser.id}`)
    .addField("Reportado Por: ", `${message.author} com o ID ${message.author.id}`)
    .addField("Canal: ", message.channel)
    .addField("Horário: ", message.createdAt)
    .addField("Rasão: ", rreason);
  
    let CanalSend = message.guild.channels.find(`id`, `${Canal}`);
    if(!Canal) return message.channel.send('> Não consegui localizar o canal de avisos de reports!');

    message.delete().catch(O_o=>{});
    CanalSend.send(reportEmbed);

})
}
 
module.exports.help = {
  name: "report",
  adm: false
}