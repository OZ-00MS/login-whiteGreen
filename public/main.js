const loginForm = document.getElementById("loginForm");

// Example users (temporary front-end login)
const users = [
    { username: "admin", password: "1234" },
    { username: "user", password: "abcd" }
];

// Create a message element under the form
let loginMessage = document.createElement("p");
loginMessage.style.color = "red";
loginMessage.style.marginTop = "10px";
loginForm.appendChild(loginMessage);

loginForm.addEventListener("submit", function(e) {
    e.preventDefault(); // prevent form from reloading

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const user = users.find(u => u.username === username && u.password === password);

    if(user) {
        loginMessage.style.color = "green";
        loginMessage.textContent = "Login successful! Redirecting...";
        setTimeout(() => {
            window.location.href = "home.html"; // redirect to your home page
        }, 1000);
    } else {
        loginMessage.style.color = "red";
        loginMessage.textContent = "Invalid username or password!";
    }
});