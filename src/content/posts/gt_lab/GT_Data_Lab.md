---
title: "GT Data Lab: transformando voltas no Gran Turismo 7 em um projeto de dados"
slug: "gt-data-lab-transformando-voltas-no-gran-turismo-7-em-um-projeto-de-dados"
date: 2026-10-02
description: "Como transformei meu hobby com simuladores de corrida em um laboratório pessoal para estudar coleta, armazenamento, análise e visualização de dados com Python."
---

# GT Data Lab: transformando voltas no Gran Turismo 7 em um projeto de dados

Eu gosto de tecnologia, dados e simuladores de corrida.

Em algum momento, essas três coisas acabaram se encontrando.

Sou entusiasta e estudante da área de dados e gosto bastante de construir pequenos projetos pessoais para aprender na prática. Em vez de estudar apenas conceitos isolados, gosto de encontrar algum problema que me interesse e tentar percorrer o máximo possível do ecossistema: coleta, armazenamento, tratamento, análise e visualização.

Foi assim que surgiu o **GT Data Lab**.

A ideia inicial era simples:

> Será que eu conseguiria transformar minhas voltas no Gran Turismo 7 em dados que eu pudesse coletar, armazenar e analisar?

O que começou como uma curiosidade acabou virando um projeto envolvendo redes, Python, criptografia, armazenamento em Parquet, SQLite, análise de telemetria e dashboards interativos.

---

## De onde veio a ideia

Simuladores de corrida são um dos meus hobbies.

Tenho um cockpit caseiro e gosto justamente da parte de tentar melhorar aos poucos: entender uma curva, testar uma abordagem diferente, comparar tempos e perceber onde ainda existe margem.

![Foto do cockpit usado no projeto GT Data Lab](<./FOTO DO COCKPIT AQUI.jpeg>)

Meu setup atualmente é composto por:

Meu setup é simples: um Logitech G29, uma TV de 51 polegadas e um PlayStation 5.

Não é um projeto profissional de automobilismo e nem era essa a intenção.

O objetivo era transformar um hobby em um laboratório pessoal de dados.

Enquanto eu dirigia, comecei a pensar:

- Em quais pontos da pista eu estava perdendo tempo?
- Eu estava freando cedo demais?
- Em quais voltas eu conseguia carregar mais velocidade nas curvas?
- Minha melhor volta tinha menos tempo em coasting?
- A temperatura dos pneus parecia ter relação com meu desempenho?
- Eu conseguiria comparar duas voltas ponto a ponto?

Para responder isso, primeiro precisava resolver uma questão muito mais básica:

**como obter os dados?**

---

# 1. A primeira etapa: entender a telemetria

Comecei pesquisando como o Gran Turismo 7 disponibilizava informações de telemetria.

Descobri que era possível receber dados do jogo pela rede local utilizando comunicação UDP.

Isso imediatamente tornou o projeto muito mais interessante.

A arquitetura inicial que comecei a imaginar era algo como:

```text
PlayStation 5
      ↓
   Rede local
      ↓
     UDP
      ↓
    Python
      ↓
 Telemetria
```

O primeiro objetivo não era analisar nada.

Era simplesmente provar que meu notebook conseguia receber um pacote enviado pelo jogo.

---

# 2. Fazendo o computador conversar com o PlayStation

O primeiro passo foi identificar os dispositivos na rede.

No meu caso:

```text
PlayStation 5
192.168.0.202

Notebook
192.168.0.122
```

Depois de confirmar que os dois estavam na mesma rede, comecei a construir um pequeno receptor UDP em Python.

A comunicação utiliza um mecanismo bastante simples: o cliente envia uma espécie de heartbeat informando ao jogo que está aguardando telemetria.

Depois de alguns testes, finalmente apareceu no terminal:

```text
Pacote recebido de 192.168.0.202 | 296 bytes
```

A partir daquele momento, o projeto deixou de ser apenas uma ideia.

Eu tinha dados do Gran Turismo chegando no meu código.

---

# 3. Receber o pacote não significava entender o pacote

Naturalmente, o conteúdo recebido não era um JSON bonitinho com campos como:

```text
speed
rpm
brake
throttle
```

Eram apenas bytes.

Ao imprimir um pacote bruto, o resultado era algo semelhante a:

```text
d0d56a9c...
```

O próximo desafio foi entender como transformar aquilo em informação.

Durante a pesquisa descobri que os pacotes eram protegidos utilizando **Salsa20**, uma cifra de fluxo.

Passei então a estudar:

- estrutura do pacote;
- offsets;
- endianness;
- construção do nonce;
- Salsa20;
- representação binária dos dados.

Usei a biblioteca `pycryptodome` para trabalhar com a cifra:

```python
from Crypto.Cipher import Salsa20
```

Um dos momentos mais importantes dessa fase foi quando consegui descriptografar corretamente o pacote e validar o chamado **Magic Number**.

O valor esperado era:

```text
0x47375330
```

E foi exatamente o que apareceu.

A partir dali eu sabia que a descriptografia estava funcionando.

---

# 4. O primeiro dado real

Depois de conseguir interpretar o pacote, comecei pelo campo mais simples para validar visualmente:

**RPM.**

Enquanto acelerava dentro do jogo, o terminal começou a exibir valores como:

```text
2186 RPM
4200 RPM
6700 RPM
9100 RPM
```

Depois vieram:

- velocidade;
- marcha;
- acelerador;
- freio.

Em um dos primeiros testes:

```text
Velocidade: 110.6 km/h
RPM: 9190
Marcha: 1
Acelerador: 100%
Freio: 0%
```

Foi provavelmente o ponto em que o projeto começou a ficar realmente divertido.

Eu conseguia dirigir no jogo e ver o estado do carro aparecendo em tempo real no meu código.

---

# 5. Organizando o projeto

Conforme fui adicionando funcionalidades, comecei a separar responsabilidades.

A estrutura passou a ter módulos específicos para:

```text
receiver
decryptor
parser
logger
database
dashboard
```

Em termos simplificados:

```text
GT7
 ↓
receiver.py
 ↓
decryptor.py
 ↓
parser.py
 ↓
logger.py
 ↓
armazenamento
```

O `receiver` cuida da comunicação.

O `decryptor` transforma o pacote criptografado.

O `parser` interpreta os bytes.

O `logger` organiza a sessão e grava os dados.

Essa separação foi importante porque o projeto começou rapidamente a crescer.

---

# 6. Quantos dados deveriam ser armazenados?

A telemetria chega aproximadamente a **60 amostras por segundo**.

Isso significa:

```text
60 amostras / segundo
3.600 / minuto
216.000 / hora
```

Não fazia muito sentido simplesmente jogar tudo em uma tabela relacional e pronto.

Resolvi então separar os dados em dois grupos.

## SQLite

Para informações relacionais e resumidas:

```text
cars
tracks
sessions
laps
```

Por exemplo:

```text
Sessão #4
Carro: Porsche 911 GT3 R 992
Pista: Lago Maggiore
Volta 1: 2:03.204
Volta 2: 2:03.798
Volta 3: 2:02.818
```

## Parquet

Para a telemetria de alta frequência.

Cada sessão gera um arquivo com milhares de amostras contendo campos como:

```text
position_x
position_y
position_z

speed_kmh
rpm
gear

throttle
brake

temperatura dos pneus

suspensão

rotação das rodas

combustível

posição do carro
```

Essa arquitetura acabou ficando bastante natural:

```text
SQLite
→ catálogo e resumo

Parquet
→ telemetria detalhada
```

---

# 7. Descobrindo que o próprio jogo entrega o tempo oficial

Um dos pontos que inicialmente achei que daria trabalho era medir corretamente o tempo das voltas.

Pensei que teria que reconstruir tudo utilizando timestamps do logger.

Mas durante os testes descobri que o próprio pacote já fornecia:

```text
last_lap_time_ms
best_lap_time_ms
lap_count
```

Em uma sessão de validação, eu havia feito uma volta de:

```text
1:31.213
```

E os dados retornaram:

```text
91213 ms
```

Exatamente o mesmo tempo.

A partir daí, o logger passou a detectar automaticamente quando uma volta terminava e salvar o resultado no SQLite.

---

# 8. O primeiro problema real: heartbeat

Nem tudo funcionou de primeira.

Em um dos primeiros testes mais longos, a coleta simplesmente parava depois de alguns segundos.

A frequência enquanto funcionava era perfeita:

```text
≈ 60 Hz
```

Mas depois o fluxo morria.

O problema estava relacionado à frequência com que eu renovava o heartbeat.

Depois de ajustar esse comportamento, a transmissão se tornou estável.

Esse foi um dos momentos interessantes do projeto porque mostrou uma coisa bastante comum em engenharia:

> uma implementação pode parecer correta em teoria e ainda falhar quando colocada para funcionar por alguns minutos.

---

# 9. Reconstruindo a pista a partir das coordenadas

Entre os dados recebidos estavam as posições do carro:

```text
position_x
position_z
```

Ao plotar essas coordenadas, algo interessante aconteceu.

A pista apareceu.

![Traçado da pista reconstruído a partir das coordenadas da telemetria](<./PRINT DO TRAÇADO DA PISTA AQUI.png>)

Isso abriu uma série de possibilidades.

Agora eu não tinha apenas:

```text
velocidade ao longo do tempo
```

Eu poderia começar a pensar em:

```text
velocidade em determinado ponto da pista
```

Essa diferença é fundamental para comparar voltas.

---

# 10. Transformando posição em distância percorrida

Duas voltas nunca possuem exatamente o mesmo número de amostras.

Portanto, comparar:

```text
amostra 400 da volta 1
```

com:

```text
amostra 400 da volta 2
```

não necessariamente significa comparar o mesmo local da pista.

A solução foi calcular a distância entre posições consecutivas:

```text
sqrt(
    (x2 - x1)² +
    (z2 - z1)²
)
```

e acumular essas distâncias.

Passei então a ter um novo eixo:

```text
0 m
100 m
200 m
...
5000 m
```

Agora eu conseguia comparar várias voltas utilizando o mesmo conceito de posição ao longo da pista.

Esse foi provavelmente um dos avanços analíticos mais importantes do projeto.

---

# 11. Construindo o dashboard

Depois de validar os dados em notebooks, comecei a construir uma interface utilizando **Bokeh**.

A ideia era evitar ficar abrindo arquivos e executando células manualmente toda vez que terminasse uma sessão.

O dashboard passou a carregar automaticamente:

- sessões do SQLite;
- voltas;
- Parquet correspondente;
- indicadores;
- gráficos.

![Resumo da sessão no dashboard do GT Data Lab](<./PRINT DO DASHBOARD — RESUMO AQUI.png>)

Hoje o topo já apresenta informações como:

```text
Melhor volta
Voltas concluídas
Velocidade máxima
Tempo médio
Consistência
Diferença melhor × pior
Temperatura dos pneus
Tempo em frenagem
Tempo em coasting
Full throttle
```

Também criei filtros para selecionar quais voltas quero comparar.

Por exemplo:

```text
Volta 5
vs
Volta 12
```

O dashboard inteiro passa a utilizar somente essas voltas.

![Comparação de voltas no dashboard do GT Data Lab](<./PRINT DO DASHBOARD — RESUMO AQUI_1.png>)

---

# 12. Comparando a telemetria

A parte mais interessante começou quando os gráficos passaram a compartilhar o mesmo eixo de distância.

Hoje consigo comparar:

## Velocidade

![Velocidade ao longo da pista](<./PRINT VELOCIDADE AQUI.png>)

## Delta para a melhor volta

![Delta para a melhor volta](<./PRINT DELTA AQUI.png>)

## Acelerador

![Acelerador ao longo da pista](<./PRINT DO DASHBOARD — RESUMO AQUI_2.png>)

## Freio

![Comparação do freio ao longo da pista](<./PRINT BRAKE AQUI.png>)

## Temperatura dos pneus

![Temperatura dos pneus ao longo da pista](<./PRINT PNEUS AQUI.png>)

Todos os gráficos estão sincronizados pela posição na pista.

Se eu der zoom em determinado trecho, consigo observar o comportamento naquele mesmo pedaço em todos eles.

---

# 13. O que é coasting?

Uma das métricas que passei a analisar é o **coasting**.

No projeto defini inicialmente como:

```text
throttle < 5%
e
brake < 5%
```

Ou seja, o carro está apenas rolando, praticamente sem acelerar e sem frear.

![Comportamento dos pedais ao longo da volta](<./PRINT DO DASHBOARD — RESUMO AQUI_3.png>)

Isso não significa automaticamente um erro.

Mas quando comparado com uma volta melhor, pode mostrar situações como:

- tirei o pé cedo demais;
- demorei para começar a frear;
- demorei para voltar ao acelerador.

Na melhor volta, por exemplo, comecei a observar indicadores como:

```text
Tempo em frenagem
Tempo em coasting
Percentual em full throttle
```

Isso transformou sinais brutos em métricas mais fáceis de interpretar.

---

# 14. Detectando zonas de frenagem

Depois veio uma parte que achei particularmente interessante.

Passei a identificar automaticamente cada evento de frenagem.

Para cada zona, o sistema calcula:

```text
início da frenagem
velocidade de entrada
velocidade mínima
duração do freio
distância freando
freio máximo
posição de retorno ao acelerador
```

![Tabela de análise das zonas de frenagem](<./PRINT DO DASHBOARD — RESUMO AQUI_4.png>)

Com isso, uma comparação pode mostrar algo como:

```text
Melhor volta:

Início freio:       170.1 m
Entrada:            248.5 km/h
Vel. mínima:         90.3 km/h
Tempo freando:        2.62 s
Distância freando:  119.6 m
Retorno throttle:   320.4 m
```

Enquanto uma volta mais lenta apresentou:

```text
Início freio:       162.8 m
Entrada:            243.4 km/h
Vel. mínima:         68.1 km/h
Tempo freando:        3.10 s
Distância freando:  132.6 m
Retorno throttle:   323.6 m
```

A diferença começa a ficar muito mais clara:

```text
freou antes
↓
chegou mais lento
↓
reduziu muito mais a velocidade
↓
ficou mais tempo no freio
```

Isso é muito mais útil do que simplesmente saber:

```text
Volta A: 2:09
Volta B: 2:07
```

---

# 15. Marcando as zonas diretamente no mapa

Também passei a posicionar as zonas de frenagem no próprio traçado.

![Mapa da pista com as zonas de frenagem identificadas](<./PRINT DO MAPA COM Z1, Z2, Z3... AQUI.png>)

Isso resolve um problema bem simples:

Se a tabela disser:

```text
Zona 6
```

eu preciso saber rapidamente qual curva é essa.

Agora consigo olhar diretamente no mapa.

Também incluí controles para rotacionar e espelhar o traçado, permitindo deixá-lo em uma orientação visual semelhante àquela exibida no jogo.

---

# 16. De dashboard para ferramenta de treino

O objetivo começou a mudar.

Inicialmente eu queria:

> coletar telemetria.

Depois passou a ser:

> visualizar telemetria.

Agora o objetivo começa a ser:

> transformar telemetria em orientação prática.

Um exemplo de análise de uma sessão:

```text
Volta 1
2:00.916

Volta 2
1:59.942

Volta 3
1:56.576
```

Na melhor volta:

```text
Tempo freando:
18.62 s

Coasting:
3.16 s

Full throttle:
65.0%
```

Comparando com a primeira volta:

```text
menos tempo no freio
menos coasting
mais tempo em aceleração total
```

E em uma das zonas:

```text
freou 7,3 m antes
entrou 5,1 km/h mais lento
velocidade mínima 22,2 km/h menor
ficou aproximadamente 0,48 s mais tempo no freio
```

Isso começa a gerar uma orientação muito mais objetiva para a próxima tentativa.

Em vez de simplesmente pensar:

> preciso baixar meu tempo.

Posso pensar:

> naquela curva específica estou reduzindo velocidade demais.

---

# 17. Um resumo para a próxima tentativa

Uma das últimas ideias que comecei a implementar foi justamente transformar tudo isso em um pequeno resumo automático.

Algo como:

```text
PRÓXIMA TENTATIVA

Prioridade 1 — Zona 1

• frenagem começou antes da melhor volta
• velocidade mínima muito menor
• maior tempo de frenagem

Referência pessoal:
90 km/h de velocidade mínima

Objetivo:
tentar preservar mais velocidade
e evitar antecipar tanto a frenagem
```

A intenção não é fazer um sistema dizer exatamente como alguém deve pilotar.

É usar minhas próprias melhores voltas como referência e responder:

> o que eu fiz diferente quando fui mais rápido?

---

# 18. O que aprendi tecnicamente

Apesar de ter nascido de um hobby, o GT Data Lab acabou me permitindo praticar várias áreas que eu queria estudar.

## Redes

Trabalhei com:

```text
UDP
sockets
heartbeat
rede local
```

## Dados binários

Precisei entender:

```text
bytes
offsets
struct
endianness
```

## Criptografia

Trabalhei com:

```text
Salsa20
nonce
validação de pacotes
```

## Engenharia de dados

Estruturei:

```text
coleta
persistência
Parquet
SQLite
sessões
modelagem
```

## Análise

Passei a trabalhar com:

```text
Pandas
NumPy
interpolação
distância acumulada
comparação entre séries
estatística descritiva
```

## Visualização

Construí o dashboard com:

```text
Bokeh
gráficos sincronizados
filtros
interação
comparação de voltas
```

E talvez o aprendizado mais interessante tenha sido perceber como todas essas etapas dependem umas das outras.

Uma análise só é confiável se a coleta estiver correta.

A coleta só é útil se os dados estiverem organizados.

E os dados só geram valor quando conseguimos transformar números em perguntas úteis.

---

# 19. Estado atual

Hoje o fluxo do projeto está aproximadamente assim:

```text
Gran Turismo 7
        ↓
      UDP
        ↓
   descriptografia
        ↓
      parser
        ↓
      logger
        ↓
 ┌───────────────┐
 │               │
SQLite         Parquet
 │               │
sessões       telemetria
voltas        ~60 Hz
carros
pistas
 │               │
 └───────┬───────┘
         ↓
     análise
         ↓
      Bokeh
         ↓
    GT Data Lab
```

![Tela final do dashboard GT Data Lab](<./PRINT FINAL DO DASHBOARD AQUI.png>)

---

# 20. Próximos passos

O projeto ainda está longe de terminado.

Algumas coisas que quero explorar:

- volta teórica utilizando meus melhores setores;
- identificação automática dos maiores pontos de perda;
- evolução ao longo de várias sessões;
- comparação entre carros;
- comparação entre setups;
- comportamento dos pneus;
- análise de suspensão;
- detecção mais refinada de curvas;
- geração automática de insights pós-sessão;
- histórico de evolução por pista.

Também quero melhorar bastante a organização do código conforme o projeto cresce.

Mas, por enquanto, considero que o primeiro grande objetivo foi alcançado.

O que começou como:

> “será que consigo receber a telemetria do GT7?”

acabou virando um pequeno laboratório pessoal onde consigo estudar praticamente todo o ciclo de um projeto de dados utilizando algo que eu gosto de fazer no tempo livre.

---

# Conclusão

Uma das coisas que mais gosto em projetos pessoais é justamente essa liberdade.

Eu não precisava construir um sistema de telemetria.

Poderia simplesmente jogar.

Mas transformar um hobby em um problema de dados criou uma oportunidade de estudar conceitos que, isoladamente, talvez fossem muito menos interessantes.

Passei por redes, pacotes binários, criptografia, armazenamento, modelagem, análise, estatística e visualização.

E ainda existe bastante coisa para explorar.

No fim, o GT Data Lab acabou representando exatamente o tipo de projeto que mais gosto de construir:

> aprender tecnologia enquanto tento responder uma pergunta que realmente me interessa.

No meu caso:

**como os dados podem me ajudar a entender por que uma volta foi mais rápida que outra?**

E agora que a infraestrutura está funcionando, é justamente essa parte que quero continuar explorando.
