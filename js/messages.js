// Helper function to create the DOM structure for a message
function getMessage(m) {
    const e = document.createElement("div");
    e.setAttribute("class", "message");
    e.dataset.post_id = m._id;
    e.innerHTML = `
      FROM:  ${m.username}<br>\n    
      WHEN:  ${new Date(m.createdAt).toLocaleString()}<br>\n    
      TEXT:  ${m.text}<br>\n
      Flutters: ${m.likes.length}
    `;
   
    const b = document.createElement("button");
    b.addEventListener("click", async () => {
      const like = m.likes.find((like) => like.username === localStorage.username);
      if (like != undefined) {
        // Found - delete
        await deleteLike(like._id);
        fetchPosts(); // Refresh the post list
      } else {
        // Not found - create
        await sendLike(m._id);
        fetchPosts(); // Refresh the post list
      }
    });
   
    const like = m.likes.find((like) => like.username === localStorage.username);
    b.innerHTML =
      '<img src="./img/flutter.png" style="width: 20px; height: 20px;">' +
      (like !== undefined ? "UnLike" : "Flutter");
    e.appendChild(b);
    return e;
  }
   
  // Initialize the page
  document.addEventListener("DOMContentLoaded", () => {
    console.log("Page loaded. Fetching posts...");
    fetchPosts(); // Initial fetch of posts
   
    // Add event listener for the "Sort By" dropdown
    const sortOptions = document.getElementById("sortOptions");
    sortOptions.addEventListener("change", (event) => {
      const sortBy = event.target.value; // Get the selected sort option
      console.log(`Sort By changed to: ${sortBy}`);
      fetchPosts(sortBy); // Fetch and display posts sorted by the selected option
    });
  });
   
  // Fetch posts from the API and render them
  function fetchPosts(sortBy = "newest") {
    console.log("Fetching posts with sortBy:", sortBy);
    getMessageList()
      .then((posts) => {
        console.log("Posts fetched:", posts);
        const sortedPosts = sortPostsClientSide(posts, sortBy); // Sort posts on the client side
        renderPosts(sortedPosts); // Render the sorted posts
      })
      .catch((error) => console.error("Error fetching posts:", error));
  }
   
  // Sort posts based on the selected option
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
   
  // Render posts to the DOM
  function renderPosts(posts) {
    const output = document.getElementById("output");
    if (!output) {
      console.error("Output element not found!");
      return;
    }
    output.innerHTML = ""; // Clear existing content
    console.log("Rendering posts:", posts);
    posts.forEach((post) => {
      const postItem = getMessage(post); // Create a DOM element for each post
      output.appendChild(postItem); // Append it to the output container
    });
  }
   
  // Utility function to retrieve login data from localStorage
  function getLoginData() {
    return JSON.parse(localStorage.getItem("loginData")) || {};
  }