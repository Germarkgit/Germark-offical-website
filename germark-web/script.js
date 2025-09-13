// 🗂️ Citizen Registry
const citizens = {
  "001": "Mouhammad",
  "002": "Björn",
  "003": "Ludvig c",
  "004": "André",
  "005": "Lucas",
  "006": "Abdul",
  "007": "Johan",
  "008": "Astrid",
  "009": "Sander",
  "010": "Frederik"
};

let currentUser = null;

// 🔐 Login
function login() {
  const chipId = document.getElementById("chip-id").value.trim();
  const name = document.getElementById("name").value.trim();

  if (citizens[chipId] && citizens[chipId].toLowerCase() === name.toLowerCase()) {
    currentUser = citizens[chipId];
    document.getElementById("login-screen").style.display = "none";
    document.getElementById("home-screen").style.display = "block";
    document.getElementById("profile-name").textContent = currentUser;
    loadProfileImage();
    loadApartment();
    showTab("about");
  } else {
    alert("Invalid Chip ID or Name. Access denied.");
  }
}

// 🧭 Tab Switching
function showTab(tabId) {
  document.querySelectorAll(".tab-content").forEach(tab => {
    tab.classList.remove("active");
    tab.style.display = "none";
  });
  const activeTab = document.getElementById(tabId);
  activeTab.style.display = "block";
  activeTab.classList.add("active");
}

// 🛂 Passport Unlock
function unlockPassport() {
  const password = document.getElementById("passport-password").value;
  if (password === "GermarkPass") {
    document.getElementById("passport-content").style.display = "block";
  } else {
    alert("Incorrect passport password.");
  }
}

// 🛡️ Admin Unlock
function unlockAdmin() {
  const password = document.getElementById("admin-password").value;
  if (password === "Germark2025") {
    document.getElementById("admin-panel").style.display = "block";
    updateCitizenCount();
  } else {
    alert("Incorrect admin password.");
  }
}

// 🧑 Add Citizen
function addCitizen() {
  const name = document.getElementById("new-citizen").value.trim();
  if (name) {
    const li = document.createElement("li");
    li.textContent = name;
    document.getElementById("citizen-list").appendChild(li);
    document.getElementById("new-citizen").value = "";
    updateCitizenCount();
  }
}

// 🧹 Remove Citizen
function removeCitizen(name) {
  const list = document.getElementById("citizen-list");
  [...list.children].forEach(li => {
    if (li.textContent === name) list.removeChild(li);
  });
  updateCitizenCount();
}

// 📊 Update Citizen Count
function updateCitizenCount() {
  const list = document.getElementById("citizen-list");
  const count = list.children.length;
  document.getElementById("citizen-count").textContent = `Total Citizens: ${count}`;
}

// 📰 Add News
function addNews() {
  const newsText = document.getElementById("news-entry").value.trim();
  if (newsText) {
    const article = document.createElement("article");
    article.innerHTML = `<h5>Update</h5><p>${newsText}</p>`;
    document.querySelector("#news .news-articles").appendChild(article);
    document.getElementById("news-entry").value = "";
  }
}

// 🗑️ Remove Last News
function removeLastNews() {
  const articles = document.querySelectorAll("#news .news-articles article");
  if (articles.length > 0) {
    articles[articles.length - 1].remove();
  }
}

// 🏠 Assign Apartment
function assignApartment(name, apartment) {
  if (name && apartment) {
    localStorage.setItem(`apartment_${name}`, apartment);
    alert(`Apartment assigned to ${name}`);
  }
}

// 🏢 Load Apartment
function loadApartment() {
  const apt = localStorage.getItem(`apartment_${currentUser}`);
  const info = apt ? `Apartment: ${apt}` : "No apartment assigned.";
  document.getElementById("apartment-info").textContent = info;
}

// 🖼️ Save Profile Image
function saveProfileImage() {
  const fileInput = document.getElementById("profile-image");
  const file = fileInput.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function () {
      localStorage.setItem(`profileImage_${currentUser}`, reader.result);
      loadProfileImage();
    };
    reader.readAsDataURL(file);
  }
}

// 🖼️ Load Profile Image
function loadProfileImage() {
  const savedImage = localStorage.getItem(`profileImage_${currentUser}`);
  if (savedImage) {
    document.getElementById("saved-image").src = savedImage;
  }
}