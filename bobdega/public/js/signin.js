const formCreate = document.querySelector('#formCreate');
const firstName = document.querySelector('input[name=firstName]');
const lastName = document.querySelector('input[name=lastName]');
const email = document.querySelector('input[name=email]');                     /**llamamos a los campos requeridos */
const password = document.querySelector('input[name=password]');
const password2 = document.querySelector('input[name=password2]');
const image = document.querySelector('input[name=image]');

let p1 = ""
let p2 = ""

const validateField = (e) => {
    const field = e.target;
    const spanError = field.nextElementSibling;     /** capturamos el evento y lo validamos*/
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
    const password = field.value;                           /** validacion de formato y largo de password */
    const spanError = field.nextElementSibling;
    const passwordFormat = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&#.$($)$-$_])[A-Za-z\d$@$!%*?&#.$($)$-$_]{8,}$/
    
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
            
    
        }
})

password2.addEventListener("blur", (e) => {
    const field = e.target;
    const password = field.value;
    const spanError = field.nextElementSibling;      /** validacion igualdad de contraseñas y formato   */
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
    const field = e.target;                                      /** validacion de formato email  */
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
    const spanError = field.nextElementSibling;               /** validacion de formato de imagen   */

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
        const spanError = oneField.nextElementSibling;   /**si esta todo bien envia por back el formulario y sino, evita el submit*/
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