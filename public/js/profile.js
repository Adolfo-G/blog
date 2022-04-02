const submitBtn = document.querySelector('#newFormBtn');

const newPostHandler = async (event) => {
  event.preventDefault();
  const title = document.querySelector('#post-name').value.trim();
  const content = document.querySelector('#post-body').value.trim();
  if (title && content) {
    const response = await fetch(`/api/posts`, {
      method: 'POST',
      body: JSON.stringify({ title, content }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to create post');
    }
  }
};

submitBtn.addEventListener('click', newPostHandler);

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/posts/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to delete post');
    }
  }
};


document
  .querySelector('.post-list')
  .addEventListener('click', delButtonHandler);

///////////////
async function updateFormHandler(event) {
  if (event.target.hasAttribute('post-id')) {
    const id = event.target.getAttribute('post-id');
    const title = document.querySelector('#update-name').value.trim();
    const content = document.querySelector('#update-body').value.trim();
    const response = await fetch(`/api/posts/update/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        title,
        content,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to edit');
    }
  }
}

document
  .querySelector('.update')
  .addEventListener('click', updateFormHandler);
