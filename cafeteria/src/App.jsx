import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Base from './components/Base/Base';
import Home              from './pages/Home/Home';
import NossoRefugio      from './pages/NossoRefugio/NossoRefugio';
import Cardapio          from './pages/Cardapio/Cardapio';
import BibliotecaDoGato  from './pages/BibliotecaDoGato/BibliotecaDoGato';
import ItensSelecionados from './pages/ItensSelecionados/ItensSelecionados';
import CategoriaResultado from './pages/BibliotecaDoGato/CategoriaResultado';

export default function App() {
  return (
    <BrowserRouter>
      <Base>
        <Routes>
          <Route path="/"                   element={<Home />} />
          <Route path="/nosso-refugio"       element={<NossoRefugio />} />
          <Route path="/cardapio"            element={<Cardapio />} />
          <Route path="/biblioteca-do-gato"  element={<BibliotecaDoGato />} />
          <Route path="/categoria/:chave" element={<CategoriaResultado />} />
          <Route path="/itens-selecionados"  element={<ItensSelecionados />} />
        </Routes>
      </Base>
    </BrowserRouter>
  );
}