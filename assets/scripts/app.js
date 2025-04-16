let ATTACK_VALUE = 10;
let STRONG_ATTACK_VALUE = 20;

let MONSTER_ATTACK_VALUE = 14;
let HEAL_PLAYER_VALUE = 20;

let playerMaxHealth = 100;
let playerCurrentHealth = playerMaxHealth;
let monsterCurrentHealth = playerMaxHealth;



function attackMonster(mode) {
    return dealMonsterDamage(mode)
}

function attackPlayer(mode) {
    return dealPlayerDamage(mode)
}

function checkWinCase() {
    if(monsterCurrentHealth <= 0 && playerCurrentHealth >0) {
        alert('You Won!!!');
    } else if(monsterCurrentHealth > 0 && playerCurrentHealth <= 0 ) {
        alert('You Lose!!!');
    } else if(monsterCurrentHealth <= 0 && playerCurrentHealth <= 0) {
        alert('You have a Draw!!!');
    }
}


function attack() {
    const playerAttackIntensity = attackMonster(ATTACK_VALUE);
    monsterCurrentHealth -=  playerAttackIntensity;


    const monsterAttackIntensity = attackPlayer(MONSTER_ATTACK_VALUE);   
    playerCurrentHealth -= monsterAttackIntensity;
    checkWinCase();
}

function strongAttack() {
    const playerAttackIntensity = attackMonster(STRONG_ATTACK_VALUE);
    monsterCurrentHealth -=  playerAttackIntensity;


    const monsterAttackIntensity = attackPlayer(MONSTER_ATTACK_VALUE);   
    playerCurrentHealth -= monsterAttackIntensity;
    checkWinCase();
}

function healPlayer() {
    if(playerCurrentHealth === playerMaxHealth) {
        alert('Max Health Acheived');
    }    else if(playerCurrentHealth < playerMaxHealth - HEAL_PLAYER_VALUE) {
        increasePlayerHealth(HEAL_PLAYER_VALUE);
        playerCurrentHealth += HEAL_PLAYER_VALUE;
    } else  if(playerCurrentHealth > playerMaxHealth - HEAL_PLAYER_VALUE) {
        increasePlayerHealth(playerMaxHealth - playerCurrentHealth);
        playerCurrentHealth += playerMaxHealth - playerCurrentHealth;
    } 
    checkWinCase();
}


attackBtn.addEventListener('click', attack);
strongAttackBtn.addEventListener('click', strongAttack);
healBtn.addEventListener('click', healPlayer);