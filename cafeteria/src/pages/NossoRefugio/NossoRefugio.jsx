import { useState } from 'react';
import styles from './NossoRefugio.module.css';
import folhaDireita from '../../assets/icons/folhadireita1.png';
import folhaEsquerda from '../../assets/icons/folhaesquerda1.png';
import folhaDireita2 from '../../assets/icons/folhadireita2.png';
import folhaEsquerda2 from '../../assets/icons/folhaesquerda2.png';
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

export default function NossoRefugio() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [comentario, setComentario] = useState('');
  const [erros, setErros] = useState({});
  const [enviando, setEnviando] = useState(false);

  const validar = () => {
    const erro = {};
    if (nome.trim().length < 3) {erro.nome = 'O nome deve ter no mínimo 3 caracteres.';}
    if (!email.includes('@')) {erro.email = 'Digite um e-mail válido.';}
    if (comentario.trim().length < 10) {erro.comentario = 'O comentário deve ter no mínimo 10 caracteres.';}
    setErros(erro);
    return Object.keys(erro).length === 0;
  };

  const handleEnviar = async (e) => {
    e.preventDefault();
    if (!validar()) return;
    setEnviando(true);

    try {
      const resposta = await fetch('https://6a325645c6ca2aee4384db15.mockapi.io/cafeteria/avaliacoes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nome,
          email,
          comentario,
        }),
      });

      if (!resposta.ok) {throw new Error('Falha ao enviar avaliação.');}

      const dados = await resposta.json();
      console.log('Avaliação salva:', dados);
      alert('Avaliação enviada com sucesso!');
      setNome('');
      setEmail('');
      setComentario('');
      setErros({});
    } catch (erro) {
      console.error(erro);
      alert('Ocorreu um erro ao enviar sua avaliação. Tente novamente.');
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div className={styles.telaCheia}>
      <div className={styles.primaria}>
        <div className={styles.titulo}>
          <img src={folhaEsquerda} alt="Folha" />
          <h1>Nosso Refúgio</h1>
          <img src={folhaDireita} alt="Folha" />
        </div>
        <p>Mais que um café, um lugar para pertencer.</p>
      </div>
      <div className={styles.tercearia}>
        <div className={styles.text}>
          <h2>Nossa história</h2>
          <p>O Book & Brew nasceu do desejo de criar um espaço onde arte, leitura e conforto pudessem coexistir em harmonia.</p>
          <p>Cada detalhe foi pensado para que você se sinta em casa, inspirado e acolhido!</p>
        </div>
        <img src={fachada} className={styles.imgLeft} alt="Fachada da livraria e cafeteria Book & Brew" />
      </div>  
      <div className={styles.primaria}>
        <div className={styles.titulo}>
          <img src={folhaEsquerda2} alt="Folha" />
          <h2>Nossos valores</h2>
          <img src={folhaDireita2} alt="Folha" />
        </div>
        <div className={styles.secundaria}>
          <div className={styles.card}>
            <img src={plantinha} alt="Plantinha" />
            <div className={styles.text}>
              <h3>Aconchego</h3>
              <p>Ambientes calmos e acolhedores para descansar a mente.</p>
            </div>
          </div>
          <div className={styles.card}>
            <img src={paleta} alt="Paleta" />
            <div className={styles.text}>
              <h3>Criatividade</h3>
              <p>Um espaço para expanção criativa e novas ideias.</p>
            </div>
          </div>
          <div className={styles.card}>
            <img src={livroFechado} alt="Livro" />
            <div className={styles.text}>
              <h3>Cultura</h3>
              <p>Livros e histórias para imaginar e transformar.</p>
            </div>
          </div>
          <div className={styles.card}>
            <img src={gatinho1} alt="gatinho" />
            <div className={styles.text}>
              <h3>Cuidado Animal</h3>
              <p>Gatinhos felizes, respeitados e muito bem cuidados.</p>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.primaria}>
        <div className={styles.titulo}>
          <img src={folhaEsquerda2} alt="Folha" />
          <h2>Nosso cantinho</h2>
          <img src={folhaDireita2} alt="Folha" />
        </div>
        <div className={styles.secundaria}>
          <img src={espaco1} alt="Espaço interno da livraria e cafeteria Book & Brew" />
          <img src={espaco2} alt="Espaço interno da livraria e cafeteria Book & Brew" />
          <img src={espaco3} alt="Espaço interno da livraria e cafeteria Book & Brew" />
          <img src={espaco4} alt="Espaço interno da livraria e cafeteria Book & Brew" />
        </div>
      </div>
      <div className={styles.metricas}>
        <div className={styles.card2}>
          <img src={cafe} alt="Plantinha" />
          <div className={styles.text2}>
            <h3>+4.000</h3>
            <p>cafés servidos com amor</p>
          </div>
        </div>
        <div className={styles.card2}>
          <img src={gatinho2} alt="Gatinho" />
          <div className={styles.text2}>
            <h3>+10.000</h3>
            <p>ronrons compartilhados</p>
          </div>
        </div>
        <div className={styles.card2}>
          <img src={livroAberto} alt="Livro" />
          <div className={styles.text2}>
            <h3>+2.000</h3>
            <p>livros lidos por aqui</p>
          </div>
        </div>
      </div>
      <div className={styles.tercearia}>
        <img src={espaco5} className={styles.imgRight} alt="Espaço interno da livraria e cafeteria Book & Brew" />
        <form className={styles.avaliacao} onSubmit={handleEnviar}>
          <div className={styles.titulo}>
            <img src={folhaEsquerda2} alt="Folha" />
            <h2>Avalive nosso atendimento</h2>
            <img src={folhaDireita2} alt="Folha" />
          </div>
          <h3>Nome</h3>
          <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} required/>
          <span className={styles.erro}>{erros.nome || ''}</span>
          <h3>E-mail</h3>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
          <span className={styles.erro}>{erros.email || ''}</span>
          <h3>Comentário</h3>
          <input type="text" value={comentario} onChange={(e) => setComentario(e.target.value)} required/>
          <span className={styles.erro}>{erros.comentario || ''}</span>
          <button type="submit"disabled={enviando}>{enviando ? 'Enviando...' : 'Avaliar'}</button>
        </form>
      </div>
    </div>
  )
}
