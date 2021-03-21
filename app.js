const helpers = require('./lib/helpers');
const express = require('express');
const mysql = require('mysql2')
const app = express();

const pool = mysql.createPool({
    host: helpers.db_host,
    user: helpers.db_user,
    database: helpers.db_name,
    password: helpers.db_pwd,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  }).promise();

app.use(express.static('public'));

app.use(express.json())

app.get('/', (req, res) => { res.end(); });

app.get('/a1/api/lists', (req, res) => {

        // query the database and see if there is a quiz
        // if no available quiz, we send integer 0
        // if there are some quizzes in the databa, we send the number of quizzes
        // add routes for different requests

        const qry = `SELECT count(id) FROM quizzes `;

        let numOfQuizzes = 0;

        pool.execute(qry)
        .then(([data, metadata]) => { numOfQuizzes = data[0]['count(id)'] })
        .then(() => {

            res.set({
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            });
    
            let obj = {n: numOfQuizzes}
    
            console.log(obj)
            
            let reply = JSON.stringify(obj)
    
            res.send(reply);
    
        }) 
        .catch(() => { console.log("error in line 49")} );

    }
); // GET lists 

app.get('/a1/api/lists/:id', (req, res) => {

    // id is a string
    const id = req.params.id;

    const results = [];

    let str = '';

    // we go to database to get quiz with id
    const QRY = `SELECT * FROM quizzes as quiz
                            JOIN questions as ques 
                            ON quiz.id = ques.quiz_id 
                            JOIN answers as ans 
                            ON ques.question_id = ans.question_id 
                            WHERE quiz.id = ${id}`;

    pool.execute(QRY)
        .then(([data, metadata]) => {

            for(let e of data) {
                
                let q = { 
                            quizID: e['quiz_id'],
                            questionID: e['question_id'],
                            question: e['question'],
                            answer: e['answer'],
                            isKey: e['is_solution']
                        };

                results.push(q);
                console.log(q);
            }
            
        })
        .then( () => {

            let reply = helpers.buildJSON(results);

            res.set({
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            });
        
            res.send(reply)


        } )
        .catch(() => { console.log("Error in line 85"); });

}); // GET a quiz with id

async function insertQuestions(values) {

    const qry = `INSERT INTO questions(quiz_id, question, num_answers_id, question_index) VALUES ?`;

    await pool.query(qry, [values]);

}

async function insertAnswers(values) {

    const qry = `INSERT INTO answers(question_id, quiz_id, answer, choice_id, is_solution) VALUES ?;`;

    await pool.query(qry, [values]);

}

app.post('/a1/api/questions', (req, res) => {
    
    // how many questions?
    // which quiz id?

    const body = req.body;

    let numOfQuestions = body.length;

    const insertQuiz = `INSERT INTO quizzes(num_questions) VALUES(${numOfQuestions});`; 

    pool.execute(insertQuiz)
        .then(() => {

            const maxQuizID =  `SELECT max(id) FROM quizzes;`;
            const maxQuestionID = `SELECT max(question_id) FROM questions;`;

            let quizID = 0;
            let questionID = 0;

            pool.execute(maxQuizID)
                .then(([data, metadata]) => { 
                
                    quizID = data[0]['max(id)'];

                    return helpers.buildQuestionValues(quizID, body);
                
                })
                .then((results) => {
                    insertQuestions(results);
                })
                .then(() => {

                    pool.execute(maxQuestionID)
                        .then((data, metadata) => { 

                            questionID = data[0][0]['max(question_id)'] - (numOfQuestions - 1);

                            return helpers.buildAnswerValues(questionID ,quizID, body);
        
                        })
                        .then((values) => { insertAnswers(values); }) 
                        .catch(() => {console.log("Error in line 166")});
                })
                .catch((err) => console.log("Error in line 168"));

        })
        .catch(() => console.log("Error in line 171") )
    

    res.set({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    });

    let obj = {ok: "ok"}
    let reply = JSON.stringify(obj)

    res.send(reply)
}); // POST requests for creating quiz questions

app.listen(8000, () => {console.log("listening on port 8000")});