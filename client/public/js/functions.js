// -----------------------------------------------------------------------------------
/*

     ! Table of Contents:
     1. Font Awesome script
     2. Show and hide password function
     3. Validation functions
     4. Votes function
     5. Delete Post
     6. Handle Dom - Posts

*/

// -----------------------------------------------------------------------------------

// 1. Font Awesome script
function fontAwesome() {
  const css = document.createElement('link');
  css.href = 'https://pro.fontawesome.com/releases/v5.10.0/css/all.css';
  css.rel = 'stylesheet';
  css.type = 'text/css';
  document.getElementsByTagName('head')[0].appendChild(css);
}
fontAwesome();

// 2. Show and hide password function
const toggleShowHide = (input, icon) => {
  if (input.type === 'password') {
    input.type = 'text';
    icon.classList.replace('fa-eye-slash', 'fa-eye');
    icon.style.color = '#4070f4';
  } else {
    input.type = 'password';
    icon.classList.replace('fa-eye', 'fa-eye-slash');
    icon.style.color = '#4070f4';
  }
};

// 3. Validation functions
const errorHandle = (errorText, errorLabel, e) => {
  const err = document.createTextNode(errorText);
  errorLabel.appendChild(err);
  e.preventDefault();
};

const errorValidation = (errorLabel, icon, input, message, iconvisibility) => {
  errorLabel.textContent = message;
  icon.style.visibility = iconvisibility;
  input.classList.add('showErr');
};

// 4. Votes function
const getVotes = (postId) =>
  fetch(`/api/v1/vote/${postId}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  })
    .then((data) => data.json())
    .then((count) => count.count)
    .catch(console.log);

// 5. Delete Post
const deletePost = (id) => {
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn-alert btn-success',
      cancelButton: 'btn-alert btn-danger',
    },
    buttonsStyling: false,
  });

  swalWithBootstrapButtons
    .fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'question',
      showCancelButton: true,
      cancelButtonText: 'No, cancel!',
      confirmButtonText: 'Yes, delete it!',
      reverseButtons: false,
    })
    .then((result) => {
      if (result.isConfirmed) {
        fetch(`/api/v1/post/${id}`, { method: 'DELETE' })
          .then((res) => res.json())
          .then(() => {
            const post = document.querySelector(`.user-post-${id}`);
            post.remove();
          });
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Your Post has been deleted',
          showConfirmButton: false,
          timer: 1500,
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: "Don't worry, Your post is safe!",
          showConfirmButton: false,
          timer: 2000,
        });
      }
    });
};

const showPostPage = (id) => {
  window.location.href = `/posts/${id}/show`;
};

// 6. Handle Dom - Main Page
const handleDom = (parent, owner, title, content, postId, user) => {
  const userPost = document.createElement('div');
  userPost.className = `user-post-${postId} user-post`;

  const vote = document.createElement('div');
  vote.className = 'vote';

  const down = document.createElement('i');
  down.className = `fas fa-arrow-alt-down arrow down-${postId}`;
  down.setAttribute('onclick', `votePosts('down', ${postId})`);

  const up = document.createElement('i');
  up.className = `fas fa-arrow-alt-up arrow up-${postId}`;
  up.setAttribute('onclick', `votePosts('up', ${postId})`);

  const votesNum = document.createElement('p');
  votesNum.className = 'votes-num';
  // eslint-disable-next-line no-return-assign
  getVotes(postId).then((count) => (votesNum.textContent = count));

  const postDiv = document.createElement('div');
  postDiv.className = 'post-div';

  const postUser = document.createElement('div');
  postUser.className = 'post-user';

  const username = document.createElement('a');
  username.className = 'username';
  username.id = 'username';
  username.textContent = owner;
  username.href = `/user/${owner}`;

  const postContent = document.createElement('div');
  postContent.className = 'post-content';

  const postTitle = document.createElement('div');
  postTitle.className = 'post-title';
  postTitle.textContent = title;

  const postDesc = document.createElement('div');
  postDesc.className = 'post-desc';
  postDesc.textContent = content;

  const postFooter = document.createElement('div');
  postFooter.className = 'post-footer';

  const avatar = document.createElement('img');
  avatar.src = '/images/logo.svg';
  avatar.className = 'user-icon';

  const commentsSec = document.createElement('div');
  commentsSec.className = 'comments-sec';

  const commentIcon = document.createElement('i');
  commentIcon.className = 'fas fa-comment-alt';

  const commentLabel = document.createElement('p');
  commentLabel.textContent = 'Comments'; // count
  commentLabel.className = 'comment-label';

  commentsSec.appendChild(commentIcon);
  commentsSec.appendChild(commentLabel);
  commentsSec.setAttribute('onclick', `showPostPage(${postId})`);

  if (owner === user) {
    const deleteIcon = document.createElement('button');
    deleteIcon.className = 'close-btn-post';
    deleteIcon.innerHTML = '&times;';
    deleteIcon.setAttribute('onclick', `deletePost(${postId})`);
    postUser.appendChild(deleteIcon);
  }

  userPost.appendChild(vote);
  userPost.appendChild(postDiv);
  postDiv.appendChild(postUser);

  postUser.appendChild(avatar);
  postUser.appendChild(username);

  vote.appendChild(up);
  vote.appendChild(votesNum);
  vote.appendChild(down);

  postDiv.appendChild(postContent);
  postDiv.appendChild(postFooter);
  postContent.appendChild(postTitle);
  postContent.appendChild(postDesc);
  postFooter.appendChild(commentsSec);
  parent.prepend(userPost);
};

// 7. Handle Dom - Posts Page
const handlePostPage = (parent, owner, title, content, postId) => {
  const userPost = document.createElement('div');
  userPost.className = `user-post-${postId} user-post`;

  const vote = document.createElement('div');
  vote.className = 'vote';

  const down = document.createElement('i');
  down.className = `fas fa-arrow-alt-down arrow down-${postId}`;
  down.setAttribute('onclick', `votePosts('down', ${postId})`);

  const up = document.createElement('i');
  up.className = `fas fa-arrow-alt-up arrow up-${postId}`;
  up.setAttribute('onclick', `votePosts('up', ${postId})`);

  const votesNum = document.createElement('p');
  votesNum.className = 'votes-num';
  // eslint-disable-next-line no-return-assign
  getVotes(postId).then((count) => (votesNum.textContent = count));

  const postDiv = document.createElement('div');
  postDiv.className = 'post-div';

  const postUser = document.createElement('div');
  postUser.className = 'post-user';

  const username = document.createElement('a');
  username.className = 'username';
  username.id = 'username';
  username.textContent = owner;
  username.href = `/user/${owner}`;

  const avatar = document.createElement('img');
  avatar.src = '/images/logo.svg';
  avatar.className = 'user-icon';

  const postContent = document.createElement('div');
  postContent.className = 'post-content';

  const postTitle = document.createElement('div');
  postTitle.className = 'post-title';
  postTitle.textContent = title;

  const postDesc = document.createElement('div');
  postDesc.className = 'post-desc';
  postDesc.textContent = content;

  const postFooter = document.createElement('div');
  postFooter.className = 'post-footer';
  postFooter.id = 'postFooter';

  const commentsSec = document.createElement('div');
  commentsSec.className = 'comments-sec';

  const commentIcon = document.createElement('i');
  commentIcon.className = 'fas fa-comment-alt';

  const commentLabel = document.createElement('p');
  commentLabel.textContent = 'Comments'; // count
  commentLabel.className = 'comment-label';

  commentsSec.appendChild(commentIcon);
  commentsSec.appendChild(commentLabel);
  commentsSec.setAttribute('onclick', `showComments(${postId})`);

  userPost.appendChild(vote);
  userPost.appendChild(postDiv);
  postDiv.appendChild(postUser);

  postUser.appendChild(avatar);
  postUser.appendChild(username);

  vote.appendChild(up);
  vote.appendChild(votesNum);
  vote.appendChild(down);

  postDiv.appendChild(postContent);
  postDiv.appendChild(postFooter);
  postContent.appendChild(postTitle);
  postContent.appendChild(postDesc);
  postFooter.appendChild(commentsSec);
  parent.prepend(userPost);
};

// 8. Handle Dom - Comments
const HandleCommentsDom = (parent, user, content) => {
  const comment = document.createElement('div');
  comment.className = 'comment';

  const avatar = document.createElement('img');
  avatar.src = '/images/logo.svg';
  avatar.className = 'user-icon user-icon-comment';

  const commentInfo = document.createElement('div');
  commentInfo.className = 'comment-info';

  const username = document.createElement('a');
  username.className = 'comment-username username';
  username.id = 'comment-username';
  username.textContent = user;
  username.href = `/user/${user}`;

  const commentContent = document.createElement('div');
  commentContent.className = 'comment-content';
  commentContent.id = 'comment-content';
  commentContent.textContent = content;

  comment.appendChild(avatar);
  comment.appendChild(commentInfo);
  commentInfo.appendChild(username);
  commentInfo.appendChild(commentContent);
  parent.prepend(comment);
};
