// Create Account Containers
const createAccountContainer = document.querySelector('.create-account-container');
const createAccountCredentials = document.querySelectorAll('.create-account-form input');
const createAccountCredentialsArray = [...createAccountCredentials];
const accountSuccessMsgContainer = document.querySelector('.account-success-container');
const accountDeleteConfirm = document.querySelector('#blur-bg');
const accountDeleteConfirmButtons = [...document.querySelector('.account-delete-confirmation-container .buttons').children];

// Error messages in account creation
const nameError = document.querySelector('.create-account-form .name-wrapper p');
const emailError = document.querySelector('.create-account-form .email-wrapper p');
const passwordError = document.querySelector('.create-account-form .password-wrapper p');
const confirmPasswordErrors = [...document.querySelectorAll('.create-account-form .confirm-password-wrapper .confirm-password-errors p ')];

// Login Containers
const loginContainer = document.querySelector('.login-container');
const loginSuccessMsgContainer = document.querySelector('.login-success-container');
const loginCredentials = document.querySelectorAll('.login-form input');
const loginCredentialsArray = [...loginCredentials];
// Login errors
const loginEmailErrors = [...document.querySelectorAll('.login-form .email-wrapper p')];
const loginPasswordErrors = [...document.querySelectorAll('.login-form .password-wrapper p')];
// Buttons
const createAccountBtn = document.querySelector('.create-account-btn');
const loginBtn = document.querySelector('.login-btn');

let userData = [];
const userName = document.getElementById('user-name');


function confirmPassword() {
    if (createAccountCredentialsArray[2].value === createAccountCredentialsArray[3].value) {
        return true;
    }
    else {
        confirmPasswordErrors[1].classList.add('show-credential-error');

    }
}
function createAccount() {
    // Saving data to local storage
    const data = {
        email: '',
        password: '',
    }
    data.email = createAccountCredentialsArray[1].value;
    data.password = createAccountCredentialsArray[2].value;

    userName.innerText = createAccountCredentialsArray[0].value;

    const hasEnteredAllData = createAccountCredentialsArray.every(input => input.value);
    const isPasswordConfirmed = confirmPassword();


    if (hasEnteredAllData && isPasswordConfirmed) {
        accountSuccessMsgContainer.style.display = 'block';
        createAccountContainer.style.display = "none";
        userData.push(data);
        saveData()

    }
    else {
        createAccountCredentialsArray.forEach((input) => {
            if (input.value == '') {
                if (input.classList.contains('input-name')) {
                    nameError.classList.add('show-credential-error');
                }
                else if (input.classList.contains('input-email')) {
                    emailError.classList.add('show-credential-error');
                }
                else if (input.classList.contains('input-password')) {
                    passwordError.classList.add('show-credential-error');
                }
                else {
                    confirmPasswordErrors[0].classList.add('show-credential-error');
                }
            }
            input.addEventListener('focus', () => {
                // Selects the error message of the specific input
                const errorMsg = '.' + input.parentElement.parentElement.className + ' p';
                document.querySelector(`${errorMsg}`).classList.remove('show-credential-error');
            })
        })
        createAccountCredentialsArray[3].addEventListener('focus', (e) => {
            // Selects the error message of the specific input
            const errorMsg = '.' + e.target.parentElement.parentElement.className + ' p';
            [...document.querySelectorAll(`${errorMsg}`)].forEach(err => err.classList.remove('show-credential-error'));
        })
    }
}
function accountDeletion() {
    accountDeleteConfirm.style.transform = 'scale(1)';
    accountDeleteConfirmButtons.forEach((button) => {
        button.addEventListener('click', () => {
            if (button.classList.contains('delete-btn')) {
                localStorage.removeItem('userData');
                location.reload();
            }
            else {
                accountDeleteConfirm.addEventListener('click', () => {
                    accountDeleteConfirm.style.transform = 'scale(0)';

                })
            }

        })
    })
    accountDeleteConfirm.addEventListener('click', () => {
        accountDeleteConfirm.style.transform = 'scale(0)';

    })

}
function logIn() {
    if (loginCredentialsArray[0].value == userData[0].email && loginCredentialsArray[1].value == userData[0].password) {

        loginContainer.style.display = "none";
        loginSuccessMsgContainer.style.display = 'block';
    }
    else {
        // To show error if credentials do not match other than empty space
        if (loginCredentialsArray[0].value !== userData[0].email && loginCredentialsArray[0].value !== '') {
            loginEmailErrors[0].classList.add('show-credential-error');
        }
        if (loginCredentialsArray[1].value !== userData[0].password && loginCredentialsArray[1].value !== '') {
            loginPasswordErrors[0].classList.add('show-credential-error');

        }
        // To show error if user did not enter anything
        if (loginCredentialsArray[0].value == '') {
            loginEmailErrors[1].classList.add('show-credential-error');

        }
        if (loginCredentialsArray[1].value == '') {
            loginPasswordErrors[1].classList.add('show-credential-error');

        }
    }
    loginCredentialsArray.forEach((input) => {
        input.addEventListener('focus', () => {
            // Selects the error message of the specific input
            const errorMsg = '.' + input.parentElement.parentElement.className + ' p';
            [...document.querySelectorAll(`${errorMsg}`)].forEach(err => err.classList.remove('show-credential-error'));
        })
    })

}

function saveData() {
    if (userData.length > 0) {
        localStorage.setItem('userData', JSON.stringify(userData))

    }
}



function loadData() {
    const data = localStorage.getItem('userData');

    if (data !== null) {
        userData = JSON.parse(data);
        render();
    }
}
function render() {
    accountSuccessMsgContainer.style.display = 'none';
    createAccountContainer.style.display = "none";
    loginContainer.style.display = "block";
    document.querySelector('.account-delete-btn').style.display = 'block';
    loginBtn.addEventListener('click', logIn)

}


createAccountBtn.addEventListener('click', () => {
    createAccount();
})


document.querySelector('.account-delete-btn').addEventListener('click', accountDeletion)

loadData()

