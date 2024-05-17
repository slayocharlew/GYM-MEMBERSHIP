// Function to fetch data from silver.json
function fetchSilverData() {
    return fetch('silver.json')
      .then(response => response.json());
  }
  
  // Function to display Silver package information
  function displaySilverInfo() {
    fetchSilverData()
      .then(data => {
        const packageInfoElement = document.getElementById('package-info');
        packageInfoElement.innerHTML = `
          <div class="package-details">
            <p class="description"><strong>Description:</strong> ${data.description}</p>
            <p class="price"><strong>Price:</strong> $50/month</p>
            <p class="expiration"><strong>Expiration:</strong> ${data.expirationDate}</p>
          </div>
        `;
      })
      .catch(error => console.error('Error fetching Silver package data:', error));
  }
  
  // Call function to display Silver package information when the page loads
  displaySilverInfo();
  
