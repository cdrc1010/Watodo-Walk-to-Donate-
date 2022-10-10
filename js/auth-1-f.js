let img = document.getElementById('img');
const storage = firebase.storage();
auth.onAuthStateChanged(user => {
    if (user) {
        
        setupUI(user);
        
        storage.ref('admins/' + user.uid + '/profile.jpg').getDownloadURL().then(imgURL => {
            img.src = imgURL;
            // console.log(imgURL)
            
        }).catch(error => {
          console.log("Failed to load need to relogin");
      });
      
    } else {
      setupUI();
      window.location.href = "login.html";
    }
  });