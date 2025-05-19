const meds = [];

// LOAD MEDICATIONS WHEN THE PAGE LOADS
window.addEventListener('load', loadMeds);

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
  saveMeds();        // SAVE TO LOCAL STORAGE after adding
  renderList();
});

function renderList() {
  const ul = document.getElementById('medList');
  ul.innerHTML = '';

  // Sort medications by time
  meds.sort((a, b) => a.time.localeCompare(b.time));

  // Cute title
  const title = document.createElement('h3');
  title.innerText = "Daily Medication Schedule";
  ul.appendChild(title);

  const now = new Date();

  meds.forEach((med, index) => {
    const medTime = new Date();
    const [hours, minutes] = med.time.split(':');
    medTime.setHours(hours, minutes, 0);

    const isOverdue = now > medTime && !med.taken;
    const overdueText = isOverdue ? ' Overdue!' : '';

    const li = document.createElement('li');
    li.innerHTML = `
       <strong>${med.time}</strong> — 
      <span style="color: purple;">${med.name}</span> (${med.dosage}) 
      ${overdueText}
      <button onclick="markTaken(${index})" style="margin-left: 10px;">
        ${med.taken ? 'Taken' : 'Mark as taken'}
      </button>
    `;
    ul.appendChild(li);
  });
}

function markTaken(index) {
  meds[index].taken = true;
  saveMeds();        // SAVE TO LOCAL STORAGE after updating
  renderList();
}

// AVE to browser localStorage
function saveMeds() {
  localStorage.setItem('meds', JSON.stringify(meds));
}

// LOAD from localStorage
function loadMeds() {
  const data = localStorage.getItem('meds');
  if (data) {
    meds.push(...JSON.parse(data));
    renderList();
  }
}


