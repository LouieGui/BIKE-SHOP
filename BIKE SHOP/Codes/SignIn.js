var attempt = 0;

function log_out() {
  window.location.href = "SignIn.html";
}

function LogIn() {
  var username = document.getElementById("username").value;
  var password = document.getElementById("password").value;

  if (username == "admin" && password == "admin") {
    window.location.href = "Homepage.html";
  } else {
    attempt++;
    document.getElementById("username").value = ""; 
    document.getElementById("password").value = "";
    if (attempt == 3) {
      alert("Cannot Login. Attempt exceed!");
      document.getElementById("btn-login").disabled = true;
      document.getElementById("username").disabled = true;
      document.getElementById("password").disabled = true;
      document.getElementById("username").value = null;
      document.getElementById("password").value = null;
      return false;
    } else {
      alert("Incorrect username & Password.");
      return false;
    }
  }
}

document.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    LogIn();
  }
});
