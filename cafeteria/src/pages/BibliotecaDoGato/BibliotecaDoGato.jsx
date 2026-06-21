import { useState, useContext } from 'react'; 
import { SelecaoContext } from '../../context/SelecaoContext.jsx';

import { useNavigate } from 'react-router-dom';
import CategorySection from '../../components/Biblioteca/CategorySection';
import BookOfTheMonth from '../../components/Biblioteca/BookOfTheMonth';
import Quiz from '../../components/Biblioteca/Quiz';
import { CATEGORIES } from '../../constants/categories';
import styles from './BibliotecaDoGato.module.css';

function LivroDetalhe({ book, onClose, onAdicionar}) {
  if (!book) return null;
  return (
    <div className={styles.livroDetalhe}>
      {book.thumbnail && (
        <img src={book.thumbnail} alt={book.title} />
      )}
      <h4>{book.title}</h4>
      {book.authors && (
        <p className={styles.autor}>{book.authors.join(', ')}</p>
      )}
      {book.averageRating && (
        <p className={styles.avaliacao}>
          ⭐ {book.averageRating} / 5
          {book.ratingsCount && ` (${book.ratingsCount} avaliações)`}
        </p>
      )}
      {book.description && (
        <p className={styles.sinopse}>{book.description}</p>
      )}

      <div className={styles.botoesContainer}> 
        <button
        className={styles.botaoAdicionar}
        onClick={() => onAdicionar(book)}
        > 📖 Ler na mesa </button>

      </div>
      <button className={styles.botaoFechar} onClick={onClose}>
        Fechar
      </button>
    </div>
  );
}

export default function BibliotecaDoGato() {
  const [livroMes, setLivroMes] = useState(null);        
  const [livroRecomendado, setLivroRecomendado] = useState(null);
  const [mostrarQuiz, setMostrarQuiz] = useState(false);
  const [generoRecomendado, setGeneroRecomendado] = useState('romance');
  const navigate = useNavigate();

  const { adicionarItem } = useContext(SelecaoContext); //*

  const handleGeneroDefinido = (genero) => {
    setGeneroRecomendado(genero.toLowerCase());
    setLivroRecomendado(null);
    setMostrarQuiz(false);
  };

  
  const handleAdicionarLivro = (book) => { 
    adicionarItem(book);
    alert(`"${book.title}" foi adicionado aos seus itens selecionados! 🐾📚`);
  };


  return (
    <>
      <h1 className={styles.titulo}>Biblioteca do Gato</h1>
      <p className={styles.subtitulo}>Livros, histórias e um bom café</p>

      <div className={styles.gridPrincipal}>

        <div className={styles.categoria}>
          <h3>Categorias</h3>
          {Object.keys(CATEGORIES).map((key) => (
            <button
              key={key}
              type="button"
              className={styles.botao}
              onClick={() => navigate(`/categoria/${key}`)}
            >
              {key}
            </button>
          ))}
        </div>

        <div className={styles.livrodomes}>
          <h3>Livro do mês</h3>
          <BookOfTheMonth
            onSelectBook={(book) => {
              setLivroMes((prev) => (prev?.id === book.id ? null : book));
            }}
          />
          <LivroDetalhe
            book={livroMes}
            onClose={() => setLivroMes(null)}
            onAdicionar={handleAdicionarLivro}
          />
        </div>

        <div className={styles.recomendados}>
          <h3>Recomendados para você</h3>
          {generoRecomendado && (
            <p className={styles.generoTag}>
              🎯 {generoRecomendado}
            </p>
          )}
          <CategorySection
            label=""
            subject={generoRecomendado}
            onSelectBook={(book) => {
              setLivroRecomendado((prev) => (prev?.id === book.id ? null : book));
            }}
            maxResults={3}
          />
          <LivroDetalhe
            book={livroRecomendado}
            onClose={() => setLivroRecomendado(null)}
          />
          <button type="button" className={styles.botao}>
            Ver todos os livros
          </button>
        </div>

      </div>

      <div className={styles.gridSecundaria}>

        <div className={styles.quiz}>
          {mostrarQuiz ? (
            <Quiz onGeneroDefinido={handleGeneroDefinido} />
          ) : (
            <>
              <h3>Qual livro combina com você?</h3>
              <p>Responda algumas perguntinhas e descubra sua próxima leitura!</p>
              <button
                type="button"
                className={styles.botao}
                onClick={() => setMostrarQuiz(true)}
              >
                Descubra agora
              </button>
            </>
          )}
        </div>

        <div className={styles.frase}>
          <h3>Seu livro, seu momento</h3>
          <p>
            Ler um bom livro é como tomar um café: aquece a alma, desperta a
            imaginação e deixa um gostinho de quero mais.
          </p>
        </div>


      </div>
    </>
  );
}