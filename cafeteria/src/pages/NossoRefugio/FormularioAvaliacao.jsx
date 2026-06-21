import { useState } from 'react';
import styles from './NossoRefugio.module.css';
import Titulo from '../../components/Titulo/Titulo';

export default function FormularioAvaliacao() {
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
        <form className={styles.avaliacao} onSubmit={handleEnviar}>
          <Titulo texto="Avalie nosso atendimento" variante="secao"/>
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
    )
}