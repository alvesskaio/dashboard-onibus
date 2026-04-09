# Dashboard de Monitoramento de Ônibus

Trabalho desenvolvido para a disciplina **Extração e Preparação de Dados**.

**Aluno:** Kaio Alves

---

## Sobre o Projeto

Dashboard interativo para visualização e análise de dados de posicionamento de ônibus em tempo real. A aplicação consome um dataset com 10.000 registros de GPS de ônibus e apresenta as informações de forma visual e filtrável.

## Funcionalidades

- **Mapa interativo** — exibe a posição geográfica de cada ônibus com marcadores coloridos por faixa de velocidade
- **Estatísticas gerais** — cards com total de veículos, velocidade média, ônibus em movimento e parados
- **Gráficos analíticos** — distribuição de velocidades e ranking das linhas com mais registros
- **Filtros dinâmicos** — filtragem por linha, faixa de velocidade e busca por número de ordem ou linha
- **Tabela de dados** — listagem paginada com todas as informações dos registros

## Tecnologias Utilizadas

| Tecnologia | Uso |
|---|---|
| React 19 + TypeScript | Framework principal e tipagem estática |
| Vite | Bundler e servidor de desenvolvimento |
| Tailwind CSS | Estilização |
| Leaflet / React-Leaflet | Mapa interativo |
| Recharts | Gráficos |

## Dataset

Os dados utilizados são registros de GPS de ônibus do dia **02/03/2026**, contendo:

- `ordem` — identificador do veículo
- `linha` — linha operada
- `latitude` / `longitude` — posição geográfica
- `velocidade` — velocidade instantânea (km/h)
- `datahora` — timestamp do registro no veículo
- `datahoraenvio` — timestamp de envio
- `datahoraservidor` — timestamp de recebimento no servidor

Fonte: [alvaroriz/datascience_datasets](https://github.com/alvaroriz/datascience_datasets)

## Como Executar

```bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev

# Gerar build de produção
npm run build
```

Acesse `http://localhost:5173` após iniciar o servidor.
