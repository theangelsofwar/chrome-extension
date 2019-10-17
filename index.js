//Periph, Ghosted, Hosted It's Lit Subliminal Messages Chrome Extension

//EYE-SOAR, ARIA, LENSI-CAL, SWEET TALK, 
//KEY COMPONENTS:

//DOM MANIPULATION and Chrome Dev Tools
// Adding new task to To Do list
// const translate = require('google-translate-api');

// function randomInt(min,max){
//     return Math.floor(Math.random()*(max-min+1))+min;
// }

//creating a manifest file
//JSON Config
(function(document) {
    'use strict';
    let isRunning=false;
    let focusList=[];
    let focusIndex=0;
    let speed=10;


    const mappings = { //object mappings
        a:'link',
        button:'button',
        h2: 'heading',
        p: 'paragraph',
        html:'page',
        img: 'image'
    }


    function computeAccessibleName(element){
        const constant = element.textContent.trim();
        if (element.getAttribute('aria-label')) {
          return element.getAttribute('aria-label');
        } else if (element.getAttribute('alt')) {
          return element.getAttribute('alt');
        }
        return content;
    }
    const announcers={
		page( element ) {
			const title = element.querySelector( 'title' ).textContent;

			say( `Page ${ title }` );
		},

		link( element ) {
			say( `Link, ${ computeAccessibleName( element ) }. To follow the link, press Enter key.` );
		},

		button( element ) {
			say( `Button, ${ computeAccessibleName( element ) }. To press the button, press Space key.` );
		},

		heading( element ) {
			const level = element.getAttribute( 'aria-level' ) || element.tagName[ 1 ];

			say( `Heading level ${ level }, ${ computeAccessibleName( element ) }` );
		},

		paragraph( element ) {
			say( element.textContent );
		},

		image( element ) {
			say( `Image, ${ computeAccessibleName( element ) }` );
		},

		default( element ) {
			say( `${ element.tagName } element: ${ computeAccessibleName( element ) }` );
		}
	};

function createFocusList() {
  focusList.push(...document.querySelectorAll('html, body >: not ([aria-hidden]=true)'));
//get all text
console.log(focusList);
  focusList = focusList.filter((element) => {
      console.log(focusList);
    const styles = getComputedStyle(element);
    if (styles.visibility === 'hidden' || styles.display === 'none') return false; 
    return true; 
    // filter out based on font sizes 
  });
}


function getActiveElement() {
  if (document.activeElement && document.activeElement !== document.body) {
    return document.activeElement;
  }
  return focusList[0]; //acts as a queue structure
}


//setInterval(moveFocus,speed);
function moveFocus(offset) {
  focusIndex += offset;
  if (focusIndex < 0) {
      focusIndex = focusList.length - 1;
  } else if (focusIndex > focusList.length - 1) {
      focusIndex = 0;
  }
  focus(focusList[focusIndex]);

  if (offset instanceof HTMLElement) {
      focusIndex = focusList.findIndex((element ) => {
          return element === offset;
      });
      return focus(offset);
  }
}

function focus(element) {
  if (element === document.body) element = document.documentElement;
  element.setAttribute('data-sr-current', true);
  element.focus();

  announceElement(element);
}


function computeRole(element){
  const name = element.tagName.toLowerCase();
  if (element.getAttribute('role')) {
    return element.getAttribute('role');
  }
  return mappings[name] || 'default';
}

function addStyles() {
    const styleElement = document.createElement( 'style' );

    styleElement.textContent = `[tabindex="-1"] {
        outline: none;;
    }
    [data-sr-current] {
        outline: 5px rgba( 0, 0, 0, .7 ) solid !important;
    }
    html[data-sr-current] {
        outline-offset: -5px;
    }`;

    document.head.appendChild( styleElement );
}
//speaking
function say(speech, callback) {
	const text = new SpeechSynthesisUtterance(speech);
	if (callback) {
		text.onend = callback;
	}
	speechSynthesis.cancel();
	speechSynthesis.speak(text);
}

// Start screen reader 
function start() {
  say('Screen reader on', () => {
    // add callback to activate speech function
    moveFocus(getActiveElement());
    isRunning = true;
  })
}

// Stop screen reader
function stop() {
  // add code
  const current = document.querySelector('[data-sr-current]');
  if (current) current.removeAttribute('data-sr-current');
  focusIndex = 0;
  isRunning = false;
  say('Screen reader off');
}

// Event handler, toggling settings
function keyDownHandler(event) {
  console.log('hello world')
  if (event.keyCode === 32) {
    event.preventDefault();
    if (!isRunning) start();
    if (isRunning) stop();
  }

  if (event.keyCode === 38) {
      if(speed<50){
          speed*=2;
      }
  } // up arrow, increase speed
  if (event.keyCode === 40) {
      if(speed>0){
          speed-=10;
      }
  } // down arrow, decrease speed
}

// Event listener (start/stop extension)
//change speed to 2x
//emphasis on certain words pause, set timeout for longer
//can not say curse words or the name "Donald Trump" will airhorn instead
addStyles();
createFocusList();
document.addEventListener('keyDown', keyDownHandler);

//future extension idea: add "sparknotes" of article feature, eliminate unimportant words, incorporate a dictionary and figure out frequency
}(document))
