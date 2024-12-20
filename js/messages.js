/*
{
    "_id": "675c852615fee0925c8d2e52",
    "text": "First Post",
    "username": "GurjotS",
    "createdAt": "2024-12-13T19:04:06.252Z",
    "likes": [
      {
        "_id": "675c8a3715fee0925c8d2e9e",
        "postId": "675c852615fee0925c8d2e52",
        "username": "buttercupx",
        "createdAt": "2024-12-13T19:25:43.034Z"
      }
    ]
  },
*/
// function getMessage(m) {
//     return `
//         <div data-post_id="${m._id}" class="message">
//             FROM:  ${m.username}<br>\n    
//             WHEN:  ${m.createdAt}<br>\n    
//             TEXT:  ${m.text}<br>\n
//             LIKES: ${m.likes.length}

//         </div>
//     `;
// }
function getMessage(m) {
  const e = document.createElement("div");
  e.setAttribute("class", "message");
  e.dataset.post_id = m._id;
  e.innerHTML = `
    FROM:  ${m.username}<br>\n    
    WHEN:  ${m.createdAt}<br>\n    
    TEXT:  ${m.text}<br>\n
    Flutters: ${m.likes.length}
  `;
  const b = document.createElement("button");
  b.addEventListener("click", async ()=>{
    //is username in list of likes?
    const like = m.likes.find(like=>like.username===localStorage.username);
    if( like != undefined){
      //found - delete
      await deleteLike(like._id);
      window.location.href = 'messages.html'; //refresh page
    }else{
      //not found - create
      await sendLike(m._id);
      window.location.href = 'messages.html'; //refresh page
    }
  });//end click
  
  const like = m.likes.find(like=>like.username===localStorage.username);
  b.innerHTML = '<img src="./img/flutter.png"style="width: 20px; height: 20px;">' + (like !== undefined ? "UnLike" : "Flutter");
  e.appendChild(b);
  return e;
    }

document.addEventListener("DOMContentLoaded", async () => {
  const messages = await getMessageList();
  messages.forEach(m => output.appendChild(getMessage(m)));
  });

  function fetchPosts(sortBy = "newest") {
    const loginData = getLoginData();
    fetch(`${apiBaseURL}/api/posts`, {
      method: "GET",
      headers: { Authorization: `Bearer ${loginData.token}` },
    })
      .then((response) => response.json())
      .then((posts) => {
        const sortedPosts = sortPostsClientSide(posts, sortBy);
        renderPosts(sortedPosts);
      })
      .catch((error) => console.error("Error fetching posts:", error));
  }
  
  // Sort posts on the client-side
  function sortPostsClientSide(posts, sortBy) {
    switch (sortBy) {
      case "newest":
        return posts.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
      case "oldest":
        return posts.sort(
          (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
        );
      case "likes":
        return posts.sort(
          (a, b) => (b.likes?.length || 0) - (a.likes?.length || 0)
        );
      default:
        return posts;
    }
  }

function renderPosts(posts) {
  output.innerHTML = ""; 
  posts.forEach((post) => {
    const postItem = createPostElement(post);
    output.appendChild(postItem);
  });
}