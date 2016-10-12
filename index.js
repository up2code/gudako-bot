const Discord = require('discord.js');
const Chance = require('chance')
const _ = require('lodash')
const servants = require('./res/servants')
const config = require('./config')

const client = new Discord.Client();
const chance = new Chance()

client.on('ready', () => {
  console.log('I am ready!');
});

client.on('message', message => {

    command(message,/^(ไ|ใ)ข่?กา+ชา+/,['ทะด๊าา~','ง่อววววว','สวยงาม','ตู้หูว!'],function(ans){
      
      if(isSheLazy()) {
        message.channel.sendMessage(chance.pickone(["เหนื่อย พักแปป","ไม่ ขี้เกียจ","กาวแปป //ซู๊ดดดดดด"]))  
      } else {
        var resultMessage = randomGachaNumber(config.numberOfRoll);
        message.channel.sendMessage(ans+'\n'+resultMessage)
      }
      
    })

    command(message,/(ดู|เสิจ|ขอดู)?เซอร?์?เวนท?์?\s/,['หาแปป','แปปนะ','เค'],function(ans){
      var s = findServant(message.content.split(' ')[1])
      message.channel.sendMessage('id :'+s.id+'\nชื่อ : '+s.name+'\nลิงค์ดูเพิ่มเติม'+s.url)
    })

    _.each(config.bot.chats,function(v){
        command(message,v.match,v.answers)
    })

});

client.login(config.bot.token);

//////////////////////////////
function findServant(search) {
    return servants.find(function(s){ return s.alias.indexOf(search)>-1 });
}

function command(message,match,anwsers,callback) {

    if(message.author.bot)
      return;

    var regexp = new RegExp(match)

    if(regexp.test(message.content)) {
        var ans = chance.pickone(anwsers)

        if(callback===undefined)
          message.channel.sendMessage(ans)
        else
          callback(ans)
    }
}

function isSheLazy() {
  return chance.bool({likelihood:5})
}

function randomGachaNumber(count) {
    var result = ''
    for(var r=0;r<count;r++) {
      var g = randomGacha(config.gachaRate)
      result += (r+1)+' :'+g.name+'\n'
    }
    return result;
}

function randomGacha(box) {
    var chance = new Chance()
    var result = chance.floating({min: 0, max: 100})
    return box.sort(function(a,b){ return a.rate - b.rate})
                    .find(function(s){ return result<=s.rate })
}


