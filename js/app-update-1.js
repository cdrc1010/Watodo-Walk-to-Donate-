

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
        


let file = {};
// const storage = firebase.storage();

function chooseFile(e){
file = e.target.files[0];
}


let pass = document.getElementById('password');
let cPass = document.getElementById('confirmPass');
const updateForm = document.querySelector('#update-admin');


let img = document.getElementById('img');
const storage = firebase.storage();
auth.onAuthStateChanged(user => {
    if (user) {
        setupUI(user);
        storage.ref('admins/' + user.uid + '/profile.jpg').getDownloadURL().then(imgURL => {
            img.src = imgURL;
            
            db.collection('adminCollection').doc(user.uid).get().then(doc => {
                document.getElementById('name').value = doc.data().name;
                document.getElementById('uname').value = doc.data().userName;
                document.getElementById('password').value = doc.data().password;
                document.getElementById('confirmPass').value = doc.data().password;

            });


            updateForm.addEventListener('submit', (e) => {
                e.preventDefault();
            db.collection('adminCollection').doc(user.uid).get().then(doc => {
                if(pass.value == cPass.value){
                    firebase.auth().currentUser.updatePassword(password.value).then(function(){
                        console.log('update successfully applied');
                            storage.ref('admins/' + user.uid + '/profile.jpg').put(file).then(function () {
                                console.log('successfully uploaded');
                                    db.collection('adminCollection').doc(user.uid).update({
                                        password: updateForm['password'].value,
                                        userName:updateForm['uname'].value,
                                        name:updateForm['name'].value
                                    });
                            });

                            Swal.fire({    
                                icon: 'success',
                                title: 'Succesfully Updated!',
                                text: 'Changes has been saved'                                  
                              }).then((result) => {
                                
                                if (result.isConfirmed) {
                                  window.location.reload();
                                }
                              })
                                  
                            
                        }).catch(function(err){
                            Swal.fire({    
                                icon: 'error',
                                title: 'There is an error'                                    
                              })   
                         console.log('Error');
                        });
                }
                else{
                    Swal.fire({                                    
                        icon: 'error',
                        title: 'Password Does not Match'                                    
                      })
                    console.log("password does not match");
                }

            });
    });
            
        })
      
    } else {
      setupUI();
      window.location.href = "login.html";
    }
  });


