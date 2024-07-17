"use strict";

document.getElementById('addUserButton').addEventListener('click', function () {
  let user = document.getElementById('addUser').value;
  if (user) {
    let userList = document.getElementById('userList');
    let li = document.createElement('li');
    li.className = 'list-group-item';
    li.appendChild(document.createTextNode(user));
    userList.appendChild(li);
    document.getElementById('addUser').value = '';
  }
});