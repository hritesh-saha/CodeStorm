document.addEventListener('DOMContentLoaded', () => {
    const searchForm = document.getElementById('search-form');
    const searchInput = document.getElementById('search-input');
    const filterButton = document.getElementById('filter-button');
    const pincodeInput = document.getElementById('pincode');
    const hospitalList = document.querySelector('.hospital-list');

    const API_URL = "https://code-storm-backend.vercel.app/vacancy/get-vacancy";

    async function fetchHospitals(searchQuery = searchInput.value || '', pincodeQuery = '') {
        let url = new URL(API_URL);

        // if (searchQuery) url.searchParams.append('search', searchQuery);
        // if (pincodeQuery) url.searchParams.append('pincode', pincodeQuery);

        try {
            hospitalList.innerHTML = '<p>Loading hospitals...</p>';
            const response = await fetch(url);
            
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

            const data = await response.json();
            // console.log("📩 Fetched Data:", data);

            renderHospitalList(data.vacancies);
            
        } catch (error) {
            console.error('🚨 Error fetching hospitals:', error);
            hospitalList.innerHTML = '<p>Error loading hospitals. Please try again later.</p>';
        }
    }

    function renderHospitalList(hospitals) {
        hospitalList.innerHTML = '';

        if (!hospitals.length) {
            hospitalList.innerHTML = '<p>No hospitals found.</p>';
            return;
        }

        for (let i = 0; i < hospitals.length; i++) {
            const hospital = hospitals[i];
            // console.log(`🏥 Rendering Hospital ${i + 1}:`, hospital);

            const hospitalCard = document.createElement('div');
            hospitalCard.classList.add('hospital-card');


            hospitalCard.innerHTML = `
                <h6>${hospital.hospitalName || 'Unknown Hospital'}</h6>
                <p>Address: ${hospital.address || 'No address provided'}</p>
                <p>Contact: ${hospital.contactNumber || 'No contact number found'}</p>
                <p>Available Beds: ${hospital.availableBeds || 'No beds found'}</p>
                <p>Available ICU Beds: ${hospital.availableICUBeds || 'No ICU beds found'}</p>
                <p>Availability of Oxygen Supply: 
                ${(hospital.oxygenSupplyAvailable ? "Yes" : "No")}</p>
                `
            hospitalList.appendChild(hospitalCard);
        }
    }

    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        fetchHospitals(searchInput.value.trim(), pincodeInput.value.trim());
    });

    // Pincode Filter Event Listener
    filterButton.addEventListener('click', () => {
        fetchHospitals(searchInput.value.trim(), pincodeInput.value.trim());
    });

    fetchHospitals();
});
