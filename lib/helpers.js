'use strict'

// data base credentials
// deleted......

// creates a set of unique questions
function dedup(questions) {
    let set = new Set();

    for(let e of questions) {

        set.add(e['question']);

    }

    return set;
}

// creates a json string from an array of question objects
// " [ { "qustions": "question", "answers": "anss",  "quizID": "quiz_id", "questionID": "question_id" }, ... ] "
function buildJSON(questions) {

    let set = dedup(questions);

    let arr = [];

    // x is a unique question
    for(let x of set) {

        let anss = [];

        let obj = {};

        for(let y of questions) {

            // if questions are the same one
            if(x === y['question']) {
            
                // gets answer in y
                let answer = { answer: y['answer'], isKey: y['isKey'] }
            
                // add it to answers
                anss.push(answer);

                obj['quizID'] = y['quizID'];

                obj['questionID'] = y['questionID'];
            
            }
        }

        obj['question'] = x;

        obj['answers'] = anss;

        arr.push(obj);
    }

    return JSON.stringify(arr);

}

// creates a 2-D array of questions, 
// the array looks like this [[q1], [q2]...]
function buildQuestionValues(id, body) {

    let values = [];

    let i = 1;

    for(let e of body) {

        let numChoicesId = e['mc']['numChoices'] - 1;

        let v = [id, e['mc']['question'], numChoicesId, i]
        
        values.push(v);

        i++;
    }

    // console.log(values);

    return values;
}

// craetes a 2-D array of answers
function buildAnswerValues(questionId, quizId, body) {

    let values = [];


    for(let e of body) {

        let answers = e['mc']['choices'];

        let key = e['mc']['key'].charCodeAt(0) - 96;

        let i = 1;

        for(let ans of answers) {
            
            let isKey = false;

            if( i === key ) {
                isKey = true;
            }

            let v = [ questionId, quizId, ans[`${i}`], i, isKey ];

            values.push(v);

            ++i;
        }

        questionId++;

    } 

    // console.log(values);

    return values;
}

module.exports.db_host = db_host;

module.exports.db_user = db_user;

module.exports.db_pwd = db_pwd;

module.exports.db_name = db_name;

module.exports.buildJSON = buildJSON;

module.exports.buildQuestionValues = buildQuestionValues;

module.exports.buildAnswerValues = buildAnswerValues;