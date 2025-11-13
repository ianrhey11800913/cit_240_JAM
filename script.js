// Load students on page load
document.addEventListener("DOMContentLoaded", loadStudents);

let editId = null; // store ID of student being edited

function addStudent() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;

  if (!name || !email) {
    alert("Please fill all fields.");
    return;
  }

  const student = { id: Date.now(), name, email };

  let list = JSON.parse(localStorage.getItem("students")) || [];
  list.push(student);

  localStorage.setItem("students", JSON.stringify(list));
  loadStudents();

  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
}

function loadStudents() {
  let list = JSON.parse(localStorage.getItem("students")) || [];

  const table = document.getElementById("studentTable");
  table.innerHTML = `
    <tr>
      <th>Name</th>
      <th>Email</th>
      <th>Actions</th>
    </tr>
  `;

  list.forEach(s => {
    table.innerHTML += `
      <tr>
        <td>${s.name}</td>
        <td>${s.email}</td>
        <td>
          <span class="action-btn action-edit" onclick="openEditModal(${s.id})">Edit</span>
          <span class="action-btn action-delete" onclick="deleteStudent(${s.id})">Delete</span>
        </td>
      </tr>
    `;
  });
}

/* -------------------------
   MODAL OPEN / CLOSE LOGIC
--------------------------*/

function openEditModal(id) {
  let list = JSON.parse(localStorage.getItem("students"));
  const s = list.find(st => st.id === id);

  editId = id;

  document.getElementById("editName").value = s.name;
  document.getElementById("editEmail").value = s.email;

  document.getElementById("editModal").style.display = "flex";
}

function closeModal() {
  document.getElementById("editModal").style.display = "none";
}

/* -------------------------
   SAVE EDITED STUDENT
--------------------------*/

function saveEdit() {
  const newName = document.getElementById("editName").value;
  const newEmail = document.getElementById("editEmail").value;

  let list = JSON.parse(localStorage.getItem("students"));
  const s = list.find(st => st.id === editId);

  s.name = newName;
  s.email = newEmail;

  localStorage.setItem("students", JSON.stringify(list));

  closeModal();
  loadStudents();
}

/* -------------------------
   DELETE STUDENT
--------------------------*/

function deleteStudent(id) {
  let list = JSON.parse(localStorage.getItem("students"));

  list = list.filter(s => s.id !== id);

  localStorage.setItem("students", JSON.stringify(list));
  loadStudents();
}
