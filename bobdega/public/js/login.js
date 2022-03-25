const email = document.querySelector('input[name=email]');
const password = document.querySelector('input[name=password]');
const formLogin = document.querySelector("#formLogin")
console.log(formLogin)

const validateField = (e) => {
    const field = e.target;
    const spanError = field.nextElementSibling;
    if (field.value.trim() === "") {
    field.classList.add("is-invalid");
    spanError.innerText = `El campo ${field.placeholder} es obligatorio`;
    spanError.classList.add ("invalid-feedback");
    } else {
        field.classList.remove("is-invalid");
        field.classList.add("is-valid")
        spanError.innerText = "";
        spanError.classList.remove("invalid-feedback");
    }
}



email.addEventListener('blur', validateField);
password.addEventListener('blur', validateField);


formCreate.addEventListener("submit", (e) => {
    let errorCount = 0;

    const formField = [...formCreate.elements];
    formField.pop();
    
    formField.forEach(oneField => {
        const spanError = oneField.nextElementSibling;
        if (field.value.trim() === "") {
            field.classList.add("is-invalid");
            spanError.innerText = `El campo ${field.placeholder} es obligatorio`;
            spanError.classList.add ("invalid-feedback");
            } else {
                field.classList.remove("is-invalid");
                field.classList.add("is-valid")
                spanError.innerText = "";
                spanError.classList.remove("invalid-feedback");
            }
    })

    if (errorCount > 0) {
        e.preventDefault();
    }

});
