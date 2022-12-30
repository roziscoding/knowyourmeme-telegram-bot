import { Bot } from "https://deno.land/x/grammy@v1.12.5/mod.ts";
import { search } from "./results.ts";

export const bot = new Bot(Deno.env.get("TELEGRAM_TOKEN") ?? "");

bot.inlineQuery(/[a-z0-9 ]+/i, async (ctx) => {
  const query = await ctx.match?.at(0);

  if (!query) return ctx.answerInlineQuery([]);

  const results = await search(query);

  return ctx.answerInlineQuery(results.map((result) => ({
    id: result.title.replace(/[^0-9a-z]/ig, ""),
    type: "article",
    title: result.title,
    input_message_content: {
      message_text:
        `<a href="${result.url}">${result.title} | Know Your Meme</a>`,
      parse_mode: "HTML",
    },
    url: result.url,
    thumb_url: result.image,
  })));
});

bot.command(
  "help",
  (ctx) => ctx.reply("Use /start for instructions and /repo to check my code."),
);

bot.command(
  "repo",
  (ctx) =>
    ctx.reply(
      "You can read my code on [GitHub](https://github.com/roziscoding/knowyourmeme-telegram-bot)",
      { parse_mode: "Markdown" },
    ),
);

bot.on(
  "message",
  (ctx) =>
    ctx.reply(
      "Hey there! I'm an inline bot. To use me, type my username followed by your search in any chat, or click the button below and type your search",
      {
        reply_markup: {
          inline_keyboard: [[{ text: "Go Inline", switch_inline_query: "" }]],
        },
      },
    ),
);

bot.catch(console.error);
