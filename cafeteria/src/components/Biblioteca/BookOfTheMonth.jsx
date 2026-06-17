import { useGoogleBooks } from '../../hooks/useGoogleBooks';
import styles from '../../pages/BibliotecaDoGato/BibliotecaDoGato.module.css';

const SINOPSE_DESTAQUE = 'Celaena Sardothien é a assassina mais temida de Erilea, mas vive presa, pagando por seus crimes nas minas de sal de Endovier. Sua chance de liberdade aparece em forma de armadilha: se vencer um torneio mortal contra os melhores lutadores do reino, se torna a Campeã do Rei — e ganha a própria vida de volta. Entre duelos, intrigas na corte e uma magia há muito esquecida começando a despertar, Celaena percebe que a luta mais perigosa pode não ser pelo título, mas por algo muito maior.';

function BookOfTheMonth({ onSelectBook }) {
  const { books, loading } = useGoogleBooks(
    'intitle:Throne of Glass inauthor:Sarah J Maas',
    1
  );

  if (loading) return <p>Carregando...</p>;
  const book = books[0];
  if (!book) return null;

  const info = book.volumeInfo;

  return (
    <div className={styles.bookOfMonth}>
      <img
        src={info.imageLinks?.thumbnail}
        alt={info.title}
        onClick={() => onSelectBook(book)}
        style={{ cursor: 'pointer' }}
      />
      <div>
        <h3>{info.title}</h3>
        <p>{info.authors?.join(', ')}</p>
        <p>{SINOPSE_DESTAQUE}</p>
        <button type="button" className={styles.botao} onClick={() => onSelectBook(book)}>
          Ver sinopse completa
        </button>
      </div>
    </div>
  );
}

export default BookOfTheMonth;