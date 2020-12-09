const question = document.querySelector('#question');
const choices = document.querySelectorAll('.choice-text');
const questionCounterText = document.querySelector('#questionCounter');
const scoreText = document.querySelector('#score');

let currentQuestion = {};
let acceptingAnswers = true; 
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
    {
        question: "전민재의 생일은 몇월?",
        choice1: "3월",
        choice2: "6월",
        choice3: "9월",
        choice4: "12월",
        answer: 3
    },
    {
        question: "전민재의 거주 지역은?",
        choice1: "수원",
        choice2: "서울",
        choice3: "인천",
        choice4: "대구",
        answer: 2
    },
    {
        question: "전민재가 원하는 직업은?",
        choice1: "경찰",
        choice2: "군인",
        choice3: "개발자",
        choice4: "바이럴마케팅",
        answer: 3
    },
    {
        question: "전민재의 취미가 아닌 것은?",
        choice1: "게임",
        choice2: "헬스",
        choice3: "축구",
        choice4: "독서",
        answer: 4
    },
    {
        question: "전민재가 현재 공부하고 있는 언어는?",
        choice1: "C언어",
        choice2: "JAVA",
        choice3: "PYTHON",
        choice4: "REACT",
        answer: 4
    },
]

//CONSTANTS
const CORRECT_BOUNS = 20;
const MAX_QUESTIONS = 5;

//새 게임 시작
startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [ ...questions ];
    console.log(availableQuestions);
    getNewQuestion();
};

//새로운 문제 출력
getNewQuestion = () => {

    //window.location.assign 새로운 브라우저 불러오기
    if(availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS){
        return window.location.assign("./end.html");
    }

    questionCounter++;
    questionCounterText.innerText = `${questionCounter} / ${MAX_QUESTIONS}`;

    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerHTML = currentQuestion.question;

    choices.forEach( choice => {
        const number = choice.dataset['number'];
        choice.innerHTML = currentQuestion['choice' + number ];
    });

    availableQuestions.splice(questionIndex, 1);

    acceptingAnswers = true;
}

choices.forEach( choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return;

        acceptingAnswers = false;

        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];

        let classToApply = 
            selectedAnswer == currentQuestion.answer ?
            'correct' : 'incorrect';

        if (classToApply === 'correct'){
            incrementScore(CORRECT_BOUNS);
        }

        selectedChoice.parentElement.classList.add(classToApply);
        
        setTimeout( () => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        },1000);
    })
});

//점수 증가
incrementScore = num => {
    score = score + num;
    scoreText.innerText = score;
}
startGame(); //게임 실행