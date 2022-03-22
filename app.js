let selectedPost = 0;

async function getPosts(num){ //returns an array with posts from the API
    let posts = []
    
    for(i = 1; i <= num; i++){
        await fetch(`https://jsonplaceholder.typicode.com/posts/${i}`).then(response => response.json()).then(data => posts.push(data));
    }

    let container = document.querySelector('#posts')

    posts.forEach(e => {
        container.innerHTML += `
            <div id="${e.id}" class="card m-4 w-75 m-auto mt-2 mb-5">
                <div id="title" class="card-header">
                    ${e.title}        
                </div>
                <div id="body" class="card-body">
                    ${e.body}
                </div>
                <button class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#commentsModal" onclick="getComments(this)">Comentarios</button>
                <button class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#eraseModal" onclick="setSelectedPost(this)">Borrar</button>
            </div>`  
    })

    return posts;
}

async function getComments(element){

    //Takes the first 10 comments of the target post

    let id = element.parentNode.id
    let comments
    
    await fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments/`).then(response => response.json()).then(data => comments = data)

    console.log(comments)

    target = document.querySelector('#comment-card-list')
    comments.forEach(e => {
        target.innerHTML += `
            <div class="card m-4 w-75 m-auto mt-2">
                <h4 id="title" class="card-header">
                    ${e.name}        
                </h4>
                <h6 id="email" class="card-subtitle mx-3 my-3">
                    ${e.email}    
                </h6>
                <p id="body" class="card-body">
                    ${e.body}
                </p>
            </div>`
    })
}

function setSelectedPost(element){
    selectedPost = element.parentNode.id
}

function addPost(){
    title = document.getElementById('title').value
    body = document.getElementById('body').value
    posts = document.getElementById('posts')

    posts.innerHTML = `
    <div id="${Math.random() + 777}" class="card m-4 w-75 m-auto mt-2 mb-5">
        <div id="title" class="card-header">
            ${title}        
        </div>
        <div id="body" class="card-body">
            ${body}
        </div>
        <button class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#commentsModal" onclick="getComments(this)">Comentarios</button>
        <button class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#eraseModal" onclick="setSelectedPost(this)">Borrar</button>
    </div>` + posts.innerHTML
    

}

function erasePost(){
    document.getElementById(selectedPost).remove();
}

function main(){
    getPosts(15)
}
