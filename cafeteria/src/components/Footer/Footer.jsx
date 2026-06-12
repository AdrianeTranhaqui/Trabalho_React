import { NavLink } from 'react-router-dom';
import styles from './Footer.module.css';
import cafe from '../../assets/icons/cafe.png';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>

        {/* Coluna: marca */}
        <div className={styles.marca}>
          <img src={cafe} alt="Book & Brew" className={styles.logoCafe} />
          <strong>Book & Brew</strong>
          <small>café · books · cats</small>
          <p>A cozy refuge for books, coffee and cat purrs.</p>
        </div>

        {/* Coluna: links */}
        <div className={styles.coluna}>
          <h4>Explore</h4>
          <NavLink to="/nosso-refugio">Nosso Refúgio</NavLink>
          <NavLink to="/cardapio">Cardápio</NavLink>
          <NavLink to="/biblioteca-do-gato">Biblioteca do Gato</NavLink>
          <NavLink to="/itens-selecionados">Itens Selecionados</NavLink>
        </div>

        {/* Coluna: redes sociais */}
        <div className={styles.coluna}>
          <h4>Acompanhe</h4>
          <a href="#">Instagram</a>
          <a href="#">Facebook</a>
        </div>

      </div>

      <div className={styles.rodape}>
        <p>Aqui cada detalhe é feito com carinho para você e nossos gatinhos se sentirem em casa.</p>
        <small>© {new Date().getFullYear()} Book & Brew. Todos os direitos reservados.</small>
      </div>
    </footer>
  );
}
