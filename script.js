const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');


function addTask() {
    
    const taskText = taskInput.value.trim();
    
    
    if (taskText === '') {
        alert('Please enter a valid task!');
        return;
    }
    
    
    const li = document.createElement('li');
    
    
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'task-checkbox';
    
    
    checkbox.onchange = function() {
        if (checkbox.checked) {
            taskSpan.style.textDecoration = 'line-through';
            taskSpan.style.color = '#666';
        } else {
            taskSpan.style.textDecoration = 'none';
            taskSpan.style.color = '#000';
        }
    };
    
    
    const taskSpan = document.createElement('span');
    taskSpan.textContent = taskText;

    const editBtn = document.createElement('button');
    editBtn.textContent = '✎';
    editBtn.className = 'edit-btn';

    editBtn.onclick = () => {
        const editInput = document.createElement('input');
        editInput.type = 'text';
        editInput.className = 'edit-input';
        editInput.value = taskSpan.textContent;

        const saveBtn = document.createElement('button');
        saveBtn.textContent = '✔';
        saveBtn.className = 'save-btn';

        li.replaceChild(editInput, taskSpan);
        li.replaceChild(saveBtn, editBtn);

        editInput.focus();

        function saveEdit() {
            const newText = editInput.value.trim();
            if (newText !== '') {
                taskSpan.textContent = newText;
                li.replaceChild(taskSpan, editInput);
                li.replaceChild(editBtn, saveBtn);
            }
        }

        saveBtn.onclick = saveEdit;

        editInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                saveEdit();
            }
        });
    };
    
    
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'X';
    deleteBtn.className = 'delete-single';
    
    
    deleteBtn.onclick = function() {
        li.remove();
    };
    

    li.appendChild(checkbox);
    li.appendChild(taskSpan);
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);
    
  
    taskList.appendChild(li);

    taskInput.value = '';
    taskInput.focus();
}


function deleteTask() {
    taskList.innerHTML = '';
}


taskInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        addTask();
    }
});