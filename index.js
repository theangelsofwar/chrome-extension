//Periph, Ghosted, Hosted It's Lit Subliminal Messages Chrome Extension



//EYE-SOAR, SCREEN, LENSI-CAL, SWEET TALK, 
//KEY COMPONENTS:

//DOM MANIPULATION and Chrome Dev Tools
// Adding new task to To Do list
// const translate = require('google-translate-api');
 
// translate('Ik spreek Engels', {to: 'en'}).then(res => {
//     console.log(res.text);
//     //=> I speak English
//     console.log(res.from.language.iso);
//     //=> nl
// }).catch(err => {
//     console.error(err);
// });

// function randomInt(min,max){
//     return Math.floor(Math.random()*(max-min+1))+min;
// }

//creating a manifest file
//JSON Config

const focusList=[];

var msg = new SpeechSynthesisUtterance('Hello World');
window.speechSynthesis.speak(msg);


function createFocusList() {
  focusList.push(...document.querySelectorAll('html, body >: not ([aria-hidden]==true'));
//get all text
  focusList = focusList.filter((element)=>{
    const styles = getComputedStyle(element);
    if (styles.visibility === 'hidden' || styles.display === 'none') return false; 
    return true; 
    // filter out based on font sizes 
  });
  focusList.forEach((element)=>{
      element.setAttribute('tabindex', element.tabIndex);
  });
}

function moveFocus(offset){
    focusIndex+=offset;
    if(focusIndex<0){
        focusIndex=focusList.length-1;

    }else if(focusIndex>focusList.length-1){
        focusIndex=0;
    }
    focus(focusList[focusIndex]);

    if(offset instanceof HTMLElement){
        focusIndex=focusList.findIndex((element )=>{
            return element===offset;
        });
        return focus(offset);
    }
}

function focus(element){
    if(element===document.body){
        element=document.documentElement;
    }
    element.setAttribute('data-sr-current',true);
    element.focus();

    announceElement(element);
}

const mappings={
    button:'button',
};

function computeRole(element){
    const name=element.tagName.toLowerCase();
    if(element.getAttribute('role')){
        return element.get
    }
}

// Speaking
function say(speech, callback) {
	const text = new SpeechSynthesisUtterance(speech);

	if (callback) {
		text.onend = callback;
	}

	speechSynthesis.cancel();
	speechSynthesis.speak(text);
}

let wordArr=[];

function getText




//future extension idea: add "sparknotes" of article feature, eliminate unimportant words, incorporate a dictionary and figure out frequency