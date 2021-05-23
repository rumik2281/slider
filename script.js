let navLeft = document.getElementById('leftArr');
let navRight = document.getElementById('rightArr');
let slideCont = document.getElementById('slideContainer');
let slideItem = document.getElementById('slideItem');
let slideOffset = 0;
let nowSlide = 0;
slideOffset = Number(localStorage.getItem('slideOffset'));
nowSlide = Number(localStorage.getItem('nowSlide'));


let slideRight = function() {
  if( slideOffset > -slideItem.offsetWidth * ( slideCont.children.length - 1 ) ) {    
    slideOffset -= slideItem.offsetWidth;
    nowSlide++;
    localStorage.setItem('nowSlide', nowSlide);
    localStorage.setItem('slideOffset', slideOffset);
    let nowPagin = document.getElementById(`pag-${nowSlide}`);
    nowPagins.forEach( pag => {
      pag.classList.remove('active');
    })
    nowPagin.classList.add('active');
    slideCont.style.transform = `translateX(${slideOffset}px)`;
  } else {
    slideOffset = 0;
    nowSlide = 0;
    localStorage.setItem('nowSlide', nowSlide);
    localStorage.setItem('slideOffset', slideOffset);
    let nowPagin = document.getElementById(`pag-${nowSlide}`);
    nowPagins.forEach( pag => {
      pag.classList.remove('active');
    })
    nowPagin.classList.add('active');
    slideCont.style.transform = `translateX(${slideOffset}px)`;
  }
}
let slideLeft = function() {
  if( slideOffset < 0 ) { 
    slideOffset += slideItem.offsetWidth;
    nowSlide--;
    localStorage.setItem('nowSlide', nowSlide);
    localStorage.setItem('slideOffset', slideOffset);
    let nowPagin = document.getElementById(`pag-${nowSlide}`);
    nowPagins.forEach( pag => {
      pag.classList.remove('active');
    })
    nowPagin.classList.add('active');
    slideCont.style.transform = `translateX(${slideOffset}px)`;
  }
}
navLeft.onclick = function() {
  slideLeft();
}
navRight.onclick = function() {
  slideRight();
}

let pagin = document.getElementById('pagination');

for( let i = 0; i < slideCont.children.length; i++ ) {
  
  let newPag = document.createElement('div');
  newPag.id = 'pag-' + i;
  newPag.classList = 'paginator';
  newPag.onclick = function() {
    slideOffset = -slideItem.offsetWidth * i;
    slideCont.style.transform = `translateX(${slideOffset}px)`;
    nowPagins.forEach( pag => {
      pag.classList.remove('active');
    })
    nowSlide = i;
    localStorage.setItem('nowSlide', nowSlide);
    localStorage.setItem('slideOffset', slideOffset);
    newPag.classList.add('active');
  }
  pagin.appendChild(newPag);
  
}

let firstPagin = document.getElementById('pag-0');
firstPagin.classList.add('active');
let nowPagins = document.querySelectorAll('.paginator');
let nowPagin = document.getElementById(`pag-${nowSlide}`);
    nowPagins.forEach( pag => {
      pag.classList.remove('active');
    })
nowPagin.classList.add('active');
slideCont.style.transform = `translateX(${slideOffset}px)`;

let autoButton = document.getElementById('autoplay');

let isPlaying = false;
//localStorage.setItem('isPlaying', '');
isPlaying = localStorage.getItem('isPlaying');


let autoPlay = function() {
   slideRight();
}
let interval;
if( isPlaying ) {
  autoButton.innerHTML = 'Stop';
  interval = setInterval( () => {
     autoPlay();
   }, 1500);
}

autoplay.onclick = function() {
   if( isPlaying ) {
    console.log('stop');
    clearInterval( interval );
    isPlaying = false;
    autoButton.innerHTML = 'Play';
    localStorage.setItem('isPlaying', '');
    return;
   }
   interval = setInterval( () => {
     autoPlay();
   }, 1500);
   isPlaying = true;
   autoButton.innerHTML = 'Stop';
   localStorage.setItem('isPlaying', true);

}

document.onkeydown = checkKey;

function checkKey(e) {

    e = e || window.event;
    if (e.keyCode == '37') {
       slideLeft();
    }
    else if (e.keyCode == '39') {
       slideRight();
    }
    else if (e.keyCode == '27') {
      let slider = document.querySelector('.slider');
      slider.style.display = 'none';
    }

}