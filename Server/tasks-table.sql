CREATE TABLE tasks (
	task_id SERIAL PRIMARY KEY,
	name VARCHAR(250) NOT NULL,
	description VARCHAR(1000) NOT NULL
);

Select * From tasks;

ALTER TABLE tasks
ADD COLUMN status VARCHAR(30) NOT NULL DEFAULT 'todo';