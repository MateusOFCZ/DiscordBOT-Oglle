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

    let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!bUser) return message.channel.send("> O usuário não existe ou não foi encontrado!");
    let bReason = args.join(" ").slice(22);
    if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("> Você não tem permissão para usar esse comando!");
    if(bUser.hasPermission("BAN_MEMBERS")) return message.channel.send("> O usuário não pode ser banido!!");

    let banEmbed = new Discord.RichEmbed()
    .setDescription("**BANIMENTO**")
    .setColor("RANDOM")
    .addField("Usuário: ", `${bUser}`)
    .addField("Banido por: ", `${message.author}`)
    .addField("Banido em: ", message.channel)
    .addField("Horário: ", `${moment(message.createdAt).format('LLLL')}`)
    .addField("RRasão", bReason);

    //let banimentos = message.guild.channels.find(`name`, "banimentos");
    //if(!banimentos) return message.channel.send('> Não consegui localizar o canal "banimentos"!');
    
    message.delete().catch();
    message.guild.member(bUser).ban(bReason);
    
    if(Canal == 0){
      message.channel.send(banEmbed)
    }else{
    let CanalSend = message.guild.channels.find(`id`, `${Canal}`);
    if(!CanalSend) return message.channel.send('> Não consegui localizar o canal de avisos!');
    CanalSend.send(banEmbed);
    }
  });
}

module.exports.help = {
  name:"ban",
  adm: true
}