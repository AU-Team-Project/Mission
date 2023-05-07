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
const Mon = document.querySelector('.mon').className;
const Tue = document.querySelector('.tue').className;
const Wed = document.querySelector('.wed').className;
const Thu = document.querySelector('.thu').className;
const Fri = document.querySelector('.fri').className;

const selectTime = document.querySelector('#selecttime')
const selectWeek = document.querySelector('#selectweek')

const Subject = document.querySelector('#subject');
const Professor = document.querySelector('#professor');


Add.addEventListener("click", add);


const week = Array.from(selectWeek.options);
const weekArray = week.map(option => option.value);
const time = Array.from(selectTime.options);
const timeArray = time.map(option => option.value);

const selectWeekValue = selectWeek.options[selectWeek.selectedIndex].value;
const selectTimeValue = selectTime.options[selectTime.selectedIndex].value;

const table = document.querySelector('#timetable');
const trs = Array.from(table.querySelectorAll('tr'));
const tableArray = trs.map(tr => Array.from(tr.querySelectorAll('td, th')));
Add.addEventListener("click", add);
function add() {
    // const selectColorValue = document.querySelector('#selectcolor').value;
    
    // const SubjectValue = Subject.value;
    // const ProfessorValue = Professor.value;
    // alert(selectColorValue + selectWeekValue + selectTimeValue + SubjectValue + ProfessorValue);
    console.log(tableArray);
}


// 0: [th.empty, th.week, th.week, th.week, th.week, th.week]
// 1: [th.hour, td.mon, td.tue, td.wed, td.thu, td.fri]
// 2: [th.hour, td.mon, td.tue, td.wed, td.thu, td.fri]
// 3: [th.hour, td.mon, td.tue, td.wed, td.thu, td.fri]
// 4: [th.hour, td.mon, td.tue, td.wed, td.thu, td.fri]
// 5: [th.hour, td.mon, td.tue, td.wed, td.thu, td.fri]
// 6: [th.hour, td.mon, td.tue, td.wed, td.thu, td.fri]
// 7: [th.hour, td.mon, td.tue, td.wed, td.thu, td.fri]
// 8: [th.hour, td.mon, td.tue, td.wed, td.thu, td.fri]