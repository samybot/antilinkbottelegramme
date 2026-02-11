const TelegramBot = require('node-telegram-bot-api');

const TOKEN = "8330813115:AAG682O3vGJYFekET4cu0QFw1UsuA17jbns";
const bot = new TelegramBot(TOKEN, { polling: true });

// Regex pour détecter les liens
const linkRegex = /(https?:\/\/|www\.|t\.me|\.com|\.net|\.org)/i;

bot.on('message', async (msg) => {
  if (!msg.text) return;

  const chatId = msg.chat.id;
  const text = msg.text;

  // 🔐 Vérifier si admin
  const admins = await bot.getChatAdministrators(chatId);
  const isAdmin = admins.some(a => a.user.id === msg.from.id);

  // 👑 SI ADMIN → ON IGNORE TOUT
  if (isAdmin) return;

  // ✅ MOT : Prefix → réponse cc
  if (text === "Prefix") {
    await bot.sendMessage(chatId, "cc", {
      reply_to_message_id: msg.message_id
    });
    return;
  }

  // ❌ Supprimer les liens
  if (linkRegex.test(text)) {
    await bot.deleteMessage(chatId, msg.message_id);
    await bot.sendMessage(chatId, "🚫 Les liens sont interdits ici", {
      reply_to_message_id: msg.message_id
    });
  }
});
