const addSchedule = document.querySelector('.add-schedule');
const pop = document.querySelector('.pop');
const Add = document.querySelector('.add')
const Close = document.querySelector('.close');

addSchedule.addEventListener("click", e => {
    pop.style.display = "block"
});
Close.addEventListener("click", e => {
    pop.style.display = "none"
});

Add.addEventListener('click', (e) => add(e));

function add(e) {
    
}