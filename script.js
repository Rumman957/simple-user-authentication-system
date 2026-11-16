// Content Containers
const createAccountContainer = document.querySelector('.create-account-container');
const loginContainer = document.querySelector('.login-container');
const accountSuccessMsgContainer = document.querySelector('.account-success-container');
const loginSuccessMsgContainer = document.querySelector('.login-success-container');
const userName = document.getElementById('user-name');
const accountDeleteConfirm = document.querySelector('#blur-bg');
const accountDeleteConfirmButtons = [...document.querySelector('.account-delete-confirmation-container .buttons').children];

const createAccountCredentials = document.querySelectorAll('.create-account-form div');
// There are two children in each input container (div). Input element itself and a <p> tag for error message
const createAccountCredentialsArray = [...createAccountCredentials];

const loginCredentials = document.querySelectorAll('.login-form div');
const loginCredentialsArray = [...loginCredentials];

// Buttons
const createAccountBtn = document.querySelector('.create-account-btn');
const loginBtn = document.querySelector('.login-btn');

let userData = [];

function confirmPassword() {
    if (createAccountCredentialsArray[2].children[0].value === createAccountCredentialsArray[3].children[0].value) {
        return true;
    }
    else {
        createAccountCredentialsArray[3].children[2].classList.add('show-confirm-password-error')

    }
}
function createAccount() {
    // Saving data to local storage
    const data = {
        email: '',
        password: '',
    }
    data.email = createAccountCredentialsArray[1].children[0].value;
    data.password = createAccountCredentialsArray[2].children[0].value;
    if (data.email && data.password) {
        userData.push(data);

    }
    saveData()
    userName.innerText = createAccountCredentialsArray[0].children[0].value;

    const hasEnteredAllData = createAccountCredentialsArray.every(input => input.children[0].value);
    const isPasswordConfirmed = confirmPassword();
    console.log(hasEnteredAllData);
    console.log(isPasswordConfirmed);

    if (hasEnteredAllData && isPasswordConfirmed) {
        accountSuccessMsgContainer.style.display = 'block';
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
function logIn() {
    if (loginCredentialsArray[0].children[0].value == userData[0].email && loginCredentialsArray[1].children[0].value == userData[0].password) {

        loginContainer.style.display = "none";
        loginSuccessMsgContainer.style.display = 'block';
    }
    else {
        // To show error if credentials do not match other than empty space
        if (loginCredentialsArray[0].children[0].value !== userData[0].email && loginCredentialsArray[0].children[0].value !== '') {
            loginCredentialsArray[0].children[1].classList.add('show-credential-error');
        }
        if (loginCredentialsArray[1].children[0].value !== userData[0].password && loginCredentialsArray[1].children[0].value !== '') {
            loginCredentialsArray[1].children[1].classList.add('show-credential-error');
        }
        // To show error if user did not enter anything
        if (loginCredentialsArray[0].children[0].value == '') {
            loginCredentialsArray[0].children[2].classList.add('show-credential-error');
        }
        if (loginCredentialsArray[1].children[0].value == '') {
            loginCredentialsArray[1].children[2].classList.add('show-credential-error');
        }
    }
    document.querySelector('.login-form').addEventListener('click', () => {
        loginCredentialsArray.forEach((input) => {
            input.children[1].classList.remove('show-credential-error')
            input.children[2].classList.remove('show-credential-error')
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

document.querySelector('.account-delete-btn').addEventListener('click', accountDeletion)

loadData()










//  else {
//         if (loginCredentialsArray[0].children[0].value.trim() !== userData[0].email) {
//             loginCredentialsArray[0].children[1].classList.add('show-credential-error')
//         }
//         else  {
//             loginCredentialsArray[0].children[2].classList.add('show-credential-error')
//         }
//         if (loginCredentialsArray[1].children[0].value.trim() !== userData[0].password) {
//             loginCredentialsArray[1].children[1].classList.add('show-credential-error')
//         }
//         else {
//             loginCredentialsArray[1].children[2].classList.add('show-credential-error')
//         }

//     }
//     loginCredentialsArray[0].children[0].addEventListener('focus', () => {
//         loginCredentialsArray[3].children[1].classList.remove('show-confirm-password-error')

//     })
//     loginCredentialsArray[1].children[0].addEventListener('focus', () => {
//         loginCredentialsArray[1].children[1].classList.remove('show-confirm-password-error')

//     })