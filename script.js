// Content Containers
const createAccountContainer = document.querySelector('.create-account-container');
const loginContainer = document.querySelector('.login-container');
const successMsgContainer = document.querySelector('.success-container');

const createAccountCredentials = document.querySelectorAll('.create-account-form div');
// There are two children in each input container (div). Input element itself and a <p> tag for error message
const createAccountCredentialsArray = [...createAccountCredentials];

const loginCredentials = document.querySelectorAll('.login-form input');
const loginCredentialsArray = [...loginCredentials];

// Buttons
const createAccountBtn = document.querySelector('.create-account-btn');
const loginBtn = document.querySelector('.login-btn');

function confirmPassword() {
    if (createAccountCredentialsArray[2].children[0].value === createAccountCredentialsArray[3].children[0].value) {
        return true;
    }
    else {
        createAccountCredentialsArray[3].children[2].classList.add('show-confirm-password-error')

    }
    // createAccountCredentialsArray[3].children[0].addEventListener('focus', () => {
    //      createAccountCredentialsArray[3].children[2].remove('show-confirm-password-error')

    // })
}
function createAccount() {
    const hasEnteredAllData = createAccountCredentialsArray.every(input => input.children[0].value);
    const isPasswordConfirmed = confirmPassword();
    console.log(isPasswordConfirmed);

    if (hasEnteredAllData && isPasswordConfirmed) {
        successMsgContainer.style.display = 'block';
        createAccountContainer.style.display = "none";
    }
    else {
        createAccountCredentialsArray.forEach((input) => {
            if (input.children[0].value == '') {
                input.children[1].classList.add('show-credential-error')
            }
            input.children[0].addEventListener('focus', () => {
                input.children[1].classList.remove('show-credential-error')

            })
        })
        createAccountCredentialsArray[3].children[0].addEventListener('focus', () => {
            createAccountCredentialsArray[3].children[2].classList.remove('show-confirm-password-error')

        })
    }
}




createAccountBtn.addEventListener('click', () => {
    createAccount();
})
