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
  message.guild = guild;
    if (!message.author.id === message.guild.owner.id) return message.channel.send("> Você não tem permissão para usar esse comando!");

    var sql = `SELECT CanalComando, Prefix from ServerConfig WHERE ServerID = ${message.guild.id}`;

        con.query(sql, function (err, result, fields) {
          if (err) throw err;
          const PrefixDefault = result[0].Prefix;
          console.log(`Prefix localizado com sucesso!`);
  });
      //Remover Reação Do Autor = reaction.remove(Usuario);
      //Remover Todas As Reações = message.clearReactions();
          let Usuario = message.author;
          let Alterar = null;

          var sql = `SELECT CanalComando, Prefix from ServerConfig WHERE ServerID = ${message.guild.id}`;

        con.query(sql, function (err, result, fields) {
          if (err) throw err;
          const PrefixDefault = result[0].Prefix;
          console.log(`Prefix localizado com sucesso!`);

                      let configurarembed = new Discord.RichEmbed()
                      .setColor(`RANDOM`)
                      .setThumbnail(message.author.displayAvatarURL)
                      .setTitle(`**MENU DE CONFIGURAÇÕES**`)
                      .setDescription(`🟠 **1 Prefix:** *Utilizado para executar os comandos.*\n🔵 **Canal Comando:** *Caso ativo, os comandos não administrativos só poderão ser executados neste canal.*\n🟣 **Canal Entrada:** *Caso ativo, após um usuário entrar no servidor irá mandar uma mensagem para este canal.*\n🟤 **Canal Avisos:** *Caso ativado, todas as ações serão registradas neste canal.*\n⚪ **Cargo Padrão:** *Caso ativado, ao entrar no servidor será dado este cargo para o usuário.*`)

                      let configurar1erroembed = new Discord.RichEmbed()
                      .setColor(`RANDOM`)
                      .setThumbnail(message.author.displayAvatarURL)
                      .setTitle(`**MENU DE CONFIGURAÇÕES**`)
                      .setDescription(`**Configurador:** *${Usuario}*\n**Configuração:** *Prefix: ${Alterar}*\n**Estado De Confirmação:** *Cancelado*`)

                      let configurar2erroembed = new Discord.RichEmbed()
                      .setColor(`RANDOM`)
                      .setThumbnail(message.author.displayAvatarURL)
                      .setTitle(`**MENU DE CONFIGURAÇÕES**`)
                      .setDescription(`**Configurador:** *${Usuario}*\n**Configuração:** *Canal Comando: ${Alterar}*\n**Estado De Confirmação:** *Cancelado*`)

                      let configurar3erroembed = new Discord.RichEmbed()
                      .setColor(`RANDOM`)
                      .setThumbnail(message.author.displayAvatarURL)
                      .setTitle(`**MENU DE CONFIGURAÇÕES**`)
                      .setDescription(`**Configurador:** *${Usuario}*\n**Configuração:** *Canal Entrada: ${Alterar}*\n**Estado De Confirmação:** *Cancelado*`)

                      let configurar4erroembed = new Discord.RichEmbed()
                      .setColor(`RANDOM`)
                      .setThumbnail(message.author.displayAvatarURL)
                      .setTitle(`**MENU DE CONFIGURAÇÕES**`)
                      .setDescription(`**Configurador:** *${Usuario}*\n**Configuração:** *Canal Avisos: ${Alterar}*\n**Estado De Confirmação:** *Cancelado*`)

                      let configurar5erroembed = new Discord.RichEmbed()
                      .setColor(`RANDOM`)
                      .setThumbnail(message.author.displayAvatarURL)
                      .setTitle(`**MENU DE CONFIGURAÇÕES**`)
                      .setDescription(`**Configurador:** *${Usuario}*\n**Configuração:** *Cargo Padrão: ${Alterar}*\n**Estado De Confirmação:** *Cancelado*`)

                      let configurar1confirmarembed = new Discord.RichEmbed()
                      .setColor(`RANDOM`)
                      .setThumbnail(message.author.displayAvatarURL)
                      .setTitle(`**MENU DE CONFIGURAÇÕES**`)
                      .setDescription(`**Configurador:** *${Usuario}*\n**Configuração:** *Prefix: ${Alterar}*\n**Estado De Confirmação:** *Aguardando Confirmação*\n\n🟢**Confirmar** 🔴**Cancelar**`)

                      let configurar2confirmarembed = new Discord.RichEmbed()
                      .setColor(`RANDOM`)
                      .setThumbnail(message.author.displayAvatarURL)
                      .setTitle(`**MENU DE CONFIGURAÇÕES**`)
                      .setDescription(`**Configurador:** *${Usuario}*\n**Configuração:** *Canal Comando: ${Alterar}*\n**Estado De Confirmação:** *Aguardando Confirmação*\n\n🟢**Confirmar** 🔴**Cancelar**`)

                      let configurar3confirmarembed = new Discord.RichEmbed()
                      .setColor(`RANDOM`)
                      .setThumbnail(message.author.displayAvatarURL)
                      .setTitle(`**MENU DE CONFIGURAÇÕES**`)
                      .setDescription(`**Configurador:** *${Usuario}*\n**Configuração:** *Canal Entrada: ${Alterar}*\n**Estado De Confirmação:** *Aguardando Confirmação*\n\n🟢**Confirmar** 🔴**Cancelar**`)

                      let configurar4confirmarembed = new Discord.RichEmbed()
                      .setColor(`RANDOM`)
                      .setThumbnail(message.author.displayAvatarURL)
                      .setTitle(`**MENU DE CONFIGURAÇÕES**`)
                      .setDescription(`**Configurador:** *${Usuario}*\n**Configuração:** *Canal Avisos: ${Alterar}*\n**Estado De Confirmação:** *Aguardando Confirmação*\n\n🟢**Confirmar** 🔴**Cancelar**`)

                      let configurar5confirmarembed = new Discord.RichEmbed()
                      .setColor(`RANDOM`)
                      .setThumbnail(message.author.displayAvatarURL)
                      .setTitle(`**MENU DE CONFIGURAÇÕES**`)
                      .setDescription(`**Configurador:** *${Usuario}*\n**Configuração:** *Cargo Padrão: ${Alterar}*\n**Estado De Confirmação:** *Aguardando Confirmação*\n\n🟢**Confirmar** 🔴**Cancelar**`)

                      let configurar1confirmadoembed = new Discord.RichEmbed()
                      .setColor(`RANDOM`)
                      .setThumbnail(message.author.displayAvatarURL)
                      .setTitle(`**MENU DE CONFIGURAÇÕES**`)
                      .setDescription(`**Configurador:** *${Usuario}*\n**Configuração:** *Prefix: ${Alterar}*\n**Estado De Confirmação:** *Confirmado*`)

                      let configurar2confirmadoembed = new Discord.RichEmbed()
                      .setColor(`RANDOM`)
                      .setThumbnail(message.author.displayAvatarURL)
                      .setTitle(`**MENU DE CONFIGURAÇÕES**`)
                      .setDescription(`**Configurador:** *${Usuario}*\n**Configuração:** *Canal Comando: ${Alterar}*\n**Estado De Confirmação:** *Confirmado*`)

                      let configurar3confirmadoembed = new Discord.RichEmbed()
                      .setColor(`RANDOM`)
                      .setThumbnail(message.author.displayAvatarURL)
                      .setTitle(`**MENU DE CONFIGURAÇÕES**`)
                      .setDescription(`**Configurador:** *${Usuario}*\n**Configuração:** *Canal Entrada: ${Alterar}*\n**Estado De Confirmação:** *Confirmado*`)

                      let configurar4confirmadoembed = new Discord.RichEmbed()
                      .setColor(`RANDOM`)
                      .setThumbnail(message.author.displayAvatarURL)
                      .setTitle(`**MENU DE CONFIGURAÇÕES**`)
                      .setDescription(`**Configurador:** *${Usuario}*\n**Configuração:** *Canal Avisos: ${Alterar}*\n**Estado De Confirmação:** *Confirmado*`)

                      let configurar5confirmadoembed = new Discord.RichEmbed()
                      .setColor(`RANDOM`)
                      .setThumbnail(message.author.displayAvatarURL)
                      .setTitle(`**MENU DE CONFIGURAÇÕES**`)
                      .setDescription(`**Configurador:** *${Usuario}*\n**Configuração:** *Cargo Padrão: ${Alterar}*\n**Estado De Confirmação:** *Confirmado*`)

                      message.channel.send(configurarembed).then(async function(message){
                          await message.react('🟠') // Prefix
                          await message.react('🔵') // Canal Comando
                          await message.react('🟣') // Canal Entrada
                          await message.react('🟤') // Canal Avisos
                          await message.react('⚪') // Cargo Padrão
                          const filter = (r, u) => r.me && u.equals(Usuario)
                          const collector = message.createReactionCollector(filter, { time:60000});
                          collector.on('collect', reaction => {

                          if(reaction.emoji.name == "🟠"){

                              message.clearReactions().then(async function(message){
                                message.delete();
                                let NewPrefix;
                                const msg1 = await message.channel.send(`>>> **Configurador:** *${Usuario}*\n**Configuração:** *Prefix*\n**Estado De Confirmação:** **ENVIE O NOVO PREFIX**`);
                                msg1.channel.awaitMessages(m => m.author.id === message.guild.owner.id, {max: 1, time: 10000}).then(collected => {
                                NewPrefix = collected.first().content;
                                message.delete();
                                msg1.edit(configurar1confirmarembed).then(async function(message){
                                  message.react('🟢')
                                  await message.react('🔴')
                                  const filter = (r, u) => r.me && u.equals(Usuario)
                                  const collector = message.createReactionCollector(filter, { time:60000});
                              collector.on('collect', reaction => {
                                  if(reaction.emoji.name === "🟢"){
                                      message.clearReactions();

                                      var sqlconfigurarupdate1 = `UPDATE ServerConfig SET Prefix = '${NewPrefix}' WHERE ServerID = ${message.guild.id}`;
                                      con.query(sqlconfigurarupdate1, function (err, result, fields) {
                                          if (err) throw err;
                                          console.log(`Prefix atualizado com sucesso!`);
                                      });
                                      msg1.edit(configurar1confirmadoembed);
                                  }
                                  if(reaction.emoji.name === "🔴"){
                                      message.clearReactions();
                                      message.edit(configurar1erroembed);
                                  }
                              });
                          });
                                });
                          })
                          }
                        })
                      })});
                      message.delete().catch();
    }
  
module.exports.help = {
    name:"configurar" && "config",
    adm: true
}