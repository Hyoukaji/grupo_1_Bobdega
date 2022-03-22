const formCreate = document.querySelector('#formCreate');
const firstName = document.querySelector('input[name=firstName]');
const lastName = document.querySelector('input[name=lastName]');
const email = document.querySelector('input[name=email]');
const username = document.querySelector('input[name=username]');
const password = document.querySelector('input[name=password]');
const password2 = document.querySelector('input[name=password2]');



const validateField = (e) => {
    const field = e.target;
    const spanError = field.nextElementSibling;
    if (field.value.trim() === "") {
    field.style.borderColor = "red";
    spanError.innerText = `El campo ${field.name} es obligatorio`;
    } else {
        field.style.borderColor = "black";
        spanError.innerText = "";
    }
}

firstName.addEventListener('blur', validateField);
lastName.addEventListener('blur', validateField);
email.addEventListener('blur', validateField);
username.addEventListener('blur', validateField);
password.addEventListener('blur', validateField);
password2.addEventListener('blur', validateField);

formCreate.addEventListener("submit", (e) => {
    let errorCount = 0;

    const formField = [...formCreate.elements];
    formField.pop();
    
    formField.forEach(oneField => {
        const spanError = oneField.nextElementSibling;
        if (oneField.value.trim() === "") {
            oneField.style.borderColor = "red";
            spanError.innerText = `El campo ${oneField.name} es obligatorio`;
            errorCount++;
        } else {
            oneField.style.borderColor = "black";
            spanError.innerText = "";
        }
    })

    if (errorCount > 0) {
        e.preventDefault();
    }

});