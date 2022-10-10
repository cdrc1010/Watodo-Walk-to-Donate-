let img = document.getElementById('img');
const storage = firebase.storage();

auth.onAuthStateChanged(user => {
    if (user) {
        
        setupUI(user);
        
        storage.ref('admins/' + user.uid + '/profile.jpg').getDownloadURL().then(imgURL => {
            img.src = imgURL;
        }).catch(error => {
          console.log(error.message);
      });

      db.collection('adminCollection').doc(user.uid).get().then(doc =>{
        console.log(doc.data().barangay);
        // if(doc.data().barangay == "177"){   }else{}
      });

      
    } else {
      setupUI();
      window.location.href = "login.html";
    }
  });