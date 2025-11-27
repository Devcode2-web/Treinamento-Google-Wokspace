const OpenAI = require("openai");
const fs = require("fs");

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const agenda = fs.readFileSync("./knowledgeBase/agenda.txt", "utf8");
const gmail = fs.readFileSync("./knowledgeBase/gmail.txt", "utf8");
const meet = fs.readFileSync("./knowledgeBase/meet.txt", "utf8");

async function getAIChatCompletion(question) {
  const completion = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: `Use SOMENTE a base de conhecimento abaixo para responder:

Google Agenda:
${agenda}
---
Gmail:
${gmail}
---
Google Meet:
${meet}
---
Se não encontrar a resposta, diga: "Essa informação não está disponível na base de conhecimento".`
      },
      { role: "user", content: question }
    ],
  });

  return completion.choices[0].message.content;
}

module.exports = { getAIChatCompletion };
