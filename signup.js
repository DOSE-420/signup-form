// Initialize Firebase


const firebaseConfig = {
    // Your Firebase config object here
    apiKey: "AIzaSyCMDgE_aDb_ew2UEGrbrJT2bpmiwDnjrRs",
    authDomain: "yatri-23bc3.firebaseapp.com",
    projectId: "yatri-23bc3",
    storageBucket: "yatri-23bc3.appspot.com",
    messagingSenderId: "604285935632",
    appId: "1:604285935632:web:355566bb8dc63ccd83aa95",
    measurementId: "G-ZC8YVR24BR"
};



firebase.initializeApp(firebaseConfig);

const signupForm = document.getElementById('signup-form');
const errorMessage = document.getElementById('error-message');

signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = signupForm['email'].value;
    const password = signupForm['password'].value;

    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed up successfully
            const user = userCredential.user;
            console.log(user);
            window.location.href = "profile.html"; // Redirect to profile page
        })
        .catch((error) => {
            const errorMessage = error.message;
            // Display error message to the user
            document.getElementById('error-message').innerText = errorMessage;
        });
});

// Sign up with Google function
function signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
        .then((userCredential) => {
            // Signed up with Google successfully
            const user = userCredential.user;
            console.log(user);
            window.location.href = "profile.html"; // Redirect to profile page
        })
        .catch((error) => {
            const errorMessage = error.message;
            // Display error message to the user
            document.getElementById('error-message').innerText = errorMessage;
        });
}

// Password strength checker
function displayPasswordStrength(strength) {
    const passwordStrengthText = document.getElementById('password-strength-text');
    const passwordStrengthBar = document.getElementById('password-strength-bar');
    passwordStrengthText.textContent = `Password Strength: ${strength}`;
    passwordStrengthBar.classList.remove('weak', 'medium', 'strong');
    if (strength === 'Weak') {
        passwordStrengthBar.classList.add('weak');
        passwordStrengthBar.style.width = '33%';
    } else if (strength === 'Medium') {
        passwordStrengthBar.classList.add('medium');
        passwordStrengthBar.style.width = '66%';
    } else if (strength === 'Strong') {
        passwordStrengthBar.classList.add('strong');
        passwordStrengthBar.style.width = '100%';
    }
}

// Call displayPasswordStrength function when password input changes
const passwordInput = document.getElementById('password');
passwordInput.addEventListener('input', function() {
    const password = passwordInput.value;
    console.log("Password Input:", password);
    const strength = calculatePasswordStrength(password);
    console.log("Password Strength:", strength);
    displayPasswordStrength(strength);
});

// Function to calculate password strength
function calculatePasswordStrength(password) {
    if (password.length >= 8 && password.match(/[a-z]/) && password.match(/[A-Z]/) && password.match(/[0-9]/)) {
        return 'Strong';
    } else if (password.length >= 6 && password.match(/[a-zA-Z]/) && password.match(/[0-9]/)) {
        return 'Medium';
    } else {
        return 'Weak';
    }
}


