const Telegraf = require('telegraf')

const token = process.env.BOT_TOKEN
const { nameLenLimit, keywords } = require('./config.json')

const bot = new Telegraf(token)

const checkStr = str =>
  keywords.find(word => str.includes(word)) !== undefined
  || str.length > nameLenLimit

const shouldBan = user => checkStr(user.last_name) || checkStr(user.first_name)

bot.on('new_chat_members', ctx => {
  const msg = ctx.update.message
  const { new_chat_member: user } = msg

  if (shouldBan(user)) {
    Promise.all([
      ctx.deleteMessage(msg.message_id),
      ctx.kickChatMember(user.id),
      ctx.restrictChatMember(user.id).then(() =>
        ctx.deleteMessage(msg.message_id + 1)
      ).catch(Promise.reject)
    ]).catch(console.error)
  }
})

bot.catch((err) => {
  console.log('Ooops', err)
})

bot.startPolling()