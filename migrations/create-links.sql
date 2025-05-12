CREATE TABLE IF NOT EXISTS Links (
    description text NOT NULL,
    url text NOT NULL,
    customUrl text NOT NULL,
    user_id INTEGER REFERENCES users(id),

    PRIMARY KEY (user_id, customUrl)
);

ALTER TABLE Links ADD CONSTRAINT constraint_name UNIQUE (user_id, customUrl);