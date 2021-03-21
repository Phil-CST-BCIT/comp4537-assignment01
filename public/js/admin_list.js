'use strict';

const checkBtn = document.getElementById('check-btn');

checkBtn.onclick = getQuizList;

/********************************************************
 *                 GET A LIST OF QUIZZES                       
 ********************************************************/

// displays the list of quizzes that are currently available in the server
// alerts if there is no available quiz
function getQuizList() {

    const METHOD = "GET";
    const HOST = "http://nameless-dusk-71668.herokuapp.com";
    const PATH = "/a1/api/lists";
    let endpoint = HOST+PATH;
    let numOfQuizzes = 0;
   
    let xhr = new XMLHttpRequest();

    xhr.open(METHOD, endpoint);

    xhr.onreadystatechange = function() {

        if(xhr.readyState === 4 && xhr.status === 200) {

            let obj = JSON.parse(xhr.response);
            
            numOfQuizzes = obj["n"]

            numOfQuizzes > 0 ? displayList(numOfQuizzes) : window.alert("No quiz is available\nPlease create")

            checkBtn.disabled = true;

        }
        
    }

    xhr.send();

}

// a helper function for displaying the list of quizzes
function displayList(n) {
        // we receive the number of quizzes and then we creates a ul with n li elements

        let ul = document.createElement('ul');

        // let num_quizzes = localStorage.get()
        // replace i with num_quizzes
    
        for(let i = 0; i < n; ++i) {
    
            let li = document.createElement('li');
            
            let content = `<button id=${i+1}>quiz ${i+1}</button>`;
            
            li.innerHTML = content;
            
            ul.append(li);
    
        } 
    
        let div = document.createElement('div');
        div.append(ul);
    
        document.getElementById('admin-list-main').append(div);

        addListeners(n);
}

// a helperfunction for adding a listener to a quiz button
function addListeners(n) {

    for(let i = 0; i < n; ++i) {
        let btn = document.getElementById(`${i+1}`);
        btn.addEventListener("click", () => { getQuiz(i+1) });
    }

}

/********************************************************
 *                  GET ONE QUIZ                       
 ********************************************************/

function clearDisplay() {

    document.getElementById('display-quiz').innerHTML = '';

}

function displayQuiz(quiz) {
    
    clearDisplay();

    for(let e of quiz) {

        let div = document.createElement('div');

        let p = document.createElement('p');

        let q = e['question'];

        p.innerHTML = q;

        div.append(p);

        for(let i = 0; i < e['answers'].length; ++i) {

            const A = 65;

            let innerP = document.createElement('p');

            let ans =  `${String.fromCharCode(A + i)}. ${e['answers'][i]['answer']}`;

            innerP.innerHTML = ans;

            div.append(innerP);

        }

        document.getElementById('display-quiz').append(div);

    }

}

// gets a quiz with a specific id
function getQuiz(id) {

    const METHOD = "GET";
    const HOST = "http://nameless-dusk-71668.herokuapp.com";
    const PATH = `/a1/api/lists/${id}`;
    let endpoint = HOST+PATH;
   
    let xhr = new XMLHttpRequest();

    xhr.open(METHOD, endpoint);

    xhr.onreadystatechange = function() {

        if(xhr.readyState === 4 && xhr.status === 200) {

            let quiz = JSON.parse(xhr.response);
            
            // console.log(quiz);

            displayQuiz(quiz);

        }
    }

    xhr.send();

}
