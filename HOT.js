document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('getQR').addEventListener('click', function () {
        var email = document.getElementById('email').value;
        checkEmail(email);
    });

    document.getElementById('team').addEventListener('click', function () {
        window.location.href = 'sign_page.html';
    });
});

function checkEmail(email) {
    // Implement your email validation logic here
    // You can use AJAX to make a server request similar to Flutter's Firebase Database
}
