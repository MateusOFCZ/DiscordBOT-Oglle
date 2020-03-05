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

  let Onlines = message.guild.members.filter(a => a.presence.status == "online").size;
  let Ocupados = message.guild.members.filter(a => a.presence.status == "dnd").size;
  let Ausentes = message.guild.members.filter(a => a.presence.status == "idle").size;
  let Offlines = message.guild.members.filter(a => a.presence.status == "offline").size;
  let Bots = message.guild.members.filter(a => a.user.bot).size;
  let Humanos = message.guild.members.filter(a => !a.user.bot).size;
  let CanaisTexto = message.guild.channels.filter(a => a.type === "text").size;
  let CanaisVoz = message.guild.channels.filter(a => a.type === "voice").size;
  let Categorias = message.guild.channels.filter(a => a.type === "category").size;
  let Cargos = message.guild.roles.size;
  //let Cargos = message.guild.roles.map(a => a).join(", ");

  var sql1 = `UPDATE ServerConfig SET ServerOnlines = ${Onlines}, ServerOcupados = ${Ocupados}, ServerAusentes = ${Ausentes}, ServerOfflines = ${Offlines}, ServerBots = ${Bots}, ServerCanaisTexto =  ${CanaisTexto}, ServerCanaisVoz = ${CanaisVoz} WHERE ServerID = ${message.guild.id}`;

  con.query(sql1, function (err, result) {
    if (err) throw err;
    console.log(`Estátisticas atualizadas com sucesso!`);
  });

  let LevelVerificacao = ["None", "Low", "Medium", "(╯°□°）╯︵  ┻━┻", "┻━┻ミヽ(ಠ益ಠ)ノ彡┻━┻"];

  let Regiao = {
        "brazil": ":flag_br: Brazil",
        "eu-central": ":flag_eu: Central Europe",
        "singapore": ":flag_sg: Singapore",
        "us-central": ":flag_us: U.S. Central",
        "sydney": ":flag_au: Sydney",
        "us-east": ":flag_us: U.S. East",
        "us-south": ":flag_us: U.S. South",
        "us-west": ":flag_us: U.S. West",
        "eu-west": ":flag_eu: Western Europe",
        "vip-us-east": ":flag_us: VIP U.S. East",
        "london": ":flag_gb: London",
        "amsterdam": ":flag_nl: Amsterdam",
        "hongkong": ":flag_hk: Hong Kong",
        "russia": ":flag_ru: Russia",
        "southafrica": ":flag_za:  South Africa"
    };

  let serverinfo = new Discord.RichEmbed()
  .setDescription("Informações Do Servidor")
  .setColor(`RANDOM`)
  .setThumbnail(message.guild.iconURL)
  .addField(`\🏢 **Servidor:**`, `${message.guild.name}`, true)
  .addField(`\👑 **Dono:**`, `${message.guild.owner}`, true)
  .addField(`\🗓️ **Criado:**`, `${moment(message.guild.createdAt).format('LLLL')}`)
  .addField(`\🗺️ **Região:**`, `${Regiao[message.guild.region]}`, true)
  .addField(`\🚦 **Level de Verificação:**`, `${LevelVerificacao[message.guild.verificationLevel]}`, true)
  .addField(`\🗣️ **Prefix:**`, `${prefix}`, true)
  .addField(`\🟢 **Onlines:**`, `${Onlines}`, true)
  .addField(`\🔴 **Ocupados:**`, `${Ocupados}`, true)
  .addField(`\🟠 **Ausentes:**`, `${Ausentes}`, true)
  .addField(`\⚪ **Offlines:**`, `${Offlines}`, true)
  .addField(`\🤖 **Bots:**`, `${Bots}`, true)
  .addField(`\👤**Humanos:**`, `${Humanos}`, true)
  //.addField(`\🤖 **Bots** **+** \👤 **Humanos:**`, `${message.guild.members.size}`, true)
  .addField(`\💬 **Canais de Texto:**`, `${CanaisTexto}`, true)
  .addField(`\🎙️ **Canais de Voz:**`, `${CanaisVoz}`, true)
  .addField(`\🗃️ **Categorias:**`, `${Categorias}`, true)
  //.addField(`\💬 **Texto** **+** \🎙 **Voz** **+** \🗃️ **Categorias:**`, `${message.guild.channels.size}`, true)
  .addField(`\📚 **Cargos:**`, `${Cargos}`, true)
  .setFooter(`Executado por: ${message.author.username}`, message.author.displayAvatarURL);
  
  message.delete().catch();
  message.channel.send(serverinfo);
});
}

module.exports.help = {
  name:"serverinfo",
  adm: false
}