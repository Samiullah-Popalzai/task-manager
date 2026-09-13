CREATE TABLE IF NOT EXISTS tasks(
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    completed BOOLEAN
);


INSERT INTO tasks(title,description,completed) VALUES
('Learn React', 'Practice React components and state', false),
    ('Build REST API', 'Create the task management API', false),
    ('Learn PostgreSQL', 'Practice PostgreSQL queries', true);