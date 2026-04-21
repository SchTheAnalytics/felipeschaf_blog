# Felipe Schaf Blog

Blog pessoal minimalista em Astro, com conteudo em Markdown, idioma pt-BR,
paginas Home, Post e About, RSS, sitemap e deploy estatico na Vercel.

## Comandos

```bash
npm install
npm run dev
npm run check
npm run validate:content
npm run build
npm run validate:render
npm run preview
```

## Deploy

Use o preset Astro na Vercel. Configure `SITE_URL` com a URL canonica de
producao para gerar canonical links, RSS, robots e sitemap corretamente.

## Adicionar um post

Crie um arquivo Markdown em `src/content/posts/` com frontmatter:

```md
---
title: "Titulo do post"
slug: "titulo-do-post"
date: "2026-04-21"
description: "Resumo curto do post."
---

Conteudo em Markdown.
```

Antes de publicar, rode:

```bash
npm run validate
```

Posts sem `title`, `slug`, `date`, `description`, com data invalida ou slug
duplicado nao devem ser publicados.

## Vercel

- Framework preset: Astro.
- Build command: `npm run build`.
- Output directory: `dist`.
- Environment variable: `SITE_URL=https://seu-dominio`.

## Guardrails da V1

Nao adicionar tags, dark mode, busca, comentarios, CMS, painel admin,
autenticacao, areas privadas, fontes de conteudo server-only ou banco de dados.
