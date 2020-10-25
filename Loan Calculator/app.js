// Listen for submit
document.getElementById('loan-form').addEventListener('submit', loaderUI);

function loaderUI(e){
e.preventDefault();
// Hide Results
document.getElementById('results').classList.add('d-none');

// Show loader
document.getElementById('loading').classList.remove('d-none');

setTimeout(calculatePayment, 2000);

}

// Calculate Loan Payment
function calculatePayment(){
console.log('calculating...');

const amountEl = document.getElementById('amount');
const interestEl = document.getElementById('interest');
const yearsEl = document.getElementById('years');
const monthlyPmtEl = document.getElementById('monthly-payment');
const totalPmtEl = document.getElementById('total-payment');
const totalInterestEl = document.getElementById('total-interest');

const loanPrincipal = parseFloat(amountEl.value); 
const loanInterest = parseFloat(interestEl.value) /100 /12;
const calculatedPmts = parseFloat(yearsEl.value) *12;

// Compute Monthly Payment
const x = Math.pow(1 + loanInterest, calculatedPmts);
const monthly = (loanPrincipal * x * loanInterest)/(x-1);

console.log('Principal ->',loanPrincipal,'Loan Interest ->',loanInterest, 'Calculated Payment ->', calculatedPmts, 'What is x? ->', x,'Monthly Payment', monthly);

if(isFinite(monthly)){
  monthlyPmtEl.value = monthly.toFixed(2);
  totalPmtEl.value = (monthly * calculatedPmts).toFixed(2);
  totalInterestEl.value = (totalPmtEl.value - loanPrincipal).toFixed(2);

// Hide Loader
document.getElementById('loading').classList.add('d-none');

// Show Results
document.getElementById('results').classList.remove('d-none');

} else {
  showError('Please check your numbers and try again.')

  // Hide Loader
document.getElementById('loading').classList.add('d-none');

}
};

// Show Error
function showError(error){
  const errorDiv = document.createElement('div');

const loanForm = document.getElementById('loan-form');



  // Add a class
  errorDiv.className = 'alert alert-danger';

  // Create Text to append to div
  errorDiv.appendChild(document.createTextNode(error));

  // Insert error message above results 
  loanForm.appendChild(errorDiv);

  // Clear error after 3 seconds
  setTimeout(clearError, 3000);

}

function clearError(){
  document.querySelector('.alert').remove();
}