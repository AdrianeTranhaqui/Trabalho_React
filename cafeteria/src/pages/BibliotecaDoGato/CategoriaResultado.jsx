import { useParams } from 'react-router-dom';
import CategorySection from '../../components/Biblioteca/CategorySection';
import { CATEGORIES } from '../../constants/categories';

export default function CategoriaResultado() {
  const { chave } = useParams();
  const subject = CATEGORIES[chave];

  if (!subject) {
    return <p>Categoria não encontrada.</p>;
  }

  return <CategorySection label={chave} subject={subject} />;
}