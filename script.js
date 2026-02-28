/* hover ball cursor */

const cursor = document.querySelector(".cursor")

document.addEventListener("mousemove",(e)=>{
cursor.style.left=e.clientX+"px"
cursor.style.top=e.clientY+"px"
})



/* typing animation */

const text = [
"AI Developer",
"Machine Learning Enthusiast",
"Problem Solver",
"Algorithm Designer"
]

let count = 0
let index = 0
let currentText=""
let letter=""

function type(){

if(count===text.length){
count=0
}

currentText=text[count]
letter=currentText.slice(0,++index)

document.querySelector(".typing").textContent=letter

if(letter.length===currentText.length){
count++
index=0
}

setTimeout(type,120)
}

type()



/* particles background */

particlesJS("particles-js",{
particles:{
number:{value:80},
size:{value:3},
move:{speed:2},
line_linked:{enable:true},
color:{value:"#FFD700"}
}
})
ScrollReveal().reveal('section', {
distance: '80px',
duration: 2000,
easing: 'ease-in-out',
origin: 'bottom',
interval: 200
});
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
anchor.addEventListener('click', function (e) {
e.preventDefault();
document.querySelector(this.getAttribute('href'))
.scrollIntoView({ behavior: 'smooth' });
});
});