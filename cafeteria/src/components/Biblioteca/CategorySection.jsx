import { useGoogleBooks } from '../../hooks/useGoogleBooks';
import styles from '../../pages/BibliotecaDoGato/BibliotecaDoGato.module.css';


function CategorySection({ label, subject, onSelectBook, maxResults = 8 }) {
  const { books, loading, error } = useGoogleBooks(`subject:${subject}`, maxResults);

  if (loading) return <p>Carregando {label}...</p>;
  if (error) return <p>Erro ao carregar {label}</p>;

  return (
    <section>
      <h2>{label}</h2>
      <div className="book-grid">
        {books.map(book => {
          const info = book.volumeInfo;
          return (
            <div key={book.id} onClick={() => onSelectBook && onSelectBook(book)}>
              <img src={info.imageLinks?.thumbnail} alt={info.title} />
              <p>{info.title}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default CategorySection;