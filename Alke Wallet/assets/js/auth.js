if (!localStorage.getItem("logged")) localStorage.setItem("logged", "false");

$(document).ready(function(){
  $("#loginForm").submit(function(e){
    e.preventDefault();
    const user=$("#username").val().trim();
    const pass=$("#password").val().trim();
    $("#loginFeedback").addClass("d-none");
    if(user==="admin" && pass==="1234"){
      localStorage.setItem("logged","true");
      window.location.href="menu.html";
    } else {
      $("#loginFeedback").removeClass("d-none");
    }
  });
});
