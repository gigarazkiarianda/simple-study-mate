const TASKS_KEY = 'tasks';

interface Task {
  name: string;
  deadline: Date;
  isDeadlineReached?: boolean; 
}

export const loadTasks = (): Task[] => {
  const storedTasks = localStorage.getItem(TASKS_KEY);
  if (!storedTasks) return []; 
  try {
    
    const parsedTasks = JSON.parse(storedTasks);
    return parsedTasks.map((task: any) => ({
      name: task.name,
      deadline: new Date(task.deadline),
      isDeadlineReached: task.isDeadlineReached,
    }));
  } catch (error) {
    console.error("Error parsing tasks from localStorage", error);
    return [];
  }
};

export const saveTasks = (tasks: Task[]) => {
  // Mengonversi objek Task menjadi string JSON untuk disimpan
  localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
};