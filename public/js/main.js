const authToken = localStorage.getItem('authToken');

// LOGOUT ACTION
const logout = document.querySelector('.logout');

logout.addEventListener('click', (e) => {
    localStorage.removeItem('authToken');
    window.location.replace('/login');

    const logoutUser = async ()=> {
        try {
            const response = await fetch('http://localhost:5000/api/auth/logout', {
                method: 'GET'
            });
        } catch (error) {
            console.log(error);
        }
    }
    logoutUser();
});


// ADD A TASK IN DATABASE AND DISPLAY UPDATED TASKS IN THE APP
const todoForm = document.querySelector(".todoForm");
const taskInput = document.querySelector(".taskInput");

todoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(todoForm);
    const data = Object.fromEntries(formData);
    // console.log(JSON.stringify(data));
    // const authToken = localStorage.getItem('authToken');
    const addTask = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/tasks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'authToken': authToken
                },
                body: JSON.stringify(data)
            });
            taskInput.value = '';
            // console.log(response);
            showTasks();
        } catch (error) {
            console.log(error);
            console.log('Please login to add tasks');
        }
    }
    addTask();
});


// DELETE A TASK FROM DATABASE AND DISPLAY UPDATED TASKS IN THE APP
const deleteTask = async (id) => {
    // const authToken = localStorage.getItem('authToken');
    try {
        const response = await fetch(`http://localhost:5000/api/tasks/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'authToken': authToken
            }
        });
        showTasks();
    } catch (error) {
        console.log(error);
    }
}


// RENAME A TASK
const renameTask = async (id) => {
    // console.log(id);
    const renameBox = document.querySelector(".renameBox");
    const cancelRenameBtn = document.querySelector(".cancelRenameBtn");
    const renameInput = document.querySelector("#renameInput");
    // renameInput.value = task;
    renameBox.style.display = 'flex';
    // document.body.style.filter = "blur(2px)";
    cancelRenameBtn.addEventListener('click', (e)=>{
        e.preventDefault();
        renameBox.style.display = 'none';
    });

    // const authToken = localStorage.getItem('authToken');
    const renameForm = document.querySelector(".renameForm");
    renameForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(renameForm);
        const data = Object.fromEntries(formData);
    //     // console.log(data);

        const updateTask = async ()=>{
            try {
                const response = await fetch(`http://localhost:5000/api/tasks/${id}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        'authToken': authToken
                    },
                    body: JSON.stringify(data)
                });
                renameInput.value = "";
                renameBox.style.display = 'none';
                showTasks();
            } catch (error) {
                console.log(error);
            }
        }
        updateTask();
    });
}


// DISPLAY ALL THE TASKS IN THE APP
const showTasks = async () => {
    // const authToken = localStorage.getItem('authToken');
    if (authToken) {
        try {
            const response = await fetch('http://localhost:5000/api/tasks', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'authToken': authToken
                }
            });
            try {
                const data = await response.json();
                // console.log(data)
                let html = "";
                if (data !== null) {
                    data.map((element, idx) => {
                        html += `
                        <div class="task">
                            <span>
                                ${element.task}
                            </span>
                            <span><i class="fa-solid fa-pen-to-square" onclick=renameTask("${element._id}")></i>
                                <i class="fa-solid fa-trash-can" onclick=deleteTask("${element._id}")></i>
                            </span>
                        </div>
                        `;
                    })
                    let taskContainer = document.querySelector(".taskContainer");
                    taskContainer.innerHTML = html;
                }
                else {
                    html = "<p>No task pending. Add a new task.</p>"
                }
            } catch (error) {
                console.log(error);
            }
        } catch (error) {
            console.log(error);
        }
    }

}

showTasks();