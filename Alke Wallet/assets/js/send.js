if(localStorage.getItem("logged")!=="true") window.location.href="login.html";

$(document).ready(function(){
  const contacts=["Juan Pérez","María López","Pedro González"];

  $("#contactInput").on("input", function(){
    const value = $(this).val().toLowerCase();
    $("#suggestions").empty();
    contacts.forEach(c=>{
      if(c.toLowerCase().includes(value) && value!==""){
        $("#suggestions").append(`<li class="list-group-item">${c}</li>`);
      }
    });
  });

  $("#sendBtn").click(function(){
    const amount = Number($("#sendAmount").val());
    const contact = $("#contactInput").val().trim();
    if(!contact || amount<=0){
      $("#sendAlert").html(`<div class="alert alert-danger">Datos inválidos</div>`);
      return;
    }
    if(amount>getBalance()){
      $("#sendAlert").html(`<div class="alert alert-danger">Saldo insuficiente</div>`);
      return;
    }
    addMovement("Envío", amount, contact);
    updateUI();
    $("#sendAlert").html(`<div class="alert alert-success">Envío realizado con éxito</div>`);
    $("#sendAmount").val("");
    $("#contactInput").val("");
  });
});
