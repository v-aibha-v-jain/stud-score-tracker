///////////////////////////////////////////////////////////////
////////////////// CONSTS FOR DIV ELEMENTS ////////////////////
///////////////////////////////////////////////////////////////
const choose       = document.getElementById('choose');
const sgpa_cal_div = document.getElementById('sgpa_calculator');
const cgpa_cal_div = document.getElementById('cgpa_div');
const stud_rout_targ_div = document.getElementById('stud_rout_div');


///////////////////////////////////////////////////////////////
////////////// WHEN ONE OF THE OPTION IS CHOSEN ///////////////
///////////////////////////////////////////////////////////////
function choosesgpa() {
  choose.classList.remove('appear');
  choose.classList.add('disappear');
  
  setTimeout(()=>{
    sgpa_cal_div.style.display = "flex";
    sgpa_cal_div.classList.add('appear');
  }, 1500);
}
function choosecgpa() {
  choose.classList.remove('appear');
  choose.classList.add('disappear');
  
  setTimeout(()=>{
    cgpa_cal_div.style.display = "flex";
    cgpa_cal_div.classList.add('appear');
  }, 1500);
}
function stud_rout() {
  choose.classList.remove('appear');
  choose.classList.add('disappear');
  
  setTimeout(()=>{
    stud_rout_targ_div.style.display = "flex";
    stud_rout_targ_div.classList.add('appear');
  }, 1500);
}


///////////////////////////////////////////////////////////////
///////////////////// BACK TO MAIN PAGE ///////////////////////
///////////////////////////////////////////////////////////////
function cal_sgpa_back(){
  sgpa_cal_div.classList.remove('appear');
  sgpa_cal_div.classList.add('disappear');
  show_sgpa.style.display="none";
  const body = document.getElementById('sgpa_cal_course-table_body');
  body.innerHTML = '';
  setTimeout(()=>{
    choose.style.display="flex";
    choose.classList.add('appear');
  }, 1500);
}
function cal_cgpa_back(){
  document.getElementById('cgpa_cal_nofsem').value = "";
  const body = document.getElementById('sems_sgpa_tb');
  body.innerHTML = '';
  cgpa_cal_div.classList.remove('appear');
  cgpa_cal_div.classList.add('disappear');
  not_bad.style.display="none";
  setTimeout(()=>{
    choose.style.display="flex";
    choose.classList.add('appear');
  }, 1500);
}
function stud_rout_back(){
  stud_rout_targ_div.classList.remove('appear');
  stud_rout_targ_div.classList.add('disappear');
  setTimeout(()=>{
    choose.style.display="flex";
    choose.classList.add('appear');
  }, 1500);
}


///////////////////////////////////////////////////////////////
///////////////////// SGPA DIV ELEMENTS ///////////////////////
///////////////////////////////////////////////////////////////
const subjectInput  = document.getElementById('sgpa_cal_subject');
const creditsInput  = document.getElementById('sgpa_cal_credits');
const marksInput    = document.getElementById('sgpa_cal_marks');
const addButton     = document.getElementById('sgpa_cal_add-button');
const Calculatesgpa = document.getElementById('cal_sgpa');
const courseTable   = document.getElementById('sgpa_cal_course-table');
const tableBody     = document.getElementById('sgpa_cal_course-table_body');
const show_sgpa     = document.getElementById('sgpa-not-bad');
const sgpa_disp     = document.getElementById('show-sgpa');
var tcredits      = 0;
var tcreditscored = 0;


///////////////////////////////////////////////////////////////
////////////////// MARKS DISPLAYED IN TABLE ///////////////////
///////////////////////////////////////////////////////////////
addButton.addEventListener('click', () => {
  const subject = subjectInput.value.trim();
  const credits = parseInt(creditsInput.value.trim());
  const marks   = parseInt(  marksInput.value.trim());

  if (!subject || !credits || !marks) {
    alert('Please fill in all fields!');
    return;
  }
  const points = marks % 10 === 0 ? marks / 10 : parseInt((marks / 10) + 1);
  const creditScored = (credits * points)/10;
  tcredits = tcredits+credits;
  tcreditscored = tcreditscored+creditScored;
  console.log(tcredits, tcreditscored);
  const tableRow = document.createElement('tr');
  tableRow.innerHTML = `
    <td>${subject}</td>
    <td>${credits}</td>
    <td>${marks}</td>
    <td>${points}</td>
    <td>${creditScored}</td>
  `;
  tableBody.appendChild(tableRow);
  subjectInput.value = '';
  creditsInput.value = '';
  marksInput.value = '';
});


///////////////////////////////////////////////////////////////
/////////////////////// CALCULATE SGPA ////////////////////////
///////////////////////////////////////////////////////////////
Calculatesgpa.addEventListener('click', () => {
  var sgpa = (tcreditscored/tcredits)*10;
  console.log(sgpa);
  sgpa_disp.innerHTML=('YOUR SGPA is : '+sgpa);
  show_sgpa.style.display = 'flex';
});


///////////////////////////////////////////////////////////////
///////////////////// CGPA create table ///////////////////////
///////////////////////////////////////////////////////////////
var sems
const cgpa_nofsem = document.getElementById('cgpa_cal_create_table');
cgpa_nofsem.addEventListener('click', ()=>{
  const nofsem = document.getElementById('cgpa_cal_nofsem');
  const body_input_cgpa = document.getElementById('sems_sgpa_tb');
  sems = parseInt(nofsem.value.trim());
  if (isNaN(sems)) {
    alert('Please enter a valid number!');
    return;
  }
  for(let i=1; i<=sems;i++){
    const tableRow = document.createElement('tr');
    const td1 = document.createElement('td');
    td1.textContent = "sem "+i;
    const td2 = document.createElement('td');
    const inputField = document.createElement('input');
    inputField.type = 'number';
    td2.appendChild(inputField);
    inputField.classList.add('sem'+i);
    tableRow.appendChild(td1);
    tableRow.appendChild(td2);
    tableRow.classList.add('cgpa_row'+i)
    body_input_cgpa.appendChild(tableRow);
  }
});


///////////////////////////////////////////////////////////////
/////////////////////// CALCULATE CGPA ////////////////////////
///////////////////////////////////////////////////////////////
const Calculatecgpa = document.getElementById('cal_cgpa');
const not_bad = document.getElementById('cgpa-not-bad');
Calculatecgpa.addEventListener('click', () => {
  const cgpa_disp = document.getElementById('show_cgpa');
  var total=0;
  for (let i = 1; i <= sems; i++) {
    const inputElement = document.querySelector('.sem' + i);
    if (inputElement) {
      total = total + parseFloat(inputElement.value.trim());
    } else {
      console.warn('Element sem' + i + ' not found!');
    }
  }
  if (isNaN(total)) {
    alert('Please enter valid values in all semester fields!');
    return;
  }
  let cgpa = total/sems;
  cgpa_disp.innerHTML=('YOUR CGPA is : '+cgpa);
  not_bad.style.display = 'flex';
});