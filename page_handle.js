const choose = document.getElementById('choose');
const sgpa_cal_div = document.getElementById('sgpa_calculator');

function choosesgpa() {
    choose.classList.remove('appear');
    choose.classList.add('disappear');
    
    setTimeout(()=>{
        sgpa_cal_div.style.display = "flex";
        sgpa_cal_div.classList.add('appear');
    }, 1500);
}

function cal_sgpa_back(){
    sgpa_cal_div.classList.remove('appear');
    sgpa_cal_div.classList.add('disappear');
    
    setTimeout(()=>{
        choose.style.display="flex";
        choose.classList.add('appear');
    }, 1500);
}

const subjectInput = document.getElementById('sgpa_cal_subject');
const creditsInput = document.getElementById('sgpa_cal_credits');
const marksInput = document.getElementById('sgpa_cal_marks');
const addButton = document.getElementById('sgpa_cal_add-button');
const Calculatesgpa = document.getElementById('cal_sgpa');
const courseTable = document.getElementById('sgpa_cal_course-table');
const tableBody = document.getElementById('sgpa_cal_tbody');
const show_sgpa = document.getElementById('sgpa-not-bad');
const sgpa_disp = document.getElementById('show-sgpa');
var tcredits = 0;
var tcreditscored = 0;

addButton.addEventListener('click', () => {
  const subject = subjectInput.value.trim();
  const credits = parseInt(creditsInput.value.trim());
  const marks = parseInt(marksInput.value.trim());

  // Validation (check if all inputs are filled)
  if (!subject || !credits || !marks) {
    alert('Please fill in all fields!');
    return;
  }

  // Calculate points
  const points = marks % 10 === 0 ? marks / 10 : parseInt((marks / 10) + 1);

  // Calculate credit scored
  const creditScored = (credits * points)/10;
  tcredits = tcredits+credits;
  tcreditscored = tcreditscored+creditScored;
  console.log(tcredits, tcreditscored);

  // Create a new table row
  const tableRow = document.createElement('tr');

  // Add cells for each data
  tableRow.innerHTML = `
    <td>${subject}</td>
    <td>${credits}</td>
    <td>${marks}</td>
    <td>${points}</td>
    <td>${creditScored}</td>
  `;

  // Append the new row to the table body
  tableBody.appendChild(tableRow);

  // Clear input fields after adding
  subjectInput.value = '';
  creditsInput.value = '';
  marksInput.value = '';
});


Calculatesgpa.addEventListener('click', () => {
    var sgpa = (tcreditscored/tcredits)*10;
    console.log(sgpa);
    sgpa_disp.innerHTML=('YOUR SGPA is : '+sgpa);
    show_sgpa.style.display = 'flex';
});