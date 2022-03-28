const commentBtn = document.querySelector('.comment')
const deleteCommentBtns = document.querySelectorAll('.delete')

const newComment = async () => {
  const title = document.querySelector('#header').getAttribute('title');
  const postUserId = document.querySelector('#header').getAttribute('user');
  const comment = document.querySelector('#post-body').value

  const response = await fetch('/api/comments', {
    method: 'POST',
    body: JSON.stringify({ title, postUserId, comment }),
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    document.location.reload();
  } else {
    alert(response.statusText);
  }
};

commentBtn.addEventListener('click', newComment)

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/comments/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.reload();
    } else {
      document.location.reload()
      //alert('Failed to delete comment');
    }
  }
};

for (let i = 0; i < deleteCommentBtns.length; i++) {
  deleteCommentBtns[i].addEventListener('click', delButtonHandler);
}