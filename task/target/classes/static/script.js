const list = document.getElementById('task-list');
let editButton = document.querySelector('.btn.btn-secondary');
let inputName = document.getElementById('name');
let inputType = document.getElementById('type');

function deleteTask(id){
    fetch('/tasks/' + id, {method: 'DELETE'})
    .then(res => {
        if(res.ok){
            const element = document.getElementById('task-' + id);
            element.remove();
        }
    });
};

function editTask(id, oldName, oldType){      
    if(oldName === inputName.value && oldType === inputType.value){
        alert('Nenhuma alteração foi feita.')
        window.location.reload();        
        return;
    }
    const newData = {
        name: inputName.value,
        type: inputType.value
    }
    fetch('/taskEdit/'+ id, {method: "PUT", headers: {'Content-Type': 'application/json'}, body: JSON.stringify(newData) })
    .then(res => { 
        if (res.ok){
        window.location.reload();
    }
    });

};

function newLayoutEdit(id){
        list.style.display = 'none';
        
        const element = document.getElementById('task-' + id);
        const taskContent = element.querySelectorAll('span');
        const taskName = taskContent[0].textContent;
        const taskType = taskContent[1].textContent;
        
        inputName.value = taskName;
        inputType.value = taskType;
        
        editButton.type = 'button';
        editButton.innerHTML = 'Editar Tarefa';

        editButton.onclick = function() {
        editTask(id, taskName,taskType);
        }
};