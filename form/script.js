let name = document.querySelector("#name");
let email = document.querySelector("#email");
let message = document.querySelector("#message");
let error = document.querySelector(".error");
let btn = document.querySelector("button");
let success = document.querySelector(".success");

btn.addEventListener("click", submit);

function submit(e) {
  e.preventDefault();

  var xhr = new XMLHttpRequest();
  xhr.open("POST", "https://ccnjhjgzud.execute-api.us-east-1.amazonaws.com/dev", true);

  xhr.setRequestHeader("Content-type", "application/json");
  xhr.onreadystatechange = function() {
    if (xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
    }
  };
  var data = {
    name: name.value,
    email: email.value,
    message: message.value
  };

  if (name.value && email.value && message.value) {
    success.style.display = "block";
    success.innerHTML = "Thanks for submitting";
    document.querySelector(".all").style.display = "none";
    xhr.send(JSON.stringify(data));

  } else {
      error.style.display = "block";
      error.innerHTML = "Please Fill  All Details";
  }
}
