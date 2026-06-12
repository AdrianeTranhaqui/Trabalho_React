import { NavLink } from 'react-router-dom';
import styles from './Navbar.module.css';
import logo from '../../assets/images/logo.cafeteria.png';


export default function Navbar({ totalItens = 0 }) {
  return (
    <header className={styles.header}>
      <div className={styles.container}>

        {/* Logo */}
        <NavLink to="/" className={styles.logo}>
          <img src={logo} alt="Book & Brew" className={styles.logoImg} />
        </NavLink>

        {/* Navegação */}
        <nav className={styles.nav}>
          <NavLink to="/"                   className={({ isActive }) => isActive ? styles.ativo : ''}>Início</NavLink>
          <NavLink to="/nosso-refugio"       className={({ isActive }) => isActive ? styles.ativo : ''}>Nosso Refúgio</NavLink>
          <NavLink to="/cardapio"            className={({ isActive }) => isActive ? styles.ativo : ''}>Cardápio</NavLink>
          <NavLink to="/biblioteca-do-gato"  className={({ isActive }) => isActive ? styles.ativo : ''}>Biblioteca do Gato</NavLink>
          <NavLink to="/itens-selecionados"  className={({ isActive }) => isActive ? styles.ativo : ''}>Itens Selecionados</NavLink>
        </nav>

      </div>
    </header>
  );
}
