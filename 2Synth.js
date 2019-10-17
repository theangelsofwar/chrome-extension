let synth=window.speechSynthesis;

let inputForm=document.querySelector('form');
//let inputText=document.querySelectorAll("p"); //scrapes all text with ptags to be placed into the div

//the inputText is a static Node list


//let realTextHTML=
let inputText=document.getElementsByTagName("p"); 
//actually and aray of html elements
console.log(inputText);
//ocument.getElementsByClassName('.txt').appendChild(inputText);


//.innerHTML
//document.querySelector(".txt"); 
//CSS selectors 
//Synthia
//multitask multiple peripheral pages at various speeds
let voiceSelect=document.querySelector('select'); // we will randomize
let pitch=document.querySelector('#pitch');
let pitchValue=document.querySelector('.pitch-value'); //class div element
let rate=document.querySelector('#rate');

let rateValue=document.querySelector('.rate-value');


let voices=[];

function populateVoiceList(){
    voices=synth.getVoices().sort(function(a,b){
        const aname=a.name.toUpperCase(), bname=b.name.toUpperCase();
        if(aname<bname) return -1;
        else if(aname==bname)return 0;
        else return +1;
    });

    let selectedIndex=voiceSelect.selectedIndex<0 ? 0 : voiceSelect.selectedIndex;
    voiceSelect.innerHTML='';
    for(let i=0;i<voices.length;i++){
        let option=document.createElement('option');
        option.textContent=voices[i].name+ ' ('+voices[i].lang+')';

        if(voices[i].default){
            option.textContent+=' --DEFAULT';
        }

        option.setAttribute('data-lang',voices[i].lang);
        option.setAttribute('data-name',voices[i].name);
        voiceSelect.appendChild(option);
    }
    voiceSelect.selectedIndex=selectedIndex;
}

populateVoiceList();
if(speechSynthesis.onvoiceschanged!==undefined){
    speechSynthesis.onvoiceschanged=populateVoiceList;
}

function speak(){
    if(synth.speaking){
        console.error('speechSynthesis.speaking');
        return;
    }
    //if(inputText.value!==''){
        for(let i=0;i<inputText.length;i++){
            let utterThis=new SpeechSynthesisUtterance(inputText[i].innerHTML);
        }
        
        //removed inputText.value becaue inputText is the inner html value itelf(most primitive level of data)
        //switch to div css selector
        utterThis.onend=function(event){
            console.log('SpeechSyntehsisUtterance.onend');
        }
        utterThis.onerror=function(event){
            console.error('SpeechSynthesisUtterance.onerror');
        }
        let selectedOption=voiceSelect.selectedOptions[0].getAttribute('data-name');
        for(let i=0;i<voices.length;i++){
            if(voices[i].name===selectedOption){
                utterThis.voice=voices[i];
                break;
            }
        }
        utterThis.pitch=pitch.value;
        utterThis.rate=rate.value;
        synth.speak(utterThis);
    //}
}




function scrapeText(){
    //scrapes the text from current page html parses the tag elements and hidden arias
    // fetch(url)
    // .then(resp=>resp.querySelector('html')){
    // });
    let x=document.querySelectorAll("p");
}

inputForm.onsubmit=function(event){
    event.preventDefault();
    speak();
    //we are going to populate the html and then it will speak

    inputText.blur();
}

pitch.onchange=function(){
    pitchValue.textContent=pitch.value;
}

rate.onchange=function(){
    rateValue.textContent=rate.value;
}

voiceSelect.onchange=function(){
    speak();
}