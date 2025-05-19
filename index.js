// script.js
const medForm = document.getElementById("medForm");
const medList = document.getElementById("medList");
const meds = [];

medForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("medName").value;
  const dosage = document.getElementById("medDosage").value;
  const time = document.getElementById("medTime").value;

  const med = { name, dosage, time, taken: false };
  meds.push(med);
  renderList();
  scheduleNotification(med);

  medForm.reset();
});

function renderList() {
  medList.innerHTML = "";
  const now = new Date();
  meds.forEach(med => {
    const li = document.createElement("li");
    li.className = "medItem";

    const currentTime = new Date();
    const medTime = new Date();
    const [hours, minutes] = med.time.split(":");
    medTime.setHours(hours, minutes, 0, 0);

    if (!med.taken && currentTime > medTime) {
      li.classList.add("alert");
    }

    li.textContent = `${med.name} - ${med.dosage} at ${med.time}`;
    medList.appendChild(li);
  });
}

function scheduleNotification(med) {
  const now = new Date();
  const medTime = new Date();
  const [hours, minutes] = med.time.split(":");
  medTime.setHours(hours, minutes, 0, 0);

  const delay = medTime.getTime() - now.getTime();
  if (delay > 0) {
    setTimeout(() => {
      alert(`Time to take your medicine: ${med.name} (${med.dosage})`);
      med.taken = true;
      renderList();
    }, delay);
  }
}


