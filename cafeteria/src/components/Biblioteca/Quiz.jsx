import React, { useState } from 'react';

const perguntasQuiz = [
    {
        id: 1,
        pergunta: "Está chovendo, você prefere?",
        opcoes: [
            { id: 'A', texto: "Ficar embaixo das cobertas" },
            { id: 'B', texto: "Fazer uma pipoca e ver um filme" },
            { id: 'C', texto: "Jogar um cozy game" },
            { id: 'D', texto: "Praticar um novo hobby" }
        ],
    },
    {
        id: 2,
        pergunta: "Acabei de abrir o Netflix, qual filme você escolheria?",
        opcoes: [
            { id: 'A', texto: "Mamma Mia!" },
            { id: 'B', texto: "Einstein e a Bomba" },
            { id: 'C', texto: "Senhor dos Anéis" },
            { id: 'D', texto: "A noite que mudou o Pop" },
        ],
    },
    {
        id: 3,
        pergunta: "Qual a melhor estação do ano?",
        opcoes: [
            { id: 'A', texto: "Primavera" },
            { id: 'B', texto: "Outono" },
            { id: 'C', texto: "Inverno" },
            { id: 'D', texto: "Verão" },
        ],
    }
];

// Mapeamento de letra => gênero
const mapaGeneros = {
    A: 'Romance',
    B: 'Biografia e História',
    C: 'Fantasia',
    D: 'Artes',
};


const emojiGeneros = {
    Romance: '💕',
    'Biografia e História': '📚',
    Fantasia: '🧙',
    Artes: '🎨',
};

export default function Quiz({ onGeneroDefinido }) {
    const [perguntaAtual, setPerguntaAtual] = useState(0);
    const [respostasUsuario, setRespostasUsuario] = useState([]);
    const [mostrarResultado, setMostrarResultado] = useState(false);
    const [generoResultado, setGeneroResultado] = useState('');

    const calcularGenero = (respostas) => {
        
        const contagem = respostas.reduce((acc, letra) => {
            acc[letra] = (acc[letra] || 0) + 1;
            return acc;
        }, {});

        
        const letraMaisVotada = Object.keys(contagem).reduce((a, b) =>
            contagem[a] >= contagem[b] ? a : b
        );

        return mapaGeneros[letraMaisVotada];
    };

    const lidarComResposta = (opcaoId) => {
        const novasRespostas = [...respostasUsuario, opcaoId];
        setRespostasUsuario(novasRespostas);

        const proximaPergunta = perguntaAtual + 1;

        if (proximaPergunta < perguntasQuiz.length) {
            setPerguntaAtual(proximaPergunta);
        } else {
            
            const genero = calcularGenero(novasRespostas);
            setGeneroResultado(genero);
            setMostrarResultado(true);

            
            if (onGeneroDefinido) {
                onGeneroDefinido(genero);
            }
        }
    };

    const reiniciarQuiz = () => {
        setPerguntaAtual(0);
        setRespostasUsuario([]);
        setMostrarResultado(false);
        setGeneroResultado('');
    };

    return (
        <div style={{
            maxWidth: '600px',
            margin: '40px auto',
            padding: '20px',
            fontFamily: 'Arial, sans-serif'
        }}>
            <h1>Quiz do Gato 🐱</h1>
            <hr />

            {mostrarResultado ? (
                // TELA DE RESULTADO
                <div style={{ textAlign: 'center', marginTop: '20px' }}>
                    <h2>Resultado do Quiz!</h2>
                    <p style={{ fontSize: '18px', color: '#555' }}>
                        Com base nas suas respostas, seu gênero ideal é:
                    </p>
                    <div style={{
                        fontSize: '32px',
                        fontWeight: 'bold',
                        color: '#2c3e50',
                        margin: '20px 0',
                        padding: '20px',
                        borderRadius: '12px',
                        backgroundColor: '#f0f4ff',
                        border: '2px solid #c0caff'
                    }}>
                        {emojiGeneros[generoResultado]} {generoResultado}
                    </div>
                    <p style={{ fontSize: '15px', color: '#888' }}>
                        Confira os livros recomendados para você abaixo! 👇
                    </p>
                    <button
                        onClick={reiniciarQuiz}
                        style={{
                            marginTop: '16px',
                            padding: '10px 24px',
                            fontSize: '15px',
                            cursor: 'pointer',
                            borderRadius: '8px',
                            border: 'none',
                            backgroundColor: '#4a6fa5',
                            color: '#fff'
                        }}
                    >
                        Refazer Quiz
                    </button>
                </div>
            ) : (
                // TELA DE PERGUNTAS
                <div>
                    <p style={{ color: '#999', fontSize: '14px' }}>
                        Pergunta {perguntaAtual + 1} de {perguntasQuiz.length}
                    </p>
                    <h2>{perguntasQuiz[perguntaAtual].pergunta}</h2>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '10px',
                        marginTop: '20px'
                    }}>
                        {perguntasQuiz[perguntaAtual].opcoes.map((opcao, index) => (
                            <button
                                key={index}
                                onClick={() => lidarComResposta(opcao.id)}
                                style={{
                                    padding: '12px',
                                    textAlign: 'left',
                                    fontSize: '16px',
                                    cursor: 'pointer',
                                    borderRadius: '8px',
                                    border: '1px solid #ccc',
                                    backgroundColor: '#f8f9fa',
                                    transition: 'background-color 0.2s',
                                }}
                                onMouseEnter={e => e.target.style.backgroundColor = '#e8eaf6'}
                                onMouseLeave={e => e.target.style.backgroundColor = '#f8f9fa'}
                            >
                                <strong>{opcao.id}.</strong> {opcao.texto}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}