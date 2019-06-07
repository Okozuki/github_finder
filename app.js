// Init Github
const gitHub = new GitHub();

// Search input
const searchUser = document.getElementById("search-user");

// Search input event listener
searchUser.addEventListener('keyup', (e) => {
  // Instantiate HTTP Request
  const http = new EasyHTTP();
  // Instantiate UI
  const ui = new UI();

  // Get input text
  const userText = e.target.value;

  if (userText !== '') {
    // Make http call
    http.get(`https://api.github.com/users/${userText}?client_id=${gitHub.client_id}&client_secret=${gitHub.client_secret}`)
      .then(data => {
        if (data.message === 'Not Found') {
          // Show alert
          ui.showAlert('User not found', 'alert alert-danger');
          ui.clearProfile();
        } else {
          // Show profile
          ui.showProfile(data);
          // Sow repos
          http.get(`https://api.github.com/users/${userText}/repos?per_page=${gitHub.repos_count}&sort=${gitHub.repos_sort}&client_id=${gitHub.client_id}&client_secret=${gitHub.client_secret}`)
            .then(data => {
              ui.showRepos(data);
            })
            .catch(err => console.log(err));
        }
      })
      .catch(err => console.log(err));



  } else {
    // Clear profile
    ui.clearProfile();
  }
});