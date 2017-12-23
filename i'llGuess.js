let Game=function(){
  this.multiplier=this.getRandomMultiplier();
  this.number=this.getRandomEvenNumber();
  this.steps=[];
  this.steps.push("Choose any number.");
  this.steps.push("Multiply that number with "+this.multiplier+".");
  this.steps.push("Add "+this.number+" to the result.");
  this.steps.push("Divide the result with "+this.multiplier+".");
  this.steps.push("Now subtract the number you have choosed from the result.");
  this.steps.push("I think the Result is "+this.number/this.multiplier+".");
  this.currentStepIndex=0;
};
Game.prototype.getRandomEvenNumber = function() {
  let randomNumber;
  do {
    randomNumber = Math.floor(Math.random() * 100);
  } while (randomNumber % this.multiplier != 0)
  return randomNumber;
};

Game.prototype.getRandomMultiplier = function() {
  return Math.floor(Math.random() * (11 - 2) + 2);
};

Game.prototype.getStep=function(){
  let step=this.steps[this.currentStepIndex];
  this.currentStepIndex++;
  return step;
};
Game.prototype.isDone=function(){
  return this.currentStepIndex==6;
}

let game=new Game();

const getGameStatus=function(){
  let gameStatus="";
  if(game.isDone()){
    gameStatus="isDone";
  }
  else{
    gameStatus="isOn";
  }
  return gameStatus;
};

const disableNext=function(){
  document.getElementById('Next').disabled=true;
};

const enableReset=function(){
  document.getElementById('reset').disabled=false;
};

let action={};

action.isDone=function() {
  disableNext();
  enableReset();
};

action.isOn=function() {
};

const updateDisplay=function(text){
  document.getElementById('Display').innerText=text;
};

const reloadGame=function(){
  window.location.reload();
};

const getSteps=function(){
  let step=game.getStep();
  if(step==undefined){
    return;
  }
  if(game.currentStepIndex!=6){
    updateDisplay("Step "+game.currentStepIndex+":  "+step);
  }
  else{
    updateDisplay(step);
  }
  action[getGameStatus()]();
};

const handleClickEvent=function(){
  getSteps();
};

const addClickListenerToButton=function() {
  let reset=document.getElementById('reset');
  let next=document.getElementById('Next');
  reset.onclick=reloadGame;
  reset.disabled=!reset.disabled;
  next.onclick=handleClickEvent;
};

const startGame=function() {
  getSteps();
  addClickListenerToButton();
};

window.onload=startGame;
