// write cool JS hwere!!
let deg=0;
const speed=1; //ms
const step=10; //deg
let autoMode=true;

let autoUpfdate=null;
let myTimeout=false;

let myShifterElement=document.getElementById("shifter");
let myHueSlider=document.getElementById("hueSlider");
let autoHueButton=document.getElementById("autoHue");


autoHueButton.addEventListener("click", (event) => {

    if(autoMode){
        autoMode=false;
        autoHueButton.textContent="start";
        clearInterval(autoUpfdate);
    }else{
        autoMode=true;
        autoHueButton.textContent="stop";
      
        automateHue();
    }
   
   
});

automateHue()


function automateHue(){

 autoUpfdate=setInterval(() => {
    deg+=step%360;
      myHueSlider.value = deg%360;
   updateHue();
}, 100);

}


console.log("update");

myHueSlider.addEventListener("input", (event) => {
     deg=event.target.value;

     clearInterval(autoUpfdate);
    updateHue();

});


function updateHue(){
    myShifterElement.style.filter = `hue-rotate(${deg}deg)`;
}