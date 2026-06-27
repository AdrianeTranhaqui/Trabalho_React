import fotoEspaco from '../../assets/images/foto-espaço.png';
import cafe from '../../assets/icons/cafe.png';
import livroAberto from '../../assets/icons/livro-aberto.png';
import Gato2 from '../../assets/icons/gato2.png';
import Gato1 from '../../assets/icons/gato1.png';
import Gato3 from '../../assets/icons/gato3.png';
import Sobremesa from '../../assets/icons/sobremesa.png';
import Salgado from '../../assets/icons/salgado.png';
import styles from './Home.module.css';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Home() {
  const navigate = useNavigate();
  const [cafeEstendido, setCafeEstendido] = useState(false);
  const [sobremesaEstendido, setSobremesaEstendido] = useState(false);
  const [salgadoEstendido, setSalgadoEstendido] = useState(false);
  const [livrosEstendido, setLivrosEstendido] = useState(false);
  const [avaliacoes, setAvaliacoes] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);
  const gatos = [Gato1, Gato2, Gato3];

  useEffect(() => {
    async function buscarAvaliacoes() {
      try{
        const resposta = await axios.get('https://6a325645c6ca2aee4384db15.mockapi.io/cafeteria/avaliacoes');
        setAvaliacoes(resposta.data);
      }
      catch(error){
        setErro('Não foi possível carregar as avaliações.');
      }
      finally{
        setCarregando(false);
      }
    }

    buscarAvaliacoes();
  }, []);
  const [comentarioAtual, setComentarioAtual] = useState(0);

  function proximaAvaliacao() {
    setComentarioAtual((indexAnterior) => (indexAnterior + 1) % avaliacoes.length);
  }

  function alternarCardCafe() {
    setCafeEstendido(!cafeEstendido);
  }

  function alternarCardLivros() {
    setLivrosEstendido(!livrosEstendido);
  }

  function alternarCardSobremesa(){
    setSobremesaEstendido(!sobremesaEstendido);
  }

  function alternarCardSalgado(){
    setSalgadoEstendido(!salgadoEstendido);
  }

  return (
    <>
      <section className={styles.banner}>
        <div className={styles.secao1}>
          <p className={styles.titulo}> Um refúgio entre livros, arte, café e ronrons. 🐾</p>
          <p className={styles.subtitulo}> 
            Um cantinho acolhedor para criar, ler, tomar um café especial
            e receber carinho dos nossos gatinhos residentes.
          </p>
          <div className={styles.botoes}>
            <button 
            className={styles.buttonCardapio}
            onClick={() => navigate('/Cardapio')}>
              Ver Cardápio
            </button>
            <button 
            className={styles.buttonBiblioteca}
            onClick={() => navigate('/Biblioteca-Do-Gato')}>
              Biblioteca do Gato
            </button>
          </div>
        </div>
        <div className={styles.image}>
          <img src={fotoEspaco} alt="Espaço do café" />
        </div>
      </section>

      <section className={styles.pages}>
        <p className={styles.titulo2}>🌿 A experiência do Book & Brew 🌿</p>

        <div className={styles.cards}>
          <div 
            className={`${styles.card} ${cafeEstendido ? styles.cardAberto : ''}`} 
            onClick={alternarCardCafe}>
            <img src={cafe} alt="Café saindo fumaça" />
            <h2>Saboreie</h2>
            <h3>Cafés especiais para aquecer o coração e alimentar a alma.</h3>
            {cafeEstendido && (
              <div className={styles.conteudoExpandido}>
                <h4>☕ Opções do Cardápio:</h4>
                <ul>
                  <li>• Café com Chocolate</li>
                  <li>• Cappuccino Clássico</li>
                  <li>• Latte Cremoso</li>
                  <li>• Iced Tea Colorido</li>
                </ul>
              </div>
            )}
            
          </div>

          <div 
            className={`${styles.card} ${sobremesaEstendido ? styles.cardAberto : ''}`} 
            onClick={alternarCardSobremesa}>
            <img src={Sobremesa} alt="Café saindo fumaça" />
            <h2>Deguste</h2>
            <h3>Doces artesanais para adoçar os seus melhores momentos.</h3>
            {sobremesaEstendido && (
              <div className={styles.conteudoExpandido}>
                <h4>🍰 Opções do Cardápio:</h4>
                <ul>
                  <li>• Brownie do Ateliê</li>
                  <li>• Cheesecake da Casa</li>
                  <li>• Cinnamon Roll</li>
                  <li>• Pavlova Delicada</li>
                </ul>
              </div>
            )}
          </div>

          <div 
            className={`${styles.card} ${salgadoEstendido ? styles.cardAberto : ''}`} 
            onClick={alternarCardSalgado}>
            <img src={Salgado} alt="Café saindo fumaça" />
            <h2>Desfrute</h2>
            <h3>Pratos autorais feitos com carinho e ingredientes selecionados.</h3>
            {salgadoEstendido && (
              <div className={styles.conteudoExpandido}>
                <h4>🥐 Opções do Cardápio:</h4>
                <ul>
                  <li>• Croissant Clássico</li>
                  <li>• Panini da Casa</li>
                  <li>• Quiche do Ateliê</li>
                  <li>• Sanduíche Quente</li>
                </ul>
              </div>
            )}
          </div>

          <div 
            className={`${styles.card} ${livrosEstendido ? styles.cardAberto : ''}`} 
            onClick={alternarCardLivros}>
            <img src={livroAberto} alt="Livro aberto" />
            <h2>Leia</h2>
            <h3>Uma biblioteca cozy para se perder em boas histórias.</h3>
            {livrosEstendido && (
              <div className={styles.conteudoExpandido}>
                <h4>📚 Na Biblioteca:</h4>
                <ul>
                  <li>• Romances Cozy</li>
                  <li>• Suspense & Mistério</li>
                  <li>• Ficção Literária</li>
                  <li>• Best-Sellers do Mês</li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </section>
  
      <section className={styles.destaques}>
        <p className={styles.titulo3}>⭐Destaques do mês⭐</p>

        <div className={styles.folhetos}>
          <div className={styles.folheto}>
            <img src={cafe} alt="café" />
            <div className={styles.mes}>
              <h4>Bebida do mês</h4>
              <h2>Cappuccino Clássico</h2>
            </div>
          </div>

          <div className={styles.folheto}>
            <img src={livroAberto} alt="Livro aberto" />
            <div className={styles.mes}>
              <h4>Livro do mês</h4>
              <h2>Trono de Vidro</h2>
            </div>
          </div>

          <div className={styles.folheto}>
            <img src={Sobremesa} alt="café" />
            <div className={styles.mes}>
              <h4>Sobremesa do mês</h4>
              <h2>Brownie do Ateliê</h2>
            </div>
          </div>

          <div className={styles.folheto}>
            <img src={Salgado} alt="café" />
            <div className={styles.mes}>
              <h4>Salgado do mês</h4>
              <h2>Croissant Clássico</h2>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.comentarios}>
        {carregando && <p>Carregando avaliações...</p>}
        {erro && <p>{erro}</p>}

        {!carregando && !erro && avaliacoes.length > 0 && (
          <div className={styles.cardComentario}>
            <img 
              src={gatos[comentarioAtual % gatos.length]} 
              alt={`Foto de ${avaliacoes[comentarioAtual].nome}`} 
              className={styles.avatarFoto} 
            />
        
            <div className={styles.comentarioConteudo}>
            <p className={styles.textoComentario}>
              "{avaliacoes[comentarioAtual].comentario}"
            </p>
            <h4 className={styles.nomeCliente}>
              {avaliacoes[comentarioAtual].nome}
            </h4>
            </div>

            <button className={styles.btnProximo} onClick={proximaAvaliacao}>
              Próximo avaliação →
            </button>
          </div>
        )}

      </section>
    </>  
  )
}
