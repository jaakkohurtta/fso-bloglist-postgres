 CREATE TABLE blogs (id SERIAL PRIMARY KEY, author text, url text NOT NULL, title text NOT NULL, likes integer DEFAULT 0);

 INSERT INTO blogs (author, url, title) VALUES ('Jaakko Hurtta', 'https://jaakkohurtta.dev', 'From Zero To Hero With Fullstackopen.com');
 INSERT INTO blogs (author, url, title) VALUES ('Hanna Hurtta', 'https://hannansoppa.com', 'Hannan soppa');
