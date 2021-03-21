CREATE DATABASE IF NOT EXISTS comp4537_a1;

USE comp4537_a1;

-- DROP TABLE IF EXISTS solutions;
DROP TABLE IF EXISTS answers;
DROP TABLE IF EXISTS choices;
DROP TABLE IF EXISTS questions;
DROP TABLE IF EXISTS num_answers;
DROP TABLE IF EXISTS quizzes;

CREATE TABLE IF NOT EXISTS quizzes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    num_questions INT NOT NULL
);

CREATE TABLE IF NOT EXISTS num_answers (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    number INT NOT NULL
);

CREATE TABLE IF NOT EXISTS questions(
    question_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT, 
    quiz_id INT NOT NULL,
    num_answers_id INT NOT NULL,
    question VARCHAR(255) NOT NULL,
    question_index INT NOT NULL,

    FOREIGN KEY fk_questions_quizzes (quiz_id)
        REFERENCES quizzes(id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,

    FOREIGN KEY fk_questions_answers (num_answers_id)
        REFERENCES num_answers(id)
        ON UPDATE CASCADE
        ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS choices(
    choice_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    code VARCHAR(2) NOT NULL
);

CREATE TABLE IF NOT EXISTS answers(
    answer_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    question_id INT NOT NULL,
    quiz_id INT NOT NULL,
    choice_id INT NOT NULL,
    answer VARCHAR(255) NOT NULL,
    is_solution BOOLEAN NOT NULL,
    
    FOREIGN KEY fk_answers_questions (question_id)
        REFERENCES questions(question_id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,

    FOREIGN KEY fk_answers_quizzes (quiz_id)
        REFERENCES quizzes(id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    
    FOREIGN KEY fk_answers_choices (choice_id)
        REFERENCES choices(choice_id)
        ON UPDATE CASCADE
        ON DELETE CASCADE
);

-- CREATE TABLE IF NOT EXISTS solutions(
--     id INT PRIMARY KEY AUTO_INCREMENT,
--     quiz_id INT NOT NULL,
--     question_id INT NOT NULL,
--     solution VARCHAR(255)

--     FOREIGN KEY fk_solutions_questions (question_id)
--         REFERENCES questions(question_id)
--         ON UPDATE CASCADE
--         ON DELETE CASCADE
    
--     FOREIGN KEY fk_solutions_quizzes (quiz_id)
--         REFERENCES quizzes(id)
--         ON UPDATE CASCADE
--         ON DELETE CASCADE
-- );
