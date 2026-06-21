import styles from './Card.module.css';

export default function Card({ imagem, titulo, descricao, variante = 'card1' }) {
  const estiloCard = variante === 'card2' ? styles.card2 : styles.card;
  const estiloTexto = variante === 'card2' ? styles.text2 : styles.text;

  return (
    <div className={estiloCard}>
        <img src={imagem} />
        <div className={estiloTexto}>
            <h3>{titulo}</h3>
            <p>{descricao}</p>
        </div>
    </div>
  );
}