let cursor = document.createElement("img");
let popSound = new Audio("pop.mp3");
$(cursor).attr("src","img/rasp.png")
          .css({
            "height" : "50px",
            "position" : "absolute",
          })
          .appendTo($("body"));
          
$(document).mousemove(moveCursor);

function moveCursor(e){
  e.preventDefault();
  $(cursor).css({
    "top" : (e.clientY + 1) + "px",
    "left" : (e.clientX + 5) + "px",
  })
}

let windowBorder = document.querySelector(".windowBorder");
$(windowBorder).css({
      "position" : "fixed",
      "top" : "0",
      "left" : "0",
      "height" : document.documentElement.clientHeight,
      "width" : document.documentElement.clientWidth,
      "overflow" : "hidden",
      //"background" : "cyan",
})
/*function randomSpeedf(){
  return Math.round(Math.random(1, 100)*10);
}
let virusISpeed = setInterval(randomSpeedf, 800);*/

let virusInterval = setInterval(createVirus, 800);
let virusKilled = 0;

function createVirus(){
  let virus = document.createElement("img");
  if  ($(windowBorder).children().length >= 15){
    return;
  }
  $(virus).attr("src", "img/corona.png")
          .css({
            "height" : "100px",
            "width" : "100px",
            "position" : "absolute",
            "top" : "-150px",
            "left" : Math.floor(Math.random() * $(windowBorder).width() - 100),
          })
          .appendTo($(windowBorder));
  let maxHeight = document.documentElement.clientHeight + 150;
  let virusDropInterval = setInterval(() => {
    let virusTop = parseInt($(virus).css("top"))//parseInt оставляет только числа, убирает текст
    if(virusTop < maxHeight){
      $(virus).css("top", virusTop + 1 + "px");
      $(virus).css("left", parseInt($(virus).css("left")) + Math.sin((virusTop +300)/(virusTop)) + "px");
    }else{
      virus.remove();
      clearInterval(virusDropInterval);
    }
    //colsole.log(parseInt($(virus).css("top")))
    
  }, Math.round(Math.random()*10));
  virus.onclick = () => {
    let virusCoords = virus.getBoundingClientRect();
    let virusTop = virusCoords.y;
    let virusLeft = virusCoords.x;
    //console.log([virusTop, virusLeft])
    virus.remove();
    let pop = document.createElement("img");
    $(pop).attr("src", "img/pop.gif")
          .css({
            "height" : "100px",
            "width" : "100px",
            "position" : "absolute",
            "top" : virusTop + "px",
            "left" : virusLeft + "px",
          })
          .appendTo($(windowBorder));
    setTimeout(() => {pop.remove()}, 1000);
    killVirus();
  }
}
function killVirus(){
  let popSound = new Audio("pop.mp3");
  popSound.play();
  virusKilled++;
  $(".virusKilled").html(virusKilled);
  if (virusKilled >= 50){
    alert ("Вы победили вирус!");
    virusKilled = 0;
  }
}
