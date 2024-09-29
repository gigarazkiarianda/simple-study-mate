import React, { useState, useEffect } from 'react';
import { Button, Form, ListGroup } from 'react-bootstrap';
import { loadTasks, saveTasks } from '../utils/storage';

interface Task {
  name: string;
  deadline: Date;
  isDeadlineReached?: boolean;
}

const TaskList: React.FC = () => {
  const [task, setTask] = useState('');
  const [deadline, setDeadline] = useState<string>('');
  const [tasks, setTasks] = useState<Task[]>(loadTasks());

  useEffect(() => {
    const interval = setInterval(() => {
      const updatedTasks = tasks.map(t => ({
        ...t,
        isDeadlineReached: new Date() >= new Date(t.deadline),
      }));
      setTasks(updatedTasks);
    }, 1000);

    return () => clearInterval(interval);
  }, [tasks]);

  const addTask = () => {
    if (task && deadline) {
      const newTask: Task = {
        name: task,
        deadline: new Date(deadline),
      };
      const updatedTasks = [...tasks, newTask];
      setTasks(updatedTasks);
      setTask('');
      setDeadline('');
      saveTasks(updatedTasks);
    }
  };

  const removeTask = (index: number) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
  };

  const getDeadlineStatusColor = (deadline: Date): string => {
    const now = new Date();
    const timeDiff = new Date(deadline).getTime() - now.getTime();

    if (timeDiff > 172800000) return 'green';
    if (timeDiff <= 172800000 && timeDiff > 3600000) return 'yellow';
    return 'red';
  };

  return (
    <div className="p-3">
      <Form.Group className="mb-2">
        <Form.Control
          type="text"
          placeholder="Tambahkan tugas baru"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Control
          type="datetime-local"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
        />
      </Form.Group>
      <Button onClick={addTask} className="mb-3">Tambah Tugas</Button>
      <ListGroup>
        {tasks.map((t, index) => (
          <ListGroup.Item key={index} className="d-flex justify-content-between align-items-center mb-2">
            <div className="d-flex align-items-center">
              <span
                style={{
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  backgroundColor: getDeadlineStatusColor(t.deadline),
                  marginRight: '10px',
                }}
              ></span>
              {t.name}
            </div>
            <Button variant="danger" size="sm" onClick={() => removeTask(index)}>
              Hapus
            </Button>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default TaskList;
