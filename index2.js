function screenRead() {
  let focusList=['hello', 'my', 'name', 'is', 'ken', 'hi'];
  let isRunning=false;
    let focusIndex=0;
    let speed=100;
  const mappings={
      a: 'link',
      button: 'button',
      h2: 'heading',
      html:'page',
      img: 'image'
  }

  // function createFocusList() {
  //   focusList.push(...document.querySelectorAll('html, body >: not ([aria-hidden]=true)'));
  //   console.log(focusList);
  //   focusList = focusList.filter((element) => {
  //     console.log(focusList);
  //     const styles = getComputedStyle(element);
  //     if (styles.visibility === 'hidden' || styles.display === 'none') return false; 
  //     return true;
  //   });
  // }

  function focus(element) {
    if (element === document.body) element = document.documentElement;
    element.setAttribute('data-sr-current', true);
    element.focus();
  
    announceElement(element);
  }


  function say(speech, callback){
    const text = new SpeechSynthesisUtterance(speech);
    speechSynthesis.speak(text);
}

setInterval(() => {
  for (const item of focusList) {
    say(item);
  }
}, 1000);

  // Event handler, toggling settings
  // function keyDownHandler() {
  //   if (event.keyCode === 32) {
  //     if (!isRunning) start();
  //     if (isRunning) stop();
  //   }

  //   if (event.keyCode === 38) { // up arrow, increase speed
  //     if (speed < 50) {
  //       speed *= 2;
  //     }
  //   } 
  //   if (event.keyCode === 40) { // down arrow, decrease speed
  //     if (speed > 0) {
  //       speed -= 10;
  //     }
  //   }
  // }
}

document.addEventListener('load', screenRead());

// Event listener, change speed to 2x, toggle on/off
// Stretch Features: emphasis on certain words pause, set timeout for longer, can not say curse words or the name "Donald Trump" will airhorn instead    