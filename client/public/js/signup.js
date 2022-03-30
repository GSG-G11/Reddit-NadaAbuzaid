/* eslint-disable no-undef */
// -----------------------------------------------------------------------------------
/*

     ! Table of Contents:
     1. Variables
     2. Show and hide password
     3. Validation
         3-1 Check username
         3-2 Check email
         3-3 Check password
     4. Signup

*/

// -----------------------------------------------------------------------------------

// 1. Variables
const username = document.getElementById('username');
const password = document.getElementById('password');
const email = document.getElementById('email');

const nameErr = document.getElementById('nameErr');
const emailErr = document.getElementById('emailErr');
const passwordErr = document.getElementById('passErr');

const signupBtn = document.getElementById('signupBtn');

const icon = document.getElementsByClassName('icon')[0];
const circle1 = document.getElementsByClassName('circle')[0];
const circle2 = document.getElementsByClassName('circle')[1];
const circle3 = document.getElementsByClassName('circle')[2];

// 2. Show and Hide password

icon.addEventListener('click', () => {
  toggleShowHide(password, icon);
});

// 3. Validation

// 3-1 Check username
const checkUsername = () => {
  if (username.validity.valueMissing) {
    errorValidation(
      nameErr,
      circle1,
      username,
      'Please Enter a valid username',
      'visible',
    );
    return false;
  }
  nameErr.textContent = '';
  circle1.style.visibility = 'hidden';
  username.classList.remove('showErr');
  return true;
};

// 3-2 Check email
const checkEmail = () => {
  const regexEmail = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  if (!regexEmail.test(email.value) || email.validity.valueMissing) {
    errorValidation(
      emailErr,
      circle2,
      email,
      'Please Enter a valid Email',
      'visible',
    );
    return false;
  }
  emailErr.textContent = '';
  circle2.style.visibility = 'hidden';
  email.classList.remove('showErr');
  return true;
};

// 3-3 Check password
const checkPassword = () => {
  if (password.value.length < 8 || password.validity.valueMissing) {
    errorValidation(
      passwordErr,
      circle3,
      password,
      'Password must be at least 8',
      'visible',
    );
    icon.style.right = '25px';
    return false;
  }
  errorValidation(passwordErr, circle3, password, '', 'hidden');
  password.classList.remove('showErr');
  icon.style.right = '0';
  return true;
};

username.addEventListener('focusout', checkUsername);
email.addEventListener('focusout', checkEmail);
password.addEventListener('focusout', checkPassword);

// 4. Signup
signupBtn.addEventListener('click', () => {
  const request = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username: username.value,
      email: email.value,
      password: password.value,
    }),
  };

  if (checkUsername() && checkEmail() && checkPassword()) {
    fetch('/api/v1/signup', request)
      .then((response) => response.json())
      .then((res) => {
        if (res.status === 400) {
          // eslint-disable-next-line no-undef
          Swal.fire({
            icon: 'error',
            text: res.message,
          });
        } else if (
          res.status === 401
          && res.message === 'Username Already Exist!'
        ) {
          errorValidation(
            nameErr,
            circle1,
            username,
            'Username Already Exist!',
            'visible',
          );
        } else if (
          res.status === 401
          && res.message === 'Email Already Exist!'
        ) {
          errorValidation(
            emailErr,
            circle2,
            email,
            'Email Already Exist!',
            'visible',
          );
        } else if (res.status === 201) {
          sessionStorage.isVisited = false;
          window.location.href = '/';
        }
      })
      .catch((err) => console.log(err));
  }
});
