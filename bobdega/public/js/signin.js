const formCreate = document.querySelector('#formCreate');
const firstName = document.querySelector('input[name=firstName]');
const lastName = document.querySelector('input[name=lastName]');
const email = document.querySelector('input[name=email]');
const password = document.querySelector('input[name=password]');
const password2 = document.querySelector('input[name=password2]');
const image = document.querySelector('input[name=image]');

let p1 = ""
let p2 = ""

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

const validatePassword = (e) => {
    const field = e.target;
    const spanError = field.nextElementSibling;
    let cadena = field.value.trim()
    p1 = cadena
    ok = true
    ok2 = true
    if (cadena === "") {
    field.classList.add("is-invalid");
    spanError.innerText = `El campo ${field.placeholder} es obligatorio`;
    spanError.classList.add ("invalid-feedback");
    errorCount = true;
    ok = false
    }

    if (cadena.length < 8) {
        field.classList.add("is-invalid");
        spanError.innerText = `La contraseña debe contener al menos 8 caracteres`;
        spanError.classList.add ("invalid-feedback");
        errorCount = true;
        ok = false
        }

    if (ok && ok2){
        field.classList.remove("is-invalid");
        field.classList.add("is-valid")
        spanError.innerText = "";
        spanError.classList.remove("invalid-feedback");
    }
}

const validatePassword2 = (e) => {
    const field = e.target;
    const spanError = field.nextElementSibling;
    const regex = /(?=^.{8,}$)(?=.\d)(?=.[!@#$%^&]+)(?![.\n])(?=.[A-Z])(?=.[a-z]).$/;
     
    let cadena = field.value.trim()
     p2 = cadena
     ok = true
     ok2 = true
     ok3 = true
    if (cadena === "") {
    field.classList.add("is-invalid");
    spanError.innerText = `El campo ${field.placeholder} es obligatorio`;
    spanError.classList.add ("invalid-feedback");
    errorCount = true;
    ok = false
    }

    if (cadena.length < 8) {
        field.classList.add("is-invalid");
        spanError.innerText = `La contraseña debe contener al menos 8 caracteres`;
        spanError.classList.add ("invalid-feedback");
        errorCount = true;
        ok = false
        }
    
    if (p1 != p2){
        field.classList.add("is-invalid");
        spanError.innerText = `Las contraseñas tienen que coincidir`;
        spanError.classList.add ("invalid-feedback");
        errorCount = true;
        ok3 = false
    }

    if (ok && ok2 && ok3){
        field.classList.remove("is-invalid");
        field.classList.add("is-valid")
        spanError.innerText = "";
        spanError.classList.remove("invalid-feedback");
    }
}


password.addEventListener('blur', validatePassword);
password2.addEventListener('blur', validatePassword2);


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