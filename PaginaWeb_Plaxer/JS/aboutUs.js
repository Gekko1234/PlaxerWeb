// In about us section, when click the button, the text will change

const botonAbout = document.querySelector('#botonAbout');
const divAbout = document.querySelector('#aboutRow');

const botonSchedule = document.querySelector('#botonSchedule');
const divSchedule = document.querySelector('#aboutSchedule');

const botonLocation = document.querySelector('#botonLocation');
const divLocation = document.querySelector('#aboutLocation');


botonAbout.addEventListener('click', () =>{
    divAbout.setAttribute('style', 'display:block;');
    divLocation.setAttribute('style', 'display:none;');
    divSchedule.setAttribute('style', 'display:none;');

});




botonSchedule.addEventListener('click', () =>{
    divAbout.setAttribute('style', 'display:none;');
    divLocation.setAttribute('style', 'display:none;');
    divSchedule.setAttribute('style', 'display:block;');

});

botonLocation.addEventListener('click', () =>{
    divAbout.setAttribute('style', 'display:none;');
    divLocation.setAttribute('style', 'display:block;');
    divSchedule.setAttribute('style', 'display:none;');

});





