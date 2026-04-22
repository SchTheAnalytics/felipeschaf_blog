---
title: "6 anos aprendendo dados nas bordas — o que mudou em 2026"
slug: "6-anos-aprendendo-dados-nas-bordas-o-que-mudou-em-2026"
date: 2026-04-21
description: "Uma reflexão sobre seis anos aprendendo dados, a evolução dessa jornada e o que mudou em 2026."
draft: false
---

# 6 anos aprendendo dados nas bordas — o que mudou em 2026

Era quase 5 horas da manhã.

Eu estava em frente à TV, no escuro, com o brilho da tela no rosto. Não tinha conseguido dormir — não porque estava com insônia, mas porque eu não queria parar. Naquele dia eu tinha ouvido pela primeira vez o nome “Power BI”. Naquela madrugada eu já tinha assistido umas 50 vídeos sobre ele.

Foi a primeira vez na minha vida que eu senti: **isso aqui é meu**.

Não sabia ainda o que ia fazer com isso. Não sabia que existia cargo de analista, engenheiro ou cientista de dados. Não fazia ideia de quanto ganhava um profissional da área. Eu só sabia que não conseguia parar de aprender aquilo — e que essa sensação era completamente nova pra mim.

Essa é a história de como passei 6 anos aprendendo dados sem saber para onde estava indo. E o que mudou em 2026.

## O professor que me ensinou a maior habilidade da minha vida

Antes de chegar nos dados, preciso voltar um pouco.

Em 2012 eu ingressei em um curso técnico de Desenvolvimento de Software com a pior motivação possível: era a única turma com vaga disponível. Meu pensamento na época foi literal: “só vou fazer esse curso por fazer, porque eu já manjo de computador — jogo o dia inteiro.”

Um ano e meio depois eu estava escrevendo um TCC. Um sistema de gerenciamento de estoque. Mais de 500 mil linhas de código digitadas à mão, em Java.

Naquela época não existia nada parecido com o que temos hoje. Cada erro era horas de pesquisa no Google, no Stack Overflow, em livros. Quando eu levava um problema para o meu professor, ele respondia sempre a mesma coisa: “Procura no Google.”

Eu ficava com raiva. Pensava: se é para eu procurar tudo no Google, por que você está aqui?

Mal sabia eu que ele estava me ensinando a habilidade mais importante que tenho até hoje — ir atrás de qualquer coisa para resolver um problema. Não esperar que alguém entregue a resposta. Não desistir quando o caminho não está óbvio.

Finalizei o curso. Entrei no mercado de trabalho. Em uma vaga sem nenhuma relação com tecnologia.

## A segunda-feira que mudou tudo

Em 2020 eu estava em uma posição de Operador. Claramente sobrando no time, mas me mantinham porque eu era um profissional que se virava — e aparentemente isso tinha valor.

Uma segunda-feira, meu gestor chegou até mim: “Já que você está com tempo livre, aprende Power BI. Vou começar a te colocar nas reuniões para apresentar dados.”

Eu não fazia ideia do que era Power BI.

Naquele dia cheguei em casa, abri o YouTube e não sabia nem como procurar. Fui tentando. Fui clicando. E aí aconteceu aquela madrugada que eu descrevi no começo — quase 5 horas da manhã, 50 vídeos assistidos, aquela sensação de ter encontrado algo que era meu.

Na quarta-feira eu apresentei um dashboard para o meu gestor.

Era horrível. Dados inúteis, sem valor nenhum, sem contexto. Mas dois dias antes eu nem sabia abrir a ferramenta. A curva de aprendizado tinha sido tão absurda que ele não acreditou: “Você mentiu pra mim. Disse que não sabia mexer no BI e dois dias depois aparece com um dashboard pronto. Impossível.”

Não era impossível. Era o que acontece quando você finalmente encontra algo que faz sentido pra você.

## Aprendendo fazendo — e as limitações disso

A partir daí eu fui construindo aos poucos. Criei dashboards dentro da empresa, fui ficando conhecido por isso, fui sendo promovido por uma expertise que eu desenvolvia na prática — não em cursos.

Mas tem uma coisa que preciso ser honesto: eu usava o Power BI só para visualização. Todos os cálculos eram feitos no Excel. Eu não utilizava 10% do que a ferramenta oferecia. Era um profissional que aprendia por demanda — surgia um problema, eu procurava como resolver, anotava, aplicava nas próximas situações.

Funcionava. Mas tinha um teto.

O momento em que eu entendi esse teto foi quando assumi uma demanda de análise de dados operacionais do setor. Eu pensei: “e se eu criar um dashboard para medir a performance dessa operação?”

Baixei os dados. Abri os arquivos. E me frustrei.

Eram dados reais, do dia a dia, com todos os problemas do dia a dia. Isso significa: dados extremamente sujos. Não era só somar colunas e tirar médias — simplesmente todas as informações tinham inconsistências. Fiz um levantamento da qualidade dos dados e levei para o gestor. Ele não tinha ideia da dimensão do problema que existia ali.

E mais uma vez, ganhei visibilidade sem entregar um produto finalizado. Apenas indo atrás.

## O que os cursos não ensinam

Aqui eu preciso falar uma coisa que pode incomodar algumas pessoas.

Fiz diversos cursos para aprender a tratar dados e resolver aquele problema. Todos excelentes. Todos ensinando o básico: padronizar nomes, transformar tipos de dados, tratar células vazias. E tudo bem — o objetivo de um curso é ensinar a base. Não é simular a realidade.

O problema é que a realidade não é a base.

Vejo inúmeros posts no LinkedIn dizendo “resolvi um problema real com dados, separei em dim e fact, fiz os relacionamentos”. Ótimo. Mas e quando você pega uma base de dados operacional onde o mesmo registro precisa ser medido em contextos completamente diferentes dependendo do período — e qualquer erro no tratamento pode levar a gerência a tomar uma decisão errada baseada em um número seu?

Isso os posts bonitos não ensinam.

Teve um projeto específico em que eu precisava consumir dados de um sistema externo. Sem autorização para armazenar um volume grande de dados em lugar nenhum. Sem API disponível. A maioria das pessoas diria: “se não me dão acesso, não tem o que fazer.”

Para mim sempre tem o que fazer.

Consumi via scraping. Tratei o CAPTCHA. Armazenei em Parquet dentro do SharePoint — usando a estrutura que eu tinha disponível, não a ideal. Rodei todo o pipeline fora do SharePoint para não consumir espaço do ambiente virtual. Funcionou.

Por um tempo.

Depois bati no teto de armazenamento. Perdi performance. Um BI que entregava dados valiosos parou de atualizar.

E o que eu ganhei com isso? Acesso ao banco de dados do servidor da empresa. Porque eu mostrei a necessidade, criei um paliativo, e depois consegui o que realmente precisava.

**Primeiro faça. Primeiro mostre a necessidade. Depois peça.**

## O que 2026 mudou

Ao longo desses anos eu trabalhei incontáveis horas como profissional de dados completo — coletava, transformava, injetava, criava dashboards, analisava, gerava estatística. Tudo isso conciliado com a minha função real, que não era nada disso.

Chegou um ponto em que eu não conseguia entregar bem nem um nem outro. O que aconteceu? Ganhei uma posição dentro do setor focado em dados.

Mas mesmo assim, continuava sendo nas bordas. Dados como parte de uma função maior. Nunca como o centro.

Em 2026 eu cansei disso.

Cansei de encaixar dados no meio de outra coisa. Cansei de ser “o cara que também faz dados”. Ao longo dessa jornada toda eu descobri o que realmente me apaixona nessa área — não é criar o dashboard, não é a análise final. É o processo que vem antes: coleta, transformação, carregamento, arquitetura, otimização, versionamento. É engenharia de dados.

E foi quando eu parei de encarar isso como hobby de expediente e comecei a encarar como profissão.

## Por que estou escrevendo isso

Se você chegou até aqui, provavelmente se reconheceu em alguma parte da história. Talvez você também aprenda por demanda, sem um caminho claro. Talvez você também sinta que está sempre nas bordas de algo que deveria estar no centro. Talvez você também tenha aquela madrugada — aquele momento em que você encontrou algo e não conseguiu parar.

Esse blog vai documentar o que vem agora. Os projetos, os estudos, as análises, os erros, as descobertas. Em tempo real, sem filtro de quem já chegou lá.

Porque eu ainda não cheguei. Mas eu sei exatamente para onde estou indo — e essa clareza, depois de 6 anos, é tudo.
