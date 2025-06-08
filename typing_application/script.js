let type_content = document.querySelector('.type_content p');
let input = document.getElementById('typeValue');
let resetBtn = document.querySelector('.bottom_part button');
let soundBtn = document.querySelector('.sound input');
let t_left = document.querySelector('.t-left');
let error = document.querySelector('.error');
let wpm = document.querySelector('.wpm');
let cpm = document.querySelector('.cpm');

let letterIndex = 0, mistakes = 0, isTyping = false;
let time, maxTime = 60, timeLeft = maxTime;
let soundEnabled = true;

let correctType = new Audio('type.mp3');
let IncorrectType = new Audio('wrong.mp3');

soundBtn.addEventListener('click', () => {
    soundEnabled = soundBtn.checked;
});

const loadPara = () => {
    let random_Para = Math.floor(Math.random() * article.length);
    type_content.innerHTML = "";
    article[random_Para].split('').forEach(element => {
        type_content.innerHTML += `<span>${element}</span>`;
    });
    type_content.querySelectorAll('span')[0].classList.add('active');
    document.addEventListener('click', () => input.focus());
    type_content.addEventListener('click', () => input.focus());
};

const timeSetup = () => {
    if (timeLeft > 0) {
        timeLeft--;
        t_left.innerText = `Time-Left : ${timeLeft}S`;
        let elapsedTime = maxTime - timeLeft;
        let wpmVal = elapsedTime > 0 ? Math.round((letterIndex - mistakes) / 5 / elapsedTime * 60) : 0;
        wpm.innerText = `WPM : ${wpmVal}`;
    } else {
        clearInterval(time);
        input.value = "";
        input.disabled = true;
    }
};

input.addEventListener('input', (e) => {
    let char = type_content.querySelectorAll('span');
    let typedChar = e.target.value.split('')[letterIndex];

    if (!isTyping) {
        time = setInterval(timeSetup, 1000);
        isTyping = true;
    }

    if (letterIndex < char.length && typedChar != null) {
        if (typedChar === char[letterIndex].innerText) {
            char[letterIndex].classList.add('correct');
            if (soundEnabled) correctType.play();
        } else {
            char[letterIndex].classList.add('incorrect');
            mistakes++;
            if (soundEnabled) IncorrectType.play();
        }

        letterIndex++;
        char.forEach(span => span.classList.remove('active'));
        if (letterIndex < char.length) {
            char[letterIndex].classList.add('active');
        }
    } else if (typedChar == null && letterIndex > 0) {
        letterIndex--;
        if (char[letterIndex].classList.contains('incorrect')) mistakes--;
        char[letterIndex].classList.remove('correct', 'incorrect');
        char.forEach(span => span.classList.remove('active'));
        char[letterIndex].classList.add('active');
    }

    error.innerText = `Mistakes : ${mistakes}`;
    cpm.innerText = `CPM : ${letterIndex - mistakes}`;
});

resetBtn.addEventListener('click', () => {
    clearInterval(time);
    timeLeft = maxTime;
    letterIndex = mistakes = 0;
    isTyping = false;
    input.disabled = false;
    input.value = "";

    t_left.innerText = `Time-Left : ${timeLeft}S`;
    error.innerText = `Mistakes : 0`;
    wpm.innerText = `WPM : 0`;
    cpm.innerText = `CPM : 0`;

    loadPara();
});

document.addEventListener('DOMContentLoaded', () => {
    loadPara();
});
