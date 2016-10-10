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
  if (message.content === 'หวัดดี') {
    message.channel.sendMessage('ขอกาวหน่อย');
  }
  else if(message.content === 'กุดาโกะ') {
    message.channel.sendMessage('วรั้ย');
  }
  else if(message.content === 'กาว') {
    message.channel.sendMessage('ซู๊ดดดดดดดดดดดดดดดดด~');
  }
  else if(message.content === 'ไขกาชา') {

    var results = randomGacha(10,function(name,i){})
    var resultMessage = ''
    for(var r=0;r<results.length;r++) {
      resultMessage += (r+1)+' :'+results[r]+'\n'
    }
    message.channel.sendMessage(resultMessage)
  }
});

client.login(config.TOKEN);

//////////////////////////////
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
