const meds = [];

document.getElementById('medForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const inputs = e.target.querySelectorAll('input');
  const med = {
    name: inputs[0].value,
    dosage: inputs[1].value,
    time: inputs[2].value,
    taken: false
  };
  meds.push(med);
  renderList();
});

function renderList() {
  const ul = document.getElementById('medList');
  ul.innerHTML = '';
  meds.forEach((med, index) => {
    const li = document.createElement('li');
    li.innerHTML = `${med.name} - ${med.dosage} at ${med.time} 
      <button onclick="markTaken(${index})">${med.taken ? 'Taken' : 'Mark as taken'}</button>`;
    ul.appendChild(li);
  });
}

function markTaken(index) {
  meds[index].taken = true;
  renderList();
}

// Wait for the DOM to be fully loaded before executing the script
document.addEventListener('DOMContentLoaded', function() {
    // Get references to the form and medication list
    const medForm = document.getElementById('medForm');
    const medList = document.getElementById('medList');
    
    // Add event listener for form submission
    medForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Prevent the default form submission
        
        // Get the input values
        const medName = document.getElementById('medName').value;
        const medDosage = document.getElementById('medDosage').value;
        const medTime = document.getElementById('medTime').value;
        
        // Validate that all fields are filled
        if (!medName || !medDosage || !medTime) {
            alert('Please fill in all fields');
            return;
        }
        
        // Create a new medication item
        addMedication(medName, medDosage, medTime);
        
        // Reset the form
        medForm.reset();
    });
    
    // Function to add a new medication to the list
    function addMedication(name, dosage, time) {
        // Create a new list item
        const li = document.createElement('li');
        
        // Format the time (convert 24h to 12h format)
        const formattedTime = formatTime(time);
        
        // Set the content of the list item
        li.innerHTML = `
            <span class="med-name">${name}</span>
            <span class="med-dosage">${dosage}</span>
            <span class="med-time">${formattedTime}</span>
            <button class="delete-btn">×</button>
        `;
        
        // Add event listener to the delete button
        li.querySelector('.delete-btn').addEventListener('click', function() {
            li.remove();
        });
        
        // Add the new item to the list
        medList.appendChild(li);
    }
    
    // Helper function to format time (24h to 12h)
    function formatTime(timeString) {
        const [hours, minutes] = timeString.split(':');
        const period = hours >= 12 ? 'PM' : 'AM';
        const hours12 = hours % 12 || 12;
        return `${hours12}:${minutes} ${period}`;
    }
});

