document.addEventListener("DOMContentLoaded", () => {
    const signUpButton = document.getElementById("signUpButton"); // or document.querySelector(".signUpButton") if using a class
    const username = document.getElementById("username"); // Make sure the correct element ID is used
    const fullName = document.getElementById("fullName");
    const password = document.getElementById("password");
    const output = document.getElementById("output"); // Make sure the correct element ID is used for output display

    console.log(signUpButton)
    signUpButton.addEventListener("click", async () => {
        const result = await signUp(
            username.value,
            fullName.value,
            password.value
        );
        if ("Conflict" === result) {
            output.innerText = "Username already taken.";
            return;
        }
        window.location.href = "login.html";
    });
});
