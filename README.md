# MoviesDB

Plataforma web desenvolvida usando [Next.js](https://nextjs.org/) para consumir a [OMDb API](https://www.omdbapi.com/)

DEMO 👉 https://moviesdb-two.vercel.app/

## Pré-Requisitos

Você vai precisar do [Node.js](https://nodejs.org) e [NPM](https://www.npmjs.com/) instalados em sua máquina

## Setup

Clone o repositório no Github

```
git clone https://github.com/luankjs/moviesdb
```

Vá até a pasta onde clonou o repositório e instale as dependências

```
npm install
```

Agora você precisa definir as variáveis de ambiente, faça uma cópia do conteúdo do arquivo `.env.example` e salve como `.env.local` substituindo o valor das variáveis

```
NEXT_PUBLIC_OMBD_API_KEY='get it on https://www.omdbapi.com/apikey.aspx'
NEXT_PUBLIC_RECAPTCHA_SITE_KEY='get it on google recaptcha admin console'
```

Então, ligue o servidor

```
npm run dev
```

A plataforma deve estar rodando em http://localhost:3000 🚀
