import styles from './Cardapio.module.css';
import { Link } from 'react-router-dom';

export default function Cardapio() {
  
  return (
  <div className={styles.pagina}>

    <div className={styles.cardapio}>
      <h1 className={styles.titulo}>Cardápio</h1>
      <p className={styles.frase}>Sabores que inspiram, aconchegam e despertam histórias.</p>

      
    </div>
      <div className={ styles.cardsContainer}>
        <div className={styles.card1}>
            <h1 className={styles.txt1}>Pinceladas salgadas</h1>
          </div>
          <div className={styles.card2}>
            <h1 className={styles.txt2}>Doces da biblioteca</h1>
          </div>
          <div className={styles.card3}>
            <h1 className={styles.txt3}>Poções dos gatos</h1>
          </div>
      </div>
      

    
  </div>);
}
