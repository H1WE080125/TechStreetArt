/* global variables */

let deg=0; //deg 0-360
const speed=1; //ms
const step=10; //deg
let autoMode=true;

let autoUpdate=null; /*Interval variable*/
let myTimeout=false; /*Timeout variable*/

/*Get HTML elements*/

let myShifterElement=document.getElementById("shifter");
let myHueSlider=document.getElementById("hueSlider");
let autoHueButton=document.getElementById("autoHue");


/*Event Listeners*/
myHueSlider.addEventListener("input", (event) => {
     deg=event.target.value;

     clearInterval(autoUpdate);
    updateHue();

});


autoHueButton.addEventListener("click", (event) => {

    if(autoMode){
        autoMode=false;
        autoHueButton.textContent="start";
        clearInterval(autoUpdate);
    }else{
        autoMode=true;
        autoHueButton.textContent="stop";
      
        automateHue();
    }
   
   
});



/*Start automatic Hue Shift*/
automateHue()


/*Automate Hue Shift by interval and step*/
function automateHue(){
 autoUpdate=setInterval(() => {
    deg=(deg+step)%360;
      myHueSlider.value = deg;
   updateHue();
}, 100);
}

/*Update Hue Shift filter*/

function updateHue(){
    myShifterElement.style.filter = `hue-rotate(${deg}deg)`;
}