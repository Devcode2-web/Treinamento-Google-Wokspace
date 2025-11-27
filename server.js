import "dotenv/config";
import express from "express";
import cors from "cors";
import fs from "fs";
import { GoogleGenerativeAI } from "@google/generative-ai";

const app = express();
app.use(express.static("public"));
app.use("/assets", express.static("assets"));

// Inicializa o Gemini com a chave do .env
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });


console.log("Carregando arquivos da base...");

let agenda, gmail, meet;

try {
  agenda = fs.readFileSync("./knowledgeBase/agenda.txt", "utf8");
  console.log("Agenda carregada");
  gmail = fs.readFileSync("./knowledgeBase/gmail.txt", "utf8");
  console.log("Gmail carregado");
  meet = fs.readFileSync("./knowledgeBase/meet.txt", "utf8");
  console.log("Meet carregado");
} catch (err) {
  console.error("❌ ERRO AO CARREGAR ARQUIVOS DA BASE DE CONHECIMENTO:");
  console.error(err);
  process.exit(1);
}


app.post("/chat", async (req, res) => {
  const question = req.body.question;
  console.log("Backend: Pergunta recebida:", question);

  try {
    const prompt = `
Você é um especialista em suporte ao Google Workspace.
Use somente o conteúdo abaixo para responder:
====
Google Agenda:
${agenda}
====
Gmail:
${gmail}
====
Google Meet:
${meet}
====
Se não encontrar a resposta, diga: "Essa informação não está na base de conhecimento".
Pergunta: ${question}
    `;

    console.log("Backend: Enviando prompt para o Gemini...");
    const result = await model.generateContent(prompt);
    const answer = result.response.text();
    console.log("Backend: Resposta recebida:", answer);

    res.json({ answer });

  } catch (error) {
    console.error("Backend: ERRO AO PROCESSAR GEMINI:");
    console.error(error);
    res.status(500).json({
      answer: "Erro interno da IA: " + error.message
    });
  }
});

const PORT = 8080;

const server = app.listen(PORT, () =>
  console.log("Servidor com GEMINI rodando em http://localhost:" + PORT)
);

server.on("error", (err) => {
  console.error("Erro ao iniciar servidor:", err);
});




