async function login(e) {
  e.preventDefault();
  const username = e.target.username.value;
  const password = e.target.password.value;
  const remember = e.target.remember.value;
  if (username && password) {
    var fd = new FormData();
    fd.append('username', username);
    fd.append('password', password);
    fd.append('remember', remember);
    const result = await fetch('login.php', {
      method: 'POST',
      body: fd
    });
    const response = await result.text();
    if(response === 'ok') {
      window.location.href = 'user-list.html';
    } else {
      console.log(response);
      showErrorMessage(true, response);
    }
  }
}
var form = document.getElementById("login_form");
form.addEventListener('submit', login);

function showErrorMessage(show, message) {
  const showMessageEl = document.getElementById('show_message');
  if(show) {
    const showMessageText = document.getElementById('error_message');
    showMessageText.textContent = message;
    showMessageEl.classList.add('show');
  } else {
    showMessageEl.classList.remove('show');
  }
}

async function checkLogged() {
  const result = await fetch('login.php', {method: 'POST'});
  const response = await result.text();
  if(response === 'ok') {
    window.location.href = 'user-list.html';
  }
}
checkLogged();
