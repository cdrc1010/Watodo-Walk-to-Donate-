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
    name.textContent = doc.data().name;
    acc_Created.textContent = "Account Created: " + doc.data().accountCreated;
    status.textContent = "Status:" + doc.data().status;
    cross.textContent = 'x';
    view.textContent = 'view';
    btnAccept.textContent = 'activate';
    btnDecline.textContent = 'deactivate';

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
    // li.appendChild(btnDecline);
    // li.appendChild(btnAccept);
    
    

    cafeList.appendChild(li);

    // updating the status to accepted

    
        btnAccept.addEventListener('click', (e) => {
            e.stopPropagation();
            let id = e.target.parentElement.getAttribute('data-id');
            db.collection('adminCollection').doc(id).update({
                status: 'activated'
            });
        });
    
    

    // updating the status to declined
    btnDecline.addEventListener('click', (e) => {
        e.stopPropagation();
        let id = e.target.parentElement.getAttribute('data-id');
        db.collection('adminCollection').doc(id).update({
            status: 'deactivated'
        });
    });

    // deleting data
    cross.addEventListener('click', (e) => {
        e.stopPropagation();
        let id = e.target.parentElement.getAttribute('data-id');
        db.collection('adminCollection').doc(id).delete();
    });

 

    // view more details data
    view.addEventListener('click', (e) => {
        e.stopPropagation();
        let id = e.target.parentElement.getAttribute('data-id');
        modalBg.classList.add('bg-active');
        db.collection('adminCollection').doc(id).get().then(doc => {
            const html = `
        <div style="display:flex; line-height: 50px;"> 
        <div>
        Name:  ${doc.data().name}<br>
        Email: ${doc.data().email}<br>
        Account Created: ${doc.data().accountCreated}<br>
        Barangay: ${doc.data().barangay}<br>
        </div>
        
        <div style="margin-left:3rem;">
        Ratings: ${doc.data().userName}<br>
        Status: ${doc.data().status}<br>
        Usertype: ${doc.data().userType}<br>
        Password: ${doc.data().password}<br>
        </div>
        </div>
        
        <br> <center><a href="${doc.data().imgURL}" target="_blank"><img src="${doc.data().imgURL}" height="150px" width="150px"></a></center>
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
db.collection('adminCollection').where('userType', '==', 'co-admin').orderBy('barangay').onSnapshot(snapshot => {
    let changes = snapshot.docChanges();
     
     
    

    changes.forEach(change => {
        // console.log(change.doc.data());
        let status = change.doc.data();
       
            if (change.type == 'added') {
                renderCafe(change.doc);
            } else if (change.type == 'removed') {
                let li = cafeList.querySelector('[data-id=' + change.doc.id + ']');
                cafeList.removeChild(li);
            }
        


            db.collection('adminCollection').where('userType', '==', 'co-admin').onSnapshot(snap => {
            size = snap.size // will return the collection size
            document.getElementById("value").innerHTML = size;
            });
            db.collection('adminCollection').where('status', '==', 'activated').onSnapshot(snap => {
                size = snap.size // will return the collection size
                document.getElementById("value1").innerHTML = size;
                });
                db.collection('adminCollection').where('status', '==', 'deactivated').onSnapshot(snap => {
            size = snap.size // will return the collection size
            document.getElementById("value2").innerHTML = size;
            });

          
    });
});