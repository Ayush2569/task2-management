const API = "http://localhost:5000/api";


// ================= REGISTER =================
async function register() {

  const username =
    document.getElementById(
      "username"
    ).value;

  const email =
    document.getElementById(
      "email"
    ).value;

  const password =
    document.getElementById(
      "password"
    ).value;

  if (
    !username ||
    !email ||
    !password
  ) {

    alert(
      "Please fill all fields"
    );

    return;
  }

  const response = await fetch(
    `${API}/auth/register`,
    {

      method: "POST",

      headers: {
        "Content-Type":
          "application/json",
      },

      body: JSON.stringify({
        username,
        email,
        password,
      }),
    }
  );

  const data =
    await response.json();

  alert(data.message);

  window.location.href =
    "./index.html";
}


// ================= LOGIN =================
async function login() {

  const email =
    document.getElementById(
      "email"
    ).value;

  const password =
    document.getElementById(
      "password"
    ).value;

  if (!email || !password) {

    alert(
      "Please fill all fields"
    );

    return;
  }

  const response = await fetch(
    `${API}/auth/login`,
    {

      method: "POST",

      headers: {
        "Content-Type":
          "application/json",
      },

      body: JSON.stringify({
        email,
        password,
      }),
    }
  );

  const data =
    await response.json();

  if (data.token) {

    localStorage.setItem(
      "token",
      data.token
    );

    localStorage.setItem(
      "username",
      data.username
    );

    localStorage.setItem(
      "email",
      email
    );

    window.location.href =
      "./dashboard.html";

  } else {

    alert(data.message);
  }
}


// ================= LOGOUT =================
function logout() {

  localStorage.removeItem(
    "token"
  );

  localStorage.removeItem(
    "username"
  );

  localStorage.removeItem(
    "email"
  );

  window.location.href =
    "./index.html";
}


// ================= SHOW USER =================
function showUser(){

  const username =
    localStorage.getItem(
      "username"
    );

  const email =
    localStorage.getItem(
      "email"
    );

  const welcomeUser =
    document.getElementById(
      "welcomeUser"
    );

  const profileUsername =
    document.getElementById(
      "profileUsername"
    );

  const profileEmail =
    document.getElementById(
      "profileEmail"
    );

  if(welcomeUser){

    welcomeUser.innerHTML =
      `👤 ${username}`;
  }

  if(profileUsername){

    profileUsername.innerHTML =
      username;
  }

  if(profileEmail){

    profileEmail.innerHTML =
      email;
  }
}


// ================= TOGGLE PROFILE =================
function toggleProfile(){

  const profileBox =
    document.getElementById(
      "profileBox"
    );

  if(
    profileBox.style.display
    === "block"
  ){

    profileBox.style.display =
      "none";

  }else{

    profileBox.style.display =
      "block";
  }
}


// ================= LOAD TASKS =================
async function loadTasks() {

  const taskList =
    document.getElementById(
      "taskList"
    );

  if (!taskList) return;

  const response =
    await fetch(
      `${API}/tasks`
    );

  const tasks =
    await response.json();

  taskList.innerHTML = "";

  tasks.forEach((task) => {

    taskList.innerHTML += `

      <div class="task-card">

        <h3 class="${
          task.completed
            ? "completed"
            : ""
        }">

          ${task.title}

        </h3>

        <p>
          ${task.description}
        </p>

        <p>
          Priority:
          <b>
            ${task.priority}
          </b>
        </p>

        <p>
          Status:
          <b>
            ${
              task.completed
                ? "Completed"
                : "Pending"
            }
          </b>
        </p>

        <button onclick="
          toggleTask(
            '${task._id}',
            ${task.completed}
          )
        ">

          Mark ${
            task.completed
              ? "Pending"
              : "Completed"
          }

        </button>

        <button onclick="
          deleteTask(
            '${task._id}'
          )
        ">

          Delete

        </button>

      </div>
    `;
  });
}


// ================= ADD TASK =================
async function addTask() {

  const title =
    document.getElementById(
      "title"
    ).value;

  const description =
    document.getElementById(
      "description"
    ).value;

  const priority =
    document.getElementById(
      "priority"
    ).value;

  if (!title) {

    alert(
      "Please enter title"
    );

    return;
  }

  await fetch(
    `${API}/tasks`,
    {

      method: "POST",

      headers: {
        "Content-Type":
          "application/json",
      },

      body: JSON.stringify({
        title,
        description,
        priority,
      }),
    }
  );

  document.getElementById(
    "title"
  ).value = "";

  document.getElementById(
    "description"
  ).value = "";

  loadTasks();
}


// ================= TOGGLE TASK =================
async function toggleTask(
  id,
  currentStatus
) {

  await fetch(
    `${API}/tasks/${id}`,
    {

      method: "PUT",

      headers: {
        "Content-Type":
          "application/json",
      },

      body: JSON.stringify({
        completed:
          !currentStatus,
      }),
    }
  );

  loadTasks();
}


// ================= DELETE TASK =================
async function deleteTask(id) {

  await fetch(
    `${API}/tasks/${id}`,
    {
      method: "DELETE",
    }
  );

  loadTasks();
}


// ================= AUTO LOAD =================
showUser();

loadTasks();