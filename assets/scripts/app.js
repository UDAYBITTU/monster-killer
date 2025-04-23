let ATTACK_VALUE = 10;
let STRONG_ATTACK_VALUE = 20;

let MONSTER_ATTACK_VALUE = 14;
let HEAL_PLAYER_VALUE = 20;

let enteredMaxHealth = prompt('Enter the Max Health for Player and the Monster', 100);
//prompt takes input from the user based on certain messages and returns the values
let maxHealth = enteredMaxHealth;
let playerCurrentHealth = maxHealth;
let monsterCurrentHealth = maxHealth;
let hasBonusLife = true;

const wonMsg = 'You Won!!!';
const loseMsg = 'You Lose!!!';
const drawMsg = 'You have a Draw!!!';
const bonusLifeMsg = 'Opting for Bonus Life...';
const playerHealedMsg = 'Player Healed... :) ';
const maxHealthAchievedMsg = 'Max Health Acheived';

const LOG_PLAYER_ATTACK = 'PLAYER_ATTACK';
const LOG_MONSTER_ATTACK = 'MONSTER_ATTACK';
const LOG_PLAYER_STRONG_ATTACK = 'PLAYER_STRONG_ATTACK';
const LOG_HEAL_PLAYER = 'HEAL_PLAYER';
const LOG_GAME_OVER = 'GAME_OVER';
let battleLog = [];

function attackMonster(mode) {
    return dealMonsterDamage(mode)
}

function attackPlayer(mode) {
    return dealPlayerDamage(mode)
}

function reset() {
    playerCurrentHealth = maxHealth;
    monsterCurrentHealth = maxHealth;
    resetGame(maxHealth);
    console.log(playerCurrentHealth);
    console.log(monsterCurrentHealth);
}

function checkWinCase() {
    if(hasBonusLife && playerCurrentHealth <= 0) {
        console.log('if case');
        
        ifBonusLife();
    } else {
        if(monsterCurrentHealth <= 0 && playerCurrentHealth > 0) {
            alert(wonMsg);
        } else if(monsterCurrentHealth > 0 && playerCurrentHealth <= 0 ) {
            alert(loseMsg);
        } else if(monsterCurrentHealth <= 0 && playerCurrentHealth <= 0) {
            alert(drawMsg);
        }

        if(monsterCurrentHealth <= 0 || playerCurrentHealth <= 0)
        {
            battleLog = [];
            reset();
        }
    }
}

function ifBonusLife() {
    alert(bonusLifeMsg);
    alert(playerHealedMsg);
    healPlayer();
    hasBonusLife = !hasBonusLife;
    removeBonusLife(); 
}

function attackByPlayer(attackValue) {
    const playerAttackIntensity = attackMonster(attackValue);
    monsterCurrentHealth -=  playerAttackIntensity;
    return playerAttackIntensity;
}

function attackByMonster(attackValue) {
    const monsterAttackIntensity = attackPlayer(attackValue);   
    playerCurrentHealth -= monsterAttackIntensity;
}

function attack() {
    let attackIntensity = attackByPlayer(ATTACK_VALUE);
    attackByMonster(MONSTER_ATTACK_VALUE);
    showLog(LOG_PLAYER_ATTACK, attackIntensity);
    checkWinCase();
}

function strongAttack() {
    let attackIntensity =  attackByPlayer(STRONG_ATTACK_VALUE);
    attackByMonster(MONSTER_ATTACK_VALUE);
    showLog(LOG_PLAYER_STRONG_ATTACK, attackIntensity);
    checkWinCase();
}

function healPlayer() {
    if(playerCurrentHealth >= maxHealth) {
        alert(maxHealthAchievedMsg);
    } else if(playerCurrentHealth < maxHealth - HEAL_PLAYER_VALUE) {
        increasePlayerHealth(HEAL_PLAYER_VALUE);
        playerCurrentHealth += HEAL_PLAYER_VALUE;
        showLog(LOG_HEAL_PLAYER, HEAL_PLAYER_VALUE);
    } else if(playerCurrentHealth > maxHealth - HEAL_PLAYER_VALUE) {
        increasePlayerHealth(maxHealth - playerCurrentHealth);
        playerCurrentHealth += maxHealth - playerCurrentHealth;
        showLog(LOG_HEAL_PLAYER, HEAL_PLAYER_VALUE);
    } 
    checkWinCase();
}

function showLog(event, value) {
    let logEntry = {
        event: event,
        value: value,
        finalMonsterHealth: monsterCurrentHealth,
        finalPlayerHealth: playerCurrentHealth,
    };
    // switch(event) {
    //     case 'PLAYER_ATTACK': 
    //         logEntry.event = event;
    //         logEntry.value = value;
    //         logEntry.finalMonsterHealth = monsterCurrentHealth;
    //         logEntry.finalPlayerHealth = playerCurrentHealth;
    //         break;
    //     case 'PLAYER_STRONG_ATTACK': 
    //         logEntry.event = event;
    //         logEntry.value = value;
    //         logEntry.finalMonsterHealth = monsterCurrentHealth;
    //         logEntry.finalPlayerHealth = playerCurrentHealth;
    //         break;
    //     case 'HEAL_PLAYER': 
    //         logEntry.event = event;
    //         logEntry.value = value;
    //         logEntry.finalMonsterHealth = monsterCurrentHealth;
    //         logEntry.finalPlayerHealth = playerCurrentHealth;
    //         break;
    //     case 'GAME_OVER': 
    //         logEntry.event = event;
    //         logEntry.value = value;
    //         logEntry.finalMonsterHealth = monsterCurrentHealth;
    //         logEntry.finalPlayerHealth = playerCurrentHealth;
    // }
    battleLog.push(logEntry);
    console.log(battleLog);
    
}


attackBtn.addEventListener('click', attack);
strongAttackBtn.addEventListener('click', strongAttack);
healBtn.addEventListener('click', healPlayer);
logBtn.addEventListener('click', showLog);