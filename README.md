# Book & Brew

<p align="center">
    <img src="https://github.com/AdrianeTranhaqui/Trabalho_React/blob/master/cafeteria/src/assets/icons/cafe.png" alt="café" height="35px" />
    <img src="https://github.com/AdrianeTranhaqui/Trabalho_React/blob/master/cafeteria/src/assets/icons/gatinho3.png" alt="gato" height="35px" />
    <img src="https://github.com/AdrianeTranhaqui/Trabalho_React/blob/master/cafeteria/src/assets/icons/livro fechado.png" alt="livro" height="35px" />
</p>

Site fictício de uma cafeteria/livraria pet-friendly com chatbot inteligente, desenvolvido como trabalho em grupo para a disciplina de **Desenvolvimento de Aplicações Multiplataformas**.

> "Mais que um café, um lugar para pertencer."

## Sobre o Projeto ✨

O Book & Brew é um espaço (fictício) que une cafeteria, livraria e um cantinho para gatos. O projeto original era apenas um site em React. Foi posteriormente expandido para incluir um **backend em Java**, um **banco vetorial com pgvector** e uma **automação com n8n**, transformando-o em um sistema multiplataforma completo com chatbot inteligente.

![Video do site](https://github.com/AdrianeTranhaqui/Trabalho_React/blob/master/cafeteria/src/assets/Book&Brew.gif)

## 🎯 Funcionalidades

### <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" height="20" alt="React Logo"/> Frontend (React)
- **Chatbot integrado** — interface de chat que envia perguntas ao backend e retorna respostas contextuais
- **Cardápio interativo** — itens com detalhes, preços, restrições alimentares e modal de seleção
- **Biblioteca do Gato** — catálogo de livros via Google Books API com quiz de recomendação
- **Formulário de avaliação** — validação de campos e envio via POST
- **Menu responsivo** — navbar com versão mobile (menu hambúrguer)
- **Itens selecionados** — lista de itens escolhidos com opção de remover

### <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg" height="20" alt="Java Logo"/> Backend (Java)
- **API REST** — endpoint `POST /api/chat` que recebe perguntas do frontend
- **Banco vetorial** — busca semântica nos documentos usando pgvector (cosine distance)
- **Integração com n8n** — envia pergunta + contexto retrieved para o workflow de automação
- **Tratamento de erros** — `GlobalExceptionHandler` com respostas padronizadas

### <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg" height="20" alt="Pgvector Logo"/> Banco Vetorial (pgvector)
- **22 documentos indexados** — cardápio (15 itens), regras dos gatos, ajuda com o sistema, história e valores
- **Embeddings gerados localmente** via Ollama (nomic-embed-text, 768 dimensões)
- **Busca semântica** — encontra os documentos mais relevantes para cada pergunta

### <img src="https://img.shields.io/badge/-_?style=social&logo=n8n&logoColor=983C57" height="20" alt="n8n logo"/> Automação (n8n)
- **Workflow de chatbot** — webhook recebe pergunta + contexto, usa LLM local (Ollama) para gerar respostas
- **100% gratuito** — sem custos de API, tudo roda localmente

## 💻 Tecnologias Utilizadas

| Camada | Tecnologia |
|---|---|
| Frontend | [React](https://react.dev/), [Vite](https://vite.dev/), [React Router DOM](https://reactrouter.com/), CSS Modules |
| Backend | [Java 17](https://www.oracle.com/java/), [Spring Boot 4.1.0](https://spring.io/projects/spring-boot), [Spring WebFlux](https://docs.spring.io/spring-framework/reference/web/webflux.html) |
| Banco Vetorial | [PostgreSQL](https://www.postgresql.org/) + [pgvector](https://github.com/pgvector/pgvector) |
| Embeddings | [Ollama](https://ollama.com/) (nomic-embed-text) |
| LLM | [Ollama](https://ollama.com/) (qwen2.5:1.5b) |
| Automação | [n8n](https://n8n.io/) (desktop) |
| Integrações | [Google Books API](https://developers.google.com/books), [MockAPI](https://mockapi.io/) |

## 🗂️ Estrutura do Projeto

```
Trabalho_React/
├── README.md
├── cafeteria/                    # Frontend React
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── public/
│   │   └── gato.png
│   └── src/
│       ├── main.jsx              # Ponto de entrada
│       ├── App.jsx               # Definição das rotas
│       ├── assets/               # Imagens, ícones e GIFs
│       ├── components/           # Componentes reutilizáveis
│       │   ├── Base/             # Layout base (Navbar + conteúdo + Footer + Chat)
│       │   ├── Navbar/           # Menu de navegação (responsivo)
│       │   ├── Footer/           # Rodapé
│       │   ├── Chat/             # Interface do chatbot
│       │   ├── Card/             # Card genérico
│       │   ├── Titulo/           # Título decorado com folhas
│       │   └── Biblioteca/       # BookOfTheMonth, CategorySection, Quiz, BookModal
│       ├── pages/                # Páginas da aplicação
│       │   ├── Home/
│       │   ├── NossoRefugio/     # História, valores e formulário de avaliação
│       │   ├── Cardapio/         # Cardápio com modal de seleção
│       │   ├── BibliotecaDoGato/ # Catálogo de livros com quiz
│       │   └── ItensSelecionados/# Itens escolhidos pelo usuário
│       ├── context/              # Context API (SelecaoContext)
│       ├── hooks/                # Hooks customizados (useGoogleBooks)
│       ├── constants/            # Categorias de livros
│       └── styles/               # Estilos globais
│
└── cafeteria-api/                # Backend Java
    ├── pom.xml                   # Dependências Maven
    ├── n8n-workflow.json         # Workflow para importar no n8n
    └── src/main/
        ├── java/serratec/cafeteria/
        │   ├── CafeteriaApplication.java
        │   ├── Config/
        │   │   ├── CorsConfig.java
        │   │   ├── WebClientConfig.java
        │   │   └── EmbeddingRunner.java    # Gera embeddings ao iniciar
        │   ├── Controller/
        │   │   └── ChatController.java     # POST /api/chat
        │   ├── DTO/
        │   │   ├── Request/
        │   │   │   ├── PerguntaRequest.java
        │   │   │   └── N8nRequest.java
        │   │   └── Response/
        │   │       ├── RespostaDTO.java
        │   │       ├── N8nResponse.java
        │   │       └── ErroResponse.java
        │   ├── Entity/
        │   │   └── Documento.java          # Entidade com embedding vector(768)
        │   ├── Exception/
        │   │   ├── GlobalExceptionHandler.java
        │   │   ├── N8nIndisponivelException.java
        │   │   └── N8nRespostaInvalidaException.java
        │   ├── Repository/
        │   │   └── DocumentoRepository.java # Query vetorial (cosine distance)
        │   └── Service/
        │       ├── N8nService.java          # Integração com n8n + busca vetorial
        │       ├── EmbeddingService.java    # Gera embeddings via Ollama
        │       └── BuscaVetorialService.java# Busca semântica no pgvector
        └── resources/
            ├── application.properties
            ├── schema.sql                   # DDL com tabela + extensão vector
            └── data.sql                     # Seed: 22 documentos
```

## 🚀 Como Executar

### Pré-requisitos

| Ferramenta | Versão | Link |
|---|---|---|
| Java | 17+ | https://adoptium.net/ |
| Maven | 3.9+ | https://maven.apache.org/download.cgi |
| Node.js | 18+ | https://nodejs.org/ |
| PostgreSQL | 14+ | https://www.postgresql.org/download/ |
| pgvector | 0.7+ | https://github.com/pgvector/pgvector/releases |
| Ollama | Qualquer | https://ollama.com/download |
| n8n Desktop | Qualquer | https://n8n.io/download |

### 1. Configurar o Banco de Dados

Após instalar o PostgreSQL, crie o banco e ative a extensão pgvector:

```sql
CREATE DATABASE cafeteria;
\c cafeteria
CREATE EXTENSION vector;
```

### 2. Baixar os modelos do Ollama

```bash
ollama pull nomic-embed-text    # embeddings (768 dimensões)
ollama pull qwen2.5:1.5b          # LLM para respostas (~1GB)
```

### 3. Configurar o Backend

```bash
cd cafeteria-api
```

Edite `src/main/resources/application.properties` e coloque a senha do seu PostgreSQL:

```properties
spring.datasource.password=SUA_SENHA_AQUI
```

Inicie o backend:

```bash
./mvnw spring-boot:run
```

Na primeira execução, o app vai:
- Conectar no PostgreSQL
- Criar a tabela `documentos`
- Inserir os 22 documentos do seed
- Gerar os embeddings via Ollama (leva ~30 segundos)

### 4. Configurar o Frontend

Em outro terminal:

```bash
cd cafeteria
npm install
npm run dev
```

Abra http://localhost:5173 no navegador.

### 5. Configurar o n8n

1. Abra o n8n Desktop
2. Vá em **Workflows** → **Import from File**
3. Selecione o arquivo `cafeteria-api/n8n-workflow.json`
4. Clique em **Ativar** no workflow

### 6. Pronto para usar o Chatbot

Clique no ícone de chat (canto inferior direito) e faça perguntas como:
- "Tem opção vegana?"
- "Quanto custa o cappuccino?"
- "Como faço um pedido?"
- "Quais são os valores da empresa?"

## 📐 Arquitetura do Sistema

```
┌──────────────┐     POST /api/chat     ┌──────────────────┐
│  React Chat  │ ──────────────────────▶ │  Spring Boot API │
│  (port 5173) │ ◀────────────────────── │  (port 8080)     │
└──────────────┘    { resposta }         └────────┬─────────┘
                                                  │
                                    ┌─────────────┼─────────────┐
                                    │             │             │
                                    ▼             ▼             ▼
                              ┌──────────┐  ┌──────────┐  ┌──────────┐
                              │ Ollama   │  │ pgvector │  │   n8n    │
                              │embeddings│  │  busca   │  │ webhook  │
                              │(768 dim) │  │ semântica│  │(port5678)│
                              └──────────┘  └──────────┘  └────┬─────┘
                                                               │
                                                               ▼
                                                         ┌──────────┐
                                                         │ Ollama   │
                                                         │   LLM    │
                                                         │(qwen2.5) │
                                                         └──────────┘
```

## 👩‍💻 Responsabilidades de cada integrante no projeto original

| Nome | Responsabilidade | GitHub | LinkedIn |
|---|---|---|---|
| **Adriane** | Inicialização do projeto, criação dos componentes gerais, página cardápio | [GitHub](https://github.com/AdrianeTranhaqui) | [LinkedIn](https://www.linkedin.com/in/adriane-tranhaqui-356806353/) |
| **Ana Luísa** | Página home, requisição GET com MockAPI | [GitHub](https://github.com/devAnaLuX) | [LinkedIn](https://www.linkedin.com/in/ana-luisa-cunha-reis-8baa563a3/) |
| **Melissa** | Página itens selecionados, uso de Context API | [GitHub](https://github.com/melissa-lima21) | [LinkedIn](https://www.linkedin.com/in/melissa-lima-0628a324b/) |
| **Raquel** | Página biblioteca do gato, requisição GET com API pública  | [GitHub](https://github.com/Raquel-Beep) | [LinkedIn](https://www.linkedin.com/in/raquel-taveira-02668423b/) |
| **Vitória** | Página nosso refúgio, requisição POST com MockAPI | [GitHub](https://github.com/vitoriazanchet) | [LinkedIn](https://www.linkedin.com/in/vitoria-zanchet) |

---

## 📄 Licença

Projeto desenvolvido para fins educacionais no programa **Serratec** — Residência em Tecnologia da Informação.
