// Select elements
const balanceDisplay = document.getElementById('balance');
const incomeDisplay = document.getElementById('income-total');
const expenseDisplay = document.getElementById('expense-total');
const transactionList = document.getElementById('transaction-list');
const form = document.getElementById('transaction-form');

// Initialize variables
let income = 0;
let expenses = 0;
let transactions = [];

// Function to update display
function updateDisplay() {
  const totalBalance = income - expenses;
  
  balanceDisplay.textContent = totalBalance.toFixed(2);
  incomeDisplay.textContent = income.toFixed(2);
  expenseDisplay.textContent = expenses.toFixed(2);
}

// Add transaction function
function addTransaction(description, amount, type) {
  const transaction = {
    id: Date.now(), // Unique ID for each transaction
    description,
    amount: parseFloat(amount),
    type
  };

  transactions.push(transaction);

  if (type === 'income') {
    income += transaction.amount;
  } else {
    expenses += transaction.amount;
  }

  updateDisplay();
  renderTransactions();
}

// Delete transaction function
function deleteTransaction(id) {
  // Find the transaction by id and remove it from the array
  const transactionToDelete = transactions.find(transaction => transaction.id === id);

  if (transactionToDelete.type === 'income') {
    income -= transactionToDelete.amount;
  } else {
    expenses -= transactionToDelete.amount;
  }

  transactions = transactions.filter(transaction => transaction.id !== id);

  updateDisplay();
  renderTransactions();
}

// Render transaction history
function renderTransactions() {
  transactionList.innerHTML = '';

  transactions.forEach(transaction => {
    const li = document.createElement('li');
    li.classList.add(transaction.type);

    li.innerHTML = `
      ${transaction.description} 
      <span>₹${transaction.amount.toFixed(2)}</span>
      <button onclick="deleteTransaction(${transaction.id})">Delete</button>
    `;

    transactionList.appendChild(li);
  });
}

// Handle form submission
form.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const description = document.getElementById('description').value;
  const amount = document.getElementById('amount').value;
  const type = document.getElementById('type').value;
  
  if (description.trim() === '' || amount.trim() === '') {
    alert('Please fill in all fields');
    return;
  }

  addTransaction(description, amount, type);
  
  // Clear form fields
  form.reset();
});
