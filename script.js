document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("portfolioContactForm");
    const emailInput = document.getElementById("userEmail");
    const nameInput = document.getElementById("userName");
    const messageInput = document.getElementById("userMessage"); // ✅ CLEAN VERSION

    const errorMsg = document.getElementById("error-message");
    const successMsg = document.getElementById("success-message");

    const nameError = document.getElementById("nameError");
    const emailError = document.getElementById("emailError");

    const alertBox = document.getElementById("alert-box");

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        let isValid = true;

        // Name validation
        if (nameInput.value.trim() === "") {
            nameError.style.display = "block";
            isValid = false;
        } else {
            nameError.style.display = "none";
        }

        // Email validation
        if (emailInput.value.trim() === "" || !emailInput.value.includes("@")) {
            emailError.style.display = "block";
            errorMsg.textContent = "Please enter a valid email.";
            errorMsg.style.display = "block";
            successMsg.style.display = "none";
            isValid = false;
        } else {
            emailError.style.display = "none";
            errorMsg.style.display = "none";
        }

        // Message validation (optional but professional)
        if (messageInput.value.trim() === "") {
            errorMsg.textContent = "Message cannot be empty.";
            errorMsg.style.display = "block";
            isValid = false;
        }

        // ✅ SEND DATA TO BACKEND
        if (isValid) {

            fetch('http://localhost:3000/api', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: nameInput.value,
                    email: emailInput.value,
                    message: messageInput.value   // ✅ INCLUDED
                })
            })
            .then(res => res.json())
            .then(data => console.log("Server Response:", data))
            .catch(err => console.log(err));

            successMsg.textContent = "Form submitted successfully!";
            successMsg.style.display = "block";
            alertBox.style.display = "block";

            form.reset();

            setTimeout(() => {
                successMsg.style.display = "none";
                alertBox.style.display = "none";
            }, 3000);
        }
    });
});