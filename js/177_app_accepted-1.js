//if there's a user display this function
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
    let itemName = document.createElement('span');
    let donorContact = document.createElement('span');
    let itemDesc = document.createElement('span');

    let cross = document.createElement('div');
    let view = document.createElement('div');
    let btnAccept = document.createElement('div');
    let btnDecline = document.createElement('div');
    let itemStatus = document.createElement('span');


    li.setAttribute('data-id', doc.id);

    // text content
    itemName.textContent = doc.data().itemName;
    itemDesc.textContent = "Donated by:" + doc.data().donorName;
    itemStatus.textContent = "Status:" + doc.data().status;
    cross.textContent = 'x';
    view.textContent = 'view';


    // classname
    cross.className = "cross";
    view.className = "view1";


    // displaying or appending the element 
    li.appendChild(itemName);
    li.appendChild(itemDesc);
    li.appendChild(itemStatus);
    li.appendChild(cross);
    li.appendChild(view);


    cafeList.appendChild(li);

    // updating the status to accepted
    // btnAccept.addEventListener('click', (e) => {
    //     e.stopPropagation();
    //     let id = e.target.parentElement.getAttribute('data-id');
    //     db.collection('donations').doc('177').collection('userDonations').doc(id).update({
    //         status: 'accepted'
    //     });
    // });

    // // updating the status to declined
    // btnDecline.addEventListener('click', (e) => {
    //     e.stopPropagation();
    //     let id = e.target.parentElement.getAttribute('data-id');
    //     db.collection('donations').doc('177').collection('userDonations').doc(id).update({
    //         status: 'declined'
    //     });
    // });

    // deleting data
    cross.addEventListener('click', (e) => {
        e.stopPropagation();
        let id = e.target.parentElement.getAttribute('data-id');
        db.collection('donations').doc('177').collection('acceptedDonations').doc(id).delete();
    });

    // view more details data
    view.addEventListener('click', (e) => {
        e.stopPropagation();
        let id = e.target.parentElement.getAttribute('data-id');
        modalBg.classList.add('bg-active');
        db.collection('donations').doc('177').collection('acceptedDonations').doc(id).get().then(doc => {
            const html = `
        <div style="display:flex; line-height: 50px;"> 
        <div>
        Donor Name:${doc.data().donorName}<br>
        Contact: ${doc.data().donorContact}<br>
        Date Added: ${doc.data().dateAdded}<br>
        Type of Donation: ${doc.data().typeofDonation}<br>
        </div>

        <div style="margin-left:3rem; width:300px;">
        Item Name: ${doc.data().itemName}<br>
        Description: ${doc.data().itemDescription}<br>
        Quantity: ${doc.data().quantity}<br>
        Tier Level: ${doc.data().tierLevel}<br>
        </div>
        </div>
        <hr>
        <div> Location: ${doc.data().location} </div>
        <div> Notes: ${doc.data().notes} </div>
        Status: &nbsp;<span style="color:#7a9ed1; font-weight:bold;">  ${doc.data().status} </span>
        <br> <center><a href="${doc.data().imageURL}" target="_blank"><img src="${doc.data().imageURL}" height="150px" width="150px"></a></center>
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
db.collection('donations').doc('177').collection('acceptedDonations').onSnapshot(snapshot => {
    let changes = snapshot.docChanges();
    const status_pending = "pending";
    const status_accepted = "accepted";    
    const status_declined = "declined"; 

    changes.forEach(change => {
        // console.log(change.doc.data());
        let status = change.doc.data();
        if (status.status == "accepted") {
            if (change.type == 'added') {
                renderCafe(change.doc);
            } else if (change.type == 'removed') {
                let li = cafeList.querySelector('[data-id=' + change.doc.id + ']');
                cafeList.removeChild(li);
            }
        }

        
    });
});

const status_pending = "pending";
const status_accepted = "accepted";    
const status_declined = "declined"; 

db.collection('donations').doc('177').collection('acceptedDonations').where('status', '==', status_accepted).get().then(snap => {
    size = snap.size // will return the collection size
    document.getElementById("value1").innerHTML = size;
  });

  db.collection('donations').doc('177').collection('declinedDonations').where('status', '==', status_declined).get().then(snap => {
size = snap.size // will return the collection size
document.getElementById("value2").innerHTML = size;
});

db.collection('donations').doc('177').collection('userDonations').where('status', '==', status_pending).get().then(snap => {
size = snap.size // will return the collection size
document.getElementById("value").innerHTML = size;
});
