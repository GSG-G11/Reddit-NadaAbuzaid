// -----------------------------------------------------------------------------------
/*

     ! Table of Contents:
     1. Variables
     2. Show and hide password
     3. Validation
         3-1 Check email
         3-2 Check password
     4. Login

*/

// -----------------------------------------------------------------------------------

// 1. Variables
const password = document.getElementById('password');
const email = document.getElementById('email');

const emailErr = document.getElementById('emailErr');
const passwordErr = document.getElementById('passErr');

const loginBtn = document.getElementById('loginBtn');
const icon = document.getElementsByClassName('icon')[0];

const circle1 = document.getElementsByClassName('circle')[0];
const circle2 = document.getElementsByClassName('circle')[1];

// 2. Show and hide password
icon.addEventListener('click', () => {
  toggleShowHide(password, icon);
});

// 3. Validation

// 3-1 Check email
const checkEmail = () => {
  const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (!regexEmail.test(email.value) || email.validity.valueMissing) {
    emailErr.textContent = 'Please Enter a valid Email';
    circle1.style.visibility = 'visible';
    email.classList.add('showErr');
    return false;
  }
  emailErr.textContent = '';
  circle1.style.visibility = 'hidden';
  email.classList.remove('showErr');
  return true;
};

// 3-2 Check password
const checkPassword = () => {
  if (password.value.length < 8 || password.validity.valueMissing) {
    passwordErr.textContent = 'Password must be at least 8';
    circle2.style.visibility = 'visible';
    password.classList.add('showErr');
    icon.style.right = '25px';
    return false;
  }
  passwordErr.textContent = '';
  circle2.style.visibility = 'hidden';
  password.classList.remove('showErr');
  icon.style.right = '0';
  return true;
};

email.addEventListener('focusout', checkEmail);
password.addEventListener('focusout', checkPassword);

// 4. Login
loginBtn.addEventListener('click', () => {
  const request = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: email.value,
      password: password.value,
    }),
  };
  if (checkEmail() && checkPassword()) {
    fetch('/api/v1/signin', request)
      .then((response) => response.json())
      .then((res) => {
        if (res.status === 400) {
          Swal.fire({
            icon: 'error',
            text: res.message,
          });
        } else if (res.status === 200) {
          sessionStorage.isVisited = false;
          window.location.href = '/';
        }
      })
      .catch(console.log);
  }
});
