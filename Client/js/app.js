let itemsArray;
const loadTask = async () => {
    const url = `http://localhost:5500/task`;
    const res = await fetch(url);
    const data = await res.json();
    console.log(data);
    displayTask(data);
    itemsArray = data;
}

const displayTask = itemsArray => {
    console.log(itemsArray);
    // const dislayController = document.getElementsByClassName('.to-do-list');
    // data.forEach(task => {
    //     console.log(task);
    //     const altask = document.createElement('div');
    //     altask.classList.add('col');
    //     altask.innerHTML = `<h1>${task.Task_name}</h1>`;
    // })


    let items = ""
    for (let i = 0; i < itemsArray.length; i++) {
        items += `<div class="item">
                <div class="input-controller">
                  <textarea disabled>${itemsArray[i].Task_name}</textarea>
                  <div class="edit-controller">
                    <i class="fa-solid fa-trash deleteBtn"></i>
                    <i class="fa-solid fa-pen-to-square editBtn"></i>
                  </div>
                </div>
                <div class="update-controller">
                  <button class="saveBtn">Save</button>
                  <button class="cancelBtn">Cancel</button>
                </div>
              </div>`
    }
    document.querySelector(".to-do-list").innerHTML = items
    activateDeleteListeners()
    activateEditListeners()
    activateSaveListeners()
    activateCancelListeners()
}

function activateDeleteListeners() {
    let deleteBtn = document.querySelectorAll(".deleteBtn")
    deleteBtn.forEach((dB, i) => {
        // console.log(i);
        dB.addEventListener("click", () => { deleteItem(i) })
    })
}
//Delete Function Added
function deleteItem(i) {
    // console.log(itemsArray[i].task_id);
    fetch(`http://localhost:5500/task/${itemsArray[i].task_id}`, {
        method: 'DELETE'
    })

        .then(response => {
            if (!response.ok) {
                throw new Error('User could not be deleted.');
            }
            console.log('User deleted successfully.');
        })
        .catch(error => {
            console.error('Error deleting user:', error);
        });

    itemsArray.splice(i, 1);

}

function activateEditListeners() {
    const editBtn = document.querySelectorAll(".editBtn")
    const updateController = document.querySelectorAll(".update-controller")
    const inputs = document.querySelectorAll(".input-controller textarea")
    editBtn.forEach((eB, i) => {
        eB.addEventListener("click", () => {
            updateController[i].style.display = "block"
            inputs[i].disabled = false
        })
    })
}

function activateSaveListeners() {
    const saveBtn = document.querySelectorAll(".saveBtn")
    const updateController = document.querySelectorAll(".update-controller")
    const inputs = document.querySelectorAll(".input-controller textarea")
    saveBtn.forEach((sB, i) => {
        sB.addEventListener("click", () => {
            // updateItem(inputs[i].value, i);
            updateController[i].style.display = "none";
            inputs[i].disabled = true;
            // console.log(inputs[i].value);

            const updatedTaskData = {
                task_name: `${inputs[i].value}`,
                task_status: "No"
            };
            console.log(JSON.stringify(updatedTaskData));

            fetch(`http://localhost:5500/edit/${itemsArray[i].task_id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedTaskData),
            })
                .then(response => response.json())
                .then(data => {
                    console.log('User updated successfully:', data);
                })
                .catch(error => {
                    console.error('Error updating user:', error);
                });
        })
    })
}

function activateCancelListeners() {
    const cancelBtn = document.querySelectorAll(".cancelBtn")
    const updateController = document.querySelectorAll(".update-controller")
    const inputs = document.querySelectorAll(".input-controller textarea")
    cancelBtn.forEach((cB, i) => {
        cB.addEventListener("click", () => {
            updateController[i].style.display = "none";
            inputs[i].disabled = true;
            inputs[i].style.border = "none";
        })
    })
}


function createItem(item) {
    itemsArray.push(item.value)
}



function updateItem(text, i) {
    itemsArray[i] = text
}




loadTask();