/* eslint-disable no-unused-vars */
// -----------------------------------------------------------------------------------
/*

     ! Table of Contents:
     1. Variables
     2. Fetch Pages
         2-1 Fetch Login Page
         2-2 Fetch Signup Page
     3. Check cookies and render posts
         3-1 Check cookies
         3-2 Get posts
     4. Onload
     5. Logout

*/

// -----------------------------------------------------------------------------------

// 1. Variables
const loginBtn = document.getElementById('loginBtn');
const joinBtn = document.getElementById('joinBtn');
const logoutBtn = document.getElementById('logoutBtn');

const buttons = document.getElementsByClassName('buttons')[0];
const userSection = document.getElementById('user');
const username = document.getElementById('username');
const postContainer = document.getElementById('post-container');

const userLink = document.getElementById('userLink');
const usernameProfile = document.getElementById('usernameProfile');
const useremailProfile = document.getElementById('useremailProfile');
const trashIcon = document.getElementsByClassName('fa-trash-alt');

let isLogged = false;
const user = window.location.href.split('/')[4];

// 2. Fetch Pages
const request = {
  method: 'GET',
  headers: { 'Content-Type': 'application/json' },
};

// 2-1. Fetch Login Page
loginBtn.addEventListener('click', () => {
  fetch('/signin', request)
    .then((res) => {
      if (res.status === 200) {
        window.location.href = '/signin';
      }
    })
    .catch((err) => console.log(err));
});

// 2-2. Fetch Signup Page
joinBtn.addEventListener('click', () => {
  fetch('/signup', request)
    .then((res) => {
      if (res.status === 200) {
        window.location.href = '/signup';
      }
    })
    .catch((err) => console.log(err));
});

// 3. Check cookies and render posts

// 3-1 Check cookies
const checkCookies = () => {
  fetch('/api/v1/cookie', request)
    .then((data) => {
      if (data.status === 200) {
        buttons.style.display = 'none';
        userSection.style.display = 'flex';
        isLogged = true;
      } else if (data.status === 401) {
        buttons.style.display = 'flex';
        userSection.style.display = 'none';
        isLogged = false;
        throw new Error({ message: 'You are not logged in' });
      }
      return data;
    })
    .then((res) => res.json())
    .then((userInfo) => {
      username.textContent = userInfo.username;
      userLink.href = `/user/${userInfo.username}`;
    })
    .catch(console.log);
};

// 3-2 Get posts
const getPosts = () => {
  fetch(`/api/v1/user/${user}`, request)
    .then((res) => {
      if (res.status === 404) window.location.href = '/error/404';
      return res.json();
    })
    .then((data) => {
      usernameProfile.textContent = user;

      if (data.message === 'User has no posts') {
        postContainer.innerHTML = '<h1>No Posts</h1>';
        useremailProfile.textContent = data.email;
      } else {
        data.posts.forEach((post) => {
          // eslint-disable-next-line no-undef
          handleDom(
            postContainer,
            post.username,
            post.title,
            post.content,
            post.id,
            username.textContent
          );
          useremailProfile.textContent = post.email;
        });
      }
    })
    .catch(console.log);
};

// 4. OnLoad
window.addEventListener('load', () => {
  checkCookies();
  getPosts();
});

// 5. Logout
logoutBtn.addEventListener('click', () => {
  fetch('/api/v1/logout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  })
    .then((res) => {
      if (res.status === 205) {
        sessionStorage.isVisited = false;
        window.location.href = '/';
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Logged out successfully',
          showConfirmButton: false,
          timer: 1500,
        });
      }
    })
    .catch((err) => console.log(err));
});
