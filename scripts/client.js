let employees = [
  {
    name: 'Atticus',
    employeeNumber: '2405',
    annualSalary: '47000',
    reviewRating: 3
  },
  {
    name: 'Jem',
    employeeNumber: '62347',
    annualSalary: '63500',
    reviewRating: 4
  },
  {
    name: 'Scout',
    employeeNumber: '6243',
    annualSalary: '74750',
    reviewRating: 5
  },
  {
    name: 'Robert',
    employeeNumber: '26835',
    annualSalary: '66000',
    reviewRating: 1
  },
  {
    name: 'Mayella',
    employeeNumber: '89068',
    annualSalary: '35000',
    reviewRating: 1
  }
];

// YOU SHOULD NOT NEED TO CHANGE ANYTHING ABOVE THIS POINT

// Take small steps! Don't write a for loop and two functions that do all of the calculations right away.
// This problem is massive! Break the problem down. Use the debugger.
// What is the fewest lines of code I can write and test to get just a little closer?

// This is not a race. Everyone on your team should understand what is happening.
// Ask questions when you don't.
$(document).ready(function(){
  console.log('JQ');
  $('#calc').on( 'click', function() {
    bonusCalc(employees);
  });
  $('#addEmployee').on( 'click', function(){
    addEmployee(
      $('#nameInput').val(), 
      $('#employeeNumInput').val(), 
      $('#salaryInput').val(), 
      $('#ratingInput').val()
    );
  });
})
console.log('JS');
console.log( 'List of employees:', employees );

const bonusMax = .13;
const bonusMin = 0;

function addEmployee(Name, employeeNum, Salary, rating) {
  let newEmployee = {
    name: Name,
    employeeNumber: employeeNum,
    annualSalary: Salary,
    reviewRating: rating,
  }
  employees.push(newEmployee);
  $('#nameInput').val('');
  $('#employeeNumInput').val('');
  $('#salaryInput').val('');
  $('#ratingInput').val('');
  bonusCalc(employees);
}

function bonusCalc(employees){
  $('#employees').empty();
  for(let index of employees){
    bonusPercentageCalculation(index);
    let bonus = Math.round(index.annualSalary * bonusP);
    let object ={
      name: index.name,
      bonusPercentage: bonusP,
      totalBonus: Math.round(index.annualSalary * bonusP),
      totalCompensation: Number(index.annualSalary) + bonus,
    }
  appendDom(object);
  console.log(object);
  }
} 

function appendDom(object){
  let el = $('#employees');
  el.append(`<li>`+
    `<h3> Name: ` + object.name + ' ' +
    `Bonus Percentage: ` + object.bonusPercentage*100 + '% ' +
    `Total Bonus: $` + object.totalBonus + ' ' +
    `Total Compensation: $` + object.totalCompensation + ' ' +
    `</li>`
  );
}

function bonusPercentageCalculation(index){
  console.log('in bonusPercentageCalculation');
  if ( index.reviewRating <= 2 ){
    bonusP = 0;
  } else if ( index.reviewRating === 3 ){
    bonusP = .04;
  } else if ( index.reviewRating === 4 ){
    bonusP = .06;
  } else if ( index.reviewRating === 5 ){
    bonusP = .1;
  } 
  if ( index.employeeNumber < 10000 ){
    bonusP += .05;
  }
  if ( index.annualSalary > 65000 ){
    bonusP -= .01;
  }
  if ( bonusMax < bonusP ){
    bonusP = .13;
  } else if ( bonusP < bonusMin ) {
    bonusP = 0;
  }
}
