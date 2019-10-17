let synth=window.speechSynthesis;

let inputForm=document.querySelector('form');
let inputText=document.querySelector(".txt"); 
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
    if(inputText.value!==''){
        let utterThis=new SpeechSynthesisUtterance(inputText.value);
        //switch to div css selector
        utterThis.onend=function(event){
            console.log('SpeechSyntehsisUtterance.onened');
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
    }
}

inputForm.onsubmit=function(event){
    event.preventDefault();
    speak();
    inputTxt.blur();
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