import { useState, useEffect } from 'react';
import styles from './ItensSelecionados.module.css';
import folhaEsquerdaImg from '../../assets/icons/folhaesquerda2.png';
import folhaDireitaImg from '../../assets/icons/folhadireita2.png';
import cafeImg from '../../assets/icons/cafe.png';
import livroAbertoImg from '../../assets/icons/livro-aberto.png';

export default function ItensSelecionados() {
  const [itensAgrupados, setItensAgrupados] = useState([]);

  useEffect(() => {
    const itensSalvos = JSON.parse(localStorage.getItem('itensSelecionados') || '[]');
    const agrupado = {};

    itensSalvos.forEach((item) => {
      const tipoLivro = !!(item.thumbnail || item.authors);
      const chaveUnica = tipoLivro ? item.title : item.nome;

      if (!chaveUnica) return;

      if (agrupado[chaveUnica]) {
        agrupado[chaveUnica].quantidade += 1;
      } else {
        agrupado[chaveUnica] = {
          ...item,
          tipo: tipoLivro ? 'livro' : 'comida',
          quantidade: 1,
          chaveUnica: chaveUnica
        };
      }
    });

    setItensAgrupados(Object.values(agrupado));
  }, []);

  function removerItem(chaveUnica) {
    const novaListaAgrupada = itensAgrupados.filter(item => item.chaveUnica !== chaveUnica);
    setItensAgrupados(novaListaAgrupada);

    const listaOriginalReconstruida = [];
    novaListaAgrupada.forEach((item) => {
      const { tipo, quantidade, chaveUnica, ...dadosOriginais } = item;
      for (let i = 0; i < quantidade; i++) {
        listaOriginalReconstruida.push(dadosOriginais);
      }
    });

    localStorage.setItem('itensSelecionados', JSON.stringify(listaOriginalReconstruida));
  }

  const listaComidas = itensAgrupados.filter(item => item.tipo === 'comida');
  const listaLivros = itensAgrupados.filter(item => item.tipo === 'livro');

  
  return (
    <div className={styles.pagMeusItens}>
      <div className={styles.cabecalho}>
        <div className={styles.tituloContainer}>
          <img src={folhaEsquerdaImg} alt="" className={styles.folhaEsquerda} />
          <h1 className={styles.titulo}>Seus itens selecionados</h1>
          <img src={folhaDireitaImg} alt="" className={styles.folhaDireita} />
        </div>
        <p className={styles.subtitulo}>Aqui está o que você separou para tornar seu dia mais aconchegante.</p>
      </div>

      {itensAgrupados.length === 0 ? (
        <div className={styles.containerVazio}>
          <p>Você ainda não selecionou nada. Que tal dar uma olhada no Cardápio ou na Biblioteca? 🐾</p>
        </div>
      ) : (
        <div className={styles.containerSelecao}>
          
         { /* ---COLUNA COMIDAS E BEBIDAS------*/}
       <div className={styles.colunaPrincipal}>
            <h2 className={styles.tituloColuna}>
              <div className={styles.tituloComIcone}>
                <img src={cafeImg} alt="" className={styles.iconeCard} />
                Comidas & Bebidas
              </div>
            </h2>
            
            {listaComidas.length === 0 ? (
              <p className={styles.textoVazioInterno}>Nenhuma opção de cardápio selecionada.</p>
            ) : (
              <div className={styles.listaCards}>
                {listaComidas.map((item) => (
                  <div key={item.chaveUnica} className={styles.cardItem}>
                    {item.imagem && (
                      <img src={item.imagem} alt={item.nome} className={styles.itemImg} />
                    )}
                    <div className={styles.itemInfo}>
                      <div className={styles.linhaTitulo}>
                        <h3>{item.nome}</h3>
                        {item.quantidade > 1 && (
                          <span className={styles.quantidadeSelecionada}>x{item.quantidade}</span>
                        )}
                      </div>
                      <span className={styles.itemPreco}>{item.preco}</span>
                    </div>
                    <button 
                      className={styles.btnDeletar} 
                      onClick={() => removerItem(item.chaveUnica)}
                      title="Remover item"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* ********COLUNA DOs LIVROS****** */}
        <div className={styles.colunaPrincipal}>
            <h2 className={styles.tituloColuna}>
              <div className={styles.tituloComIcone}>
                <img src={livroAbertoImg} alt="" className={styles.iconeCard} />
                Livros
              </div>
            </h2>

            {listaLivros.length === 0 ? (
              <p className={styles.textoVazioInterno}>Nenhum livro adicionado para leitura.</p>
            ) : (
              <div className={styles.listaCards}>
                {listaLivros.map((item) => (
                  <div key={item.chaveUnica} className={styles.cardItem}>
                    {item.thumbnail && (
                      <img src={item.thumbnail} alt={item.title} className={styles.livroCapa} />
                    )}
                    <div className={styles.itemInfo}>
                      <div className={styles.linhaTitulo}>
                        <h3>{item.title}</h3>
                        {item.quantidade > 1 && (
                          <span className={styles.quantidadeSelecionada }>x{item.quantidade}</span>
                        )}
                      </div>
                      <p className={styles.itemAutor}>
                        {item.authors ? `de ${item.authors.join(', ')}` : 'Autor da Casa'}
                      </p>
                    </div>
                    <button 
                      className={styles.btnDeletar} 
                      onClick={() => removerItem(item.chaveUnica)}
                      title="Remover livro"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      )}

      

      <div className={styles.rodapeAcoes}>
        <div className={styles.lembreteBox}>
          <h4>Lembre-se</h4>
          <ul>
            <li>Os itens selecionados ficam salvos enquanto você estiver na mesa.</li>
            <li>Informe ao garçom sobre qualquer alteração.</li>
            <li>Aproveite, relaxe e curta nossa companhia felina!</li>
          </ul>
        </div>

        <button className={styles.btnChamarGarcom} onClick={() => alert("🔔 Garçom acionado! Um atendente está a caminho da sua mesa.")}>
          <span>🔔</span> Chamar garçom
        </button>
      </div>

    </div>
  );
}