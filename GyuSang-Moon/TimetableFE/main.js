const addSchedule = document.querySelector('.add-schedule');
const pop = document.querySelector('.pop');
const Add = document.querySelector('.add');
const Close = document.querySelector('.close');
const scheduleForm = document.querySelector('#schedule-form');
const scheduleTable = document.querySelector('.schedule-table');

addSchedule.addEventListener("click", e => {
  pop.style.display = "block"
});

Close.addEventListener("click", e => {
  pop.style.display = "none"
});

Add.addEventListener('click', (e) => {
  e.preventDefault(); // 기본 이벤트 동작을 막습니다.

  // 입력된 값들을 선택합니다.
  const nameInput = scheduleForm.querySelector('#name');
  const dayInput = scheduleForm.querySelector('#day');
  const timeInput = scheduleForm.querySelector('#time');

  // 시간표에 값을 추가할 위치를 선택합니다.
  const row = scheduleTable.insertRow(-1);
  const nameCell = row.insertCell(0);
  const dayCell = row.insertCell(1);
  const timeCell = row.insertCell(2);

  // 선택한 값들을 이용하여 시간표에 값을 추가합니다.
  nameCell.innerHTML = nameInput.value;
  dayCell.innerHTML = dayInput.value;
  timeCell.innerHTML = timeInput.value;

  // 입력된 값들을 초기화합니다.
  nameInput.value = '';
  dayInput.value = '';
  timeInput.value = '';

  pop.style.display = "none"; // 팝업 창을 닫습니다.
});