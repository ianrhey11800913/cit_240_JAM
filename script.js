// Load students
document.addEventListener("DOMContentLoaded", loadStudents);

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
          <span class="action-btn" onclick="editStudent(${s.id})">Edit</span> |
          <span class="action-btn" onclick="deleteStudent(${s.id})">Delete</span>
        </td>
      </tr>
    `;
  });
}

function editStudent(id) {
  let list = JSON.parse(localStorage.getItem("students"));

  const s = list.find(st => st.id === id);
  const newName = prompt("New Name:", s.name);
  const newEmail = prompt("New Email:", s.email);

  s.name = newName;
  s.email = newEmail;

  localStorage.setItem("students", JSON.stringify(list));
  loadStudents();
}

function deleteStudent(id) {
  let list = JSON.parse(localStorage.getItem("students"));

  list = list.filter(s => s.id !== id);

  localStorage.setItem("students", JSON.stringify(list));
  loadStudents();
}
