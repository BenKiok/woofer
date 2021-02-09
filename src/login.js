const login = (() => {
    const container = document.createElement("div"),
          title = document.createElement("h1"),
          email = document.createElement("input"),
          password = document.createElement("input"),
          loginButton = document.createElement("button"),
          googleButton = document.createElement("button"),
          signUp = document.createElement("p");

    container.classList.add("login");
    title.innerText = "Welcome to Woofer!";
    email.placeholder = "Email";
    password.placeholder = "Password";
    loginButton.innerText = "Login";
    loginButton.classList.add("click");
    googleButton.innerText = "Sign in with Google";
    googleButton.classList.add("click");
    signUp.innerText = "First time? Create an account here";
    signUp.classList.add("click");

    container.append(
        title,
        email,
        password,
        loginButton,
        googleButton,
        signUp
    );

    return container;
})();

export default login;