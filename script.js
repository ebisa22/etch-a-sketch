//variables
const container = document.querySelector(".container");
let opacity = 0;
let erase = false;
let draw = false;
document.addEventListener("dragstart", (e) => e.preventDefault());
//contructing the canvas
for (let i = 0; i < 256; ++i) {
  let box = document.createElement("div");
  box.classList.add("child");
  container.appendChild(box);
}
//pixel color change
const colorBtn=document.querySelector('#color');
colorBtn.addEventListener('change',(e)=>{
  e.target.style.cssText=`background-color:${colorBtn.value}`;
})
//Setting ratio of canvas
function setCanvasRatio() {
  const ratio = +prompt("Enter canvas ration (for ex 16 for 16x16)").trim();
  if (ratio == 0 || isNaN(ratio)) alert("Enter a valid number");
  else {
    container.innerHTML = "";
    for (let i = 0; i < Math.pow(ratio, 2); ++i) {
      let box = document.createElement("div");
      box.classList.add("child");
      box.style.width = `calc((100% - ${ratio}px) / ${ratio})`;
      container.appendChild(box);
    }
  }
}
const setButton = document.querySelector("#set-btn");
setButton.addEventListener("click", () => {
  setCanvasRatio();
});
//only draws when mouse is clicked and moved

document.addEventListener("mousedown", (e) => {
  draw = true;
});
document.addEventListener("mouseup", (e) => {
  draw = false;
});
//draw while hover
container.addEventListener("mouseover", (e) => {
  if (e.target.classList.contains("child") && draw && !erase) {
    e.target.style.backgroundColor = `${colorBtn.value}`;
  }
});
//also draw while clicked
container.addEventListener("mousedown", (e) => {
  if (e.target.classList.contains("child") && !erase) {
    e.target.style.backgroundColor = `${colorBtn.value}`;
  }
});

//adding reset function
const resetButton = document.querySelector("#reset-btn");
resetButton.addEventListener("click", (e) => {
  e.preventDefault();
  resetCanvas();
});
function resetCanvas() {
  const pixels = document.querySelectorAll(".child");

  for (let box of pixels) {
    box.style.backgroundColor = "transparent";
  }
}
//adding eraser

const eraseButton = document.querySelector("#erase-btn");
eraseButton.addEventListener("click", (e) => {
  e.preventDefault();
  e.target.classList.toggle("black-background");
  //set erase true if it was false and vice versa
  if (erase) {
    erase = false;
  } else {
    erase = true;
  }
  container.classList.toggle("erase-cls");
});
container,
  addEventListener("mouseover", (e) => {
    if (e.target.classList.contains("child") && erase) {
      e.target.style.backgroundColor = "transparent";
    }
  });
