const username = document.querySelector('#username')
const saveScoreBtn = document.querySelector('#saveScoreBtn');
const finalScore = document.querySelector('#finalScore');

const mostRecentScore = localStorage.getItem('mostRecentScore');
finalScore.innerHTML = mostRecentScore;

username.addEventListener('keyup',() => {
    saveScoreBtn.disabled = !username.value;
});
saveHighScore = (e) => {
    console.log("click! the save button");
    e.preventDefault();
}