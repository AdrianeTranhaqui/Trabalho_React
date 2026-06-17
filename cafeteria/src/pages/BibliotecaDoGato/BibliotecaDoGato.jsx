import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CategorySection from '../../components/Biblioteca/CategorySection';
import BookOfTheMonth from '../../components/Biblioteca/BookOfTheMonth';
import BookModal from '../../components/Biblioteca/BookModal';
import { CATEGORIES } from '../../constants/categories';
import styles from './BibliotecaDoGato.module.css';

export default function BibliotecaDoGato() {
  const [selectedBook, setSelectedBook] = useState(null);
  const [categoriaAtiva, setCategoriaAtiva] = useState('');
  const navigate = useNavigate();

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
          <BookOfTheMonth onSelectBook={setSelectedBook} />
          <p></p>
        </div>

        <div className={styles.recomendados}>
          <h3>Recomendados para você</h3>
            <CategorySection label="" subject="romance" onSelectBook={setSelectedBook} maxResults={3} />
          <button type="button" className={styles.botao}>
            Ver todos os livros
          </button>
        </div>

      </div>
      


      <div className={styles.gridSecundaria}>
        
        <div className={styles.quiz}>
          <h3>Qual livro combina com você?</h3>
          <p>Responda algumas perguntinhas e descubra sua próxima leitura!</p>
          <button type="button" className={styles.botao}>
            Descubra agora
          </button>
        </div>

        <div className={styles.frase}>
          <h3>Seu livro, seu momento</h3>
          <p>
            Ler um bom livro é como tomar um café: aquece a alma, desperta a
            imaginação e deixa um gostinho de quero mais.
          </p>
        </div>

        <BookModal book={selectedBook} onClose={() => setSelectedBook(null)} />

      </div>

    </>
  );
}