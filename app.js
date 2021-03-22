const helpers = require('./lib/helpers');
const express = require('express');
const mysql = require('mysql2')
const app = express();
const PORT = process.env.PORT || 5000

const pool = mysql.createPool({
    host: helpers.db_host,
    user: helpers.db_user,
    database: helpers.db_name,
    password: helpers.db_pwd,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  }).promise();

// middle ware for serving static files
app.use(express.static('public'));

// middle ware for parsing request body in json format
app.use(express.json())

app.get('/', (req, res) => { 
    res.end(); 
});

// handles requests for the total number of quizzes in the database
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
        .catch(() => { console.log("error in line 57")} );

    }
); // GET lists 

// handles requests for a specific quiz
app.get('/a1/api/lists/:id', (req, res) => {

    // id is a string
    const id = req.params.id;

    const results = [];

    let str = '';

    // we go to database to get the quiz with a specific id
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
        .catch(() => { console.log("Error in line 111"); });

}); // GET a quiz with id

// insert one or many questions into the database
async function insertQuestions(values) {

    const qry = `INSERT INTO questions(quiz_id, question, num_answers_id, question_index) VALUES ?`;

    await pool.query(qry, [values]);

}

// insert one ore many answers into the database
async function insertAnswers(values) {

    const qry = `INSERT INTO answers(question_id, quiz_id, answer, choice_id, is_solution) VALUES ?;`;

    await pool.query(qry, [values]);

}

// handles post requests for storing a quiz
app.post('/a1/api/questions', (req, res) => {
    
    const body = req.body;

    let numOfQuestions = body.length;

    const insertQuiz = `INSERT INTO quizzes(num_questions) VALUES(${numOfQuestions});`; 

    // inserts one quiz with num_questions
    pool.execute(insertQuiz)
        .then(() => {

            const maxQuizID =  `SELECT max(id) FROM quizzes;`;
            const maxQuestionID = `SELECT max(question_id) FROM questions;`;

            let quizID = 0;
            let questionID = 0;

            // when insertQuiz succeeds, we check the id of the inserted quiz
            pool.execute(maxQuizID)
                .then(([data, metadata]) => { 
                
                    quizID = data[0]['max(id)'];

                    // prepare question values for insert opearation
                    return helpers.buildQuestionValues(quizID, body);
                
                })
                .then((results) => {

                    // when the values are ready, we insert
                    insertQuestions(results);
                })
                .then(() => {

                    // get the id of the last inserted qustion
                    pool.execute(maxQuestionID)
                        .then((data, metadata) => { 

                            // the id of the first inserted question
                            questionID = data[0][0]['max(question_id)'] - (numOfQuestions - 1);

                            // prepare values for answers
                            return helpers.buildAnswerValues(questionID ,quizID, body);
        
                        })
                        .then((values) => { insertAnswers(values); }) 
                        .catch(() => {console.log("Error in line 181")});
                })
                .catch((err) => console.log("Error in line 183"));

        })
        .catch(() => console.log("Error in line 186") )
    

    res.set({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    });

    let obj = {ok: "ok"}
    let reply = JSON.stringify(obj)

    res.send(reply)
}); // POST requests for creating quiz questions

app.listen(PORT, () => console.log(`Listening on ${ PORT }`));