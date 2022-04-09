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
    if (field.value.trim() === "" ||  field.value.length<2) {
    field.classList.add("is-invalid");
    spanError.innerText = `El campo ${field.placeholder} es obligatorio y debe tener como minimo 2 caracteres`;
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



password.addEventListener("blur", (e) => {
    const field = e.target;
    const password = field.value;
    const spanError = field.nextElementSibling;
    const passwordFormat = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&#.$($)$-$_])[A-Za-z\d$@$!%*?&#.$($)$-$_]{8,}$/
    console.log(password)
    if (password.trim() === "") {
        field.classList.add("is-invalid");
        spanError.innerText = `El campo ${field.placeholder} es obligatorio`;
        spanError.classList.add ("invalid-feedback");
    
        } else if (!password.match(passwordFormat)) {
                field.classList.add("is-invalid");                   
                spanError.innerText = `El campo debe ser un formato valido`;
                spanError.classList.add("invalid-feedback");
        } else {
            field.classList.remove("is-invalid");
            spanError.innerText = "";
            spanError.classList.remove("invalid-feedback");
            field.classList.add("is-valid");
            console.log("Estaria todo ok");
    
        }
})

password2.addEventListener("blur", (e) => {
    const field = e.target;
    const password = field.value;
    const spanError = field.nextElementSibling;
    const passwordFormat = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&#.$($)$-$_])[A-Za-z\d$@$!%*?&#.$($)$-$_]{8,}$/
    console.log(password)
    if (password.trim() === "") {
        field.classList.add("is-invalid");
        spanError.innerText = `El campo ${field.placeholder} es obligatorio`;
        spanError.classList.add ("invalid-feedback");
    
        } else if (!password.match(passwordFormat)) {
                field.classList.add("is-invalid");                   
                spanError.innerText = `El campo debe ser un formato valido`;
                spanError.classList.add("invalid-feedback");
        } else {
            field.classList.remove("is-invalid");
            spanError.innerText = "";
            spanError.classList.remove("invalid-feedback");
            field.classList.add("is-valid");
            console.log("Estaria todo ok");
    
        }
})


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