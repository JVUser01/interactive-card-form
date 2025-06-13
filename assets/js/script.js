let send = true;
let form = document.querySelector(".form");
let inputs = document.querySelectorAll(".form__inputs");

inputs.forEach((item) => {
    item.addEventListener("focus", () => {
        item.parentElement.classList.add("form__inputs-focus-border-active");
    });
});

inputs.forEach((item) => {
    item.addEventListener("blur", () => {
        item.parentElement.classList.remove("form__inputs-focus-border-active");
    })
});

//update field and card contents as you type
inputs.forEach((item) => {
    item.addEventListener("input", () => {
        let inputName = item.getAttribute("name");
        let inputValue = item.value;
        let nextField;

        switch(inputName) {
            case "name":
                item.value = inputValue.replace(/\d/g, "");
                
                document.querySelector(".form__page-card-name").innerHTML = item.value;
                if(item.value === "") {
                    document.querySelector(".form__page-card-name").innerHTML = "JANE APPLESEED";
                }
                break;

            case "card-number":
                let inputNumbers = inputValue.replace(/\D/g, "");
                nextField = document.querySelector("[name='exp-date-mm'");
                
                if(inputNumbers.length <= 16) {
                    item.value = inputNumbers.replace(/(.{4})/g, "$1 ").trim();
                    document.querySelector(".form-page__card-number").innerHTML = item.value;
                    if(inputNumbers.length === 16) {
                        nextField.focus();
                    }
                    if(item.value === "") {
                        document.querySelector(".form-page__card-number").innerHTML = "0000 0000 0000 0000";
                    }
                } else {
                    item.value = inputNumbers.slice(0, -1).replace(/(.{4})/g, "$1 ").trim();
                    nextField.focus();
                }
                break;

            case "exp-date-mm":
                nextField = document.querySelector("[name='exp-date-yy'");
                inputValue = inputValue.replace(/\D/g, "");
                item.value = inputValue;

                if(inputValue.length <= 2) {
                    document.querySelector(".form__page-card-mm").innerHTML = inputValue;
                    if(inputValue.length === 2) {
                        nextField.focus();
                    }
                    if(inputValue === "") {
                        document.querySelector(".form__page-card-mm").innerHTML = "00";
                    }
                } else {
                    item.value = inputValue.slice(0, -1);
                    nextField.focus();
                }
                break;

            case "exp-date-yy":
                nextField = document.querySelector("[name='cvc'");
                inputValue = inputValue.replace(/\D/g, "");
                item.value = inputValue;

                if(inputValue.length <= 2) {
                    document.querySelector(".form__page-card-yy").innerHTML = inputValue;
                    if(inputValue.length === 2) {
                        nextField.focus();
                    }
                    if(inputValue === "") {
                        document.querySelector(".form__page-card-yy").innerHTML = "00";
                    }
                } else {
                    item.value = inputValue.slice(0, -1);
                    nextField.focus();
                }
                break;

            case "cvc":
                inputValue = inputValue.replace(/\D/g, "");
                item.value = inputValue;

                if(inputValue.length <= 4) {
                    document.querySelector(".form-page__back-card-cvc").innerHTML = inputValue;
                    if(inputValue === "") {
                        document.querySelector(".form-page__back-card-cvc").innerHTML = "000";
                    }
                } else {
                    item.value = inputValue.slice(0, -1);
                }
                break;
        }
    })
})

form.addEventListener("submit", (e) => {
    e.preventDefault();
    send = true;
    eraseErrors();
    
    inputs.forEach((item) => {
        validateField(item);
    });

    if(send) {
        form.style.display = "none";
        document.querySelector(".success-message").style.display = "flex";
    }
})

function eraseErrors() {
    document.querySelectorAll(".form__inputs--error").forEach((item) => {
        item.classList.remove("form__inputs--error");
    });

    document.querySelectorAll(".form__inputs-error-blank").forEach((item) => {
        item.style.display = "none";
    });

    document.querySelectorAll(".form__inputs-error-min-char").forEach((item) => {
        item.style.display = "none";
    });

    document.querySelectorAll(".form__inputs-error-format").forEach((item) => {
        item.style.display = "none";
    });
}

function validateField(input) {
    let inputName = input.getAttribute("name");
    let inputValue = input.value;
    const nameRegex = /^[A-Za-zÀ-ÿ\u00C0-\u017F\s]{2,}$/u;
    const hasLetterRegex = /[a-zA-ZÀ-ÿ]/;
    const cardNumberRegex = /^\d{16}$/;
    const dateRegex = /^\d{2}$/;
    const cvcRegex = /^\d{3,4}$/;
    
    switch(inputName) {
        case "name":
            if(inputValue === "") {
                input.classList.add("form__inputs--error");
                input.parentElement.parentElement.querySelector(".form__inputs-error-blank").style.display = "block";
                send = false
            } else if(inputValue.length < 2) {
                input.classList.add("form__inputs--error");
                input.parentElement.parentElement.querySelector(".form__inputs-error-min-char").style.display = "block";
                send = false
            } else if(!nameRegex.test(inputValue)) {
                input.classList.add("form__inputs--error");
                input.parentElement.parentElement.querySelector(".form__inputs-error-format").style.display = "block";
                send = false
            }
            break;

        case "card-number":
            if(inputValue === "") {
                input.classList.add("form__inputs--error");
                input.parentElement.parentElement.querySelector(".form__inputs-error-blank").style.display = "block";
                send = false
            } else if(hasLetterRegex.test(inputValue)) {
                input.classList.add("form__inputs--error");
                input.parentElement.parentElement.querySelector(".form__inputs-error-format").style.display = "block";
                send = false
            } else if(!cardNumberRegex.test(inputValue.replace(/\s/g, ""))) {
                input.classList.add("form__inputs--error");
                input.parentElement.parentElement.querySelector(".form__inputs-error-min-char").style.display = "block";
                send = false
            }
            break;

        case "exp-date-mm":
            if(inputValue === "") {
                input.classList.add("form__inputs--error");
                input.parentElement.parentElement.querySelector(".form__inputs-error-blank").style.display = "block";
                send = false
            } else if(hasLetterRegex.test(inputValue)) {
                input.classList.add("form__inputs--error");
                input.parentElement.parentElement.querySelector(".form__inputs-error-format").style.display = "block";
                send = false
            } else if(!dateRegex.test(inputValue)) {
                input.classList.add("form__inputs--error");
                input.parentElement.parentElement.querySelector(".form__inputs-error-min-char").style.display = "block";
                send = false
            }
            break;

        case "exp-date-yy":
            let inputDateMmValue = document.querySelector("[name='exp-date-mm']").value;

            if(dateRegex.test(inputDateMmValue)) {
                if(inputValue === "") {
                    input.classList.add("form__inputs--error");
                    input.parentElement.parentElement.previousElementSibling.querySelector(".form__inputs-error-blank").style.display = "block";
                    send = false
                } else if(hasLetterRegex.test(inputValue)) {
                    input.classList.add("form__inputs--error");
                    input.parentElement.parentElement.previousElementSibling.querySelector(".form__inputs-error-format").style.display = "block";
                    send = false
                } else if(!dateRegex.test(inputValue)) {
                    input.classList.add("form__inputs--error");
                    input.parentElement.parentElement.previousElementSibling.querySelector(".form__inputs-error-min-char").style.display = "block";
                    send = false
                }
            }
            break;

        case "cvc":
            if(inputValue === "") {
                input.classList.add("form__inputs--error");
                input.parentElement.parentElement.querySelector(".form__inputs-error-blank").style.display = "block";
                send = false
            } else if(hasLetterRegex.test(inputValue)) {
                input.classList.add("form__inputs--error");
                input.parentElement.parentElement.querySelector(".form__inputs-error-format").style.display = "block";
                send = false
            } else if(!cvcRegex.test(inputValue)) {
                input.classList.add("form__inputs--error");
                input.parentElement.parentElement.querySelector(".form__inputs-error-min-char").style.display = "block";
                send = false
            }
            break;
    }
}