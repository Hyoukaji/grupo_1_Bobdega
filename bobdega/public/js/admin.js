const email = document.querySelector('input[name=email]');
const formLogin = document.querySelector("#formLogin")



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
   


formLogin.addEventListener("submit", (e) => {
    let errorCount = 0;

    const formField = [...formCreate.elements];
    formField.pop();
    
    formField.forEach(oneField => {                                  /** si no hay errores envia el formulario, si los hay muestra los errores */
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
