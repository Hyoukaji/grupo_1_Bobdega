const formCreate = document.querySelector('#formCreate');
const firstName = document.querySelector('input[name=firstName]');
const lastName = document.querySelector('input[name=lastName]');
const email = document.querySelector('input[name=email]');
const username = document.querySelector('input[name=username]');
const password = document.querySelector('input[name=password]');
const password2 = document.querySelector('input[name=password2]');
const image = document.querySelector('input[name=image]');


const validateField = (e) => {
    const field = e.target;
    const spanError = field.nextElementSibling;
    if (field.value.trim() === "") {
    field.classList.add("is-invalid");
    spanError.innerText = `El campo ${field.placeholder} es obligatorio`;
    spanError.classList.add ("invalid-feedback");
    } else {
        field.classList.remove("is-invalid");
        field.classList.add("is-valid");
        spanError.innerText = "";
        spanError.classList.remove("invalid-feedback");
    }
}

firstName.addEventListener('blur', validateField);
lastName.addEventListener('blur', validateField);
username.addEventListener('blur', validateField);
password.addEventListener('blur', validateField);
password2.addEventListener('blur', validateField);

email.addEventListener("blur", (e) => {
    const field = e.target;
    const spanError = field.nextElementSibling;
    const regexEmail = /^([a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-])+@([a-zA-Z0-9-])+(.[a-z])+(?:\.[a-zA-Z0-9-]+)*$/;

    if (field.value.trim() === "") {
    field.classList.add("is-invalid");
    spanError.innerText = `El campo ${field.placeholder} es obligatorio`;
    spanError.classList.add ("invalid-feedback");

    } else if (!field.value.match(regexEmail)) {
            field.classList.add("is-invalid");                   
            spanError.innerText = `El campo debe ser un formato de email valido`;
            spanError.classList.add("invalid-feedback");
    } else {
        field.classList.remove("is-invalid");
        spanError.innerText = "";
        spanError.classList.remove("invalid-feedback");
        field.classList.add("is-valid");
        console.log("Estaria todo ok");

    }
})

image.addEventListener("change", (e) => {
    const field = e.target;
    const image = field.value;
    const spanError = field.nextElementSibling;

    let extensions = /(.jpg|.jpeg|.png|.gif)$/i;
        if(!image.match(extensions)){
            field.classList.add("is-invalid");
            spanError.innerText = `El formato de imagen debe ser .jpg, .jpeg, .png o gif `;
            spanError.classList.add ("invalid-feedback");
        }else{
            field.classList.remove("is-invalid");
                field.classList.add("is-valid")
                spanError.innerText = "";
                spanError.classList.remove("invalid-feedback");
        }
    });



formCreate.addEventListener("submit", (e) => {
    let errorCount = false;

    const formField = [...formCreate.elements];
    formField.pop();
    
    formField.forEach(oneField => {
        const spanError = oneField.nextElementSibling;
        if (field.value.trim() === "") {
            field.classList.add("is-invalid");
            spanError.innerText = `El campo ${field.placeholder} es obligatorio`;
            spanError.classList.add ("invalid-feedback");
            errorCount = true;
            } else {
                field.classList.remove("is-invalid");
                field.classList.add("is-valid")
                spanError.innerText = "";
                spanError.classList.remove("invalid-feedback");
            }
    })
    if (errorCount) {
        e.preventDefault();
    }

});