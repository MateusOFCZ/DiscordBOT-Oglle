const Discord = require("discord.js");
const tz = require("moment-timezone")
const moment = require("moment")
require("moment-duration-format")
moment.locale('pt-BR')
const mysql = require('mysql');
let PrefixDefault = 'o!';

const con = mysql.createConnection({
  host     : '213.190.6.127',
  user     : 'u810777998_botbasico',
  password : 'aezakmi4751',
  database : 'u810777998_botbasico'
});

module.exports.run = async (bot, message, args, guild) => {
    if (message.author.id !== message.guild.owner.id) return message.channel.send("> Você não tem permissão para usar esse comando!");
    var sql = `SELECT Prefix, CanalAvisos FROM ServerConfig WHERE ServerID = ${message.guild.id}`;
    //var sql = `SELECT Prefix, CanalAvisos, CanalEntrada, CanalComandos, CargoPadrao, Notificacao, Verificacao FROM ServerConfig WHERE ServerID = ${message.guild.id}`;
  
  con.query(sql, function (err, result, fields) {
    if (err) throw err;
    const prefix = result[0].Prefix;
    const canalavisos = result[0].CanalAvisos;
    console.log(`Configurações localizadas com sucesso!`);

    if (!args[0]) {
      let listaembed = new Discord.RichEmbed()
      .setColor(`RANDOM`)
      .setThumbnail(message.guild.iconURL)
      .setDescription(`**Hey ${message.author} essas são as opções que você pode configurar:**`)
      .addField(`> **IMPORTANTE:** `, `Coloque o cargo "OGLLE.COM.BR" acima de todos, para que tudo funcione corretamente!\nPara desabilitar uma configuração utilize *${prefix}configurar [CONFIGURAÇÃO]* ***não***!`)
      .addField(`> **Prefix:** `, `Utilizado para executar os comandos.\n*${prefix}configurar prefix [PREFIX]*`)
      .addField(`> **Alertas:** `, `Canal onde será enviado avisos quando houver divulgação de servidores, banimentos e expulsões.\n*${prefix}configurar alertas* ***sim*** *[MENCIONE O CANAL]*`)
      .addField(`> **Entrada:** `, `Canal onde será enviado mensagem de boas vindas.\n*${prefix}configurar entrada* ***sim*** *[MENCIONE O CANAL]*`)
      .addField(`> **Comandos:** `, `Canal onde será possível executar comandos.\n*${prefix}configurar comandos* ***sim*** *[MENCIONE O CANAL]*`)
      .addField(`> **Cargo Padrão:** `, `Cargo que será setado aos novos membros.*\n*${prefix}configurar cargo* ***sim*** *[MENCIONE O CARGO]*`)
      .addField(`> **Cargo Verificado**`, `Serve para dar cargo ao usuário que reagir a uma mensagem.\n*${prefix}configurar verificação* ***sim*** *[ID DA MENSAGEM] [MENCIONE O CANAL ONDE ESTÁ A MENSAGEM] [MENCIONE O CARGO]*`)
      .addField(`> **Cargo Notificações:** `, `Cargo que será entregue ao usuário reagir a uma mensagem, o cargo DEVE ser utilizado para substituir as menções *@here* e *@everyone*.\n*${prefix}configurar notificação* ***sim*** *[ID DA MENSAGEM] [MENCIONE O CANAL ONDE ESTÁ A MENSAGEM] [MENCIONE O CARGO]*`)
      .addField(`> **Anti-Invite:** `, `Caso esteja ativado os usuários não conseguirão enviar convites de outros servidores (usuários com permissão de administrador não serão afetados).\n*${prefix}configurar anti-invite* ***sim/não***`)
      .addField(`> **Sugestões:**`, `Canal onde os usuários irão enviar sugestões, se configurado ao enviar uma mensagem no canal será adicionado as reações "\👍" e "\👎"!\n*${prefix}configurar sugestão ***sim*** *[MENCIONE O CANAL]*`)
      .addField(`> **Atualizar Database:** `, `Utilizado para atualizar a database do seu servidor.\n*${prefix}configurar atualizar*`)
      .addField(`> **Resetar Database:**`, `Utilizado para resetar a database para os padrões.\n*${prefix}consigurar reset* ***${guild.id}***`)
  
    message.delete().catch();
    message.author.send(listaembed);
    }

    if(args[0] == "prefix"){
      let NewPrefix = args[1];
      var sqlNewPrefix = `UPDATE ServerConfig SET Prefix = '${NewPrefix}' WHERE ServerID = '${message.guild.id}'`;
        con.query(sqlNewPrefix, function (err, result) {
          if (err) throw err;
          console.log(`Configurações atualizadas com sucesso!`);
          });

          let atualizarprefix = new Discord.RichEmbed()
          .setColor(`#2bff00`)
          .setThumbnail(message.guild.iconURL)
          .setDescription(`**CONFIGURAÇÕES ATUALIZADAS**`)
          .addField(`**Configuração:**`, `*Prefix*`)
          .addField(`**Estado:**`, `*Atualizado*`)
          .addField(`**Autor:**`, `*${message.author.username}*`)
          .addField(`**Novo Prefix:**`, `${NewPrefix}`)

          message.delete().catch();
          if(canalavisos == 0){
          message.author.send(atualizarprefix);
          }else{
            message.author.send(atualizarprefix);
            message.guild.channels.get(canalavisos).send(atualizarprefix);
          }
    }
    if(args[0] == "alertas"){
      if(args[1] == "sim"){
        let NewAvisos = message.mentions.channels.first();
        var sqlavisos1 = `UPDATE ServerConfig SET CanalAvisos = '${NewAvisos.id}' WHERE ServerID = '${message.guild.id}'`;
        con.query(sqlavisos1, function (err, result) {
          if (err) throw err;
          console.log(`Configurações atualizadas com sucesso!`);
          });

          let canalalertassim = new Discord.RichEmbed()
          .setColor(`#2bff00`)
          .setThumbnail(message.guild.iconURL)
          .setDescription(`**CONFIGURAÇÕES ATUALIZADAS**`)
          .addField(`**Configuração:**`, `*Canal Alertas*`)
          .addField(`**Estado:**`, `*Atualizado*`)
          .addField(`**Autor:**`, `*${message.author.username}*`)
          .addField(`**Novo Canal Avisos ID:**`, `${NewAvisos.id}`)

          message.delete().catch();
          message.guild.channels.get(NewAvisos.id).send(canalalertassim);
          message.author.send(canalalertassim);
      }
      if(args[1] == "não"){
        var sqlavisos2 = `UPDATE ServerConfig SET CanalAvisos = '0' WHERE ServerID = '${message.guild.id}'`;
        con.query(sqlavisos2, function (err, result) {
          if (err) throw err;
          console.log(`Configurações atualizadas com sucesso!`);
          });

          let canalalertasnao = new Discord.RichEmbed()
          .setColor(`#ff0000`)
          .setThumbnail(message.guild.iconURL)
          .setDescription(`**CONFIGURAÇÕES ATUALIZADAS**`)
          .addField(`**Configuração:**`, `*Canal Alertas*`)
          .addField(`**Estado:**`, `*Desabilitado*`)
          .addField(`**Autor:**`, `*${message.author.username}*`)

          message.delete().catch();
          message.author.send(canalalertasnao);
      }
    }
    if(args[0] == "entrada"){
      if(args[1] == "sim"){
        let NewEntrada = message.mentions.channels.first();
        var sqlentrada1 = `UPDATE ServerConfig SET CanalEntrada = '${NewEntrada.id}' WHERE ServerID = '${message.guild.id}'`;
        con.query(sqlentrada1, function (err, result) {
          if (err) throw err;
          console.log(`Configurações atualizadas com sucesso!`);
          });

          let canalentradasim = new Discord.RichEmbed()
          .setColor(`#2bff00`)
          .setThumbnail(message.guild.iconURL)
          .setDescription(`**CONFIGURAÇÕES ATUALIZADAS**`)
          .addField(`**Configuração:**`, `*Canal Entrada*`)
          .addField(`**Estado:**`, `*Atualizado*`)
          .addField(`**Autor:**`, `*${message.author.username}*`)
          .addField(`**Novo Canal Entrada ID:**`, `${NewEntrada.id}`)

          message.delete().catch();
          if(canalavisos == 0){
          message.author.send(canalentradasim);
          }else{
            message.author.send(canalentradasim);
            message.guild.channels.get(canalavisos).send(canalentradasim);
          }
      }
      if(args[1] == "não"){
        var sqlentrada2 = `UPDATE ServerConfig SET CanalEntrada = '0' WHERE ServerID = '${message.guild.id}'`;
        con.query(sqlentrada2, function (err, result) {
          if (err) throw err;
          console.log(`Configurações atualizadas com sucesso!`);
          });

          let canalentradanao = new Discord.RichEmbed()
          .setColor(`#ff0000`)
          .setThumbnail(message.guild.iconURL)
          .setDescription(`**CONFIGURAÇÕES ATUALIZADAS**`)
          .addField(`**Configuração:**`, `*Canal Entrada*`)
          .addField(`**Estado:**`, `*Desabilitado*`)
          .addField(`**Autor:**`, `*${message.author.username}*`)

          message.delete().catch();
          if(canalavisos == 0){
          message.author.send(canalentradanao);
          }else{
            message.author.send(canalentradanao);
            message.guild.channels.get(canalavisos).send(canalentradanao);
          }
      }
    }
    if(args[0] == "comandos"){
      if(args[1] == "sim"){
        let NewComando = message.mentions.channels.first();
        var sqlcomando1 = `UPDATE ServerConfig SET CanalComando = '${NewComando.id}' WHERE ServerID = '${message.guild.id}'`;
        con.query(sqlcomando1, function (err, result) {
          if (err) throw err;
          console.log(`Configurações atualizadas com sucesso!`);
          });

          let canalcomandosim = new Discord.RichEmbed()
          .setColor(`#2bff00`)
          .setThumbnail(message.guild.iconURL)
          .setDescription(`**CONFIGURAÇÕES ATUALIZADAS**`)
          .addField(`**Configuração:**`, `*Canal Comando*`)
          .addField(`**Estado:**`, `*Atualizado*`)
          .addField(`**Autor:**`, `*${message.author.username}*`)
          .addField(`**Novo Canal Comando ID:**`, `${NewComando.id}`)

          message.delete().catch();
          if(canalavisos == 0){
          message.author.send(canalcomandosim);
          }else{
            message.author.send(canalcomandosim);
            message.guild.channels.get(canalavisos).send(canalcomandosim);
          }
      }
      if(args[1] == "não"){
        var sqlcomando2 = `UPDATE ServerConfig SET CanalComando = '0' WHERE ServerID = '${message.guild.id}'`;
        con.query(sqlcomando2, function (err, result) {
          if (err) throw err;
          console.log(`Configurações atualizadas com sucesso!`);
          });

          let canalcomandonao = new Discord.RichEmbed()
          .setColor(`#ff0000`)
          .setThumbnail(message.guild.iconURL)
          .setDescription(`**CONFIGURAÇÕES ATUALIZADAS**`)
          .addField(`**Configuração:**`, `*Canal Comando*`)
          .addField(`**Estado:**`, `*Desabilitado*`)
          .addField(`**Autor:**`, `*${message.author.username}*`)

          message.delete().catch();
          if(canalavisos == 0){
          message.author.send(canalcomandonao);
          }else{
            message.author.send(canalcomandonao);
            message.guild.channels.get(canalavisos).send(canalcomandonao);
          }
      }
    }
    if(args[0] == "cargo"){
      if(args[1] == "sim"){
        let NewCargo = message.mentions.roles.first();
        var sqlcargo1 = `UPDATE ServerConfig SET CargoPadrao = '${NewCargo.id}' WHERE ServerID = '${message.guild.id}'`;
        con.query(sqlcargo1, function (err, result) {
          if (err) throw err;
          console.log(`Configurações atualizadas com sucesso!`);
          });

          let cargosim = new Discord.RichEmbed()
          .setColor(`#2bff00`)
          .setThumbnail(message.guild.iconURL)
          .setDescription(`**CONFIGURAÇÕES ATUALIZADAS**`)
          .addField(`**Configuração:**`, `*Cargo Padrão*`)
          .addField(`**Estado:**`, `*Atualizado*`)
          .addField(`**Autor:**`, `*${message.author.username}*`)
          .addField(`**Novo Cargo Padrão ID:**`, `${NewCargo.id}`)

          message.delete().catch();
          if(canalavisos == 0){
          message.author.send(cargosim);
          }else{
            message.author.send(cargosim);
            message.guild.channels.get(canalavisos).send(cargosim);
          }
      }
      if(args[1] == "não"){
        var sqlcargo2 = `UPDATE ServerConfig SET CargoPadrao = '0' WHERE ServerID = '${message.guild.id}'`;
        con.query(sqlcargo2, function (err, result) {
          if (err) throw err;
          console.log(`Configurações atualizadas com sucesso!`);
          });

          let cargonao = new Discord.RichEmbed()
          .setColor(`#ff0000`)
          .setThumbnail(message.guild.iconURL)
          .setDescription(`**CONFIGURAÇÕES ATUALIZADAS**`)
          .addField(`**Configuração:**`, `*Cargo Padrão*`)
          .addField(`**Estado:**`, `*Desabilitado*`)
          .addField(`**Autor:**`, `*${message.author.username}*`)

          message.delete().catch();
          if(canalavisos == 0){
          message.author.send(cargonao);
          }else{
            message.author.send(cargonao);
            message.guild.channels.get(canalavisos).send(cargonao);
          }
      }
    }
    if(args[0] == "verificação"){
      if(args[1] == "sim"){
        let NewMensagem = args[2];
        let NewCanalVerificacao = message.mentions.channels.first();
        let NewCargoVerificacao = message.mentions.roles.first();

        var sqlverificar1 = `UPDATE ServerConfig SET VerificarMensagem = '${NewMensagem}', VerificarCanal = '${NewCanalVerificacao.id}', VerificarCargo = '${NewCargoVerificacao.id}' WHERE ServerID = '${message.guild.id}'`;
        con.query(sqlverificar1, function (err, result) {
          if (err) throw err;
          console.log(`Configurações atualizadas com sucesso!`);
          });

          let verificacaosim = new Discord.RichEmbed()
          .setColor(`#2bff00`)
          .setThumbnail(message.guild.iconURL)
          .setDescription(`**CONFIGURAÇÕES ATUALIZADAS**`)
          .addField(`**Configuração:**`, `*Cargo Verificado*`)
          .addField(`**Estado:**`, `*Atualizado*`)
          .addField(`**Autor:**`, `*${message.author.username}*`)
          .addField(`**Cargo Verificação ID:**`, `*${NewCargoVerificacao.id}*`)
          .addField(`**Mensagem Da Reação ID:**`, `*${NewMensagem}*`)
          .addField(`**Canal Da Reação ID:**`, `*${NewCanalVerificacao.id}*`)

          message.delete().catch();
          if(canalavisos == 0){
            message.author.send(verificacaosim);
          }else{
            message.author.send(verificacaosim);
            message.guild.channels.get(canalavisos).send(verificacaosim);
          }
      }
      if(args[1] == "não"){

        var sqlverificar1 = `UPDATE ServerConfig SET VerificarMensagem = '0', VerificarCanal = '0', VerificarCargo = '0' WHERE ServerID = '${message.guild.id}'`;
        con.query(sqlverificar1, function (err, result) {
          if (err) throw err;
          console.log(`Configurações atualizadas com sucesso!`);
          });

          let verificacaonao = new Discord.RichEmbed()
          .setColor(`#ff0000`)
          .setThumbnail(message.guild.iconURL)
          .setDescription(`**CONFIGURAÇÕES ATUALIZADAS**`)
          .addField(`**Configuração:**`, `*Cargo Notificações*`)
          .addField(`**Estado:**`, `*Desabilitado*`)
          .addField(`**Autor:**`, `*${message.author.username}*`)

          message.delete().catch();
          if(canalavisos == 0){
          message.author.send(verificacaonao);
          }else{
            message.author.send(verificacaonao);
            message.guild.channels.get(canalavisos).send(verificacaonao);
          }
      }
    }
    
    if(args[0] == "notificação"){
      if(args[1] == "sim"){
        let NewMensagem = args[2];
        let NewCanalNotificacao = message.mentions.channels.first();
        let NewCargoNotificacao = message.mentions.roles.first();

        var sqlnotificacao1 = `UPDATE ServerConfig SET NotificacaoMensagem = '${NewMensagem}', NotificacaoCanal = '${NewCanalNotificacao.id}', NotificacaoCargo = '${NewCargoNotificacao.id}' WHERE ServerID = '${message.guild.id}'`;
        con.query(sqlnotificacao1, function (err, result) {
          if (err) throw err;
          console.log(`Configurações atualizadas com sucesso!`);
          });

          let notificacaosim = new Discord.RichEmbed()
          .setColor(`#2bff00`)
          .setThumbnail(message.guild.iconURL)
          .setDescription(`**CONFIGURAÇÕES ATUALIZADAS**`)
          .addField(`**Configuração:**`, `*Cargo Notificação*`)
          .addField(`**Estado:**`, `*Atualizado*`)
          .addField(`**Autor:**`, `*${message.author.username}*`)
          .addField(`**Cargo Notificação ID:**`, `*${NewCargoNotificacao.id}*`)
          .addField(`**Mensagem Da Reação ID:**`, `*${NewMensagem}*`)
          .addField(`**Canal Da Reação ID:**`, `*${NewCanalNotificacao.id}*`)

          message.delete().catch();
          if(canalavisos == 0){
            message.author.send(notificacaosim);
          }else{
            message.author.send(notificacaosim);
            message.guild.channels.get(canalavisos).send(notificacaosim);
          }
      }
      if(args[1] == "não"){

        var sqlverificar1 = `UPDATE ServerConfig SET NotificacaoMensagem = '0', NotificacaoCanal = '0', NotificacaoCargo = '0' WHERE ServerID = '${message.guild.id}'`;
        con.query(sqlverificar1, function (err, result) {
          if (err) throw err;
          console.log(`Configurações atualizadas com sucesso!`);
          });

          let notificacaonao = new Discord.RichEmbed()
          .setColor(`#ff0000`)
          .setThumbnail(message.guild.iconURL)
          .setDescription(`**CONFIGURAÇÕES ATUALIZADAS**`)
          .addField(`**Configuração:**`, `*Cargo Notificações*`)
          .addField(`**Estado:**`, `*Desabilitado*`)
          .addField(`**Autor:**`, `*${message.author.username}*`)

          message.delete().catch();
          if(canalavisos == 0){
          message.author.send(notificacaonao);
          }else{
            message.author.send(notificacaonao);
            message.guild.channels.get(canalavisos).send(notificacaonao);
          }
      }
    }
    
    if(args[0] == "anti-invite"){
      if(args[1] == "sim"){
        var sqlinvite1 = `UPDATE ServerConfig SET Invites = '1' WHERE ServerID = '${message.guild.id}'`;
        con.query(sqlinvite1, function (err, result) {
          if (err) throw err;
          console.log(`Configurações atualizadas com sucesso!`);
          });

          let invitesim = new Discord.RichEmbed()
          .setColor(`#2bff00`)
          .setThumbnail(message.guild.iconURL)
          .setDescription(`**CONFIGURAÇÕES ATUALIZADAS**`)
          .addField(`**Configuração:**`, `*Anti-Invite*`)
          .addField(`**Estado:**`, `*Habilitado*`)
          .addField(`**Autor:**`, `*${message.author.username}*`)

          message.delete().catch();
          if(canalavisos == 0){
          message.author.send(invitesim);
          }else{
            message.author.send(invitesim);
            message.guild.channels.get(canalavisos).send(invitesim);
          }
      }
      if(args[1] == "não"){
        var sqlinvite2 = `UPDATE ServerConfig SET Invites = '0' WHERE ServerID = '${message.guild.id}'`;
        con.query(sqlinvite2, function (err, result) {
          if (err) throw err;
          console.log(`Configurações atualizadas com sucesso!`);
          });

          let invitenao = new Discord.RichEmbed()
          .setColor(`#ff0000`)
          .setThumbnail(message.guild.iconURL)
          .setDescription(`**CONFIGURAÇÕES ATUALIZADAS**`)
          .addField(`**Configuração:**`, `*Anti-Invite*`)
          .addField(`**Estado:**`, `*Desabilitado*`)
          .addField(`**Autor:**`, `*${message.author.username}*`)

          message.delete().catch();
          if(canalavisos == 0){
          message.author.send(invitenao);
          }else{
            message.author.send(invitenao);
            message.guild.channels.get(canalavisos).send(invitenao);
          }
      }
    }
    if(args[0] == "atualizar"){
      message.delete().catch();
      message.channel.send(`> Hey ${message.author}, a database deste servidor já está atualizada!`)
    }
    if(args[0] == "reset"){
      message.delete().catch();
      if(!args[1]){
        message.channel.send(`> Hey ${message.author}, você precisa colocar o ID do servidor!\n> Utilize *${prefix}configurar reset* ***${message.guild.id}***!`)
      }
      if(args[1] == `${message.guild.id}`){
        var sqlreset1 = `UPDATE ServerConfig SET EMail = NULL, Senha = NULL, ServerID = '${message.guild.id}', Prefix = 'o!', CanalComando = '0', CanalEntrada = '0', CanalAvisos = '0', CargoPadrao = '0', ServerOnlines = '0', ServerOcupados = '0', ServerAusentes = '0', ServerOfflines = '0', ServerBots = '0', ServerCanaisTexto = '0', ServerCanaisVoz = '0', PainelAtivado = '0', Plano = '0', Verificacao = '0', Invites = '1', VerificarMensagem = '0', VerificarCargo = '0', NotificacaoMensagem = '0', NotificacaoCargo = '0' WHERE ServerID = '${message.guild.id}'`;
        con.query(sqlreset1, function (err, result) {
          if (err) throw err;
          console.log(`Configurações resetadas com sucesso!`);
          });
          message.channel.send(`> Hey ${message.author}, você resetou as configurações com sucesso!\n> Caso queira fazer as configurações utilize *${PrefixDefault}configurar*!\n> Lembre-se que o ant-invite está ativado por padrão!\n> O Prefix foi alterado para o padrão, para ver os comandos utilize *${PrefixDefault}comandos*!\n> Você pode conferir as informações do servidor usando *${PrefixDefault}serverinfo*!\n> **ATENÇÃO:** *Coloque o cargo* ***OGLLE.COM.BR*** *(ou outro cargo em que o BOT esteja) em cima de todos para que o BOT funcione corretamente!*`)
      }
    }
    if(args[0] == "sugestão"){
      if(args[1] == "sim"){
        let NewCanalSugestao = message.mentions.channels.first();

        var sqlsugestao1 = `UPDATE ServerConfig SET SugestaoCanal = '${NewCanalSugestao.id}' WHERE ServerID = '${message.guild.id}'`;
        con.query(sqlsugestao1, function (err, result) {
          if (err) throw err;
          console.log(`Configurações atualizadas com sucesso!`);
          });

          let sugestaosim = new Discord.RichEmbed()
          .setColor(`#2bff00`)
          .setThumbnail(message.guild.iconURL)
          .setDescription(`**CONFIGURAÇÕES ATUALIZADAS**`)
          .addField(`**Configuração:**`, `*Sugestões*`)
          .addField(`**Estado:**`, `*Atualizado*`)
          .addField(`**Autor:**`, `*${message.author.username}*`)
          .addField(`**Canal Da Reação ID:**`, `*${NewCanalSugestao.id}*`)

          message.delete().catch();
          if(canalavisos == 0){
            message.author.send(sugestaosim);
          }else{
            message.author.send(sugestaosim);
            message.guild.channels.get(canalavisos).send(sugestaosim);
          }
      }
      if(args[1] == "não"){
        var sqlsugestao2 = `UPDATE ServerConfig SET SugestaoCanal = '0' WHERE ServerID = '${message.guild.id}'`;
        con.query(sqlsugestao2, function (err, result) {
          if (err) throw err;
          console.log(`Configurações atualizadas com sucesso!`);
          });

          let sugestaonao = new Discord.RichEmbed()
          .setColor(`#ff0000`)
          .setThumbnail(message.guild.iconURL)
          .setDescription(`**CONFIGURAÇÕES ATUALIZADAS**`)
          .addField(`**Configuração:**`, `*Sugestões*`)
          .addField(`**Estado:**`, `*Desabilitado*`)
          .addField(`**Autor:**`, `*${message.author.username}*`)

          message.delete().catch();
          if(canalavisos == 0){
          message.author.send(sugestaonao);
          }else{
            message.author.send(sugestaonao);
            message.guild.channels.get(canalavisos).send(sugestaonao);
          }
      }
    }

  })
   }
  
module.exports.help = {
    name: "configurar",
    adm: true
}