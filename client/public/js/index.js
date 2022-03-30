/* eslint-disable no-console */
/* eslint-disable no-param-reassign */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
// -----------------------------------------------------------------------------------
/*

     ! Table of Contents:
     1. Variables
     2. Scroll Indicator Function
     3. Back To Top Button
     4. Fetch Pages
         4-1 Fetch Login Page
         4-2 Fetch Signup Page
     5. Check cookies and render posts
        5-1 Check cookies
        5-2 Get all posts
        5-3 OnLoad
     6. Logout
     7. Open and close the modal
     8. Add votes to posts
     9. Add Post
        9-1 Check title
        9-2 Check content
        9-3 Add post

*/

// -----------------------------------------------------------------------------------

// 1. Variables
const backToTopBtn = document.querySelector('#backToTopBtn');
const buttons = document.getElementsByClassName('buttons')[0];
const userSection = document.getElementById('user');

const username = document.getElementById('username');

const closePosts = document.getElementsByClassName('close-btn')[0];
const closeComments = document.getElementsByClassName('close-btn')[1];
const postInput = document.getElementsByClassName('post-input')[0];
const open = document.getElementById('post-btn');
const modal = document.getElementById('modal');
const modalComment = document.getElementById('modalComment');
const overlay = document.getElementById('overlay');

const loginBtn = document.getElementById('loginBtn');
const joinBtn = document.getElementById('joinBtn');
const logoutBtn = document.getElementById('logoutBtn');
const createPostBtn = document.getElementById('createPostBtn');

const postContainer = document.getElementById('post-container');
const userLink = document.getElementById('userLink');
const trashIcon = document.getElementsByClassName('fa-trash-alt');

const postTitle = document.getElementById('post-title');
const postContent = document.getElementById('post-content-input');

const commentContent = document.getElementById('comment-content-input');
const addCommentBtn = document.getElementById('addCommentBtn');
const postComments = document.getElementsByClassName('post-comments')[0];

const postTitleErr = document.getElementById('postTitleErr');
const postContentErr = document.getElementById('postContentErr');

const circle1 = document.getElementById('circle1');
const circle2 = document.getElementById('circle2');

let isLogged = false;
let postIdValue;

// 2- Scroll Indicator Function
function myFunction() {
  const winScroll =
    document.body.scrollTop || document.documentElement.scrollTop;
  const height =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  const scrolled = (winScroll / height) * 100;
  document.getElementById('myBar').style.width = `${scrolled}%`;
}

// When the user scrolls the page, execute myFunction
window.onscroll = () => {
  myFunction();
};

// 3. Back To Top Button

// When the user scrolls the page, execute displayBtn function
const displayBtn = () => {
  const y = window.scrollY;
  if (y > 200) backToTopBtn.classList.replace('hide', 'show');
  else backToTopBtn.classList.replace('show', 'hide');
};

window.addEventListener('scroll', displayBtn);

// When the user click backToTop Button, execute backToTop function
const backToTop = () => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth',
  });
};

backToTopBtn.addEventListener('click', backToTop);

// 4. Fetch Pages
const request = {
  method: 'GET',
  headers: { 'Content-Type': 'application/json' },
};

// 4-1. Fetch Login Page
loginBtn.addEventListener('click', () => {
  fetch('/signin', request)
    .then((res) => {
      if (res.status === 200) {
        window.location.href = '/signin';
      }
    })
    .catch((err) => console.log(err));
});

// 4-2. Fetch Signup Page
joinBtn.addEventListener('click', () => {
  fetch('/signup', request)
    .then((res) => {
      if (res.status === 200) {
        window.location.href = '/signup';
      }
    })
    .catch((err) => console.log(err));
});

// 5. Check cookies and render posts

// 5-1 Check cookies
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
        postInput.placeholder = "What's in your mind?";
        isLogged = false;
        throw new Error('You are not logged in');
      }
      return data;
    })
    .then((res) => res.json())
    .then((userInfo) => {
      username.textContent = userInfo.username;
      postInput.placeholder = `What's in your mind, ${userInfo.username}?`;
      userLink.href = `/user/${userInfo.username}`;
    })
    .catch((err) => console.log(err));
};

// 5-2 Get all posts
const getPosts = () => {
  fetch('/api/v1/posts', request)
    .then((res) => res.json())
    .then((posts) => {
      posts.forEach((post) => {
        handleDom(
          postContainer,
          post.username,
          post.title,
          post.content,
          post.id,
          username.textContent
        );
      });
    })
    .catch((err) => console.log(err));
};

// 5-3 OnLoad
window.addEventListener('load', () => {
  checkCookies();
  getPosts();
  if (sessionStorage.isVisited === 'false') {
    document.getElementsByTagName('body')[0].classList.remove('body');
  }
  sessionStorage.isVisited = true;
});

// 6. Logout
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

// 7. Open and close the modal

// 7-1 Open
function openFun(modalName) {
  modalName.style.display = 'block';
  overlay.style.opacity = 1;
}

// 7-2 Close
function closeFun(modalName) {
  modalName.style.display = 'none';
  overlay.style.opacity = 0;
}

postInput.addEventListener('click', () => {
  if (isLogged) openFun(modal);
  else Swal.fire({ icon: 'error', text: 'Please! Login First!' });
});

open.addEventListener('click', () => {
  if (isLogged) openFun(modal);
  else Swal.fire({ icon: 'error', text: 'Please! Login First!' });
});

closePosts.addEventListener('click', () => closeFun(modal));

// 8. Add votes to posts
const votePosts = (voteType, postId) => {
  const reqVote = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  };

  fetch(`/api/v1/vote/${postId}/${voteType}`, reqVote)
    .then((resp) => {
      if (resp.status === 401) {
        Swal.fire({
          icon: 'error',
          text: 'Kindly login to vote!',
        });
      } else if (resp.status === 200) {
        if (voteType === 'up') {
          document.getElementsByClassName(`up-${postId}`)[0].style.color =
            '#ff4500';
          document.getElementsByClassName(`down-${postId}`)[0].style.color =
            '#999da5';
        } else {
          document.getElementsByClassName(`up-${postId}`)[0].style.color =
            '#999da5';
          document.getElementsByClassName(`down-${postId}`)[0].style.color =
            '#ff4500';
        }
        sessionStorage.isVisited = 'false';
        window.location.href = '/';
      }
    })
    .catch(console.log);
};

// 9. Add Post

// 9-1 Check title
const checkTitle = () => {
  if (postTitle.validity.valueMissing) {
    errorValidation(
      postTitleErr,
      circle1,
      postTitle,
      'Post title is required',
      'visible'
    );
    return false;
  }
  errorValidation(postTitleErr, circle1, postTitle, '', 'hidden');
  postTitle.style.border = '1px solid #dae0e6';
  return true;
};

// 9-2 Check content
const checkContent = () => {
  if (postContent.validity.valueMissing) {
    errorValidation(
      postContentErr,
      circle2,
      postContent,
      'Post Content is required',
      'visible'
    );
    return false;
  }
  errorValidation(postContentErr, circle2, postContent, '', 'hidden');
  postContent.style.border = '1px solid #dae0e6';
  return true;
};

postTitle.addEventListener('focusout', checkTitle);
postContent.addEventListener('focusout', checkContent);

// 9-3 Add post
const addPost = () => {
  if (checkTitle() && checkContent()) {
    const postRequest = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: postTitle.value,
        content: postContent.value,
      }),
    };
    fetch('/api/v1/post', postRequest)
      .then((res) => res.json())
      .then((posts) => {
        posts.data.rows.forEach((post) => {
          handleDom(
            postContainer,
            posts.username,
            post.title,
            post.content,
            post.id,
            username.textContent
          );
          postTitle.value = '';
          postContent.value = '';
        });
      })
      .catch(console.log);
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Your Post has been Added!',
      showConfirmButton: false,
      timer: 1500,
    });
    closeFun(modal);
  }
};

createPostBtn.addEventListener('click', (e) => {
  e.preventDefault();
  addPost();
});
