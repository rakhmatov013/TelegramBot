const TelegramBot = require('node-telegram-bot-api')
const mongoose = require('mongoose')
const config = require('./config.js')
const helper = require('./helper.js')
const kb = require('./keyboard-buttons')
const keyboard = require('./keyboard')


helper.logStart()
mongoose.connect(config.DB_URL, {
    useMongoClient: true
})
    .then(() => console.log("mongoDB connected"))
    .catch((err) => console.log(err))



const bot = new TelegramBot(config.TOKEN, {
    polling: true
})
bot.on('message', msg => {
    console.log(`Working`, msg.from.first_name);

    switch (msg.text) {
        case kb.language.english:
            bot.sendMessage(helper.getChatId(msg), `English is chosen`, {
                reply_markup: { keyboard: keyboard.enghome }
            })
            break
        case kb.back:
            bot.sendMessage(helper.getChatId(msg), `Back`, {
                reply_markup: { keyboard: keyboard.language }
            })
            break
        case kb.language.uzbek:
            get_api()
            break


    }
})
bot.onText(/\/start/, msg => {
    const text = `Hello my friend ${msg.from.first_name}.\n\nChoose category:`
    bot.sendMessage(helper.getChatId(msg), text, {
        reply_markup: {
            keyboard: keyboard.language
        }
    })
})

