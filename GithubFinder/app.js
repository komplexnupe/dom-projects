// Init/Instantiate
const github = new Github;
const ui = new UI;

// Search input
const searchUser = document.getElementById('searchUser');

// Search input event listener
searchUser.addEventListener('keyup', (e) => {
  // Get input text
  const userText = e.target.value;

  if (userText !== '') {
    // console.log(userText);
    // Make http 
    github.getUser(userText)
      .then(data => {
        // console.log(data);
        if (data.profile.message === 'Not Found') {
          // Show alert

        } else {
          // Show profile
          ui.showProfile(data.profile);
        }
      })
  } else {
    // Clear profile
    ui.clearProfile();
  }
});