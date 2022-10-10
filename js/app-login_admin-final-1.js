//login form

  
const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = loginForm['login-email'].value;
    const password = loginForm['login-password'].value;


    auth.signInWithEmailAndPassword(email, password).then(cred => {
        // console.log(cred.user)
        db.collection('adminCollection').where('email', '==', email).where('password', '==', password).get().then((snapshot) => {
            if (snapshot.empty) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Invalid Credentials',
                        text: 'Your Username or Password does not match'
                    })
                    auth.signOut().then(() => {
                        loginForm.reset();
                    });
                }

            else{
                    let status = snapshot.docs[0].data().status;
                if (status == "activated"){
                    // console.log(snapshot.docs[0].data());
                        let userType = snapshot.docs[0].data().userType;
                    if (userType == "co-admin"){
                        let barangay = snapshot.docs[0].data().barangay;
                        switch(barangay) {
                            case "177":
                                Swal.fire({
                                    
                                    icon: 'success',
                                    title: 'Login Successful',
                                  }).then(() =>{
                                window.location.href = "index-177.html";
                                });
                                break;
                            
                            case "178":
                                Swal.fire({
                                    
                                    icon: 'success',
                                    title: 'Login Successful'                                    
                                  }).then(() =>{
                                window.location.href = "index-178.html";
                                }); 
                                break;   
                            case "179":
                                Swal.fire({
                                    
                                    icon: 'success',
                                    title: 'Login Successful'                                    
                                  }).then(() =>{
                                window.location.href = "index-179.html";
                                });                               
                                break;   
                            case "180":
                                Swal.fire({
                                    
                                    icon: 'success',
                                    title: 'Login Successful'                                    
                                  }).then(() =>{
                            window.location.href = "index-180.html";
                            });
                            break;
                            case "181":
                                Swal.fire({
                                    
                                    icon: 'success',
                                    title: 'Login Successful'                                    
                                  }).then(() =>{
                            window.location.href = "index-181.html";
                            });
                            break;
                            case "182":
                                Swal.fire({
                                    
                                    icon: 'success',
                                    title: 'Login Successful'                                    
                                  }).then(() =>{
                            window.location.href = "index-182.html";          
                            });
                            break;
                            case "183":
                                Swal.fire({
                                    
                                    icon: 'success',
                                    title: 'Login Successful'                                    
                                  }).then(() =>{
                            window.location.href = "index-183.html";
                            });
                            break;
                            case "184":
                                Swal.fire({
                                    
                                    icon: 'success',
                                    title: 'Login Successful'                                    
                                  }).then(() =>{
                            window.location.href = "index-184.html";
                            });
                            break;    
                            case "185":
                                Swal.fire({
                                    
                                    icon: 'success',
                                    title: 'Login Successful'                                    
                                  }).then(() =>{
                            window.location.href = "index-185.html";
                            });
                            break;
                            case "186":
                                Swal.fire({
                                    
                                    icon: 'success',
                                    title: 'Login Successful'                                    
                                  }).then(() =>{
                            window.location.href = "index-186.html";
                            });
                            break;
                            case "187":
                                Swal.fire({
                                    
                                    icon: 'success',
                                    title: 'Login Successful'                                    
                                  }).then(() =>{
                            window.location.href = "index-187.html";
                            });
                            break;
                            case "188":
                                Swal.fire({
                                    
                                    icon: 'success',
                                    title: 'Login Successful'                                    
                                  }).then(()=>{
                            window.location.href = "index-188.html";
                            });
                            break;
                            
                            default:
                            window.location.href = "login.html";
                            break;
                        }
                    }
                }
                else if(status == "deactivated"){
                    // console.log("deactivated");
                    Swal.fire({
                        icon: 'info',
                        title: 'Currently Deactivated',
                        text: 'Your Account needs to activate by Super-Admin'
                    })
                }
                else{
                    Swal.fire({
                                title: 'Login Successful',
                                text: 'Welcome to the Dashboard',
                                icon: 'success',
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