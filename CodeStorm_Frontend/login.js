document.addEventListener("DOMContentLoaded", () => {
  console.log("✅ DOM Fully Loaded!");

  const form = document.getElementById("loginForm");
  if (!form) {
      console.error("❌ loginForm NOT FOUND in index.html");
      return;
  }

  console.log("📝 Login Form Found! Adding Event Listener");

  form.addEventListener("submit", async (e) => {
      e.preventDefault();
      console.log("🚀 Login Form Submitted");

      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      try {
          const response = await fetch("https://code-storm-backend.vercel.app/auth/patient/login", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ email, password })
          });

          const data = await response.json();
          console.log("🔍 API Response:", data); // Debugging

          if (data && data.user) {
              localStorage.setItem("user", JSON.stringify(data.user));  // Store user data
              console.log("✅ User stored in localStorage:", localStorage.getItem("user"));
              alert("✅ Login Successful!");
              window.location.href = "dashboard.html";  
          } else {
              alert("❌ Login Failed: " + (data.message || "Unknown error"));
          }
      } catch (error) {
          console.error("⚠️ Login Error:", error);
          alert("An error occurred. Check the console.");
      }
  });
});