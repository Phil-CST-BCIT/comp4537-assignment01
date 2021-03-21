'use strict'

// no questions are created, we don't need to ask the user for data loss
// some questions are created, we need to ask the user to confirm
// store questions in local storage
// if yes delete local storage
// localStorage.setItem("cat", "tom")

/*********************
 ***** constants *****
 *********************/
const ADD_BTN = document.getElementById("add");
const SUBMIT_BTN = document.getElementById("submit");
const QUESTION_AREA = document.getElementById("question");
const RADIO_A = document.getElementById("a");
const RADIO_B = document.getElementById("b");
const RADIO_C = document.getElementById("c");
const RADIO_D = document.getElementById("d");
const ANSWER_A = document.getElementById("ans-a");
const ANSWER_B = document.getElementById("ans-b");
const ANSWER_C = document.getElementById("ans-c");
const ANSWER_D = document.getElementById("ans-d");

/********************
 * global variables *
 ********************/

let myId = 0;

// checks if a user is going to leave the page without submitting all the questions

window.onunload = () => {

    let n = localStorage.length;

    // delete everything
    // localStorage.removeItem("cat")
    for(let i = 1; i <= n; ++i) {
            
        let key = i.toString();
    
        localStorage.removeItem(key);
    
    } 
        
}
 

// a helper function that checks the number of options a user entered
// returns true if there are 2 or more options entered by a user
function isValidNumOpt() {
    
    const totalOpt = 4;

    const atLeast = 2;

    let container = [ANSWER_A.value, ANSWER_B.value, ANSWER_C.value, ANSWER_D.value];

    let counter = 0;

    for(let i = 0; i < totalOpt; ++i) {
        if(container[i]) 
            counter++;
    }

    return counter >= atLeast;

}

// a helper function that gets the key in [ a, b, c, d ]
function getKey() {

    if(RADIO_A.checked) 
        return RADIO_A.value;
    else if (RADIO_B.checked) 
        return RADIO_B.value;
    else if (RADIO_C.checked)
        return RADIO_C.value;
    else if (RADIO_D.checked)
        return RADIO_D.value
    else
        return new Error("invalid key");

}

// a helper funtion that checks if a select radio button has an input value
// returns true if a checed radio button has an input value
function isKeyOptMatch() {

    const key = getKey();

    switch(key) {
        case "a":
            return ANSWER_A.value !== "";
        case "b":
            return ANSWER_B.value !== "";
        case "c":
            return ANSWER_C.value !== "";
        case "d":
            return ANSWER_D.value !== "";
    }

}

// a helper function that sets the checked attribute of each radio button to false
// clears all the text input
function clearInputFields() {
    
    let radioBtns = document.getElementsByName("alt");
    
    for(let i = 0; i < radioBtns.length; ++i)
        radioBtns[i].checked = false;

    QUESTION_AREA.value = "";
    ANSWER_A.value = "";
    ANSWER_B.value = "";
    ANSWER_C.value = "";
    ANSWER_D.value = "";

}

// a helper function that returns the number of answers for the incoming question
function getNumChoices(choices) {

    let counter = 0;

    let i = 1;

    for(let v of choices) {
        
        if(v[`${i}`])
            ++counter; 

        ++i;
    }

    return counter;

}

// a helper function that filters out answers with an empty string.
function validChoices(choices) {

    let myChoices = [];

    let i = 1;

    for(let v of choices) {
        if(v[`${i}`])
            myChoices.push(v);

        ++i;
    }

    return myChoices;
}

// stores a question with its answers to local storage
function storeToLocal() {

    // gets question
    // gets key
    // gets each answer
    // creates js obj
    // turns the obj into json
    // stores it

    myId = myId + 1;

    let myQuestion = QUESTION_AREA.value;
    
    let myKey = getKey();

    let myChoices = [{1: ANSWER_A.value}, {2: ANSWER_B.value}, {3: ANSWER_C.value}, {4: ANSWER_D.value}];

    let myNumChoices = getNumChoices(myChoices);

    myChoices = validChoices(myChoices);

    let obj = {mc: {question: myQuestion, choices: myChoices, numChoices: myNumChoices, key: myKey}}

    let myJSOBJ = JSON.stringify(obj)

    let key = myId.toString();

    localStorage.setItem(key, myJSOBJ)

    // console.log(obj)
}

// prompts a specific message to a user if the user didn't follow the instructions
function inputValidation() {

    if(!QUESTION_AREA.value) {
        alert("Question area is empty")
        return;
    } else if (!(RADIO_A.checked || RADIO_B.checked || RADIO_C.checked || RADIO_D.checked)) {
        alert("Radio button is not selected");
        return;
    } else if (!isValidNumOpt()) {
        alert("Must have >= 2 answers");
        return;
    } else if (!isKeyOptMatch()) {
        alert("The key and the answer body must match!");
        return;
    } else {
        alert("One question is stored.");
        storeToLocal();
        return;
    }
}

function getMCS() {

    let array = [];

    let length = localStorage.length;

    for(let i = 1; i <= length; ++i) {
        
        let key = i.toString();

        let json = localStorage.getItem(key)

        let obj = JSON.parse(json)

        array.push(obj);

    } 

    return JSON.stringify(array);
}

/***************************************************************
 *************** ADD BUTTON IS CLICKED *************************
 ***************************************************************/
ADD_BTN.addEventListener("click", () => { add(); });

function add() {

    inputValidation();

    clearInputFields();

}

/***************************************************************
 *************** SUBMIT BUTTON IS CLICKED **********************
 ***************************************************************/
SUBMIT_BTN.addEventListener( "click", () => { submit(); } );

function submit() {

    // get all the items in local storage
    // create xhr object
    // POST method

    const METHOD = "POST";
    const HOST = "https://nameless-dusk-71668.herokuapp.com";
    const PATH = "/a1/api/questions";
    let endpoint = HOST+PATH;
    let body = getMCS();

    console.log(body)
    
    let xhr = new XMLHttpRequest();

    xhr.open(METHOD, endpoint);

    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.send(body);

    xhr.onload = function() {
        if(xhr.status != 200) {
            console.log(`Error ${xhr.status}: ${xhr.statusText}`);
        } else {
            console.log(xhr.response);
            window.location.reload();
        }
    }
}
