'use client';
import { useState } from 'react';

type FocusTask = {
  id: number;
  title: string;
  completed: boolean;
  priorityLevel: PriorityLevel;
};

//create a record type for color/badge
enum PriorityLevel {
  Low = 'low',
  Medium = 'medium',
  High = 'high',
}

export default function PlayGround() {
  const [tasks, setTasks] = useState<FocusTask[]>([
    {
      id: 1,
      title: 'Learn React',
      completed: false,
      priorityLevel: PriorityLevel.High,
    },
    {
      id: 2,
      title: 'Learn Tyescript',
      completed: true,
      priorityLevel: PriorityLevel.Medium,
    },
  ]);

  const [newTask, setNewTask] = useState('');

  const handleAddTask = () => {
    //creating an object to later add
    const addedTask = {
      id: Date.now(),
      title: newTask,
      completed: false,
      priorityLevel: PriorityLevel.Low,
    };
    //using spread operator to not mutate existing data and then adding the new object from above to the existing array.
    setTasks([...tasks, addedTask]);
    //clearing the text from input after adding a new task
    setNewTask('');
  };

  const deleteTask = (taskId: number) => {
    const deleteTask = tasks.filter(task => task.id !== taskId);
    setTasks(deleteTask);
  };

  const completedTask = (taskId: number) => {
    const completedTask = tasks.map((task: FocusTask) => {
      if (task.id === taskId) {
        //so here we are showing an existing object and changing the completed property specifically.
        //how do we know when to do this in real world?
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    console.log('completed', completedTask);
    setTasks(completedTask);
  };

  return (
    <div className='p-6'>
      <h2 className='text-xl font-bold mb-4'>📝 Daily Focus Tracker</h2>
      <div className='flex flex-row justify-items-center'>
        <input
          className='w-1/2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
          type='text'
          value={newTask}
          onChange={e => setNewTask(e.target.value)}
          placeholder='What are we focusing on today?'
        />
        <div className='px-2' />
        <button
          type='button'
          onClick={handleAddTask}
          className='focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900'
        >
          Add Thought
        </button>
      </div>
      <div className='flex pt-4'>
        <ul>
          {tasks.map((task, id) => (
            <div key={id} className='flex flex-1 flex-row justify-items-center'>
              <li className='px-4'>
                {task.title} - {task.priorityLevel}
              </li>
              <button
                className='font-medium rounded-lg text-sm px-5 py-2.5 mb-2 focus:outline-none text-white bg-red-700 hover:bg-red-800'
                onClick={() => deleteTask(task.id)}
              >
                Delete
              </button>
              <div className='px-1' />
              <button
                className='font-medium rounded-lg text-sm px-5 py-2.5 mb-2 focus:outline-none text-white bg-green-700 hover:bg-green-800'
                onClick={() => completedTask(task.id)}
              >
                {task.completed ? 'Undo' : 'Done'}
              </button>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
}
