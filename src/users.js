async function checkLogged() {
  const result = await fetch('login.php', {method: 'POST'});
  const response = await result.text();
  if(response !== 'ok') {
    window.location.href = 'login.html';
  }
}
checkLogged();

function changePageActive(page) {
  if(page) {
    const buttons = document.getElementsByClassName('page-item');
    for(let i = 0; i < buttons.length; i++) {
      if(buttons[i].getAttribute('data-page') == page) {
        buttons[i].classList.add('active');
      } else {
        buttons[i].classList.remove('active');
      }
    }
  }
}

async function getUserList(page) {
  if(page) {
    changePageActive(page);
    const start = (page -1) * 5;
    const result = await fetch(`users.php?start=${start}`, {method: 'GET' });
    const response = await result.json();
    const rows = response.reduce((ac, s) => {
      ac+= `<tr>
        <th scope="row">
          <div class="container">
            <div class="row">${s.username}</div>
            <div class="row">${s.name}</div>
          </div>
        </th>
        <td>${s.group_student}</td>
      </tr>`;
      return ac;
    }, '');
    const tbody = document.getElementById('users_body');
    tbody.innerHTML = rows;
  }
}
getUserList(1);
async function getAllUserList() {
  const result = await fetch('all_users.php');
  const response = await result.json();
  const count = response.length;
  const pagination = Array.apply(null, Array(Math.ceil(count/5))).reduce((ac, s, index) => {
    ac+= `<li class="page-item ${!index ? 'active' : ''}" data-page="${index + 1}">
            <a class="page-link" onclick="getUserList(${index + 1})" href="javascript:void(0)">${index + 1}</a>
          </li>`;
    return ac;
  }, '');
  const paginationHtml = document.getElementById('pagination_html');
  paginationHtml.innerHTML = pagination;
}
getAllUserList();

async function logout() {
  const result = await fetch('logout.php', {method: 'DELETE'});
  const response = await result.text();
  if(response === 'ok') {
    window.location.href = 'login.html';
  }
}
