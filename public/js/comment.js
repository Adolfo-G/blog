const commentBtn = document.querySelector('.comment')

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