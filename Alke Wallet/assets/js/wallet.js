if (localStorage.getItem("logged") !== "true") {
  window.location.href = "login.html";
}

const BALANCE_KEY = "wallet_balance";
const HISTORY_KEY = "wallet_history";

// Balance
function getBalance() {
  return Number(localStorage.getItem(BALANCE_KEY)) || 0;
}
function setBalance(value) {
  localStorage.setItem(BALANCE_KEY, value);
}

// Historial
function getHistory() {
  return JSON.parse(localStorage.getItem(HISTORY_KEY)) || [];
}
function saveHistory(history) {
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
}

// Agregar movimiento
function addMovement(type, amount, contact="") {
  const history = getHistory();
  history.unshift({
    type, amount, contact,
    date: new Date().toLocaleString()
  });
  saveHistory(history);

  let balance = getBalance();
  if(type==="Depósito") balance += amount;
  else balance -= amount;
  setBalance(balance);
}

// Actualizar UI
function updateUI(balanceId="balance") {
  document.getElementById(balanceId).innerText = `$${getBalance()}`;
}

// Render historial
function renderHistory(listId="history-list") {
  const list = document.getElementById(listId);
  list.innerHTML = "";
  getHistory().forEach(m=>{
    let className = m.type==="Depósito" ? "deposit-move" : m.type==="Retiro" ? "withdraw-move" : "send-move";
    list.innerHTML += `<li class="${className}">
      <span>${m.type}${m.contact ? " - " + m.contact : ""}</span>
      <strong>$${m.amount}</strong>
    </li>`;
  });
}

$(document).ready(function(){
  // Si existe saldo y lista, actualizar
  if($("#balance").length) updateUI();
  if($("#menu-balance").length) updateUI("menu-balance");
  if($("#history-list").length) renderHistory();
  if($("#recent-moves").length){
    const recent = getHistory().slice(0,5);
    recent.forEach(m=>{
      let className = m.type==="Depósito" ? "deposit-move" : m.type==="Retiro" ? "withdraw-move" : "send-move";
      $("#recent-moves").append(`<li class="${className}">
        <span>${m.type}${m.contact ? " - "+m.contact : ""}</span>
        <strong>$${m.amount}</strong>
      </li>`);
    });
  }

  // Depósito
  $("#deposit-btn").click(()=>{
    const amount = Number($("#amount-input").val());
    if(amount>0){ addMovement("Depósito", amount); updateUI(); renderHistory(); }
  });
  // Retiro
  $("#withdraw-btn").click(()=>{
    const amount = Number($("#amount-input").val());
    if(amount>0 && amount<=getBalance()){ addMovement("Retiro", amount); updateUI(); renderHistory(); }
  });
});
