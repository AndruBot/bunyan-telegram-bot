var telegram = require('telegram-bot-api')
var api = new telegram({token: '256145359:AAEvGvAvqX2ZRcTrjITFwjB7SOh83FIPqO8'})
api.sendMessage({chat_id: '@hijay_report', text:'123'})
.then(function(res) {
  console.log(res)
})
.catch(function(err) {
  console.log(err)
})
console.log('Отправил')
