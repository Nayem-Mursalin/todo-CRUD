const loginForm = document.getElementById('login-form');
console.log("Nayem");

loginForm.addEventListener("click", function (event) {

    event.preventDefault();

    const emailInput = document.getElementById('email').value;
    const passwordInput = document.getElementById('password').value;

    console.log(emailInput, passwordInput);

    // const params = new URLSearchParams();
    // params.append('email', emailInput);
    // params.append('password', passwordInput);

    // const response = await fetch(`/login?${params.toString()}`)

    // if (response.ok) {
    //     // const user = await response.json()
    //     window.location.href = "/home";
    // }
    // else {
    //     alert("Verification failed! Try again");
    // }

    loginForm.reset();

})