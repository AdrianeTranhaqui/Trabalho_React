import styles from './NossoRefugio.module.css';
import fachada from '../../assets/images/fachada.png';
import espaco1 from '../../assets/images/espaco1.png';
import espaco2 from '../../assets/images/espaco2.png';
import espaco3 from '../../assets/images/espaco3.png';
import espaco4 from '../../assets/images/espaco4.png';
import espaco5 from '../../assets/images/espaco5.png';
import plantinha from '../../assets/icons/plantinha.png';
import paleta from '../../assets/icons/paleta.png';
import livroFechado from '../../assets/icons/livro fechado.png';
import gatinho1 from '../../assets/icons/gatinho1.png';
import cafe from '../../assets/icons/cafe.png';
import gatinho2 from '../../assets/icons/gatinho2.png';
import livroAberto from '../../assets/icons/livro aberto.png';
import Titulo from '../../components/Titulo/Titulo';
import Card from '../../components/Card/Card';
import FormularioAvaliacao from './FormularioAvaliacao';

const VALORES = [
  { imagem: plantinha, titulo: 'Aconchego', descricao: 'Ambientes calmos e acolhedores para descansar a mente.' },
  { imagem: paleta, titulo: 'Criatividade', descricao: 'Um espaço para expansão criativa e novas ideias.' },
  { imagem: livroFechado, titulo: 'Cultura', descricao: 'Livros e histórias para imaginar e transformar.' },
  { imagem: gatinho1, titulo: 'Cuidado Animal', descricao: 'Gatinhos felizes, respeitados e muito bem cuidados.' },
];

const METRICAS = [
  { imagem: cafe, titulo: '+4.000', descricao: 'cafés servidos com amor' },
  { imagem: gatinho2, titulo: '+10.000', descricao: 'livros lidos por aqui' },
  { imagem: livroAberto, titulo: '+2.000', descricao: 'livros lidos por aqui' },
];

export default function NossoRefugio() {
  
  return (
    <div className={styles.telaCheia}>
      <div className={styles.primaria}>
        <Titulo texto="Nosso Refúgio" variante="principal"/>
        <p>Mais que um café, um lugar para pertencer.</p>
      </div>
      <div className={styles.tercearia}>
        <div className={styles.text}>
          <h2>Nossa história</h2>
          <p>O Book & Brew nasceu do desejo de criar um espaço onde arte, leitura e conforto pudessem coexistir em harmonia.</p>
          <p>Cada detalhe foi pensado para que você se sinta em casa, inspirado e acolhido!</p>
        </div>
        <img src={fachada} className={styles.fachada} alt="Fachada da livraria e cafeteria Book & Brew" />
      </div>  
      <div className={styles.primaria}>
        <Titulo texto="Nossos valores" variante="secao"/>
        <div className={styles.secundaria}>
          {VALORES.map((valor) => (<Card key={valor.titulo} {...valor} variante="card1" />))}
        </div>
      </div>
      <div className={styles.primaria}>
        <Titulo texto="Nosso cantinho" variante="secao"/>
        <div className={styles.secundaria}>
          <img src={espaco1} alt="Espaço interno da livraria e cafeteria Book & Brew" />
          <img src={espaco2} alt="Espaço interno da livraria e cafeteria Book & Brew" />
          <img src={espaco3} alt="Espaço interno da livraria e cafeteria Book & Brew" />
          <img src={espaco4} alt="Espaço interno da livraria e cafeteria Book & Brew" />
        </div>
      </div>
      <div className={styles.metricas}>
        {METRICAS.map((valor) => (<Card key={valor.titulo} {...valor} variante="card2" />))}
      </div>
      <div className={styles.tercearia}>
        <img src={espaco5} className={styles.imgAvaliacao} alt="Espaço interno da livraria e cafeteria Book & Brew" />
        <FormularioAvaliacao />
      </div>
    </div>
  )
}
