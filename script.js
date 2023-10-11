document.addEventListener('DOMContentLoaded', () => {
    // Initialize Firebase with your Firebase project configuration
    const firebaseConfig = {
        apiKey: "AIzaSyC6C57fiWSJQSRfHhocbgauC1yB7anMV9Q",
        authDomain: "attendance-210cd.firebaseapp.com",
        databaseURL: "https://attendance-210cd-default-rtdb.firebaseio.com",
        projectId: "attendance-210cd",
        storageBucket: "attendance-210cd.appspot.com",
        messagingSenderId: "990609359779",
        appId: "1:990609359779:web:bb013cd86d38b874a6d016",
        measurementId: "G-YF38EKHNND"
    };

    try {
        // Initialize Firebase
        firebase.initializeApp(firebaseConfig);
    } catch (error) {
        console.error('Error initializing Firebase:', error);
    }

    const database = firebase.database();

    document.getElementById('getQR').addEventListener('click', () => {
        const email = document.getElementById('email').value;
        checkEmail(email, database);
    });
});


function checkEmail(emailToCheck, database) {
    // Reference to the "users" node in the database
    const usersRef = database.ref();

    usersRef.once('value').then((dataSnapshot) => {
        let emailExistsInData = false;
        let registrationNumber;
        let uniqueId;

        if (dataSnapshot.exists()) {
            dataSnapshot.forEach((childSnapshot) => {
                const item = childSnapshot.val();

                // Assuming 'Email Address' is the key for the email field in the data
                if (item['Email Address'] === emailToCheck) {
                    emailExistsInData = true;
                    registrationNumber = item['Registration Number'];
                    uniqueId = item['Unique id'];
                }
            });

            if (emailExistsInData) {
                redirectToQRCodeGenerator(emailToCheck, registrationNumber, uniqueId);
            } else {
                showErrorMessage('Email not found in the database.');
            }
        }
    });
}

function redirectToQRCodeGenerator(email, registrationNumber, uniqueId) {
    // Redirect to qr.html with query parameters
    const redirectURL = 'qr.html' +
        '?email=' + email +
        '&registrationNumber=' + registrationNumber +
        '&uniqueId=' + uniqueId;

    window.location.href = redirectURL;
}

function showErrorMessage(message) {
    // Display an error message to the user
    alert(message);
}