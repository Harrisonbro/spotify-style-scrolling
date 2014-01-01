/**
 * Note that this example is only for one image in the 
 * document, but the logic works. Next step is to expand 
 * on and reorganise this code so it can handle an array 
 * of images and image containers (rather than just the 
 * one shown here)
 */


// Set up the *global* variables we'll be using
var theImage
  , apertureOffset
  , windowHeight
  , imageHeight
	, apertureHeight
	, imageOverflow; 

function getElementPositionInWindow( topOffset ) {
	return topOffset - $(window).scrollTop(); 
}

function updateElementPosition() {
	var aperturePosition = getElementPositionInWindow( apertureOffset ) 
	  , offsetTop = imageOverflow*(aperturePosition/windowHeight)
	  , pushTop = -1*( offsetTop - imageOverflow); 
	
	theImage.css({
		"transform": "translate(0," + pushTop + "px)", 
		"-webkit-transform": "translate(0," + pushTop + "px)"
	}); 
}

// The function below is saving these values to the global variables defined at the top by accessing them through the window object (ie. "window.myvariablename"). Without the "window." part this would be trying to declare new variables local to the calculateSizes() function
function calculateSizes() {
	// Save the offset position of an element, relative to the document
	window.apertureOffset = $('.image-container').offset().top; 

	// Height of the window
	window.windowHeight = $(window).height(); 

	// Save the height of the image, height of the aperture, and the difference
	window.imageHeight = theImage.height(); 
	window.apertureHeight = $('.image-wrapper').height(); 
	window.imageOverflow = imageHeight - apertureHeight; 
}

// When the document has loaded...
jQuery(document).ready(function($){

	// Save the image element as a variable so jQuery doesn't have to find it in the DOM on every scroll
	theImage = $('img'); 	

	// On load
	calculateSizes(); 
	updateElementPosition(); 

	// On scroll
	$(window).scroll(function(){
		updateElementPosition(); 
	}); 

	// On resize
	$(window).resize(function(){
		calculateSizes(); 
		updateElementPosition(); 
	}); 

}); 