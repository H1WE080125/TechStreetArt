/* Note: some of the comments are from the template (the kaleidoscope activity). 
Some may sound irrelevant to this activity. */
/* The P5 functions are explained at https://p5js.org/reference/ */

/* This variable is accessed by preload(), setup() and resetBtnClickedByMariePierreLessard() */
let spotlightByMariePierreLessard = "";
/* I had to define these variables globally to access them with mouseDragged(). They represents an input element (HTML). */
let saturationPickerByMariePierreLessard = null;
let brightnessPickerByMariePierreLessard = null;
/* This variable is accessed by preload() and randomSelectionMadeByMariePierreLessard() */
let imgObjectByMariePierreLessard = null;

/* 2 lines below: inspired by P5 beginner project at
https: //p5js.org/tutorials/creating-styling-html  
Ratios: 
Portrait:
1080/1920 px = 0.5625
Landscape: 
1920/1080 px = 1.777777777777778

let canvasWidthByMariePierreLessard = 1080;
let canvasHeightByMariePierreLessard = 1920;

However, I need responsive design. See solution in function setup().
*/

/* "preload()
A function that's called once to load assets before the sketch runs.
Declaring the function preload() sets a code block to run once automatically before setup() or draw(). It's used to load assets including multimedia files, fonts, data, and 3D models: (...)
Functions such as loadImage(), loadFont(), loadJSON(), and loadModel() are guaranteed to either finish loading or raise an error if they're called within preload(). Doing so ensures that assets are available when the sketch begins running."
https://p5js.org/reference/p5/preload/ */
function preload() {
    //Loading of default art to enhance (this is the art on spotlight, not the user's choice)
    spotlightByMariePierreLessard = loadImage("https://i.postimg.cc/6qjf8zLz/Photo-15-12-2025-09-34-12-karolinelund-fullscreen.webp");

    /* "loadJSON()
    Loads a JSON file to create an Object. (...)
    The first parameter, path, is always a string with the path to the file. Paths to local files should be relative, as in loadJSON('/assets/data.json'). 
    The second parameter, successCallback, is optional. If a function is passed, as in loadJSON('/assets/data.json', handleData), then the handleData() function will be called once the data loads. The object created from the JSON data will be passed to handleData() as its only argument. (...)
    Note: Data can take time to load. Calling loadJSON() within preload() ensures data loads before it's used in setup() or draw()."
    https://p5js.org/reference/p5/loadJSON/ 
    
    Because loadJSON is asynchronous, the easiest way to accomplish this is by putting JSON file in memory at initialisation with preload(). 
    */
    imgObjectByMariePierreLessard = loadJSON("../../../../shared/scripts/img_urls.json");
    /* This prints the object. 
    console.log(imgObjectByMariePierreLessard); 
    */
};

function saveBtnClickedByMariePierreLessard() {
    saveCanvas("user-graffiti", "webp");
};

/* "clear()
Clears the pixels on the canvas."
https://p5js.org/reference/p5/clear/ */
function resetBtnClickedByMariePierreLessard() {
    clear();
    background(spotlightByMariePierreLessard);
};

/* The function generateRandomIntegerByMariePierreLessard is code from my "storefront-opgave". 
I just changed the size of the array. It generates a random index for an array. */
function generateRandomIntegerByMariePierreLessard() {
    /* Returns a random integer from 0 to 132, inclusively
    https://www.w3schools.com/js/js_random.asp */
    let randomIntegerByMariePierreLessard = Math.floor(Math.random() * 133);
    console.log(randomIntegerByMariePierreLessard); 
    /* If I don't explicitely state that the returned result of the function is randomIntegerByMariePierreLessard, I get an Undefined error. */
    return randomIntegerByMariePierreLessard;
};

function randomSelectionMadeByMariePierreLessard() {
    clear();
    /* Since the selection of a new picture might take time, the user should see that something happened 
    when the button was clicked. */
    /* White in HSB-colour mode */
    background(0, 0, 100);

    /* Since I don't want the reset button to change the current picture, the selection of a random picture needs to be made in function
    randomSelectionMadeByMariePierreLessard. Moreover, the enhancement page is supposed to show before and
    after pictures, that example should always be a default picture on the corresponding activity page,
    not some randomly selected picture.

    /* This prints the array from the JSON file. 
    console.log(imgObjectByMariePierreLessard.images);
    */

    /* This generates a random index for one of the images in the array. */
    let indexByMariePierreLessard = generateRandomIntegerByMariePierreLessard();

    /* This works. 
    let objectAtIndexByMariePierreLessard = imgObjectByMariePierreLessard.images[indexByMariePierreLessard]; 
    console.log(objectAtIndexByMariePierreLessard);
    */

    let newSpotlightUrlByMariePierreLessard = imgObjectByMariePierreLessard.images[indexByMariePierreLessard].img; 
    console.log(newSpotlightUrlByMariePierreLessard);

    /* This doesn't work because loadImage is asynchronous. 
    Bo said that I need to put loadImage in preload() or use a callback. 
    spotlightByMariePierreLessard = loadImage(newSpotlightUrlByMariePierreLessard);
    background(spotlightByMariePierreLessard);
    */
    loadImage(newSpotlightUrlByMariePierreLessard, showRandomSelectionMariePierreLessard);
};

function showRandomSelectionMariePierreLessard(url) {
    clear();
    background(url);
};

/* "setup()
A function that's called once when the sketch begins running. (...)
Code placed in setup() will run once before code placed in draw() begins looping. If the preload() is declared, then setup() will run immediately after preload() finishes loading assets."
https://p5js.org/reference/p5/setup/ 
*/
function setup() {

    /* "createCanvas()
    Creates a canvas element on the web page.
    createCanvas() creates the main drawing canvas for a sketch. It should only be called once at the beginning of setup(). Calling createCanvas() more than once causes unpredictable behavior.
    The first two parameters, width and height, are optional. (...)
    The third parameter is also optional. If either of the constants P2D or WEBGL is passed, as in createCanvas(900, 500, WEBGL), then it will set the sketch's rendering mode. If an existing HTMLCanvasElement is passed, as in createCanvas(900, 500, myCanvas), then it will be used by the sketch.
    The fourth parameter is also optional. If an existing HTMLCanvasElement is passed, as in createCanvas(900, 500, WEBGL, myCanvas), then it will be used by the sketch."
    https://p5js.org/reference/p5/createCanvas/ 
    Note: this literally creates an element called canvas, which can be styled like HTML elements with CSS. */
    /* Responsive design: this is how you get the canvas to fill entire window (100vw and 100vh).
    "windowWidth
    A Number variable that stores the width of the browser's viewport."
    https://p5js.org/reference/p5/windowWidth/
    "windowHeight
    A Number variable that stores the height of the browser's viewport."
    https://p5js.org/reference/p5/windowHeight/
    For some reason, I cannot use these variables in global scope. Error: undefined.
    The following works:
    createCanvas(windowWidth, windowHeight);
    */
    /* Notes from earlier version of web app:
    This leaves room for control buttons or the like above or under the canvas. 
    I also need to set the canvasWidth, otherwise I get scroll to the right on small devices. 
    const canvasHeight = windowHeight * 0.96;
    const canvasWidth = windowWidth * 0.96;
    */
    /* 2 lines below: inspired by image-measurement variables at
    https://p5js.org/reference/p5.Image/width/ 

    spotlightWidthByMariePierreLessard = spotlightByMariePierreLessard.width;
    console.log(spotlightWidthByMariePierreLessard); //Returns 1 with test picture, both when canvas is 100vw and when width set at 1080, whether or not the pic fills the whole width of canvas! (Why?)
    spotlightHeightByMariePierreLessard = spotlightByMariePierreLessard.height;
    console.log(spotlightHeightByMariePierreLessard); //Returns 1 with test picture, both when canvas is 100vh and when width set at 1920

    Below, I chose let instead of const because a picture swapper could require a reassignment.
    */
    let activityContainerByMariePierreLessard = createDiv();
    activityContainerByMariePierreLessard.id("activity-container");
    /* This avoids scroll (picture being wider than parent). 
    The process is also taking too long acc. to the console, but it's a problem with the P5 library acc. to Bo. */
    activityContainerByMariePierreLessard.height = windowHeight;
    /* Because the scroll bar takes a bit of room on a mobile phone 
    and because there is an inline margin and I want the look of having some padding inside of the activity container */
    activityContainerByMariePierreLessard.width = windowWidth * 0.86;
    /* canvasByMariePierreLessard is accessed outside of the conditional below, 
    so it needs to be in local scope, not just block scope */
    let canvasByMariePierreLessard = null;

    /* This is to keep the proportions of the canvas equal to the proportions of the pic it contains.
    The pic is a background pic now, so equal propertions are necessary to avoid distortion. */
    /* P5 must course-correct because the activity container contains buttons, but those aren't counted as part of the height. */
    if (spotlightByMariePierreLessard.height > spotlightByMariePierreLessard.width) {
        let canvasHeightByMariePierreLessard = activityContainerByMariePierreLessard.height; 
        let canvasWidthByMariePierreLessard = spotlightByMariePierreLessard.width * canvasHeightByMariePierreLessard / spotlightByMariePierreLessard.height;
        canvasByMariePierreLessard = createCanvas(canvasWidthByMariePierreLessard, canvasHeightByMariePierreLessard);
    } else {
        /* To avoid scroll, I need this for landscape pictures. */
        let canvasWidthByMariePierreLessard = activityContainerByMariePierreLessard.width;
        let canvasHeightByMariePierreLessard = spotlightByMariePierreLessard.height * canvasWidthByMariePierreLessard / spotlightByMariePierreLessard.width;
        canvasByMariePierreLessard = createCanvas(canvasWidthByMariePierreLessard, canvasHeightByMariePierreLessard);
    };

    /* When a new project is created, 
    background(220); 
    is in the draw function. 
    "This function clears the canvas before each frame is drawn, maintaining a consistent background for an ongoing animation."
    https://p5js.org/tutorials/creating-styling-html
    Acc. to advice on video "p5.js Tutorial | Getting Started with Creative Coding" by Patt Vira at 
    https://www.youtube.com/watch?v=x1NxkEjfNtI&list=PL0beHPVMklwgMz4Z-mNp4_udo9mjBk7pn&index=1
    background() needs to be moved from draw() to setup() 
    in order to get the enhancement to make a lasting change on the background. 
    Otherwise, in the draw function, the background is rendered again every time that the design stacked on top of it moves. 
    (That option is good for an animation over a static background.)
    */
    /* The numbers in brackets can be colours, e.g. RGB colours with an alpha value,
    but the method can also display an image along with an alpha value. See: 
    https://p5js.org/reference/p5/background/ 
    The following worked. However, a background picture tends to get stretched/deformed because it fills the whole canvas.
    I got unexpected and variable results when making canvas fill the whole window. The pic eventually filled the whole width,
    but initially, there were white margins on each side. 
    background(spotlightByMariePierreLessard);
    */
    /* Notes from earlier version, before I made the canvas the size of the picture and put the canvas in a parent:
    IMPORTANT: a white background colour has to be set here, not in the CSS file, 
    or the saved art has a black background, which is not useable in our gallery
    and it would also cost tons of money to print for a fictitious user. 
    background("rgb(255, 255, 255)"); 
    */
    background(spotlightByMariePierreLessard);

    /* Notes from earlier version, before I made the canvas the size of the picture and put the canvas in a parent:
    Since the picture orientation varies (portrait/landscape), I am inserting the image in the canvas with image() 
    to maintain the aspect ratio no matter what the dimensions of the view port are.
    "By default, image() draws the full source image at its original size. (...)
    // Draw the image and scale it to fit within the canvas.
    image(img, 0, 0, width, height, 0, 0, img.width, img.height, CONTAIN);
    Syntax
    image(img, x, y, [width], [height]) (...)
    Parameters
    img
    p5.Image|p5.Element|p5.Texture|p5.Framebuffer|p5.FramebufferTexture: image to display.
    x
    Number: x-coordinate of the top-left corner of the image.
    y
    Number: y-coordinate of the top-left corner of the image.
    width
    Number: width to draw the image.
    height
    Number: height to draw the image.
    dx
    Number: the x-coordinate of the destination rectangle in which to draw the source image
    dy
    Number: the y-coordinate of the destination rectangle in which to draw the source image
    dWidth
    Number: the width of the destination rectangle
    dHeight
    Number: the height of the destination rectangle (...)
    fit
    Constant: either CONTAIN or COVER"
    https://p5js.org/reference/p5/image/ 
    
    image(spotlightByMariePierreLessard, 0, 0, width, height, 0, 0, spotlightByMariePierreLessard.width, spotlightByMariePierreLessard.height, CONTAIN);
    */

    /* Source for the 4 following lines (edited): https://p5js.org/examples/animation-and-variables-drawing-lines/ */
    // Set width of the lines
    strokeWeight(4);
    // Set color mode to hue-saturation-brightness (HSB)
    colorMode(HSB);

    /* "describe()
    Creates a screen reader-accessible description of the canvas."
    https://p5js.org/reference/p5/describe/ */
    /* Inspiration for the following description: https://p5js.org/examples/animation-and-variables-drawing-lines/ */
    describe(
        `Canvas in which the user can draw by dragging the mouse.`
      );

    /* Code to place the canvas inside of a parent is given here:
    https://p5js.org/tutorials/creating-styling-html
    and
    https://forum.processing.org/two/discussion/13051/how-do-i-bind-p5-canvas-to-an-html-page.html 
    The sources indicate that the P5 JS library has child() and parent() methods, among others.
    This looked like vulgarised JavaScript for beginners. As a consequence, I tried coding in ordinary JS, but it DIDN'T WORK.
    The following code gave the following error in the console:
    "Uncaught (in promise) TypeError: Failed to execute 'appendChild' on 'Node': parameter 1 is not of type 'Node'." 
    const artViewer = document.getElementById("art-viewer");
    const p5Canvas = createCanvas(400, 400);
    artViewer.appendChild(p5Canvas);
    */
    let artViewerByMariePierreLessard = createDiv();
    artViewerByMariePierreLessard.id("p5-art-viewer");
    /* How to use createElement:
    https://p5js.org/reference/p5/createElement/ */
    let introByMariePierreLessard = createDiv();
    introByMariePierreLessard.id("intro-container");
    let viewerHeadingByMariePierreLessard = createElement("h2", "Farverige linjer");
    /* https://p5js.org/reference/p5/createP/ */
    let viewerIntructionsByMariePierreLessard = createP(`For at tegne eller skrive en besked i farvepaletten, som du ønsker dig, kan du med fordel skifte farvemætningen og farvelysheden en gang i mellem med sliderne! Når du er tilfreds med dit kunstværk, tryk på knappen "Gem din graffiti" for at få en kopi!`);
    viewerIntructionsByMariePierreLessard.class("first-of-type-p");
    let btnContainerOneByMariePierreLessard = createDiv();
    btnContainerOneByMariePierreLessard.class("btn-container");
    let randomSelectionBtnByMariePierreLessard = createButton("Prøv eventuelt med et andet billede");
    randomSelectionBtnByMariePierreLessard.class("btn btn--big");
    randomSelectionBtnByMariePierreLessard.mousePressed(randomSelectionMadeByMariePierreLessard);
    let attributionByMariePierreLessard = createElement("small", `Kreditering for den grafiske funktionalitet (på engelsk): "Drawing Lines: Revised by Darren Kessner. Edited and maintained by p5.js Contributors and Processing Foundation. Licensed under CC BY-NC-SA 4.0."`);
    let btnContainerTwoByMariePierreLessard = createDiv();
    btnContainerTwoByMariePierreLessard.class("btn-container");
    let hsbContainerByMariePierreLessard = createDiv();

    /* Source: https://p5js.org/reference/p5/createButton/ */
    let saveBtnByMariePierreLessard = createButton("Gem din graffiti");
    saveBtnByMariePierreLessard.class("btn");
    /* "mousePressed()
    Calls a function when the mouse is pressed over the element."
    https://p5js.org/reference/p5.Element/mousePressed/ and
    https://p5js.org/reference/p5/mousePressed/ */
    /* "save()
    Saves a given element(image, text, json, csv, wav, or html) to the client's computer. The first parameter can be a pointer to element we want to save. (...)
    The second parameter is a filename (including extension).The third parameter is for options specific to this type of object. This method will save a file that fits the given parameters. If it is called without specifying an element, by default it will save the whole canvas as an image file."
    https://p5js.org/reference/p5/save/ */
    /* Alternative:
    "saveCanvas()
    Saves the current canvas as an image."
    https://p5js.org/reference/p5/saveCanvas/

    This saves at initialisation if I enter it here:
    saveCanvas("user-graffiti.webp");

    The following works. Initially, the P5 code generated an error, but it fixed itself mysteriously. 
    I could find no fix in spite of various Google searches. 
    */
    saveBtnByMariePierreLessard.mousePressed(saveBtnClickedByMariePierreLessard);

    let resetBtnByMariePierreLessard = createButton("&#8635;");
    resetBtnByMariePierreLessard.class("btn btn--small");
    resetBtnByMariePierreLessard.mousePressed(resetBtnClickedByMariePierreLessard);

    /* "createInput()
    Creates a text <input> element.
    Call myInput.size() to set the length of the text box.
    The first parameter, value, is optional. It's a string that sets the input's default value. The input is blank by default.
    The second parameter, type, is also optional. It's a string that specifies the type of text being input. See MDN for a full list of options. The default is 'text'."
    https://p5js.org/reference/p5/input/ 
    I just guessed how to give the data type. However, I cannot find a source explaining how to set min. and max. attributes!
    saturationPickerByMariePierreLessard = createInput("90", "number");

    "createSlider()
    Creates a slider <input> element.
    Range sliders are useful for quickly selecting numbers from a given range.
    The first two parameters, min and max, are numbers that set the slider's minimum and maximum.
    The third parameter, value, is optional. It's a number that sets the slider's default value."
    https://p5js.org/reference/p5/createSlider/
    */
    saturationPickerByMariePierreLessard = createSlider(0, 100, 90);
    /* Trying to change the style of the P5 slider with CSS does not have any effect. 
    saturationPickerByMariePierreLessard.class("picker");
    "size()
    Sets the element's width and height.
    Calling myElement.size() without an argument returns the element's size as an object with the properties width and height. For example, { width: 20, height: 10 }.
    The first parameter, width, is optional. It's a number used to set the element's width. Calling myElement.size(10)
    The second parameter, 'height, is also optional. It's a number used to set the element's height. For example, calling myElement.size(20, 10)` sets the element's width to 20 pixels and height to 10 pixels."
    https://p5js.org/reference/p5.Element/size/

    "style()
    Applies a style to the element by adding a CSS declaration.
    The first parameter, property, is a string. (...)
    The second parameter, value, is optional. It sets the property's value. value can be a string, as in myElement.style('color', 'deeppink'), or a p5.Color object, as in myElement.style('color', myColor)."
    https://p5js.org/reference/p5.Element/style/
    */
    saturationPickerByMariePierreLessard.style("display", "block");
    saturationPickerByMariePierreLessard.size(128, 24);
    brightnessPickerByMariePierreLessard = createSlider(0, 100, 90);
    brightnessPickerByMariePierreLessard.size(128, 24);
    brightnessPickerByMariePierreLessard.style("display", "block");
    
    introByMariePierreLessard.child(viewerHeadingByMariePierreLessard);
    introByMariePierreLessard.child(viewerIntructionsByMariePierreLessard);
    btnContainerOneByMariePierreLessard.child(randomSelectionBtnByMariePierreLessard);
    introByMariePierreLessard.child(btnContainerOneByMariePierreLessard);
    hsbContainerByMariePierreLessard.child(saturationPickerByMariePierreLessard);
    hsbContainerByMariePierreLessard.child(brightnessPickerByMariePierreLessard);
    btnContainerTwoByMariePierreLessard.child(hsbContainerByMariePierreLessard);
    btnContainerTwoByMariePierreLessard.child(resetBtnByMariePierreLessard);
    btnContainerTwoByMariePierreLessard.child(saveBtnByMariePierreLessard);
    activityContainerByMariePierreLessard.child(btnContainerTwoByMariePierreLessard);
    activityContainerByMariePierreLessard.child(canvasByMariePierreLessard);
    artViewerByMariePierreLessard.child(introByMariePierreLessard);
    artViewerByMariePierreLessard.child(activityContainerByMariePierreLessard);
    artViewerByMariePierreLessard.child(attributionByMariePierreLessard);
    /* "parent()
    Attaches the element to a parent element. (...)
    The parameter parent can have one of three types. parent can be a string with the parent element's ID, as in myElement.parent('container'). It can also be another p5.Element object, as in myElement.parent(myDiv). Finally, parent can be an HTMLElement object, as in myElement.parent(anotherElement)."
    https://p5js.org/reference/p5.Element/parent/ 
    
    colourful-lines-container is a div in the HTML file. */
    artViewerByMariePierreLessard.parent("colourful-lines-container");
};

function mouseDragged() {
    /* Source for .value():
    https://p5js.org/reference/p5/input/ */
    let pickedSaturationByMariePierreLessard = saturationPickerByMariePierreLessard.value();
    let pickedBrightnessByMariePierreLessard = brightnessPickerByMariePierreLessard.value();
    
    /* Source of this function: https://p5js.org/examples/animation-and-variables-drawing-lines/ */
    // Set the color based on the mouse position, and draw a line
    // from the previous position to the current position
    let lineHue = mouseX - mouseY;
    stroke(lineHue, pickedSaturationByMariePierreLessard, pickedBrightnessByMariePierreLessard);
    line(pmouseX, pmouseY, mouseX, mouseY);
  };
