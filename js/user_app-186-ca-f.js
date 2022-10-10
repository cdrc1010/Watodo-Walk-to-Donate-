//if there's a user display this function
const setupUI = (user) => {
    if (user) {
        db.collection('adminCollection').doc(user.uid).get().then(doc => {
            document.getElementById("name_Admin").innerHTML = `${doc.data().name}` ;
            document.getElementById("utype_Admin").innerHTML = `${doc.data().userType}` ;
        })
        
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


const cafeList = document.querySelector('#cafe-list');
// const form = document.querySelector('#add-cafe-form');
const accountDetails = document.querySelector('.account-details');
const accountDetails1 = document.querySelector('.account-details1');
const accBtn = document.querySelector('.user-wrapper');



var modalBg1 = document.querySelector('.modal-bg1');
var modalClose1 = document.querySelector('.modal-close1');

modalClose1.addEventListener('click', function() {
    modalBg1.classList.remove('bg-active1');

});



// create element & render cafe
function renderCafe(doc) {
    let li = document.createElement('li');
    let name = document.createElement('span');
    let acc_Created = document.createElement('span');

    let cross = document.createElement('div');
    let view = document.createElement('div');
    let btnAccept = document.createElement('div');
    let btnDecline = document.createElement('div');
    let status = document.createElement('span');


    li.setAttribute('data-id', doc.id);

    // text content
    name.textContent = doc.data().firstName +" "+ doc.data().lastName;
    acc_Created.textContent = "Account Created: " + doc.data().accountCreation;
    status.textContent = "Status:" + doc.data().status;
    cross.textContent = 'x';
    view.textContent = 'view';
    btnAccept.textContent = 'verify';
    btnDecline.textContent = 'reject';

    // classname
    cross.className = "cross";
    view.className = "view1";
    btnAccept.className = "accept";
    btnDecline.className = "decline";

    // displaying or appending the element 
    li.appendChild(name);
    li.appendChild(acc_Created);
    li.appendChild(status);
    li.appendChild(cross);
    li.appendChild(view);
    let statusValue = doc.data().status;
    let verificationID = doc.data().verificationID;
    if( statusValue == "not-verified")
    {
        if(verificationID != null){
            li.appendChild(btnAccept);
        }
    }

    cafeList.appendChild(li);

    // updating the status to accepted

    
        btnAccept.addEventListener('click', (e) => {
            e.stopPropagation();
            let id = e.target.parentElement.getAttribute('data-id');
            let points = doc.data().points;
            let pointsVal = parseInt(points) + 2;
            db.collection('users_donors').doc('users').collection('usersList').doc(id).update({
                status: 'verified',
                points: pointsVal.toString()
            });

            db.collection('notifications').doc('usersNotif').collection('verifiedNotif').doc(id).set({
                firstName: doc.data().firstName,
                lastName: doc.data().lastName,
                barangay: doc.data().barangay,
                verificationID: doc.data().verificationID,
                status: 'verified',
                userType: doc.data().userType,
                accountCreation: doc.data().accountCreation,
                email: doc.data().email

            }).then(() => {
                return db.collection('notifications').doc('usersNotif').collection('verifiedNotif').doc(id).get().then(doc => {
                    email = doc.data().email;
                    
                    console.log(email);
        
                    Email.send({
                        Host : "smtp.elasticemail.com",
                        Username : "cdrcgurimbao22@gmail.com",
                        Password : "86DB3149362712F763D94361D5D8F8E2521B",
                        To : email,
                        From : "cdrcgurimbao22@gmail.com",
                        Subject : "You are now verified user!",
                        Body : `Hello ${doc.data().lastName}, ${doc.data().firstName} <br>
                        Your account has successfully verified! <br>
                        Check your account now!
                        `
                    }).then(()=> {
                        Swal.fire({
                            icon: 'success',
                            title: 'Email successfully sent!'                                    
                          })
                    });
                });
            });

            
        });
    
    

    // updating the status to declined
    btnDecline.addEventListener('click', (e) => {
        e.stopPropagation();
        let id = e.target.parentElement.getAttribute('data-id');
        db.collection('users_donors').doc('users').collection('usersList').doc(id).update({
            status: 'declined'
        });
    });

    // deleting data
    cross.addEventListener('click', (e) => {
        e.stopPropagation();
        let id = e.target.parentElement.getAttribute('data-id');
        db.collection('users_donors').doc('users').collection('usersList').doc(id).delete();
    });

 

    // view more details data
    view.addEventListener('click', (e) => {
        e.stopPropagation();
        let id = e.target.parentElement.getAttribute('data-id');
        modalBg.classList.add('bg-active');
        db.collection('users_donors').doc('users').collection('usersList').doc(id).get().then(doc => {
            const html = `
        <div style="display:flex; line-height: 50px;"> 
        <div>
        Name:  ${doc.data().firstName} ${doc.data().lastName}<br>
        Email: ${doc.data().email}<br>
        Account Created: ${doc.data().accountCreation}<br>
        Barangay: ${doc.data().barangay}<br>
        </div>
        
        <div style="margin-left:3rem;">
        Ratings: ${doc.data().rating}<br>
        Status: ${doc.data().status}<br>
        Usertype: ${doc.data().userType}<br>
        Password: ${doc.data().password}<br>
        </div>
        </div>
        Points: &nbsp;<span style="color:#7a9ed1; font-weight:bold;">  ${doc.data().points} </span>
        <br> <center><a href="${doc.data().verificationID}" target="_blank"><img src="${doc.data().verificationID}" height="150px" width="150px"></a></center>
        `;
            accountDetails.innerHTML = html;
        });


    });


    // accBtn.addEventListener('click', (e) => {
    //     e.stopPropagation();
    //     modalBg1.classList.add('bg-active1');
    //     db.collection('users').get().then((snapshot) => {
    //         snapshot.docs.forEach(doc => {
    //             const html = `
    //             <div><span>Welcome! <b>${doc.data().Firstname} ${doc.data().Lastname}</b> </span> </div>
    //             <div> ${doc.data().Email}</div>
    //             <div> ${doc.data().dateJoined}</div>
    //             `;
    //             accountDetails1.innerHTML = html;
    //         });
    //     });

    // });
}

var modalBg = document.querySelector('.modal-bg');
var modalClose = document.querySelector('.modal-close');

modalClose.addEventListener('click', function() {
    modalBg.classList.remove('bg-active');

});


// // real-time listener
// db.collection('donors').orderBy('dateCreated').onSnapshot(snapshot => {
//     let changes = snapshot.docChanges();
//     changes.forEach(change => {
//         console.log(change.doc.data());
//         if (change.type == 'added') {
//             renderCafe(change.doc);
//         } else if (change.type == 'removed') {
//             let li = cafeList.querySelector('[data-id=' + change.doc.id + ']');
//             cafeList.removeChild(li);
//         }
//     });
// });

// modified real-time listener and successful attempt
db.collection('users_donors').doc('users').collection('usersList').where('barangay', '==', '186').orderBy('accountCreation','desc').onSnapshot(snapshot => {
    let changes = snapshot.docChanges();
    const status_nVerified = "not-verified";
    const status_verified = "verified";    
     
    

    changes.forEach(change => {
        // console.log(change.doc.data());
        let status = change.doc.data();
       
            if (change.type == 'added') {
                renderCafe(change.doc);
            } else if (change.type == 'removed') {
                let li = cafeList.querySelector('[data-id=' + change.doc.id + ']');
                cafeList.removeChild(li);
            }
        


        db.collection('users_donors').doc('users').collection('usersList').where('barangay', '==', '186').onSnapshot(snap => {
            size = snap.size // will return the collection size
            document.getElementById("value").innerHTML = size;
            });

            db.collection('users_donors').doc('users').collection('usersList').where('barangay', '==', '186').where('status', '==', status_verified).onSnapshot(snap => {
            size = snap.size // will return the collection size
            document.getElementById("value1").innerHTML = size;
          });

          db.collection('users_donors').doc('users').collection('usersList').where('barangay', '==', '186').where('status', '==', status_nVerified).onSnapshot(snap => {
        size = snap.size // will return the collection size
        document.getElementById("value2").innerHTML = size;
        });

    });
});