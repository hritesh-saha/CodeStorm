import { apiRequest } from "./api.js";

// Fetch hospital vacancies
const fetchVacancies = async () => {
  const vacancies = await apiRequest("/vacancy/get-vacancy");
  console.log(vacancies);
};

// Add a new vacancy
document.getElementById("addVacancyForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const hospitalName = document.getElementById("hospitalName").value;
  const availableBeds = document.getElementById("availableBeds").value;

  const response = await apiRequest("/vacancy/add-vacancy", "POST", {
    hospitalName,
    availableBeds,
  });

  if (response.error) {
    alert("Failed to add vacancy: " + response.error);
  } else {
    alert("Vacancy Added!");
    fetchVacancies();
  }
});

// Load vacancies on page load
window.onload = fetchVacancies;