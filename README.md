# Treinamento Google Workspace

Este projeto é um site de treinamento para o Google Workspace com um chatbot integrado que usa a API do Gemini para responder a perguntas.

## Funcionalidades

-   **Frontend:** Um site estático com informações sobre o treinamento do Google Workspace.
-   **Backend:** Um servidor Node.js com Express que fornece um endpoint `/chat`.
-   **Chatbot:** Um chatbot que usa a API do Gemini para responder a perguntas com base em uma base de conhecimento.

## Configuração do Projeto

### Pré-requisitos

-   [Node.js](https://nodejs.org/) (versão 14 ou superior)
-   Um editor de código (por exemplo, [Visual Studio Code](https://code.visualstudio.com/))

### Instalação

1.  **Clone o repositório:**

    ```bash
    git clone https://github.com/seu-usuario/seu-repositorio.git
    cd seu-repositorio
    ```

2.  **Instale as dependências:**

    ```bash
    npm install
    ```

3.  **Configure as variáveis de ambiente:**

    -   Crie um arquivo chamado `.env` na raiz do projeto.
    -   Adicione sua chave da API do Gemini ao arquivo `.env`:

        ```
        GEMINI_API_KEY=sua_chave_de_api_aqui
        ```

### Executando o Projeto

1.  **Inicie o servidor:**

    ```bash
    npm start
    ```

    O servidor estará rodando em `http://localhost:8080`.

2.  **Abra o site:**

    Abra o arquivo `index.html` em seu navegador para interagir com o site e o chatbot.