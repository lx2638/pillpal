const form = document.getElementById("medForm");
const medList = document.getElementById("medList");
let meds = [];

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("medName").value.trim();
  const dosage = document.getElementById("dosage").value.trim();
  const time = document.getElementById("medTime").value;

  if (name && dosage && time) {
    const medItem = {
      name,
      dosage,
      time,
      taken: false
    };
    meds.push(medItem);
    addToList(medItem);
    scheduleAlert(medItem);
    form.reset();
  }
});

function addToList(med) {
  const li = document.createElement("li");
  li.innerHTML = `<strong>${med.name}</strong> — ${med.dosage} at <em>${med.time}</em>`;

  li.setAttribute("data-time", med.time);

  medList.appendChild(li);
  med.liElement = li; // save reference for updates
}

function scheduleAlert(med) {
  const now = new Date();
  const [hour, minute] = med.time.split(":").map(Number);
  const medTime = new Date();

  medTime.setHours(hour);
  medTime.setMinutes(minute);
  medTime.setSeconds(0);

  const timeUntil = medTime - now;

  if (timeUntil > 0) {
    setTimeout(() => {
      notifyUser(med);
    }, timeUntil);
  } else {
    // If it's already past, trigger immediately
    notifyUser(med);
  }
}

function notifyUser(med) {
  // Visual alert
  if (!med.taken && med.liElement) {
    med.liElement.classList.add("alert");
    med.liElement.innerHTML += " — ⚠️ Missed or not taken!";
  }

  // Browser notification
  if ("Notification" in window) {
    if (Notification.permission === "granted") {
      new Notification("Medication Alert", {
        body: `Time to take ${med.name} (${med.dosage})`,
      });
    } else if (Notification.permission !== "denied") {
      Notification.requestPermission().then(permission => {
        if (permission === "granted") {
          new Notification("Medication Alert", {
            body: `Time to take ${med.name} (${med.dosage})`,
          });
        }
      });
    }
  }
}
