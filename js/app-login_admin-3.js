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
                console.log(snapshot.docs[0].data())
                Swal.fire({
                    title: 'Login Successful',
                    text: 'Welcome to the dashboard',
                    type: 'success',
                }).then(function() {
                    window.location = "index-1.html";
                });
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