package spring.test.task.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import spring.test.task.model.Task;

public interface TaskRepository extends JpaRepository<Task, Long> {
}
