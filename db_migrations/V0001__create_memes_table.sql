CREATE TABLE memes (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    image_url VARCHAR(500) NOT NULL,
    votes INTEGER DEFAULT 0,
    category VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_memes_votes ON memes(votes DESC);
CREATE INDEX idx_memes_category ON memes(category);

INSERT INTO memes (title, image_url, votes, category) VALUES
('Когда увидел цены на скины', 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=500', 420, 'Цены'),
('Трейд офферы быть как', 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=500', 666, 'Трейды'),
('Габен считает деньги', 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=500', 1337, 'Габен'),
('Скам 2024 edition', 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=500', 228, 'Скамы');
