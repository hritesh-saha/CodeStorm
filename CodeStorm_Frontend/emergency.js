import { apiRequest } from "./api.js";

// Fetch all emergency requests
const fetchEmergencies = async () => {
  const emergencies = await apiRequest("/emergency/get-requests");
  console.log(emergencies);
};

// Create a new emergency request
document.getElementById("emergencyForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const patientName = document.getElementById("patientName").value;
  const location = document.getElementById("location").value;
  const emergencyType = document.getElementById("emergencyType").value;

  const response = await apiRequest("/emergency/create-request", "POST", {
    patientName,
    location,
    emergencyType,
  });

  if (response.error) {
    alert("Emergency Request Failed: " + response.error);
  } else {
    alert("Emergency Request Created!");
    fetchEmergencies(); // Refresh the list
  }
});

// Load emergencies on page load
window.onload = fetchEmergencies;