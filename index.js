// Initialize Firebase
var firebaseConfig = {
    // Add your Firebase configuration here

    apiKey: "AIzaSyDHuDRLAtkLYqwFMrkUjZSRAOp2QPHbgtg",
    authDomain: "rahul-fire-base.firebaseapp.com",
    databaseURL: "rahul-fire-base",
    projectId: "rahul-fire-base",
    storageBucket: "rahul-fire-base.appspot.com",
    messagingSenderId: "1027562454782",
    databaseURL: "https://rahul-fire-base-default-rtdb.firebaseio.com/",
    appId: "1:1027562454782:web:a1b00c971dafe6fae12faf"

};

firebase.initializeApp(firebaseConfig);

// Get a reference to the Firebase Realtime Database
var database = firebase.database();

// Get the form and add a submit event listener
var userForm = document.getElementById('userForm');
userForm.addEventListener('submit', submitForm);

// Function to handle form submission
function submitForm(e) {
    e.preventDefault(); // Prevent form submission

    // Get user input values
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var message = document.getElementById('message').value;

    // Save the data in the Firebase Realtime Database
    var userDataRef = database.ref('users');
    var newUserRef = userDataRef.push();
    newUserRef.set({
        name: name,
        email: email,
        message: message
    }).then(function () {
        // Display success message
        var successMessage = document.getElementById('successMessage');
        successMessage.innerHTML = 'Data submitted successfully.';
        successMessage.style.display = 'block';

        // Reset the form
        userForm.reset();
    }).catch(function (error) {
        console.log('Error saving data:', error);
    });
}

// Retrieve user data from Firebase and display in table format
var userDataRef = database.ref('users');
userDataRef.on('value', function (snapshot) {
    var userData = snapshot.val();
    var tableBody = document.querySelector('#userData tbody');
    tableBody.innerHTML = '';

    for (var key in userData) {
        if (userData.hasOwnProperty(key)) {
            var user = userData[key];
            var row = document.createElement('tr');

            var nameCell = document.createElement('td');
            nameCell.textContent = user.name;
            row.appendChild(nameCell);

            var emailCell = document.createElement('td');
            emailCell.textContent = user.email;
            row.appendChild(emailCell);

            var messageCell = document.createElement('td');
            messageCell.textContent = user.message;
            row.appendChild(messageCell);

            var actionsCell = document.createElement('td');
            var updateBtn = document.createElement('button');
            updateBtn.textContent = 'Update';
            updateBtn.className = 'actions-btn';
            updateBtn.setAttribute('data-key', key);
            updateBtn.addEventListener('click', updateData);
            actionsCell.appendChild(updateBtn);

            var deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';
            deleteBtn.className = 'actions-btn';
            deleteBtn.setAttribute('data-key', key);
            deleteBtn.addEventListener('click', deleteData);
            actionsCell.appendChild(deleteBtn);

            row.appendChild(actionsCell);

            tableBody.appendChild(row);
        }
    }
});

// Function to handle update button click
function updateData(e) {
    var key = e.target.getAttribute('data-key');
    var userDataRef = database.ref('users/' + key);

    // Retrieve user data from Firebase and populate the form
    userDataRef.once('value', function (snapshot) {
        var userData = snapshot.val();
        document.getElementById('name').value = userData.name;
        document.getElementById('email').value = userData.email;
        document.getElementById('message').value = userData.message;

        // Remove the user data from Firebase
        userDataRef.remove();
    });
}

// Function to handle delete button click
function deleteData(e) {
    var key = e.target.getAttribute('data-key');
    var userDataRef = database.ref('users/' + key);

    // Remove the user data from Firebase
    userData
}