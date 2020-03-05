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
    
      /*
  con.connect(function(err){
    if(err) return console.log(err);
    console.log('Conectado ao Banco de Dados!');
  })*/
  
  con.query(sql, function (err, result, fields) {
    if (err) throw err;
    const Canal = result[0].CanalAvisos;
    console.log(`Canal localizado com sucesso!`);

    let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!kUser) return message.channel.send("> O usuário não existe ou não foi encontrado!");
    let kReason = args.join(" ").slice(22);
    if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("> Você não tem permissão para usar esse comando!");
    if(kUser.hasPermission("KICK_MEMBERS")) return message.channel.send("> O usuário não pode ser kickado!");

    let kickEmbed = new Discord.RichEmbed()
    .setDescription("**KICK**")
    .setColor("#e56b00")
    .addField("Usuário Kickado: ", `${kUser}`)
    .addField("Kickado Por: ", `${message.author}`)
    .addField("Kickado em: ", message.channel)
    .addField("Horário: ", `${moment(message.createdAt).format('LLLL')}`)
    .addField("Rasão: ", kReason);

    message.delete().catch();
    message.guild.member(kUser).kick(kReason);
    
    if(Canal == 0){
      message.channel.send(kickEmbed)
    }else{
    let CanalSend = message.guild.channels.find(`id`, `${Canal}`);
    if(!CanalSend) return message.channel.send('> Não consegui localizar o canal de avisos!');
    CanalSend.send(kickEmbed);
    }
})
}

module.exports.help = {
  name:"kick",
  adm: true
}