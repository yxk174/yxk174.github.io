// 游戏变量
let playerScore = 0;
let computerScore = 0;
let tieScore = 0;
let isAutoPlaying = false;
let autoPlayInterval;

// DOM元素
const playerScoreElement = document.getElementById('player-score');
const computerScoreElement = document.getElementById('computer-score');
const tieScoreElement = document.getElementById('tie-score');
const roundResultElement = document.getElementById('round-result');
const playerChoiceElement = document.getElementById('player-choice');
const computerChoiceElement = document.getElementById('computer-choice');
const rockButton = document.getElementById('rock');
const paperButton = document.getElementById('paper');
const scissorsButton = document.getElementById('scissors');
const resetButton = document.getElementById('reset-btn');
const autoPlayButton = document.getElementById('auto-play');

// 图标映射
const choiceIcons = {
    'rock': '<i class="far fa-hand-rock"></i>',
    'paper': '<i class="far fa-hand-paper"></i>',
    'scissors': '<i class="far fa-hand-scissors"></i>'
};

// 游戏逻辑
function getComputerChoice() {
    const choices = ['rock', 'paper', 'scissors'];
    const randomIndex = Math.floor(Math.random() * 3);
    return choices[randomIndex];
}

function determineWinner(playerChoice, computerChoice) {
    if (playerChoice === computerChoice) {
        return 'tie';
    }
    
    if (
        (playerChoice === 'rock' && computerChoice === 'scissors') ||
        (playerChoice === 'paper' && computerChoice === 'rock') ||
        (playerChoice === 'scissors' && computerChoice === 'paper')
    ) {
        return 'player';
    }
    
    return 'computer';
}

function updateScores(winner) {
    if (winner === 'player') {
        playerScore++;
        playerScoreElement.textContent = playerScore;
        roundResultElement.textContent = '你赢了！';
        roundResultElement.style.color = '#000';
    } else if (winner === 'computer') {
        computerScore++;
        computerScoreElement.textContent = computerScore;
        roundResultElement.textContent = '我赢了！';
        roundResultElement.style.color = '#000';
    } else {
        tieScore++;
        tieScoreElement.textContent = tieScore;
        roundResultElement.textContent = '平局！';
        roundResultElement.style.color = '#666';
    }
    
    // 添加动画效果
    roundResultElement.classList.remove('fade-in');
    void roundResultElement.offsetWidth; // 触发重排以重新启动动画
    roundResultElement.classList.add('fade-in');
}

function updateChoiceDisplay(playerChoice, computerChoice) {
    playerChoiceElement.innerHTML = choiceIcons[playerChoice];
    computerChoiceElement.innerHTML = choiceIcons[computerChoice];
    
    // 添加动画效果
    playerChoiceElement.classList.remove('pulse');
    computerChoiceElement.classList.remove('pulse');
    void playerChoiceElement.offsetWidth;
    void computerChoiceElement.offsetWidth;
    playerChoiceElement.classList.add('pulse');
    computerChoiceElement.classList.add('pulse');
}

    
    const computerChoice = getComputerChoice();
    const winner = determineWinner(playerChoice, computerChoice);
    
    updateChoiceDisplay(playerChoice, computerChoice);
    updateScores(winner);
}

// 重置游戏
function resetGame() {
    playerScore = 0;
    computerScore = 0;
    tieScore = 0;
    
    playerScoreElement.textContent = playerScore;
    computerScoreElement.textContent = computerScore;
    tieScoreElement.textContent = tieScore;
    
    roundResultElement.textContent = '游戏已重置，请选择你的出拳';
    roundResultElement.style.color = '#000';
    
    playerChoiceElement.innerHTML = '—';
    computerChoiceElement.innerHTML = '—';
    

// 事件监听
rockButton.addEventListener('click', () => playRound('rock'));
paperButton.addEventListener('click', () => playRound('paper'));
scissorsButton.addEventListener('click', () => playRound('scissors'));
resetButton.addEventListener('click', resetGame);
autoPlayButton.addEventListener('click', toggleAutoPlay);

// 键盘快捷键支持
document.addEventListener('keydown', (event) => {
    // 按R键选择石头
    if (event.key === 'r' || event.key === 'R') {
        playRound('rock');
        rockButton.classList.add('pulse');
        setTimeout(() => rockButton.classList.remove('pulse'), 300);
    }
    // 按P键选择布
    else if (event.key === 'p' || event.key === 'P') {
        playRound('paper');
        paperButton.classList.add('pulse');
        setTimeout(() => paperButton.classList.remove('pulse'), 300);
    }
    // 按S键选择剪刀
    else if (event.key === 's' || event.key === 'S') {
        playRound('scissors');
        scissorsButton.classList.add('pulse');
        setTimeout(() => scissorsButton.classList.remove('pulse'), 300);
    }
    // 按空格键重置游戏
    else if (event.key === ' ') {
        resetGame();
        resetButton.classList.add('pulse');
        setTimeout(() => resetButton.classList.remove('pulse'), 300);
    }
    // 按A键切换自动游戏
    else if (event.key === 'a' || event.key === 'A') {
        toggleAutoPlay();
        autoPlayButton.classList.add('pulse');
        setTimeout(() => autoPlayButton.classList.remove('pulse'), 300);
    }
});

// 平滑滚动导航
document.querySelectorAll('.nav-links a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// 初始化游戏
resetGame();
