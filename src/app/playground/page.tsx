'use client';
import { useState } from 'react';

type Task = {
  id: number;
  text: string;
  completed: boolean;
};

//Fix a mutation bug (it’s subtle) - fixed?
//Fix the sort logic (hint: it works but causes odd side effects) - fixed
//Implement a working filter toggle (currently broken) - fixed
//Avoid unnecessary re-renders - this is regarding showCompleted toggle...it is showing two arrays when clicked and when I click "toggle"..not sure
// Fix the key prop issue - fixed
//Bonus: add a reset button to bring all tasks back into view - not sure

export default function PlayGround() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, text: 'Buy milk', completed: false },
    { id: 2, text: 'Walk dog', completed: true },
    { id: 3, text: 'Read book', completed: false },
  ]);

  const [newTask, setNewTask] = useState('');
  const [showCompletedOnly, setShowCompletedOnly] = useState(false);

  const handleAddTask = () => {
    const task = {
      id: Date.now(),
      text: newTask,
      completed: false,
    };
    setTasks([...tasks, task]); //this was the mutation bug?
    setNewTask('');
  };

  const toggleComplete = (taskId: number) => {
    const completedTasks = tasks.map(
      task =>
        task.id === taskId ? { ...task, completed: !task.completed } : task //fixed toggle
    );
    console.log('completedTasks', completedTasks);
    setTasks(completedTasks);
  };

  const sortTasks = () => {
    const sorted = tasks.toSorted((a, b) => a.text.localeCompare(b.text));
    setTasks(sorted);
  };

  const visibleTasks = showCompletedOnly
    ? tasks.filter(task => task.completed)
    : tasks;

  const toggleFilter = () => {
    setShowCompletedOnly(!showCompletedOnly);
  };

  const resetTasks = () => {
    setShowCompletedOnly(false); //tried "prev", "[...tasks]"
  };

  console.log('visibleTasks', visibleTasks);

  return (
    <div className='p-6'>
      <h2 className='text-xl font-bold mb-4'>🧹 Task Manager</h2>

      <input
        className='border p-2 mr-2'
        value={newTask}
        onChange={e => setNewTask(e.target.value)}
        placeholder='Add a task...'
      />
      <button
        className='bg-green-500 text-white px-4 py-2 rounded'
        onClick={handleAddTask}
      >
        Add
      </button>
      <button
        className='ml-2 bg-blue-500 text-white px-4 py-2 rounded'
        onClick={sortTasks}
      >
        Sort A-Z
      </button>
      <button
        className='ml-2 bg-purple-500 text-white px-4 py-2 rounded'
        onClick={toggleFilter}
      >
        {showCompletedOnly ? 'Show All' : 'Show Completed'}
      </button>

      <ul className='mt-4'>
        {visibleTasks.map((task, index) => (
          <li key={task.id} className='mb-2'>
            <span
              style={{
                textDecoration: task.completed ? 'line-through' : 'none',
              }}
            >
              {task.text}
            </span>
            <button
              className='ml-4 text-sm text-blue-600 underline'
              onClick={() => toggleComplete(task.id)}
            >
              Toggle
            </button>
          </li>
        ))}
      </ul>
      <button
        className='ml-2 bg-blue-500 text-white px-4 py-2 rounded'
        onClick={resetTasks}
      >
        Reset{' '}
      </button>
    </div>
  );
}
