// 1. Variables
const backToTopBtn = document.querySelector('#backToTopBtn');
const buttons = document.getElementsByClassName('buttons')[0];
const userSection = document.getElementById('user');
const username = document.getElementById('username');
const userLink = document.getElementById('userLink');

const loginBtn = document.getElementById('loginBtn');
const joinBtn = document.getElementById('joinBtn');
const logoutBtn = document.getElementById('logoutBtn');
const addCommentBtn = document.getElementById('addCommentBtn');

const postContainer = document.getElementById('post-container');
const commentsContainer = document.getElementById('comments-container');

const commentContent = document.getElementById('comment-content-input');
const commentContentErr = document.getElementById('commentContentErr');
const circle = document.getElementsByClassName('circle')[0];

const id = window.location.href.split('/')[4];
let isLogged = false;

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
    .catch(console.log);
});

// 4-2. Fetch Signup Page
joinBtn.addEventListener('click', () => {
  fetch('/signup', request)
    .then((res) => {
      if (res.status === 200) {
        window.location.href = '/signup';
      }
    })
    .catch(console.log);
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
        isLogged = false;
        throw new Error('You are not logged in');
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

// 5-2. Get Post
const getPost = () => {
  fetch(`/api/v1/post/${id}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  })
    .then((res) => res.json())
    .then((post) => {
      handlePostPage(
        postContainer,
        post.username,
        post.title,
        post.content,
        post.id,
        username.textContent
      );
    })
    .catch(console.log);
};

// 8. Get comments
const getComments = (postId) => {
  const commentReq = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  };
  fetch(`/api/v1/posts/${postId}/comments`, commentReq)
    .then((res) => res.json())
    .then((comments) => {
      if (comments.length === 0) {
        commentsContainer.innerHTML = `<h3>No comments yet</h3>`;
      }
      comments.forEach((comment) => {
        HandleCommentsDom(commentsContainer, comment.username, comment.content);
        document.getElementById('postFooter').style.display = 'none';
      });
    });
};

// 5-3 OnLoad
window.addEventListener('load', () => {
  checkCookies();
  getPost();
  getComments(id);
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
    .catch(console.log);
});

// 8. Add Comment

// 8-1 check comment
const checkComment = () => {
  if (commentContent.validity.valueMissing) {
    errorValidation(
      commentContentErr,
      circle,
      commentContent,
      'Comment Content is required',
      'visible'
    );
    return false;
  }
  errorValidation(commentContentErr, circle, commentContent, '', 'hidden');
  commentContent.style.border = '1px solid #dae0e6';
  return true;
};

// 9. Add comment
const addComment = (postId) => {
  if (checkComment()) {
    const addCommentReq = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        content: commentContent.value,
      }),
    };
    fetch(`/api/v1/comment/${postId}`, addCommentReq)
      .then((response) => {
        if (response.status === 401) {
          Swal.fire({
            icon: 'error',
            text: 'Kindly, Login to comment!',
          });
        } else if (response.status === 201) {
          return response.json();
        }
      })
      .then(({ data }) => {
        commentsContainer.innerHTML = '';
        getComments(data.post_id);
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Comment added successfully',
          showConfirmButton: false,
          timer: 1500,
        });
        commentContent.value = '';
      });
  }
};

addCommentBtn.addEventListener('click', (e) => {
  e.preventDefault();
  addComment(id);
});
