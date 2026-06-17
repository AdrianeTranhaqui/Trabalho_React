# Book & Brew

<p align="center">
    <img src="https://github.com/AdrianeTranhaqui/Trabalho_React/blob/master/cafeteria/src/assets/icons/cafe.png" alt="café" height="5px" />
    <img src="https://github.com/AdrianeTranhaqui/Trabalho_React/blob/master/cafeteria/src/assets/icons/gatinho3.png" alt="gato" height="5px" />
    <img src="https://github.com/AdrianeTranhaqui/Trabalho_React/blob/master/cafeteria/src/assets/icons/livro fechado.png" alt="livro" height="5px" />
</p>

Site fictício de uma cafeteria/livraria pet-friendly, desenvolvido como trabalho em grupo para a disciplina de **Desenvolvimento de Aplicações Multiplataformas**.

> "Mais que um café, um lugar para pertencer."

## Sobre o projeto

O Book & Brew é um espaço (fictício) que une cafeteria, livraria e um cantinho para gatos. O site apresenta cardápio, catálogo de livros, a história do lugar, seus valores, fotos do ambiente, avaliação do atendimento, e uma seção de itens selecionados.

## Tecnologias utilizadas

- [React](https://react.dev/)
- [Vite](https://vite.dev/)
- [React Router DOM](https://reactrouter.com/) — navegação entre páginas
- [MockAPI](https://mockapi.io/) — API REST fake para simular persistência de dados
- CSS Modules — estilização isolada por componente

## Estrutura do projeto

```
src/
├── assets/                # imagens e ícones
├── components/            # componentes reutilizáveis
│   ├── Base/              # layout base (Navbar + conteúdo + Footer)
│   ├── Navbar/            # menu de navegação (com versão mobile)
│   └── Footer/            # rodapé
├── pages/                 # páginas da aplicação
│   ├── Home/
│   ├── NossoRefugio/      # história, valores e formulário de avaliação
│   ├── Cardapio/          # cardápio disponível
│   ├── BibliotecaDoGato/  # catálogo de livros
│   └── ItensSelecionados/ # seção de itens selecionados
├── styles/                # estilos globais
├── App.jsx                # definição das rotas
└── main.jsx               # ponto de entrada da aplicação
```

## Funcionalidades já implementadas

- **Componentização**: layout dividido em `Navbar`, `Footer`, `Base` (wrapper de página) e páginas individuais.
- **Roteamento** entre as páginas com `react-router-dom`.
- **Menu responsivo**: navbar com versão mobile (menu hambúrguer) que abre/fecha e fecha automaticamente ao clicar em um link.
- **Renderização condicional**: classes de menu ativo (`NavLink`), abertura/fechamento do menu mobile, exibição de mensagens de erro no formulário e estado de carregamento do botão de envio.
- **Formulário de avaliação** (página Nosso Refúgio):
  - Validação de campos (nome com mínimo de 3 caracteres, e-mail com `@`, comentário com mínimo de 10 caracteres).
  - Envio dos dados via **requisição POST** para uma **MockAPI**, simulando a persistência da avaliação.

## Em desenvolvimento

- Requisição **GET** para listar/exibir dados vindos da API.
- Uso de **Context API** para compartilhar informações entre componentes (ex.: itens selecionados/carrinho).

## 🚀 Como Executar o Projeto

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/AdrianeTranhaqui/Trabalho_React.git
    ```
2.  **Entre na pasta do projeto:**
    ```bash
    cd Trabalho_React/cafeteria
    ```
3.  **Instale as dependências:**
    ```bash
    npm install
     ```
4.  **Rodar em ambiente de desenvolvimento:**
    ```bash
    npm run dev
    ```
5.  Abra o navegador no endereço indicado pelo terminal (geralmente `http://localhost:5173`).

## 👩‍💻 Integrantes

| Nome | Responsabilidade | GitHub | LinkedIn |
|---|---|---|---|
| **Adriane** | Iniciação do projeto, criação dos componentes gerais, página cardápio | [GitHub](https://github.com/AdrianeTranhaqui) | [LinkedIn](https://www.linkedin.com/in/adriane-tranhaqui-356806353/) |
| **Ana Luísa** | Página home | [GitHub](https://github.com/devAnaLuX) | [LinkedIn](https://www.linkedin.com/in/ana-luisa-cunha-reis-8baa563a3/) |
| **Melissa** | Página itens selecionados | [GitHub](https://github.com/melissa-lima21) | [LinkedIn](https://www.linkedin.com/in/melissa-lima-0628a324b/) |
| **Raquel** | Página biblioteca do gato  | [GitHub](https://github.com/Raquel-Beep) | [LinkedIn](https://www.linkedin.com/in/raquel-taveira-02668423b/) |
| **Vitória** | Página nosso refugio, conexão com MockAPI | [GitHub](https://github.com/vitoriazanchet) | [LinkedIn](https://www.linkedin.com/in/vitoria-zanchet) |

---

## 📄 Licença

Projeto desenvolvido para fins educacionais no programa **Serratec** — Residência em Tecnologia da Informação.
