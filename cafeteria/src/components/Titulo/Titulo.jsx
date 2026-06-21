import styles from './Titulo.module.css';
import folhaEsquerda1 from '../../assets/icons/folhaesquerda1.png';
import folhaDireita1 from '../../assets/icons/folhadireita1.png';
import folhaEsquerda2 from '../../assets/icons/folhaesquerda2.png';
import folhaDireita2 from '../../assets/icons/folhadireita2.png';

export default function Titulo({ texto, folhaEsquerda: folhaEsqProp, folhaDireita: folhaDirProp, variante = 'principal', estiloTexto }) {
  const TagTexto = variante === 'secao' ? 'h2' : 'h1';
  const classeTexto = variante === 'secao' ? styles.h2 : styles.h1;
  const esquerdaPadrao = variante === 'secao' ? folhaEsquerda2 : folhaEsquerda1;
  const direitaPadrao = variante === 'secao' ? folhaDireita2 : folhaDireita1;

  return (
    <div className={styles.titulo}>
      <img src={folhaEsqProp ?? esquerdaPadrao} className={styles.imagem} alt="Folha" />
      <TagTexto className={classeTexto} style={estiloTexto}>{texto}</TagTexto>
      <img src={folhaDirProp ?? direitaPadrao} className={styles.imagem} alt="Folha" />
    </div>
  );
}