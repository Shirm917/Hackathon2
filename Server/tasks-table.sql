CREATE TABLE tasks (
	task_id SERIAL PRIMARY KEY,
	name VARCHAR(250) NOT NULL,
	description VARCHAR(1000) NOT NULL
);

SELECT * FROM tasks;