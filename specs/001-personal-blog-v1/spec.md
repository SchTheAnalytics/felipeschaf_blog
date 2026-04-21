# Feature Specification: Blog Pessoal V1

**Feature Branch**: `001-personal-blog-v1`  
**Created**: 2026-04-21  
**Status**: Draft  
**Input**: User description: "Quero especificar a V1 de um blog pessoal minimalista, inspirado na organizacao cronologica do AkitaOnRails, sem copiar identidade visual. O blog deve ter nome no topo, homepage com listagem de artigos, sidebar com navegacao por anos e meses, pagina individual de artigo e conteudo em Markdown. O foco deve ser leitura confortavel, performance, simplicidade, manutencao facil e SEO basico. A V1 nao deve incluir CMS, comentarios, autenticacao, painel admin ou busca."

## Clarifications

### Session 2026-04-21

- Q: Quais decisoes da V1 devem orientar o plano tecnico? → A: Astro, Markdown, pt-BR, paginas Home/Post/About, homepage com todos os posts em ordem cronologica inversa, sidebar somente com anos/meses que possuem posts, SEO basico, RSS, sitemap, deploy na Vercel, e exclusao de tags, dark mode, busca, comentarios, CMS, painel admin e autenticacao.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Ler posts recentes (Priority: P1)

Como leitor, quero abrir a Home, reconhecer rapidamente de quem e o blog e
acessar todos os posts em ordem cronologica inversa para iniciar a leitura sem
distracoes.

**Why this priority**: A Home com nome no topo, lista completa de posts e acesso
a paginas Post individuais e o caminho minimo para que o blog entregue valor.

**Independent Test**: Publicar ao menos tres posts validos e verificar que um
leitor consegue abrir a Home, ver o nome no topo, identificar todos os posts em
ordem cronologica inversa e abrir uma pagina Post individual.

**Acceptance Scenarios**:

1. **Given** existem posts publicados com datas diferentes, **When** o leitor
   abre a Home, **Then** o nome do blog aparece no topo e todos os posts aparecem
   do mais recente para o mais antigo.
2. **Given** o leitor esta na Home, **When** seleciona um post listado, **Then**
   ve uma pagina Post com titulo, data, conteudo completo e layout confortavel
   para leitura.

---

### User Story 2 - Navegar por anos e meses (Priority: P2)

Como leitor, quero navegar por anos e meses para encontrar posts antigos pelo
contexto cronologico da publicacao.

**Why this priority**: A organizacao cronologica e parte central da experiencia
inspirada por blogs de arquivo historico, sem depender de busca na V1.

**Independent Test**: Publicar posts distribuidos em pelo menos dois anos e tres
meses, abrir a Home e verificar que o leitor consegue navegar apenas por anos e
meses que possuem posts, em desktop e em telas pequenas.

**Acceptance Scenarios**:

1. **Given** existem posts em multiplos anos e meses, **When** o leitor usa a
   sidebar de arquivo, **Then** consegue selecionar um ano ou mes com posts e ver
   somente os posts daquele periodo.
2. **Given** nao existem posts em determinado ano ou mes, **When** a sidebar e
   exibida, **Then** esse ano ou mes nao aparece como opcao de navegacao.
3. **Given** o leitor acessa o blog em tela pequena, **When** procura a
   navegacao cronologica, **Then** encontra um controle equivalente para navegar
   por anos e meses com posts sem perder conteudo.

---

### User Story 3 - Conhecer o autor (Priority: P3)

Como leitor, quero acessar uma pagina About em pt-BR para entender quem escreve
o blog e qual e o contexto editorial do site.

**Why this priority**: A pagina About completa o conjunto de paginas da V1 e
ajuda a estabelecer identidade propria sem adicionar fluxos dinamicos.

**Independent Test**: Acessar a pagina About pela navegacao publica e verificar
que ela apresenta conteudo estatico em pt-BR, sem depender de autenticacao,
busca, comentarios ou CMS.

**Acceptance Scenarios**:

1. **Given** o leitor esta em qualquer pagina publica, **When** acessa a pagina
   About, **Then** encontra conteudo em pt-BR sobre o autor ou o blog.
2. **Given** a pagina About esta publicada, **When** motores de busca leem a
   pagina, **Then** ela possui titulo, descricao e URL canonica proprios.

---

### User Story 4 - Manter posts em Markdown (Priority: P4)

Como mantenedor do blog, quero adicionar e editar posts como arquivos Markdown
com metadados claros para manter o site simples, versionavel e sem CMS.

**Why this priority**: A manutencao facil e a ausencia de CMS, painel admin e
autenticacao sao restricoes fundamentais da V1.

**Independent Test**: Adicionar um novo post Markdown valido e verificar que ele
aparece na Home, no arquivo por ano/mes, na propria URL de Post, no RSS e no
sitemap com metadados basicos de SEO.

**Acceptance Scenarios**:

1. **Given** um novo post Markdown possui titulo, slug, data e descricao, **When**
   o conteudo e publicado, **Then** o post aparece na Home, no agrupamento
   cronologico correto, em uma pagina Post, no RSS e no sitemap.
2. **Given** um post nao possui metadados obrigatorios ou possui slug duplicado,
   **When** o conteudo e validado para publicacao, **Then** ele nao e considerado
   publicavel ate que o problema seja corrigido.

---

### Edge Cases

- Quando nao houver posts publicados, a Home deve exibir o nome no topo, uma
  mensagem simples de ausencia de posts e nenhuma navegacao de arquivo vazia ou
  quebrada.
- Quando todos os posts estiverem no mesmo ano ou mes, a sidebar deve exibir
  apenas esse ano ou mes e nao apresentar niveis vazios.
- Quando um post tiver titulo longo, descricao longa, links, listas, imagens ou
  blocos de codigo, a pagina Post deve manter legibilidade e nao quebrar o
  layout.
- Quando dois posts tentarem usar o mesmo slug, somente um URL canonico pode ser
  publicavel ate que a duplicidade seja resolvida.
- Quando metadados obrigatorios estiverem ausentes ou invalidos, o post deve ser
  bloqueado do conjunto publicado, do RSS e do sitemap ate correcao.
- Quando nao houver posts publicaveis, RSS e sitemap nao devem apontar para
  paginas Post inexistentes.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: O sistema MUST exibir o nome do blog no topo de todas as paginas
  publicas da V1.
- **FR-002**: A V1 MUST limitar paginas publicas de leitor a Home, Post e About;
  RSS e sitemap sao artefatos de descoberta, nao paginas de leitura.
- **FR-003**: Todas as paginas de leitor da V1 MUST apresentar conteudo e
  interface em pt-BR.
- **FR-004**: A Home MUST listar todos os posts publicaveis em ordem
  cronologica inversa, mostrando no minimo titulo e data de publicacao de cada
  post.
- **FR-005**: Cada item da listagem MUST permitir acesso direto a pagina Post
  correspondente.
- **FR-006**: Cada pagina Post MUST exibir titulo, data de publicacao e conteudo
  completo renderizado a partir de Markdown.
- **FR-007**: O conteudo Markdown MUST preservar semantica de paragrafos,
  titulos, links, listas, imagens e blocos de codigo.
- **FR-008**: A pagina About MUST ser acessivel pela navegacao publica e conter
  conteudo estatico em pt-BR sobre o autor ou o blog.
- **FR-009**: A sidebar de arquivo MUST mostrar somente anos e meses que possuem
  posts publicaveis, com agrupamento derivado da data de publicacao.
- **FR-010**: Em telas pequenas, o blog MUST oferecer alternativa equivalente e
  acessivel a sidebar para navegar por anos e meses que possuem posts.
- **FR-011**: Cada post publicavel MUST declarar titulo, slug, data de
  publicacao e descricao ou resumo.
- **FR-012**: Slugs de posts MUST produzir URLs legiveis, estaveis e unicas.
- **FR-013**: Posts com metadados obrigatorios ausentes, invalidos ou
  conflitantes MUST NOT aparecer em Home, sidebar, paginas Post, RSS ou sitemap.
- **FR-014**: Cada pagina publica MUST fornecer SEO basico, incluindo titulo
  unico, descricao, URL canonica e estrutura semantica apropriada.
- **FR-015**: A V1 MUST gerar sitemap com todas as paginas publicas publicaveis.
- **FR-016**: A V1 MUST gerar RSS com todos os posts publicaveis.
- **FR-017**: O design visual MUST ser original do projeto; referencias externas
  podem influenciar apenas a organizacao cronologica e nao podem ser copiadas
  como identidade visual.
- **FR-018**: A V1 MUST NOT incluir tags, dark mode, busca, comentarios, CMS,
  painel admin, autenticacao, area privada ou qualquer fluxo de usuario
  autenticado.
- **FR-019**: Adicionar ou editar um post MUST exigir somente alteracao de
  arquivo Markdown e seus metadados versionados.

### Constitution Alignment *(mandatory)*

- **Editorial simplicity**: A V1 concentra a experiencia em nome no topo, Home,
  Post, About, descoberta cronologica e leitura, sem marketing, widgets ou
  fluxos secundarios.
- **Chronology & navigation**: A Home usa ordem cronologica inversa e a sidebar
  por anos/meses com posts substitui busca como caminho principal para explorar
  o historico.
- **Markdown maintenance**: Posts sao mantidos como Markdown com metadados
  obrigatorios; nao ha CMS, admin ou fluxo editorial fora do repositorio.
- **Performance, readability & accessibility**: Paginas publicas priorizam
  conteudo legivel, navegacao acessivel, layout responsivo e carregamento rapido
  para leitura.
- **SEO & identity**: Paginas publicas exigem titulo, descricao, URL canonica,
  estrutura semantica, RSS e sitemap, mantendo identidade visual propria.
- **V1 exclusions**: Tags, dark mode, busca, comentarios, CMS, painel admin,
  autenticacao e areas privadas estao fora do escopo desta especificacao.

### Key Entities *(include if feature involves data)*

- **Post**: Conteudo publicado no blog; possui titulo, slug, data de publicacao,
  descricao ou resumo, corpo em Markdown e estado publicavel derivado da validade
  dos metadados.
- **Periodo de arquivo**: Agrupamento cronologico de posts por ano e mes,
  exibido somente quando possui ao menos um post publicavel.
- **Pagina publica**: Home, Post ou About; possui titulo, descricao, URL
  canonica, idioma pt-BR e conteudo acessivel ao leitor sem autenticacao.
- **RSS**: Artefato de assinatura que lista todos os posts publicaveis.
- **Sitemap**: Artefato de descoberta que lista todas as paginas publicas
  publicaveis.
- **Identidade do blog**: Nome exibido no topo e padroes visuais proprios que
  distinguem o site sem copiar a identidade visual de referencias externas.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Em avaliacao de uso, um leitor consegue identificar o nome do blog
  e o post mais recente em ate 5 segundos apos abrir a Home.
- **SC-002**: Um leitor consegue chegar a qualquer mes com posts publicados em
  ate 3 interacoes a partir da Home, tanto em desktop quanto em tela pequena.
- **SC-003**: 100% dos posts publicaveis aparecem na Home, no periodo
  cronologico correto, em uma pagina Post propria, no RSS e no sitemap.
- **SC-004**: 100% das paginas publicas possuem titulo unico, descricao e URL
  canonica verificaveis antes da publicacao.
- **SC-005**: A Home e as paginas Post apresentam conteudo principal legivel em
  ate 2 segundos em uma conexao web comum.
- **SC-006**: Um leitor consegue acessar a pagina About em ate 2 interacoes a
  partir de qualquer pagina publica.
- **SC-007**: Um mantenedor consegue publicar um novo post valido sem tags, dark
  mode, busca, comentarios, CMS, painel admin ou autenticacao.

## Assumptions

- A stack aprovada para o plano tecnico e Astro.
- O deploy alvo da V1 e Vercel.
- O conteudo dos posts sera escrito em Markdown.
- O idioma canonico da V1 e pt-BR.
- O nome exibido no topo sera "Felipe Schaf" ate que outro nome seja definido.
- Todos os visitantes da V1 sao leitores publicos e anonimos.
- A ordenacao e o agrupamento cronologico usam a data de publicacao do post.
- Cada post possui um unico slug estavel depois de publicado.
- "SEO basico" inclui titulo, descricao, URL canonica, estrutura semantica, RSS
  e sitemap.
- A inspiracao em AkitaOnRails se limita a organizacao cronologica de conteudo,
  nao a cores, tipografia, layout visual especifico, marca ou identidade.
