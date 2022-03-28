let selectedPost = 0;

function setSelectedPost(element){
    selectedPost = element.parentNode.parentNode.id.replace('post-', '')
}

function checkEmpty(){
    if(isEmpty()){
        posts = document.getElementById('posts')
        posts.innerHTML = `
            <tr id="no-posts">
                <th scope="col">#</th>
                <th scope="col">¡No hay posts!</th>
            </tr>
        `
    }
    else{
        try{
            document.getElementById('no-posts').remove()
        } catch {
            console.log('No hay posts.')
        }
    }
}

async function getPosts(num){ //returns an array with posts from the API
    

    let request = await fetch(`https://jsonplaceholder.typicode.com/posts/`).then(response => response.json()).then(checkEmpty())
    let posts = []

    //si hay alguna forma más fácil de hacer esto, avísame :)

    for(i = 0; i < num; i++){
        posts.push(request[i])
    }


    let container = document.querySelector('#posts')
    container.innerHTML = ''

    posts.forEach(e => {
        
        container.innerHTML += `
            <tr id="post-${e.id}">
                <th>${e.id}</th>
                <td>${e.title}</td>
                <td>${e.body}</td>
                <td>
                    <button class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#commentsModal" onclick="getComments(this)">
                        Comentarios
                    </button>
                </td>
                <td>
                    <button class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#eraseModal" onclick="setSelectedPost(this)">
                        Borrar
                    </button>
                </td>
            </tr>
        `
    })
    return posts;
}

async function getComments(element){

    //Takes the first 10 comments of the target post
    setSelectedPost(element)
    let id = selectedPost
    let comments = []
    let request = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments/`).then(response => response.json())

    target = document.querySelector('#comment-card-list')

    if(request.length == 0){
        target.innerHTML = `
            <h4>¡No existen comentarios para este post!</h4>
        `
    }

    else{
        for(i = 0; i < 10; i++){
            comments.push(request[i])
        }
    
        target.innerHTML = '' //flushes the innerHTML in case the previously opened comments modal returned no comments from the API
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
}



function addPost(){
    title = document.getElementById('title').value
    body = document.getElementById('body').value
    posts = document.getElementById('posts')

    if(title.trim() == '' || body.trim() == ''){
        //TODO: hacer un modal que te muestre el error
        alert('¡Escribe algo!')
    }
    else{
        posts.insertAdjacentHTML("afterbegin", `
            <tr id="post-${Date.now()}">    
                <th>${Date.now()}</th>
                <td>${title}</td>
                <td>${body}</td>
                <td>
                    <button class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#commentsModal" onclick="getComments(this)">
                        Comentarios
                    </button>
                </td>
                <td>
                    <button class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#eraseModal" onclick="setSelectedPost(this)">
                        Borrar
                    </button>
                </td>
            </tr>
            `
        )
    }
    checkEmpty()
}

function erasePost(){
    document.getElementById(`post-${selectedPost}`).remove()
    checkEmpty()
}

async function test(){

    //un método para testear lo que se te venga a la cabeza

    //comprobar los datos que recibo con esta request

    let request = await fetch(`https://jsonplaceholder.typicode.com/posts/`).then(response => response.json())
    console.log(request)

}


function isEmpty(){
    empty = true;
    posts = document.getElementById('posts')
    if(posts.children.length > 0) empty = false;
    return empty;
}

function main(){
    getPosts(15)    //number of posts to show
    checkEmpty()
}
