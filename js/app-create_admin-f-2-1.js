
console.log(today);
document.getElementById("signup-usertype").value = "co-admin";
document.getElementById("signup-status").value = "deactivated";
document.getElementById("signup-date").value = today;
        

let profileView = document.getElementById('profile-view'),
signupView = document.getElementById('signup-admin'),
email = document.getElementById('email'),
password = document.getElementById('pwd');


const signupForm = document.querySelector('#signup-admin');
const updateForm = document.querySelector('#update-admin');
let newPass = document.getElementById('new-pwd');
let cPass = document.getElementById('confirm-pwd');
let file = {};
// const storage = firebase.storage();

function chooseFile(e){
file = e.target.files[0];
}

const createAdmin = document.querySelector('#signup-admin');
createAdmin.addEventListener('submit', (e) => {
    e.preventDefault();

    Swal.fire({
        title: 'Do you want to create new co-admin?',
        text: 'note: after you create co-admin, it automatically logout your account to test the new one',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Create',
        denyButtonText: `Back need to check details`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            auth.createUserWithEmailAndPassword(email.value, password.value).then(cred => {
                storage.ref('admins/' + cred.user.uid + '/profile.jpg').put(file).then(function () {
                    console.log('successfully uploaded');
                    
                })
                .then(()=>{
                    storage.ref('admins/' + cred.user.uid + '/profile.jpg').getDownloadURL().then(imgURL => {
                                        img.src = imgURL;
                                        // console.log(img.src);
                                            db.collection('adminCollection').doc(cred.user.uid).set({
                                                email: email.value,
                                                password: password.value,
                                                imgURL: img.src,
                                                userType: signupForm['signup-usertype'].value,
                                                accountCreated: signupForm['signup-date'].value,
                                                status: signupForm['signup-status'].value,
                                                barangay: signupForm['brgy'].value,
                                                name: signupForm['name'].value,
                                                userName: signupForm['uname'].value
                                            }).then(() =>{
                                                
                                                    Swal.fire(
                                                        'Sucessfully Created',
                                                        'Check out now your newly added account',
                                                        'success'
                                                    ).then(() =>{

                                                        db.collection('adminCollection').doc(cred.user.uid).get().then(doc => {
                                                            email = doc.data().email;
                                                            
                                                            console.log(email);
                                                
                                                            Email.send({
                                                                Host : "smtp.elasticemail.com",
                                                                Username : "watodo10@gmail.com",
                                                                Password : "675093D737B37A8C98256F70DB14F8A126ED",
                                                                To : email,
                                                                From : "watodo10@gmail.com",
                                                                Subject : "Account was successfully created, wait for activation",
                                                                Body : `Hello ${doc.data().name} <br>
                                                                Sorry for inconvenient, We will notify you if your account already activated! <br>
                                                                Thanks for your patience!<br>
                                                                Have a good day 
                                                                `
                                                            }).then(()=> {
                                                                Swal.fire({
                                                                    icon: 'success',
                                                                    title: 'Email successfully sent!'                                    
                                                                  }).then(() => {
                                                                    auth.signOut();
                                                                  })
                                                            });
                                                        });
                                                        
                                                    })
                                                   


                                            });
                                        
                                });
        
        
                }).catch(error => {
                    console.log(error.message);
                });
            }).catch(error => {
                console.log(error.message);
            });
        
            
        
        } else if (result.isDenied) {
          Swal.fire('Check your details', '', 'info')
        }
        else{
            createAdmin.reset();
        }
      })
    

    
});
// function signUpButtonPressed(){
    
    
    
// }






const accBtn = document.querySelector('.user-wrapper');
var modalBg1 = document.querySelector('.modal-bg1');
var modalClose1 = document.querySelector('.modal-close1');
const accountDetails1 = document.querySelector('.account-details1');
modalClose1.addEventListener('click', function() {
    modalBg1.classList.remove('bg-active1');

});
const setupUI = (user) => {
    if (user) {
        db.collection('adminCollection').doc(user.uid).get().then(doc => {
            document.getElementById("name_Admin").innerHTML = `${doc.data().name}` ;
            document.getElementById("utype_Admin").innerHTML = `${doc.data().userType}` ;
        }).catch(error => {
            console.log("Failed to load, it needs to relogin your account!");
        });
        accBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            modalBg1.classList.add('bg-active1');
            db.collection('adminCollection').doc(user.uid).get().then(doc => {
                const html = `
                <div><span>Welcome! <b>${doc.data().name} </b> </span> </div>
                <div> ${user.email}</div>
                <div> ${doc.data().accountCreated}</div>
            `;
                accountDetails1.innerHTML = html;
            })

        });


    } else {
        //hide account info
        // accountDetails.innerHTML = '';

    }
}