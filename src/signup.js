const signup = (() => {
    const container = document.createElement("div"),
          title = document.createElement("h1"),
          email = document.createElement("input"),
          password = document.createElement("input"),
          loginButton = document.createElement("button"),
          googleButton = document.createElement("button"),
          signUp = document.createElement("p");

    container.classList.add("login");
    title.innerText = "Sign Up";
    email.placeholder = "Email";
    password.placeholder = "Password";
    loginButton.innerText = "Sign Up";
    loginButton.classList.add("click");
    googleButton.innerText = "Sign up with Google";
    googleButton.classList.add("click");
    signUp.innerText = "Regular user? Log in here";
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

export default signup;