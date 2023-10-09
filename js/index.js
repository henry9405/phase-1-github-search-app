// index.js

document.addEventListener("DOMContentLoaded", () => {
    const githubForm = document.getElementById("github-form");
    const searchInput = document.getElementById("search");
    const userList = document.getElementById("user-list");
    const reposList = document.getElementById("repos-list");
  
    githubForm.addEventListener("submit", async (e) => {
      e.preventDefault();
  
      const username = searchInput.value;
  
      // Clear previous search results
      userList.innerHTML = "";
      reposList.innerHTML = "";
  
      try {
        // Step 1: Search for users
        const usersResponse = await fetch(`https://api.github.com/search/users?q=${username}`);
        const usersData = await usersResponse.json();
  
        // Display search results
        displaySearchResults(usersData.items);
      } catch (error) {
        console.error("Error searching for users:", error);
      }
    });
  
    function displaySearchResults(users) {
      // Display user information
      users.forEach((user) => {
        const userItem = document.createElement("li");
        userItem.innerHTML = `
          <h3>${user.login}</h3>
          <img src="${user.avatar_url}" alt="${user.login}'s avatar">
          <a href="${user.html_url}" target="_blank">View Profile</a>
        `;
        userItem.addEventListener("click", () => {
          // Step 2: Fetch user repositories
          fetchUserRepositories(user.login);
        });
        userList.appendChild(userItem);
      });
    }
  
    async function fetchUserRepositories(username) {
      try {
        // Step 3: Fetch user repositories
        const reposResponse = await fetch(`https://api.github.com/users/${username}/repos`);
        const reposData = await reposResponse.json();
  
        // Step 4: Display user repositories
        displayUserRepositories(reposData);
      } catch (error) {
        console.error("Error fetching user repositories:", error);
      }
    }
  
    function displayUserRepositories(repositories) {
      // Display repositories
      repositories.forEach((repo) => {
        const repoItem = document.createElement("li");
        repoItem.innerHTML = `<a href="${repo.html_url}" target="_blank">${repo.name}</a>`;
        reposList.appendChild(repoItem);
      });
    }
  });
  