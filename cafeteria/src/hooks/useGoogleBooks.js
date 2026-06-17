import { useState, useEffect } from 'react';

export function useGoogleBooks(query, maxResults = 12) {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const API_KEY = import.meta.env.VITE_GOOGLE_BOOKS_API_KEY;

  // Busca de livros na API do google books

  useEffect(() => {
    if (!query) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    console.log('API_KEY:', API_KEY);

    fetch(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&maxResults=${maxResults}&key=${API_KEY}`)
      .then(res => {
        if (!res.ok) {
          throw new Error(`Erro ${res.status} ao buscar livros`);
        }
        return res.json();
      })
      .then(data => {
        setBooks(data.items || []);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  }, [query, maxResults]);

  return { books, loading, error };
}