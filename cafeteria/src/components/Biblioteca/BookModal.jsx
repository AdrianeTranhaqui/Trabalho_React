import { useGoogleBooks } from '../../hooks/useGoogleBooks';
import styles from '../../pages/BibliotecaDoGato/BibliotecaDoGato.module.css';

function BookModal({ book, onClose }) {
  if (!book) return null;
  const info = book.volumeInfo;
  const sinopse = info.description?.replace(/<[^>]*>/g, '') || 'Sinopse não disponível.';

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
        <img src={info.imageLinks?.thumbnail} alt={info.title} />
        <h2>{info.title}</h2>
        <p>{info.authors?.join(', ')}</p>
        <p>
          {info.averageRating
            ? `${info.averageRating} / 5 (${info.ratingsCount} avaliações)`
            : 'Sem avaliações ainda'}
        </p>
        <p>{sinopse}</p>
        <button onClick={onClose}>Fechar</button>
      </div>
    </div>
  );
}

export default BookModal;