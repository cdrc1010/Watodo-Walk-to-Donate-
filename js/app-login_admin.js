//login form

  
const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = loginForm['login-email'].value;
    const password = loginForm['login-password'].value;


    auth.signInWithEmailAndPassword(email, password).then(cred => {
        console.log(cred.user)
        db.collection('adminCollection').where('email', '==', email).where('password', '==', password).get().then((snapshot) => {
            if (snapshot.empty) {
                Swal.fire({
                    icon: 'error',
                    title: 'Invalid Credentials',
                    text: 'Your Username or Password does not match'
                })
                auth.signOut().then(() => {
                    // console.log('user signed out');
                });
            } else {
                // print all data as an object
                console.log(snapshot.docs[0].data());
                let userType = snapshot.docs[0].data().userType;
               if (userType == "co-admin"){
                let barangay = snapshot.docs[0].data().barangay;
                switch(barangay) {
                case "177":
                    window.location.href = "index-177.html";
                    break;
                
                case "178":
                    window.location.href = "index-178.html";
                    break;   
                case "179":
                    window.location.href = "index-179.html";
                    break;   
                case "180":
                window.location.href = "index-180.html";
                break;
                case "181":
                window.location.href = "index-181.html";
                break;
                case "182":
                window.location.href = "index-182.html";
                break;
                case "183":
                window.location.href = "index-183.html";
                break;
                case "184":
                window.location.href = "index-184.html";
                break;    
                case "185":
                window.location.href = "index-185.html";
                break;
                case "186":
                window.location.href = "index-186.html";
                break;
                case "187":
                window.location.href = "index-187.html";
                break;
                case "188":
                window.location.href = "index-188.html";
                break;
                }
               }
               else{
                console.log("super-admin");
                Swal.fire({
                    title: 'Login Successful',
                    text: 'Welcome to the dashboard',
                    type: 'success',
                }).then(function() {
                    window.location = "index-1.html";
                });
               }
                
                    
               
            }
        })
    }).catch((error) => {
        Swal.fire({
            icon: 'error',
            title: 'Invalid Credentials',
            text: 'Your Username or Password does not match'
        })
        loginForm.reset();
    });


  

});