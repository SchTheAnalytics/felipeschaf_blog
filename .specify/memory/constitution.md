<!--
Sync Impact Report
Version change: template -> 1.0.0
Modified principles:
- Template placeholders -> I. Simplicidade editorial
- Template placeholders -> II. Organizacao cronologica e navegacao
- Template placeholders -> III. Markdown como fonte de verdade
- Template placeholders -> IV. Performance, legibilidade e acessibilidade
- Template placeholders -> V. SEO basico e identidade propria
Added sections:
- Escopo e restricoes da V1
- Fluxo de desenvolvimento e qualidade
Removed sections:
- Nenhuma; placeholders do template foram substituidos.
Templates requiring updates:
- ✅ .specify/templates/plan-template.md
- ✅ .specify/templates/spec-template.md
- ✅ .specify/templates/tasks-template.md
- ✅ AGENTS.md
- ✅ .specify/templates/commands/*.md (diretorio ausente)
Follow-up TODOs:
- Nenhum
-->
# Felipe Schaf Blog Constitution

## Core Principles

### I. Simplicidade Editorial
O blog MUST priorizar leitura e descoberta de artigos acima de ornamentos,
campanhas ou fluxos secundarios. A interface principal MUST apresentar o nome no
topo, uma listagem clara de artigos e acesso direto ao conteudo sem barreiras.
Qualquer elemento visual ou interativo MUST demonstrar valor para leitura,
orientacao temporal, performance ou manutencao.

Rationale: a proposta da V1 e um blog pessoal minimalista; complexidade visual
ou funcional reduz foco editorial e aumenta custo de manutencao.

### II. Organizacao Cronologica e Navegacao
Artigos MUST ser listados em ordem cronologica reversa, com arquivo navegavel por
anos e meses. Layouts de listagem e arquivo MUST oferecer navegacao lateral por
ano/mes quando houver espaco suficiente, e MUST oferecer alternativa acessivel e
equivalente em telas pequenas. A inspiracao externa pode orientar a arquitetura
da informacao, mas MUST NOT copiar identidade visual, composicao proprietaria ou
elementos reconheciveis de outro site.

Rationale: a cronologia e o principal modelo mental para explorar um blog
pessoal com historico de publicacoes.

### III. Markdown como Fonte de Verdade
Todo artigo da V1 MUST ser armazenado como Markdown versionado no repositorio,
com frontmatter explicito para titulo, slug, data de publicacao e resumo ou
descricao. Criar, editar ou remover um artigo MUST NOT exigir CMS, banco de
dados, painel administrativo ou fluxo fora do repositorio. O pipeline de render
MUST preservar semantica de titulos, links, listas, imagens e blocos de codigo.

Rationale: Markdown no repositorio mantem o blog portavel, revisavel e simples
de manter sem infraestrutura editorial adicional.

### IV. Performance, Legibilidade e Acessibilidade
Paginas publicas MUST favorecer entrega estatica ou pre-renderizada; qualquer
dependencia de execucao no cliente MUST ser justificada no plano. Conteudo
principal MUST ser legivel sem JavaScript nao essencial. Tipografia, contraste,
comprimento de linha, espacamento, foco de teclado e HTML semantico MUST ser
verificados para home, arquivos e paginas de artigo.

Rationale: um blog pessoal precisa carregar rapido, ser confortavel para leitura
longa e permanecer utilizavel em dispositivos e condicoes variadas.

### V. SEO Basico e Identidade Propria
Cada pagina publica MUST ter titulo unico, descricao, URL canonica, estrutura
semantica apropriada e slug legivel. O site MUST gerar ou manter metadados
basicos de descoberta, incluindo sitemap e robots quando houver publicacao
web. A identidade visual MUST permanecer propria do projeto; referencias
externas podem informar organizacao, nunca copia visual.

Rationale: SEO basico aumenta descoberta sem comprometer simplicidade, e uma
identidade propria evita dependencia de marcas ou estilos de terceiros.

## Escopo e Restricoes da V1

A V1 MUST incluir nome no topo, listagem de artigos, navegacao por anos e meses,
pagina individual de artigo, conteudo em Markdown, layout responsivo, SEO basico
e fluxo de manutencao por arquivos no repositorio.

A V1 MUST NOT incluir CMS, comentarios, painel administrativo, autenticacao de
usuarios, perfis, area privada ou qualquer superficie editorial dinamica. Se uma
feature exigir um desses itens, a constituicao MUST ser emendada antes da
implementacao.

URLs de artigos MUST ser deterministicas e derivadas de slug e metadata
versionada. Datas de publicacao MUST controlar ordenacao e agrupamento por
ano/mes. Navegacao lateral pode ser adaptada para mobile, mas MUST manter a
mesma capacidade de explorar anos e meses.

## Fluxo de Desenvolvimento e Qualidade

Specs, planos e tarefas MUST passar pelo Constitution Check antes da
implementacao. Cada plano MUST declarar impacto em fonte de conteudo,
navegacao cronologica, performance, legibilidade, SEO e exclusoes da V1.

Toda mudanca que afete renderizacao, navegacao, parsing de Markdown ou metadata
MUST incluir validacao automatizada proporcional ao risco. No minimo, candidatos
a release MUST passar build/render, lint ou formatacao configurada, validacao de
frontmatter e verificacao dos metadados SEO das paginas afetadas. Mudancas
somente de conteudo podem usar build/render e revisao do preview como validacao
suficiente quando nao alterarem logica compartilhada.

Revisoes MUST confirmar que referencias externas foram usadas apenas para
organizacao da informacao, que o escopo da V1 nao foi expandido sem emenda, e
que adicionar um novo artigo continua exigindo somente Markdown e metadata
versionada.

## Governance

Esta constituicao supersede praticas conflitantes em specs, planos, tarefas e
documentacao operacional. Quando houver conflito, o artefato subordinado MUST
ser atualizado ou a constituicao MUST ser emendada antes de implementar a
mudanca.

Emendas MUST registrar motivo, impacto em templates ou docs, plano de migracao
quando aplicavel e nova versao semantica. Mudancas MAJOR removem ou redefinem
principios, escopo ou governanca de forma incompativel; mudancas MINOR adicionam
principios, secoes ou orientacoes materiais; mudancas PATCH esclarecem texto sem
alterar obrigacoes.

Compliance MUST ser revisado ao criar o plano, ao gerar tarefas e antes de
merge ou publicacao. Violacoes temporarias MUST aparecer em Complexity Tracking
com justificativa, alternativa mais simples rejeitada e acao de resolucao.

**Version**: 1.0.0 | **Ratified**: 2026-04-21 | **Last Amended**: 2026-04-21
