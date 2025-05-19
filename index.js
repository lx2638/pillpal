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

