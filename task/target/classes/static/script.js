const list = document.getElementById('task-list');
let editButton = document.querySelector('.btn.btn-secondary');
let inputName = document.getElementById('name');
let inputType = document.getElementById('type');
let ids = [];

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
function pickItem(id){
    ids.push(id);
    if(ids.length === 1){
    alert('Selecione mais um item para trocar de posição.');
    }
    if(ids.length === 2){
        const id1 = ids[0];
        const id2 = ids[1];
        if(id1 === id2){
            alert('Selecione dois itens diferentes para trocar de posição.');
            ids = [];
            return;
        }
        releaseTask(id1,id2);
        ids = [];
    }
        
};

function releaseTask(id, id2){
    fetch('/tasks/' + id + '/position/' + id2, {method: 'PUT'})
    .then(res => {
        if(res.ok){
            window.location.reload();
        }
    })
};
