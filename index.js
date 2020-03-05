// https://discordapp.com/oauth2/authorize?&client_id=641614088215986186&scope=bot&permissions=8
const Discord = require("discord.js");
const botconfig = require("./botconfig.json");
const moment = require("moment")
require("moment-duration-format")
moment.locale('pt-BR')
const fs = require("fs");
const bot = new Discord.Client({disableEveryone: true});
bot.comandos = new Discord.Collection();
let PrefixDefault = botconfig.prefix;

bot.on("ready", async () => {
  console.log(`${bot.user.username} está online em ${bot.guilds.size} servidores!`);
  bot.user.setActivity("OGLLE.COM.BR", {type: "WATCHING"});
  bot.user.setStatus('dnd');
});

const mysql = require('mysql');
const con = mysql.createConnection({
  host     : 'HOST',
  user     : 'USER',
  password : 'PASSWORD',
  database : 'DATABASE'
});

//_________________________________________________________SISTEMA PREFIX___________________________________________________
bot.on('guildCreate', async guild => {

    var sql1 = `SELECT ServerID FROM ServerConfig WHERE ServerID = ${guild.id}`;
    con.query(sql1, function (err, result) {
      if (err) throw err;
      const ServerID = result[0].ServerID;
      console.log("Configurações localizadas com sucesso!");

    if(!ServerID){
    var sql2 = `INSERT INTO ServerConfig (ServerID, Prefix) VALUES (${guild.id}, '${PrefixDefault}')`;

    con.query(sql2, function (err, result) {
      if (err) throw err;
      console.log("Configurações inseridas com sucesso!");
    });
  
        let botavatar = bot.user.displayAvatarURL;
        let configembed = new Discord.RichEmbed()
        .setThumbnail(botavatar)
                .addField(`**CONFIGURAÇÕES:**`, `Para me configurar você deve utilizar o comando *${PrefixDefault}configurar *!`, true)
                .addField(`**ANT-INVITE:**`, `Por padrão o ant-invite já vem ativado, veja como desativar utilizando *${OldPrefix}configurar*!`, true)
                .addField(`**ATENÇÃO:**`, `*Coloque o cargo* ***OGLLE.COM.BR*** *(ou outro cargo em que o BOT esteja) em cima de todos para que o BOT funcione corretamente!*`)
                .addField(`**SUPORTE:**`, `Caso precise de ajuda você pode entrar em contato [clicando aqui](https://oglle.com.br/)!`, true)
        guild.owner.send(configembed)

  }else{
    var sql3 = `SELECT Prefix FROM ServerConfig WHERE ServerID = ${guild.id}`;
    con.query(sql3, function (err, result) {
      if (err) throw err;
      const OldPrefix = result[0].Prefix;
      console.log("Configurações localizadas com sucesso!");

        let botavatar = bot.user.displayAvatarURL;
        let configembed = new Discord.RichEmbed()
        .setThumbnail(botavatar)
                .addField(`**ATENÇÃO:**`, `Hey, parece que eu já entrei no seu servidor antes, se você quiser resetar as consigurações digite *${OldPrefix}configurar reset ${guild.id}*!`, true)
                .addField(`**CONFIGURAÇÕES:**`, `Para me configurar você deve utilizar o comando *${OldPrefix}configurar*!`, true)
                .addField(`**ATENÇÃO:**`, `*Coloque o cargo* ***OGLLE.COM.BR*** *(ou outro cargo em que o BOT esteja) em cima de todos para que o BOT funcione corretamente!*`)
                .addField(`**ANT-INVITE:**`, `Por padrão o ant-invite já vem ativado, veja como desativar utilizando *${OldPrefix}configurar*!`, true)
                .addField(`**SUPORTE:**`, `Caso precise de ajuda você pode entrar em contato [clicando aqui](https://oglle.com.br/)!`, true)
        guild.owner.send(configembed)
    })
  }
      });
});
//_________________________________________________________SISTEMA PREFIX FIM___________________________________________________
//_________________________________________________________ENTRADA___________________________________________________
bot.on('guildMemberAdd', async member => {
  var sql = `SELECT CanalEntrada, Prefix, CargoPadrao, VerificarMensagem, VerificarCanal, VerificarCargo, NotificacaoMensagem, NotificacaoCanal, NotificacaoCargo from ServerConfig WHERE ServerID = ${member.guild.id}`;

  con.query(sql, function (err, result, fields) {
    if (err) throw err;
    const Canal = result[0].CanalEntrada;
    const Prefix = result[0].Prefix;
    const CargoPadrao = result[0].CargoPadrao;
    const VerificarMensagem = result[0].VerificarMensagem;
    const VerificarCanal = result[0].VerificarCanal;
    const VerificarCargo = result[0].VerificarCargo;
    const NotificacaoMensagem = result[0].NotificacaoMensagem;
    const NotificacaoCanal = result[0].NotificacaoCanal;
    const NotificacaoCargo = result[0].NotificacaoCargo;
    console.log(`Canal localizado com sucesso!`);

    let CanalSend = member.guild.channels.find(c => c.id == Canal)
        let welcomeEmbed = new Discord.RichEmbed();

                welcomeEmbed.setColor(`RANDOM`)
                welcomeEmbed.setThumbnail(member.displayAvatarURL)
                welcomeEmbed.addField(`**Agora temos ${member.guild.memberCount} membros no servidor!**`, `**Hey ${member} seja bem vind@ ao ${member.guild.name}!**\n\n*Para ver meus comandos use ${Prefix}comandos!*`, false)
                welcomeEmbed.setTimestamp()
                welcomeEmbed.setFooter(`${member.guild.name}`, member.guild.iconURL);

      if(VerificarMensagem != '0'){
        if(VerificarCargo != '0'){
          if(VerificarCanal != '0'){
            welcomeEmbed.addField(`**Verifique Sua Conta:**`, `Verifique sua conta no canal <#${VerificarCanal}>`)
          }
        }
      }
      if(NotificacaoMensagem != '0'){
        if(NotificacaoCargo != '0'){
          if(NotificacaoCanal != '0'){
            welcomeEmbed.addField(`**Quer Receber Notificações Deste Servidor?**`, `Verifique o canal <#${NotificacaoCanal}>`)
          }
        }
      }
      if(CargoPadrao != '0'){
            var RoleDefault = member.guild.roles.find('id', `${CargoPadrao}`);
            member.addRole(RoleDefault)
      }
      if(Canal != '0'){
        welcomeEmbed.addField(`**Precisa de um bot para seu servidor?!**`, `[Clique Aqui!](https://oglle.com.br/)`, false)
        CanalSend.send(welcomeEmbed);
      }
    });
});
//_________________________________________________________ENTRADA FIM___________________________________________________
//_________________________________________________________EXECUTAR COMANDO___________________________________________________
bot.on('raw', async dados => {
  if(dados.t == "MESSAGE_REACTION_ADD" || dados.t == "MESSAGE_REACTION_REMOVE"){
    const GuildaID = dados.d.guild_id;
  
  var sqlverificar = `SELECT VerificarCargo, VerificarMensagem FROM ServerConfig WHERE ServerID = ${GuildaID}`;

    con.query(sqlverificar, function (err, result, fields) {
      if (err) throw err;
      const VerificarCargo = result[0].VerificarCargo;
      const VerificarMensagem = result[0].VerificarMensagem;
      console.log(`Configurações de verificação localizadas com sucesso!`);

      if(VerificarCargo == 0) return
      if(VerificarMensagem == 0) return
      if(dados.t !== "MESSAGE_REACTION_ADD" && dados.t !== "MESSAGE_REACTION_REMOVE") return
      if(dados.d.message_id != `${VerificarMensagem}`) return

      let servidor = bot.guilds.get(dados.d.guild_id)
      const member = servidor.members.get(dados.d.user_id);

      if(dados.t === "MESSAGE_REACTION_ADD"){
          if(dados.d.emoji.name === "✅"){
              if(member.roles.has(VerificarCargo)) return
              member.addRole(VerificarCargo)
          }
      }
      if(dados.t === "MESSAGE_REACTION_REMOVE"){
          if(dados.d.emoji.name === "✅"){
              member.removeRole(VerificarCargo)
          }
      }
    })
      }
    })

    bot.on('raw', async dados => {
      if(dados.t == "MESSAGE_REACTION_ADD" || dados.t == "MESSAGE_REACTION_REMOVE"){
        const GuildaID = dados.d.guild_id;
      
      var sqlnotificar = `SELECT NotificacaoCargo, NotificacaoMensagem FROM ServerConfig WHERE ServerID = ${GuildaID}`;
    
        con.query(sqlnotificar, function (err, result, fields) {
          if (err) throw err;
          const NotificacaoCargo = result[0].NotificacaoCargo;
          const NotificacaoMensagem = result[0].NotificacaoMensagem;
          console.log(`Configurações de verificação localizadas com sucesso!`);
    
          if(NotificacaoCargo == 0) return
          if(NotificacaoMensagem == 0) return
          if(dados.t !== "MESSAGE_REACTION_ADD" && dados.t !== "MESSAGE_REACTION_REMOVE") return
          if(dados.d.message_id != `${NotificacaoMensagem}`) return
    
          let servidor = bot.guilds.get(dados.d.guild_id)
          const member = servidor.members.get(dados.d.user_id);
    
          if(dados.t === "MESSAGE_REACTION_ADD"){
              if(dados.d.emoji.name === "🔔"){
                  if(member.roles.has(NotificacaoCargo)) return
                  member.addRole(NotificacaoCargo)
              }
          }
          if(dados.t === "MESSAGE_REACTION_REMOVE"){
              if(dados.d.emoji.name === "🔔"){
                  member.removeRole(NotificacaoCargo)
              }
          }
        })
          }
        })

bot.on("message", async message => {
  if(message.channel.type == 'dm') return;
  var sql1 = `SELECT CanalComando, Prefix, Invites, SugestaoCanal FROM ServerConfig WHERE ServerID = ${message.guild.id}`;

    con.query(sql1, function (err, result, fields) {
      if (err) throw err;
      const Canal = result[0].CanalComando;
      const prefix = result[0].Prefix;
      const Invites = result[0].Invites;
      const SugestaoCanal = result[0].SugestaoCanal;
      console.log(`Canal e Prefix localizado com sucesso!`);

      if(message.content.includes("discord.gg/")) {
        if(Invites == 1){
          message.delete().catch();
          if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`Hey ${message.author}, você não pode enviar links de outros servidores aqui!`)
        }
      }

      if(SugestaoCanal !== '0'){
        if (message.channel.id === `${SugestaoCanal}`) {
          message.react('👍')
              .then(() => { 
                  message.react('👎')
              });
      }
      }

if(Canal == 0){
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;
  if (message.author.bot) return
  if(!message.content.startsWith(prefix)) return;

  let messageArray = message.content.split(" ");
  const args = message.content.slice(prefix.length).trim().split(/ +/g)
  const cmd = args.shift().toLowerCase();
  const comandosfile = bot.comandos.get(cmd);
  comandosfile.run(bot, message, args, message.guild);
}else{
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;
  if (message.author.bot) return
  if(!message.content.startsWith(prefix)) return;
  //if (message.channel.id !== `${comandos}`) return message.channel.send(`Hey ${message.author} você só pode executar este comando no canal <#${comandos}>`)

  let messageArray = message.content.split(" ");
  const args = message.content.slice(prefix.length).trim().split(/ +/g)
  const cmd = args.shift().toLowerCase();
  const comandosfile = bot.comandos.get(cmd);
    if(comandosfile.help.adm) {
        comandosfile.run(bot, message, args, message.guild)
        return;
    } else {
        if(message.channel.id !== Canal) {
          message.delete().catch();
          message.channel.send(`Hey ${message.author} você só pode executar este comando no canal <#${Canal}>`)
          return;
        }
      comandosfile.run(bot, message, args);
      }
  }
});
});
//_________________________________________________________EXECUTAR COMANDO FIM___________________________________________________

fs.readdir("./comandos/", (err, files) => {

  if(err) console.log(err);
  let jsfile = files.filter(f => f.split(".").pop() === "js")
  if(jsfile.length <= 0){
    console.log("Não consegui procurar por comandos!");
    return;
  }

  jsfile.forEach((f, i) =>{
    let props = require(`./comandos/${f}`);
    console.log(`${f} carregado!`);
    bot.comandos.set(props.help.name, props);
  });
});
//_________________________________________________________TOKEN___________________________________________________
bot.login(botconfig.token);
//_________________________________________________________TOKEN FIM___________________________________________________