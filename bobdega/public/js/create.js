
const formCreate = document.querySelector('#formulario-s');
const nombre = document.querySelector('input[name=name]');
const type = document.querySelector('input[name=type]');
const price = document.querySelector('input[name=price]');
const alcohol = document.querySelector('input[name=alcohol]');
const description = document.querySelector('textarea[name=description]');
const imageProduct = document.querySelector('input[name=imageProduct]');



let errorCount = false;

const validateField = (e) => {
    const field = e.target;
    const spanError = field.nextElementSibling;
    if (field.value.trim() === "") {
    field.classList.add("is-invalid");
    spanError.innerText = `El campo ${field.placeholder} es obligatorio`;
    spanError.classList.add ("invalid-feedback");
    errorCount = true;
    } else {
        field.classList.remove("is-invalid");
        field.classList.add("is-valid");
        spanError.innerText = "";
        spanError.classList.remove("invalid-feedback");
    }
}

const validateName = (e) => {
    const field = e.target;
    const spanError = field.nextElementSibling;
    if (field.value.trim() === "" ||  field.value.length < 5) {
    field.classList.add("is-invalid");
    spanError.innerText = `El campo ${field.placeholder} es obligatorio y debe tener como minimo 5 caracteres`;
    spanError.classList.add ("invalid-feedback");
    errorCount = true;
    } else {
        field.classList.remove("is-invalid");
        field.classList.add("is-valid");
        spanError.innerText = "";
        spanError.classList.remove("invalid-feedback");
    }
}

const validateDescription = (e) => {
    const field = e.target;
    const spanError = field.nextElementSibling;
    if (field.value.trim() === "" ||  field.value.length < 20) {
    field.classList.add("is-invalid");
    spanError.innerText = `El campo ${field.placeholder} es obligatorio y debe tener como minimo 20 caracteres`;
    spanError.classList.add ("invalid-feedback");
    errorCount = true;
    } else {
        field.classList.remove("is-invalid");
        field.classList.add("is-valid");
        spanError.innerText = "";
        spanError.classList.remove("invalid-feedback");
    }
} 

imageProduct.addEventListener("change", (e) => {
    const field = e.target;
    const image = field.value;
    const spanError = field.nextElementSibling;

    let extensions = /(.jpg|.jpeg|.png|.gif)$/i;
        if(!image.match(extensions)){
            field.classList.add("is-invalid");
            spanError.innerText = `El formato de imagen debe ser .jpg, .jpeg, .png o gif `;
            spanError.classList.add ("invalid-feedback");
            errorCount = true;
        }else{
            field.classList.remove("is-invalid");
                field.classList.add("is-valid")
                spanError.innerText = "";
                spanError.classList.remove("invalid-feedback");
        }
    });

    description.addEventListener("blur", validateDescription );
    nombre.addEventListener("blur", validateName);
    price.addEventListener("blur", validateField);
    alcohol.addEventListener("blur", validateField);

    formCreate.addEventListener("submit", (e) => {
       
    
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
