const TelegramBot = require('node-telegram-bot-api');

const TOKEN = "COLLE_TON_TOKEN_ICI";
const bot = new TelegramBot(TOKEN, { polling: true });

const linkRegex = /(https?:\/\/|www\.|t\.me|\.com|\.net|\.org)/i;

bot.on('message', async (msg) => {
  if (!msg.text) return;

  const chatId = msg.chat.id;

  const admins = await bot.getChatAdministrators(chatId);
  const isAdmin = admins.some(a => a.user.id === msg.from.id);
  if (isAdmin) return;

  if (linkRegex.test(msg.text)) {
    await bot.deleteMessage(chatId, msg.message_id);
    await bot.sendMessage(chatId, "🚫 Les liens sont interdits ici !");
  }
});
