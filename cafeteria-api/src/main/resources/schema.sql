CREATE TABLE IF NOT EXISTS documentos (
    id BIGSERIAL PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    conteudo TEXT NOT NULL,
    categoria VARCHAR(100) NOT NULL,
    embedding vector(768)
);

CREATE INDEX IF NOT EXISTS idx_documentos_embedding
    ON documentos USING ivfflat (embedding vector_cosine_ops) WITH (lists = 10);
