CREATE TABLE boards (
	board_id SERIAL PRIMARY KEY NOT NULL,
	board_name VARCHAR(250) NOT NULL
)

ALTER TABLE tasks 
ADD COLUMN fk_board_id INTEGER REFERENCES boards(board_id) ON DELETE CASCADE