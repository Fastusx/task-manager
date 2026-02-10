package spring.test.task.service;

import org.springframework.stereotype.Service;
import spring.test.task.model.Task;
import spring.test.task.repository.TaskRepository;

import java.util.List;
import java.util.Optional;

@Service

public class TaskService {
private final TaskRepository taskRepository;

    public TaskService(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }
    public List<Task> getAll(){
        return  taskRepository.findAll();
    }
    public Task save(Task task) {
        return taskRepository.save(task);
    }
    public void delete(Long id){
        taskRepository.deleteById(id);
    }

    public void edit(Long id, String name,String type) {
        Optional<Task> taskEdit = taskRepository.findById(id);
        if (taskEdit.isPresent()) {
            taskEdit.get().setName(name);
            taskEdit.get().setType(type);
            taskRepository.save(taskEdit.get());
        }else{
        System.out.println("Tarefa não encontrada!");
    }
    }
}
