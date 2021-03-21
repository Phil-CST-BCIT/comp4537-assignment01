-- QUIZZES TABLE --
INSERT INTO quizzes(num_questions) VALUES(3);
INSERT INTO quizzes(num_questions) VALUES(4);

-- NUM_ANSWERS TABLE --
INSERT INTO num_answers(number) VALUES(2);
INSERT INTO num_answers(number) VALUES(3);
INSERT INTO num_answers(number) VALUES(4);

-- QUESTIONS TABLE --
INSERT INTO questions(quiz_id, question, num_answers_id, question_index) VALUES(1, "What was Vincent van Gogh?", 1, 1);
INSERT INTO questions(quiz_id, question, num_answers_id, question_index) VALUES(1, "What color is grass?", 2, 2);
INSERT INTO questions(quiz_id, question, num_answers_id, question_index) VALUES(1, "Inside which HTML element do we put the JavaScript?", 3, 3);

INSERT INTO questions(quiz_id, question, num_answers_id, question_index) VALUES(2, "Which of the following is not JavaScript Data Types?", 3, 1);
INSERT INTO questions(quiz_id, question, num_answers_id, question_index) VALUES(2, "Which company developed JavaScript?", 3, 2);
INSERT INTO questions(quiz_id, question, num_answers_id, question_index) VALUES(2, "Which of the following is correct about features of JavaScript?", 3, 3);
INSERT INTO questions(quiz_id, question, num_answers_id, question_index) VALUES(2, "Which of the following is not Javascript frameworks or libraries?", 3, 4);

-- CHOICES TABLE --
INSERT INTO choices(code) VALUES("A");
INSERT INTO choices(code) VALUES("B");
INSERT INTO choices(code) VALUES("C");
INSERT INTO choices(code) VALUES("D");

-- ANSERS TABLE --
-- INSERT INTO answers(question_id, quiz_id, answer, choice_id, is_solution) SELECT max(question_id), 1, "abc", 1, FALSE FROM questions;

INSERT INTO answers(question_id, quiz_id, answer, choice_id, is_solution) VALUES(1, 1, "banker", 1, FALSE);
INSERT INTO answers(question_id, quiz_id, answer, choice_id, is_solution) VALUES(1, 1, "artist", 2, TRUE);

INSERT INTO answers(question_id, quiz_id, answer, choice_id, is_solution) VALUES(2, 1, "WHITE", 1, FALSE);
INSERT INTO answers(question_id, quiz_id, answer, choice_id, is_solution) VALUES(2, 1, "GREEN", 2, TRUE);
INSERT INTO answers(question_id, quiz_id, answer, choice_id, is_solution) VALUES(2, 1, "RED", 3, FALSE);

INSERT INTO answers(question_id, quiz_id, answer, choice_id, is_solution) VALUES(3, 1, "script", 1, TRUE);
INSERT INTO answers(question_id, quiz_id, answer, choice_id, is_solution) VALUES(3, 1, "html", 2, FALSE);
INSERT INTO answers(question_id, quiz_id, answer, choice_id, is_solution) VALUES(3, 1, "body", 3, FALSE);
INSERT INTO answers(question_id, quiz_id, answer, choice_id, is_solution) VALUES(3, 1, "scripting", 4, FALSE);

INSERT INTO answers(question_id, quiz_id, answer, choice_id, is_solution) VALUES(4, 2, "Undefined", 1, FALSE);
INSERT INTO answers(question_id, quiz_id, answer, choice_id, is_solution) VALUES(4, 2, "Number", 2, FALSE);
INSERT INTO answers(question_id, quiz_id, answer, choice_id, is_solution) VALUES(4, 2, "Boolean", 3, FALSE);
INSERT INTO answers(question_id, quiz_id, answer, choice_id, is_solution) VALUES(4, 2, "Float", 4, TRUE);

INSERT INTO answers(question_id, quiz_id, answer, choice_id, is_solution) VALUES(5, 2, "Netscape", 1, TRUE);
INSERT INTO answers(question_id, quiz_id, answer, choice_id, is_solution) VALUES(5, 2, "Bell Labs", 2, FALSE);
INSERT INTO answers(question_id, quiz_id, answer, choice_id, is_solution) VALUES(5, 2, "Sun Microsystems", 3, FALSE);
INSERT INTO answers(question_id, quiz_id, answer, choice_id, is_solution) VALUES(5, 2, "IBM", 4, FALSE);

INSERT INTO answers(question_id, quiz_id, answer, choice_id, is_solution) VALUES(6, 2, "It can not Handling dates and time", 1, FALSE);
INSERT INTO answers(question_id, quiz_id, answer, choice_id, is_solution) VALUES(6, 2, "JavaScript is a OOP language", 2, TRUE);
INSERT INTO answers(question_id, quiz_id, answer, choice_id, is_solution) VALUES(6, 2, "JavaScript is not interpreter based scripting language", 3, FALSE);
INSERT INTO answers(question_id, quiz_id, answer, choice_id, is_solution) VALUES(6, 2, "All of the above", 4, FALSE);

INSERT INTO answers(question_id, quiz_id, answer, choice_id, is_solution) VALUES(7, 2, "Polymer", 1, FALSE);
INSERT INTO answers(question_id, quiz_id, answer, choice_id, is_solution) VALUES(7, 2, "Meteor", 2, FALSE);
INSERT INTO answers(question_id, quiz_id, answer, choice_id, is_solution) VALUES(7, 2, "Cassandra", 3, TRUE);
INSERT INTO answers(question_id, quiz_id, answer, choice_id, is_solution) VALUES(7, 2, "jQuery", 4, FALSE);
