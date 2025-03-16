import { apiRequest } from "./api.js";

document.getElementById("signupForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const phone = document.getElementById("phone").value;

    console.log(name);
    console.log(email);
    console.log(password);
    console.log(phone);

    const response = await apiRequest("https://code-storm-backend.vercel.app/auth/patient/signup", "POST", { name, email, password, phone });
    
    if (response.status === 201) {
        alert("Signup Successful! Please Login.");
        window.location.href = "login.html";
    } else {
        alert("Signup Failed: " + response.message);
    }
});