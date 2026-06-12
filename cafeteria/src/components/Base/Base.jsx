import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import styles from './Base.module.css';

export default function Base({ children }) {
  return (
    <div className={styles.wrapper}>
      <Navbar />
      <main className={styles.main}>
        {children}
      </main>
      <Footer />
    </div>
  );
}
