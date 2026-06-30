import { useState } from 'react';
import styles from './Chat.module.css';
import { MessageCircle, X, Send } from 'lucide-react';

const BACKEND_URL = 'http://localhost:8080/api/chat';

export default function Chat() {
  const [aberto, setAberto] = useState(false);
  const [mensagens, setMensagens] = useState([
    { tipo: 'bot', texto: 'Olá! Bem-vindo ao Book & Brew 🐾' },
    { tipo: 'bot', texto: 'Como posso te ajudar hoje?' }
  ]);
  const [input, setInput] = useState('');
  const [carregando, setCarregando] = useState(false);

  async function enviarMensagem() {
    if (!input.trim()) return;

    const novaMensagem = { tipo: 'usuario', texto: input };
    setMensagens(prev => [...prev, novaMensagem]);
    const perguntaEnviada = input;
    setInput('');
    setCarregando(true);

    try {
      const resposta = await fetch(BACKEND_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pergunta: perguntaEnviada })
      });

      const dados = await resposta.json();

      if (!resposta.ok) {
        throw new Error(dados.mensagem || 'Erro ao processar sua pergunta.');
      }

      setMensagens(prev => [...prev, {
        tipo: 'bot',
        texto: dados.resposta
      }]);

    } catch (erro) {
      setMensagens(prev => [...prev, {
        tipo: 'bot',
        texto: erro.message || 'Ops! Não consegui me conectar. Tente novamente mais tarde. 🐱'
      }]);
    } finally {
      setCarregando(false);
    }
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') enviarMensagem();
  }

  return (
    <div className={styles.chatWrapper}>

      {aberto && (
        <div className={styles.chatBox}>

          <div className={styles.chatHeader}>
            <div className={styles.chatHeaderInfo}>
              <span className={styles.chatIcone}>🐱</span>
              <div>
                <p className={styles.chatNome}>Book & Brew</p>
                <p className={styles.chatStatus}>Online agora</p>
              </div>
            </div>
            <button className={styles.btnFechar} onClick={() => setAberto(false)}>
              <X size={16} />
            </button>
          </div>

          <div className={styles.chatMensagens}>
            {mensagens.map((msg, index) => (
              <div
                key={index}
                className={msg.tipo === 'bot' ? styles.mensagemBot : styles.mensagemUsuario}
              >
                <span>{msg.texto}</span>
              </div>
            ))}
            {carregando && (
              <div className={styles.mensagemBot}>
                <span>digitando...</span>
              </div>
            )}
          </div>

          <div className={styles.chatInput}>
            <input
              type="text"
              placeholder="Digite sua mensagem..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={carregando}
            />
            <button onClick={enviarMensagem} disabled={carregando}>
              <Send size={16} />
            </button>
          </div>

        </div>
      )}

      <button
        className={styles.btnChat}
        onClick={() => setAberto(!aberto)}
        aria-label="Abrir chat"
      >
        {aberto ? <X size={20} /> : <MessageCircle size={20} />}
      </button>

    </div>
  );
}