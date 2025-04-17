let ATTACK_VALUE = 10;
let STRONG_ATTACK_VALUE = 20;

let MONSTER_ATTACK_VALUE = 14;
let HEAL_PLAYER_VALUE = 20;

let maxHealth = 100;
let playerCurrentHealth = maxHealth;
let monsterCurrentHealth = maxHealth;
let hasBonusLife = true;


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
        ifBonusLife();
    } else {
        if(monsterCurrentHealth <= 0 && playerCurrentHealth > 0) {
            alert('You Won!!!');
            reset();
        } else if(monsterCurrentHealth > 0 && playerCurrentHealth <= 0 ) {
            alert('You Lose!!!');
            reset();
        } else if(monsterCurrentHealth <= 0 && playerCurrentHealth <= 0) {
            alert('You have a Draw!!!');
            reset();
        }
    }
}

function ifBonusLife() {
    alert('Opting for Bonus Life...');
    alert('Player Healed... :) ');
    healPlayer();
    hasBonusLife = !hasBonusLife;
    removeBonusLife(); 
}

function attackByPlayer(mode) {
    const playerAttackIntensity = attackMonster(mode);
    monsterCurrentHealth -=  playerAttackIntensity;
}

function attackByMonster(mode) {
    const monsterAttackIntensity = attackPlayer(mode);   
    playerCurrentHealth -= monsterAttackIntensity;
}

function attack() {
    attackByPlayer(ATTACK_VALUE);
    attackByMonster(MONSTER_ATTACK_VALUE);
    checkWinCase();
}

function strongAttack() {
    attackByPlayer(STRONG_ATTACK_VALUE);
    attackByMonster(MONSTER_ATTACK_VALUE);
    checkWinCase();
}

function healPlayer() {
    if(playerCurrentHealth === maxHealth) {
        alert('Max Health Acheived');
    } else if(playerCurrentHealth < maxHealth - HEAL_PLAYER_VALUE) {
        increasePlayerHealth(HEAL_PLAYER_VALUE);
        playerCurrentHealth += HEAL_PLAYER_VALUE;
    } else if(playerCurrentHealth > maxHealth - HEAL_PLAYER_VALUE) {
        increasePlayerHealth(maxHealth - playerCurrentHealth);
        playerCurrentHealth += maxHealth - playerCurrentHealth;
    } 
    checkWinCase();
}


attackBtn.addEventListener('click', attack);
strongAttackBtn.addEventListener('click', strongAttack);
healBtn.addEventListener('click', healPlayer);