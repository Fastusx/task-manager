package spring.test.task.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import spring.test.task.model.Task;
import spring.test.task.service.TaskService;

@Controller
public class TaskController {
    private final TaskService taskService;

    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @GetMapping("/novaTask")
    public String home(Model model) {

        model.addAttribute("tasks", taskService.getAll());
        return "main";
    }

    @DeleteMapping("/tasks/{id}")
    @ResponseBody
    public ResponseEntity<Void> delete(@PathVariable long id) {

        taskService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/taskEdit/{id}")
    @ResponseBody
    public ResponseEntity<Void> edit(@PathVariable long id, @RequestBody Task task) {
        taskService.edit(id, task.getName(), task.getType());
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/tasks/{id}/position/{id2}")
    @ResponseBody
    public ResponseEntity<Void> changePosition(@PathVariable long id, @PathVariable long id2) {
        taskService.changePosition(id, id2);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/novaTask")
    public String create(@ModelAttribute Task task) {
        taskService.save(task);
        return "redirect:/novaTask";
    }

}
