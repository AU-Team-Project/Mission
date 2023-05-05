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

const Hour = document.querySelector('.hour').textContent;
const Mon = document.querySelector('.mon');
const Tue = document.querySelector('.tue');
const Wed = document.querySelector('.wed');
const Thu = document.querySelector('.thu');
const Fri = document.querySelector('.fri');

const selectTime = document.querySelector('#selecttime')
const selectWeek = document.querySelector('#selectweek')


const Subject = document.querySelector('#subject');
const Professor = document.querySelector('#professor');
const SubjectValue = Subject.value;
const ProfessorValue = Professor.value;

Add.addEventListener("click", add);
function add() {
    const selectWeekValue = (selectWeek.options[selectWeek.selectedIndex].value);
    const selectTimeValue = (selectTime.options[selectTime.selectedIndex].value);
    
  
}
// if(document.querySelector('#aside-manage div') != null)
// alert('요소 존재');
