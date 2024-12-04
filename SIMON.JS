let gameSeq=[];
let userSeq=[];

let btns=["yellow","red","purple","green"];

let started=false;
let level=0;


// Initialize high score
let highScore = 0;

let h2=document.querySelector("h2");

let highScoreDisplay = document.querySelector(".high-score"); // Add a span with this class in your HTML to show high score
highScoreDisplay.innerHTML = `<b>High Score: ${highScore}</b>`;;

document.addEventListener("keypress",function(){
   if(started==false){
    console.log("game is started");//taki bs ek bar game is stated print ho
    started=true;

    levelUp();
   }
  
});

//jb game start ho to uska flash
function gameFlash(btn){
btn.classList.add("flash");//phle white krne ke liye
setTimeout(function(){
    btn.classList.remove("flash");
},250)//phle white then 1s bad waps normal to flash wala feel dega
}

//jb user press kre to uska flash
function userflash(btn){
    btn.classList.add("userflash");//phle white krne ke liye
    setTimeout(function(){
        btn.classList.remove("userflash");
    },250)//phle white then 1s bad waps normal to flash wala feel dega
    }


function levelUp(){
    userSeq=[];//taaki jaise hi level badhe user ko start s click krna pade
    level++;//level badhane ke liye
h2.innerText=`Level ${level}`;//start hone pr text chhange krne ke liye

//random button flash
let randomIdx=Math.floor(Math.random()*3);
let randColor=btns[randomIdx];
let randBtn=document.querySelector(`.${randColor}`);

gameSeq.push(randColor);
console.log(gameSeq);
// console.log(randomIdx);
// console.log(randColor);
// console.log(randBtn);
gameFlash(randBtn);

}


//to check the sqquence of colours
function checkAns(idx){
    // console.log("curr level  :",level);

    if(userSeq[idx]===gameSeq[idx]){
        if(userSeq.length==gameSeq.length){
            setTimeout(levelUp,1000);
        }
    } else{
        h2.innerHTML=`Game Over!  Your score was <b>${level}</b> <br>Press any key to start.`;
        document.querySelector("body").style.backgroundColor="red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor="white";
        },150);

          // Update high score if necessary
    if (level > highScore) {
        highScore = level; // Update the high score
        highScoreDisplay.innerHTML = `<b>High Score: ${highScore}</b>`; // Update high score display
      }

        reset();//agr seq mismatch huwa to game failed
    }
}


//buttn press wlaa sram kam idhr hai
function btnPress(){
 console.log(this);
  let btn=this;
  userflash(btn);

  userColor=btn.getAttribute("id");
  userSeq.push(userColor);

  checkAns(userSeq.length-1);
}

let allBtns=document.querySelectorAll(".btn");
for(btn of allBtns){
    btn.addEventListener("click",btnPress);
}


function reset(){
    started=false;
    gameSeq=[];
    userSeq=[];
    level=0;
}