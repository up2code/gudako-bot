const servants = require('./res/servants')
const Discord = require('discord.js');
const client = new Discord.Client();

var config =  {
  'CILENT_ID': '234578567017660416',
  'SECERT': 'My4xfXJ1R5zKc5RkRImDlxmFTZspDyjP',
  'TOKEN': 'MjM0NTc4NTY3MDE3NjYwNDE2.CtuD1A.92--1wVp5wOPVVNaNlx-rTwVLaY'
}


client.on('ready', () => {
  console.log('I am ready!');
});

client.on('message', message => {
  
    command(message,/(ไ|ใ)ข่?กา+ชา+/,['ทะด๊าา~','ง่อววววว','สวยงาม','ตู้หูว!'],function(ans){
      var resultMessage = runGacha();
      message.channel.sendMessage(ans+'\n'+resultMessage)
    })

    command(message,/(ดู|เสิจ|ขอดู)?เซอร?์?เวนท?์?\s/,['หาแปป','แปปนะ','เค'],function(ans){
      var s = findServant(message.content.split(' ')[1])
      message.channel.sendMessage('id :'+s.id+'\nชื่อ : '+s.name+'\nลิงค์ดูเพิ่มเติม'+s.url)
    })      

    command(message,/(ดู|เสิจ|ขอดู)?เซอร?์?เวนท?์?ทั้งหมด/,['หาแปป','แปปนะ','เค'],function(ans){
      var s = servants.reduce(function(c,n){
          return c += '\n' + n.id + ' : [' + n.name + ']('+n.url+')'
      })
      message.channel.sendMessage(s,{split:true})
    })

    command(message,'หวัดดี',['มีกาวเท่าไหร่ส่งมาให้หมด','ดี'])
    command(message,/กุดาโกะ/,['วรั้ย','ขอกาวหน่อย','กาวอยู่ไหน','I am the born of my glue'])
    command(message,/^กา+ว+/,['ซู๊ดดดดดดดดดดดดดดดดด~~','ขออีก','น้อยอ่ะ เอามาอีก'])
    command(message,/^เอากาว(ไหม|มั้ย|ม่?ะ|มั๊ย)/,['เอา','เอามา','ให้ไว','แล้วจะรอนายกมาตัดริบบิ้นรึไง'])

});

client.login(config.TOKEN);

//////////////////////////////
function findServant(search) {
    return servants.find(function(s){ return s.alias.indexOf(search)>-1 });
}

function command(message,regexp,anwsers,callback) {
  //console.log(message.author + ' : ' + message.content)
    if(message.author.bot)
      return;

    var matched = false
    if(typeof regexp === 'string') {
        if(message.content===regexp) {
            matched = true
        }
    }
    else if(regexp.test(message.content)) {
        matched = true
    }

    if(matched) {
        var ans = anwsers[Math.floor(Math.random()*anwsers.length)];

        if(callback===undefined)
          message.channel.sendMessage(ans)  
        else
          callback(ans)
    }
}

function runGacha() {
    var results = randomGacha(10,function(name,i){})
    var resultMessage = ''
    for(var r=0;r<results.length;r++) {
      resultMessage += (r+1)+' :'+results[r]+'\n'
    }
    return resultMessage;
}

function randomGacha(count,callback) {

  var gachaBox = [
    { rate: 1, name: '**5 ★ Servant**' },
    { rate: 4, name: '**4 ★ Servant**' },
    { rate: 44, name: '3 ★ Servant' },
    { rate: 48, name: '**5 ★ Craft Essence**' },
    { rate: 60, name: '4 ★ Craft Essence' },
    { rate: 100, name: '3 ★ Craft Essence' },
  ]

  var gachaGot = []
  var i = 0

  while(i<count) {
    var rand = (Math.round((Math.random()*100))%100)+1
    for(var g in gachaBox) {
      var gacha = gachaBox[g]
      if(rand<=gacha.rate) {
        gachaGot.push(gacha.name)
        callback(gacha.name,i+1)
        break;
      }
    }
    i++;
  }

  return gachaGot;
}
