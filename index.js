let root = document.getElementById('root')
let url = "http://localhost:3000/posts"

let navbar = document.createElement('div')
navbar.className = 'navbar'
root.appendChild(navbar)

let addButton = document.createElement('button')
addButton.textContent = '+ Add New Blog'
addButton.className = 'add'
root.appendChild(addButton)

let header = document.createElement('h1')
header.textContent = 'Blog Manager'
header.className = 'header'
navbar.appendChild(header)

// Create the post cards container
let postCardsContainer = document.createElement('div')
postCardsContainer.className = 'post-cards-container'
root.appendChild(postCardsContainer)

fetch(url)
.then((r) =>r.json() )
.then((data) => displayPosts(data))

function displayPosts(data){
    data.forEach(post => {
        // creating post card
        let postDiv = document.createElement('div');
        postDiv.className = 'post-list';

        // post card title
        let postTitle = document.createElement('h2');
        postTitle.textContent = post.title;
        postDiv.appendChild(postTitle);

        // post image
        let postImg = document.createElement('img');
        postImg.src = post.imageUrl;
        postImg.className = 'postImg';
        postDiv.appendChild(postImg);

        // post excerpt/description
        let postExcerpt = document.createElement('p');
        postExcerpt.textContent = post.content || "No description available.";
        postExcerpt.className = 'post-excerpt';
        postDiv.appendChild(postExcerpt);

        // Delete button
        // let deleteBtn = document.createElement('button');
        // deleteBtn.textContent = 'Delete';
        // deleteBtn.className = 'delete-btn';
        // deleteBtn.onclick = (e) => {
        //     e.stopPropagation(); // Prevent opening details modal
        //     handleDelete(post.id, postDiv);
        // };
        // postDiv.appendChild(deleteBtn);

        // Add click event to open details
        postDiv.addEventListener('click', () => handlePostClick(post));

        // Append each post to the container
        postCardsContainer.appendChild(postDiv);
    });
}

function handlePostClick(post){
    // Remove any existing details modal
    let existingDetails = document.querySelector('.details');
    if (existingDetails) existingDetails.remove();

    // Create modal overlay
    let detailsOverlay = document.createElement('div');
    detailsOverlay.className = 'details';

    // Create modal content container
    let detailsContent = document.createElement('div');
    detailsContent.className = 'details-content';

    // details image
    let detailsImage = document.createElement('img');
    detailsImage.src = post.imageUrl;
    detailsContent.appendChild(detailsImage);

    // details title
    let detailsTitle = document.createElement('h1');
    detailsTitle.className = 'detailsTitle';
    detailsTitle.textContent = post.title;
    detailsContent.appendChild(detailsTitle);

    // details content
    let detailsText = document.createElement('p');
    detailsText.className = 'detailsContent';
    detailsText.textContent = post.content || "No content available.";
    detailsContent.appendChild(detailsText);

    // Edit button (now in modal)
    let editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.className = 'edit-btn';
    editBtn.onclick = (e) => {
        e.stopPropagation();
        detailsOverlay.remove();
        openEditForm(post);
    };
    
    let deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.className = 'delete-btn';
    deleteBtn.onclick = (e) => {
        e.stopPropagation(); // Prevent opening details modal
        handleDelete(post.id, postDiv);
    }

    // Close button
    let closeBtn = document.createElement('button');
    closeBtn.textContent = 'Close';
    closeBtn.onclick = () => detailsOverlay.remove();
    detailsContent.appendChild(closeBtn);

    // Instead of appending buttons directly to detailsContent:
    let buttonsDiv = document.createElement('div');
    buttonsDiv.className = 'details-buttons';

    buttonsDiv.appendChild(editBtn);
    buttonsDiv.appendChild(deleteBtn);
    buttonsDiv.appendChild(closeBtn);

    detailsContent.appendChild(buttonsDiv);

    // Add content to overlay
    detailsOverlay.appendChild(detailsContent);

    // Append overlay to body
    document.body.appendChild(detailsOverlay);
}

// fetch(url, {
//     method : 'POST',
//     headers : {"content-type": "application/json"},
//     body: json.stringify(data)
// })
// .then(response => response,json())
// .then(data => addNewPostListener(data))

function addNewPostListener(){
    // Prevent multiple add-divs
    if (document.querySelector('.add-div')) return;

    let addDiv = document.createElement('div');
    addDiv.className = 'add-div';

    let formContent = document.createElement('div');
    formContent.className = 'add-form-content';

    let formTitle = document.createElement('div');
    formTitle.className = 'add-form-title';
    formTitle.textContent = 'Add New Blog'; // or 'Edit Blog'
    formContent.appendChild(formTitle);

    // input field for title
    let titleInput = document.createElement('input')
    titleInput.placeholder = 'add title'
    formContent.appendChild(titleInput)

    // input field for content
    let contentInput = document.createElement('input')
    contentInput.placeholder = 'add content'
    formContent.appendChild(contentInput)

    // input field for author
    let authorInput = document.createElement('input')
    authorInput.placeholder = 'add author'
    formContent.appendChild(authorInput)

    // input field for image url
    let urlInput = document.createElement('input')
    urlInput.placeholder = 'add image url'
    formContent.appendChild(urlInput)

    // Add button
    let submitBtn = document.createElement('button');
    submitBtn.textContent = 'Add';
    submitBtn.onclick = () => handleAdd({
        title: titleInput.value,
        content: contentInput.value,
        author: authorInput.value,
        imageUrl: urlInput.value
    }, addDiv);
    formContent.appendChild(submitBtn);

    // Close button
    let closeBtn = document.createElement('button');
    closeBtn.textContent = 'Close';
    closeBtn.onclick = () => addDiv.remove();
    formContent.appendChild(closeBtn);

    addDiv.appendChild(formContent);
    document.body.appendChild(addDiv)
}

// Edit form (reuse add form, but prefill and update)
function openEditForm(post) {
    if (document.querySelector('.add-div')) return;

    let addDiv = document.createElement('div');
    addDiv.className = 'add-div';

    let formContent = document.createElement('div');
    formContent.className = 'add-form-content';

    let formTitle = document.createElement('div');
    formTitle.className = 'add-form-title';
    formTitle.textContent = 'Edit Blog';
    formContent.appendChild(formTitle);

    // input field for title
    let titleInput = document.createElement('input')
    titleInput.value = post.title;
    formContent.appendChild(titleInput)

    // input field for content
    let contentInput = document.createElement('input')
    contentInput.value = post.content;
    formContent.appendChild(contentInput)

    // input field for author
    let authorInput = document.createElement('input')
    authorInput.value = post.author;
    formContent.appendChild(authorInput)

    // input field for image url
    let urlInput = document.createElement('input')
    urlInput.value = post.imageUrl;
    formContent.appendChild(urlInput)

    // Save button
    let saveBtn = document.createElement('button');
    saveBtn.textContent = 'Save';
    saveBtn.onclick = () => handleEdit(post.id, {
        title: titleInput.value,
        content: contentInput.value,
        author: authorInput.value,
        imageUrl: urlInput.value
    }, addDiv);
    formContent.appendChild(saveBtn);

    // Close button
    let closeBtn = document.createElement('button');
    closeBtn.textContent = 'Close';
    closeBtn.onclick = () => addDiv.remove();
    formContent.appendChild(closeBtn);

    addDiv.appendChild(formContent);
    document.body.appendChild(addDiv)
}

function handleEdit(postId, updatedPost, addDiv) {
    if (!updatedPost.title || !updatedPost.content || !updatedPost.author || !updatedPost.imageUrl) {
        alert('Please fill in all fields.');
        return;
    }

    fetch(`${url}/${postId}`, {
        method: 'PUT',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(updatedPost)
    })
    .then(response => response.json())
    .then(() => {
        // Refresh the post list
        postCardsContainer.innerHTML = '';
        fetch(url)
            .then(r => r.json())
            .then(data => displayPosts(data));
        addDiv.remove();
    })
    .catch(() => alert('Failed to edit post.'));
}

function handleAdd(postData, addDiv) {
    // Basic validation
    if (!postData.title || !postData.content || !postData.author || !postData.imageUrl) {
        alert('Please fill in all fields.');
        return;
    }

    fetch(url, {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(postData)
    })
    .then(response => response.json())
    .then(newPost => {
        // Add the new post to the UI
        displayPosts([newPost]);
        addDiv.remove();
    })
    .catch(() => alert('Failed to add post.'));
}

function handleDelete(postId, postDiv) {
    if (!confirm('Are you sure you want to delete this post?')) return;
    fetch(`${url}/${postId}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (response.ok) {
            postDiv.remove();
        } else {
            alert('Failed to delete post.');
        }
    })
    .catch(() => alert('Failed to delete post.'));
}

// Correct way to add event listener:
addButton.addEventListener('click', addNewPostListener)
