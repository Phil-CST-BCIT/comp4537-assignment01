'use strict'

const db_host = 'comp4537-a1.cqkftvocleh3.ca-central-1.rds.amazonaws.com';

const db_user = 'admin';

const db_name = 'comp4537_a1';

const db_pwd = '4BV5SlUNhYGD367W3gaz';

function dedup(questions) {
    let set = new Set();

    for(let e of questions) {

        set.add(e['question']);

    }

    return set;
}

function buildJSON(questions) {

    let set = dedup(questions);

    let arr = [];

    for(let x of set) {

        let anss = [];

        let obj = {};

        for(let y of questions) {

            if(x === y['question']) {
            
                let answer = { answer: y['answer'], isKey: y['isKey'] }
            
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