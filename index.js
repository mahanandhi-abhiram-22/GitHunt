let user = document.getElementById("userID");

// Function to fetch GitHub user data
async function fetchUser(username) {
    let response = await fetch(`https://api.github.com/users/${username}`);
    let result = await response.json();
    displayUser(result);
}

// Function to handle search action
function searchUser() {
    let userId = user.value.trim();
    if (userId !== "") {
        document.getElementById("userProfile").innerHTML = `<span class="loader"></span>`;
        fetchUser(userId);
    }
}

// Click event for Search button
document.getElementById("btn").addEventListener("click", () => {
    searchUser();
});

// Pressing "Enter" in the input field triggers search
user.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        searchUser();
    }
});

function displayUser({
    avatar_url,
    name,
    bio,
    followers,
    following,
    public_repos,
    html_url
}) {
    // const {
    //     avatar_url,
    //     name,
    //     bio,
    //     followers,
    //     following,
    //     public_repos,
    // } = result;

    if(!avatar_url){
        document.getElementById("userProfile").innerHTML = `<h1>User Not Found</h1>`
        return
    } 

    if(!bio){
        bio = ''
    }
    document.getElementById("userProfile").innerHTML = `               
                    <div class="userInfo">
                        <img src=${avatar_url} class="userImg" alt="">
                        <div class="userDetail">
                            <p class="userName">${name}</p>
                            <p class="userBio">${bio}</p>
                        </div>
                    </div>
                    <div class="userFollow">
                        <div class="Follower">
                            <div class="repo">
                                <p>Follower</p>
                                <p>${followers}</p>
                            </div>
                            <div class="repo">
                                <p>Following</p>
                                <p>${following}</p>
                            </div>
                            <div class="repo">
                                <p>Repo</p>
                                <p>${public_repos}</p>
                            </div>
                        </div>
                        <a href="${html_url}" target="_blank" class="VisitProile">Visit Profile</a>

                    </div>`;
}
