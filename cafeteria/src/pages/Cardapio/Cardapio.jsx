import { useRef, useState, useContext} from 'react';
import { SelecaoContext } from '../../context/SelecaoContext';

import styles from './Cardapio.module.css';
import iconeSalgados from '../../assets/icons/pincel.icon.png';
import iconeDoces from '../../assets/icons/livro.icon.png';
import iconeBebidas from '../../assets/icons/cafe.icon.png';
import gato from '../../assets/icons/gato2.png';
import folhaEsquerda from '../../assets/icons/folhaesquerda2.png';
import folhaDireita from '../../assets/icons/folhadireita2.png';
import gatinhoComendo from '../../assets/icons/gatinho-comendo.gif';

// Salgados
import croissant from '../../assets/images/cardapio/salgados/croissant.png';
import panini from '../../assets/images/cardapio/salgados/panini.png';
import quiche from '../../assets/images/cardapio/salgados/quiche.png';
import sanduiche from '../../assets/images/cardapio/salgados/sanduiche-quente.png';
import tabua from '../../assets/images/cardapio/salgados/tabua-de-torradas.png';

// Doces
import brownie from '../../assets/images/cardapio/doces/brownie.png';
import cheesecake from '../../assets/images/cardapio/doces/cheesecake.png';
import cinnamon from '../../assets/images/cardapio/doces/cinnamon.png';
import pavlova from '../../assets/images/cardapio/doces/pavlova.png';
import torta from '../../assets/images/cardapio/doces/torta.png';

// Bebidas
import cafeChocolate from '../../assets/images/cardapio/bebidas/cafe-com-chocolate.png';
import cappuccino from '../../assets/images/cardapio/bebidas/cappuccino.png';
import latte from '../../assets/images/cardapio/bebidas/latte.png';
import espresso from '../../assets/images/cardapio/bebidas/espresso.png';
import icedTea from '../../assets/images/cardapio/bebidas/iced-tea-colorido.png';

export default function Cardapio() {

  const { adicionarItem } = useContext(SelecaoContext); //*

  const refSalgados = useRef(null);
  const refDoces = useRef(null);
  const refBebidas = useRef(null);

  const [modalAberto, setModalAberto] = useState(false);
  const [itemSelecionado, setItemSelecionado] = useState(null);

  function scrollParaSecao(ref) {
    const elemento = ref.current;
    const offset = 100;
    const posicao = elemento.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top: posicao, behavior: 'smooth' });
  }

  function abrirModal(nome, preco, imagem) {
    setItemSelecionado({ nome, preco, imagem });
    setModalAberto(true);
  }

  function fecharModal() {
    setModalAberto(false);
    setItemSelecionado(null);
  }

  function confirmarSelecao() {
    adicionarItem(itemSelecionado); //*
    fecharModal();
    alert(`"${itemSelecionado.nome}" adicionado aos seus itens! 🐾`);
  }

  return (
    <div className={styles.pagina}>

      <div className={styles.cardapio}>
        <img src={gato} alt="" className={styles.gatoTitulo} />
          <div className={styles.tituloContainer}>
            <img src={folhaEsquerda} alt="" className={styles.folha} /> 
              <h1 className={styles.titulo}>Cardápio</h1>
            <img src={folhaDireita} alt="" className={styles.folha} />
          </div>
        <p className={styles.frase}>Sabores que inspiram, aconchegam e despertam histórias.</p>
      </div>

      <div className={styles.cardsContainer}>
        <div className={styles.card1} onClick={() => scrollParaSecao(refSalgados)}>
          <h1 className={styles.txt1}>
            <img src={iconeSalgados} alt="" className={styles.iconeCard} />
            Capítulos Salgados
          </h1>
        </div>
        <div className={styles.card2} onClick={() => scrollParaSecao(refDoces)}>
          <h1 className={styles.txt2}>
            <img src={iconeDoces} alt="" className={styles.iconeCard} />
            Doces da biblioteca
          </h1>
        </div>
        <div className={styles.card3} onClick={() => scrollParaSecao(refBebidas)}>
          <h1 className={styles.txt3}>
            <img src={iconeBebidas} alt="" className={styles.iconeCard} />
            Poções dos gatos
          </h1>
        </div>
      </div>

      <hr className={styles.divisor} />

      {/* ── SALGADOS ── */}
      <div className={styles.secaoHeader} ref={refSalgados}>
        <div className={styles.secaoTitulo}>
          <h2 className={styles.secaoNome}>
            <img src={iconeSalgados} alt="" className={styles.iconeSecao} />
            Capítulos Salgados
          </h2>
          <p className={styles.secaoDescricao}>Pratos salgados feitos com carinho e ingredientes selecionados.</p>
        </div>
      </div>

      <div className={styles.listaItens}>
        <div className={styles.cardItem} onClick={() => abrirModal('Croissant Clássico', 'R$ 24,90', croissant)}>
          <img src={croissant} alt="Croissant" className={styles.cardImg} />
          <div className={styles.cardInfo}>
            <h3 className={styles.cardNome}>Croissant Clássico</h3>
            <p className={styles.cardDescricao}>Croissant artesanal com queijo brie e geleia de damasco.</p>
            <span className={styles.cardPreco}>R$ 24,90</span>
            <span className={styles.cardTag}>⭐ Favorito da casa</span>
          </div>
        </div>

        <div className={styles.cardItem} onClick={() => abrirModal('Panini da Casa', 'R$ 21,90', panini)}>
          <img src={panini} alt="Panini" className={styles.cardImg} />
          <div className={styles.cardInfo}>
            <h3 className={styles.cardNome}>Panini da Casa</h3>
            <p className={styles.cardDescricao}>Panini artesanal de queijo minas, tomate confit e pesto.</p>
            <span className={styles.cardPreco}>R$ 21,90</span>
            <span className={styles.cardTag}>🐾 Mais pedido</span>
          </div>
        </div>

        <div className={styles.cardItem} onClick={() => abrirModal('Quiche do Ateliê', 'R$ 23,90', quiche)}>
          <img src={quiche} alt="Quiche" className={styles.cardImg} />
          <div className={styles.cardInfo}>
            <h3 className={styles.cardNome}>Quiche do Ateliê</h3>
            <p className={styles.cardDescricao}>Quiche de alho-poró com queijo e massa amanteigada.</p>
            <span className={styles.cardPreco}>R$ 23,90</span>
            <span className={styles.cardTag}>🌿 Vegetariano</span>
          </div>
        </div>

        <div className={styles.cardItem} onClick={() => abrirModal('Sanduíche Quente', 'R$ 20,90', sanduiche)}>
          <img src={sanduiche} alt="Sanduíche quente" className={styles.cardImg} />
          <div className={styles.cardInfo}>
            <h3 className={styles.cardNome}>Sanduíche Quente</h3>
            <p className={styles.cardDescricao}>Pão artesanal com frango grelhado e cream cheese.</p>
            <span className={styles.cardPreco}>R$ 20,90</span>
            <span className={styles.cardTag}>🔥 Quentinho</span>
          </div>
        </div>

        <div className={styles.cardItem} onClick={() => abrirModal('Tábua de Torradas', 'R$ 18,90', tabua)}>
          <img src={tabua} alt="Tábua de torradas" className={styles.cardImg} />
          <div className={styles.cardInfo}>
            <h3 className={styles.cardNome}>Tábua de Torradas</h3>
            <p className={styles.cardDescricao}>Torradas artesanais com pastas selecionadas da casa.</p>
            <span className={styles.cardPreco}>R$ 18,90</span>
            <span className={styles.cardTag}>👨‍🍳 Inspiração do chef</span>
          </div>
        </div>
      </div>

      <hr className={styles.divisor} />

      {/* ── DOCES ── */}
      <div className={styles.secaoHeader} ref={refDoces}>
        <div className={styles.secaoTitulo}>
          <h2 className={styles.secaoNome}>
            <img src={iconeDoces} alt="" className={styles.iconeSecao} />
            Doces da Biblioteca
          </h2>
          <p className={styles.secaoDescricao}>Doces que adoçam seus melhores momentos.</p>
        </div>
      </div>

      <div className={styles.listaItens}>
        <div className={styles.cardItem} onClick={() => abrirModal('Brownie do Ateliê', 'R$ 19,90', brownie)}>
          <img src={brownie} alt="Brownie" className={styles.cardImg} />
          <div className={styles.cardInfo}>
            <h3 className={styles.cardNome}>Brownie do Ateliê</h3>
            <p className={styles.cardDescricao}>Brownie intenso com sorvete de creme e calda de chocolate.</p>
            <span className={styles.cardPreco}>R$ 19,90</span>
            <span className={styles.cardTag}>🐾 Mais pedido</span>
          </div>
        </div>

        <div className={styles.cardItem} onClick={() => abrirModal('Cheesecake da Casa', 'R$ 18,90', cheesecake)}>
          <img src={cheesecake} alt="Cheesecake" className={styles.cardImg} />
          <div className={styles.cardInfo}>
            <h3 className={styles.cardNome}>Cheesecake da Casa</h3>
            <p className={styles.cardDescricao}>Cheesecake cremoso com calda de frutas vermelhas.</p>
            <span className={styles.cardPreco}>R$ 18,90</span>
            <span className={styles.cardTag}>⭐ Favorito da casa</span>
          </div>
        </div>

        <div className={styles.cardItem} onClick={() => abrirModal('Cinnamon Roll', 'R$ 17,90', cinnamon)}>
          <img src={cinnamon} alt="Cinnamon Roll" className={styles.cardImg} />
          <div className={styles.cardInfo}>
            <h3 className={styles.cardNome}>Cinnamon Roll</h3>
            <p className={styles.cardDescricao}>Cinnamon roll artesanal coberto com glacê de baunilha.</p>
            <span className={styles.cardPreco}>R$ 17,90</span>
            <span className={styles.cardTag}>☕ Perfeito com café</span>
          </div>
        </div>

        <div className={styles.cardItem} onClick={() => abrirModal('Pavlova Delicada', 'R$ 21,90', pavlova)}>
          <img src={pavlova} alt="Pavlova" className={styles.cardImg} />
          <div className={styles.cardInfo}>
            <h3 className={styles.cardNome}>Pavlova Delicada</h3>
            <p className={styles.cardDescricao}>Base de merengue com chantilly e frutas frescas.</p>
            <span className={styles.cardPreco}>R$ 21,90</span>
            <span className={styles.cardTag}>🌿 Leve e especial</span>
          </div>
        </div>

        <div className={styles.cardItem} onClick={() => abrirModal('Torta do Dia', 'R$ 16,90', torta)}>
          <img src={torta} alt="Torta" className={styles.cardImg} />
          <div className={styles.cardInfo}>
            <h3 className={styles.cardNome}>Torta do Dia</h3>
            <p className={styles.cardDescricao}>Torta artesanal com recheio especial feito na hora.</p>
            <span className={styles.cardPreco}>R$ 16,90</span>
            <span className={styles.cardTag}>👨‍🍳 Inspiração do chef</span>
          </div>
        </div>
      </div>

      <hr className={styles.divisor} />

      {/* ── BEBIDAS ── */}
      <div className={styles.secaoHeader} ref={refBebidas}>
        <div className={styles.secaoTitulo}>
          <h2 className={styles.secaoNome}>
            <img src={iconeBebidas} alt="" className={styles.iconeSecao} />
            Poções dos Gatos
          </h2>
          <p className={styles.secaoDescricao}>Bebidas especiais para aquecer o coração e alimentar a alma.</p>
        </div>
      </div>

      <div className={styles.listaItens}>
        <div className={styles.cardItem} onClick={() => abrirModal('Café com Chocolate', 'R$ 17,90', cafeChocolate)}>
          <img src={cafeChocolate} alt="Café com Chocolate" className={styles.cardImg} />
          <div className={styles.cardInfo}>
            <h3 className={styles.cardNome}>Café com Chocolate</h3>
            <p className={styles.cardDescricao}>Café especial com chocolate belga cremoso e delicioso.</p>
            <span className={styles.cardPreco}>R$ 17,90</span>
            <span className={styles.cardTag}>🐾 Mais pedido</span>
          </div>
        </div>

        <div className={styles.cardItem} onClick={() => abrirModal('Cappuccino Clássico', 'R$ 15,90', cappuccino)}>
          <img src={cappuccino} alt="Cappuccino" className={styles.cardImg} />
          <div className={styles.cardInfo}>
            <h3 className={styles.cardNome}>Cappuccino Clássico</h3>
            <p className={styles.cardDescricao}>Cappuccino assinatura da casa com canela e muito amor.</p>
            <span className={styles.cardPreco}>R$ 15,90</span>
            <span className={styles.cardTag}>⭐ Favorito da casa</span>
          </div>
        </div>

        <div className={styles.cardItem} onClick={() => abrirModal('Latte Cremoso', 'R$ 16,90', latte)}>
          <img src={latte} alt="Latte" className={styles.cardImg} />
          <div className={styles.cardInfo}>
            <h3 className={styles.cardNome}>Latte Cremoso</h3>
            <p className={styles.cardDescricao}>Latte suave com leite vaporizado e toque de baunilha.</p>
            <span className={styles.cardPreco}>R$ 16,90</span>
            <span className={styles.cardTag}>☕ Perfeito com livro</span>
          </div>
        </div>

        <div className={styles.cardItem} onClick={() => abrirModal('Espresso da Casa', 'R$ 8,90', espresso)}>
          <img src={espresso} alt="Espresso" className={styles.cardImg} />
          <div className={styles.cardInfo}>
            <h3 className={styles.cardNome}>Espresso da Casa</h3>
            <p className={styles.cardDescricao}>Espresso encorpado e aromático, puro ou com um toque de açúcar.</p>
            <span className={styles.cardPreco}>R$ 8,90</span>
            <span className={styles.cardTag}>☕ Clássico</span>
          </div>
        </div>

        <div className={styles.cardItem} onClick={() => abrirModal('Iced Tea Colorido', 'R$ 15,90', icedTea)}>
          <img src={icedTea} alt="Iced Tea Colorido" className={styles.cardImg} />
          <div className={styles.cardInfo}>
            <h3 className={styles.cardNome}>Iced Tea Colorido</h3>
            <p className={styles.cardDescricao}>Chá gelado de frutas vermelhas com toque de hortelã e limão.</p>
            <span className={styles.cardPreco}>R$ 15,90</span>
            <span className={styles.cardTag}>🌿 Refrescante</span>
          </div>
        </div>
      </div>

      <div className={styles.gatinhoFinal}>
        <img src={gatinhoComendo} alt="" className={styles.gatinhoImg} />
      </div>

      {/* ── MODAL ── */}
      {modalAberto && itemSelecionado && (
        <div className={styles.modalOverlay} onClick={fecharModal}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <img src={itemSelecionado.imagem} alt={itemSelecionado.nome} className={styles.modalImg} />
            <div className={styles.modalInfo}>
              <h2 className={styles.modalNome}>{itemSelecionado.nome}</h2>
              <p className={styles.modalPreco}>{itemSelecionado.preco}</p>
              <p className={styles.modalPergunta}>Deseja adicionar este item à sua seleção? 🐾</p>
              <div className={styles.modalBotoes}>
                <button className={styles.btnCancelar} onClick={fecharModal}>Cancelar</button>
                <button className={styles.btnConfirmar} onClick={confirmarSelecao}>Confirmar</button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}