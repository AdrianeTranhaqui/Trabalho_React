import { createContext, useState, useEffect } from "react";

export const SelecaoContext = createContext(null);

export const SelecaoProvider = ({ children }) => {
  const [itensSalvos, setItensSalvos] = useState(() => {
    const localData = localStorage.getItem("itensSelecionados");
    return localData ? JSON.parse(localData) : [];
  });

  useEffect(() => {
    localStorage.setItem("itensSelecionados", JSON.stringify(itensSalvos));
  }, [itensSalvos]);

  const adicionarItem = (novoItem) => {
    setItensSalvos((itensAtuais) => [...itensAtuais, novoItem]);
  };

  const removerItemDaSelecao = (chaveUnica) => {
    setItensSalvos((itensAtuais) => {
      return itensAtuais.filter((item) => {
       
        const tipoLivro = !!(item.thumbnail || item.authors);
        const chaveItem = tipoLivro ? item.title : item.nome;
        return chaveItem !== chaveUnica;
      });
    });
  };

  return (
    <SelecaoContext.Provider value={{ itensSalvos, adicionarItem, removerItemDaSelecao }}>
      {children}
    </SelecaoContext.Provider>
  );
};