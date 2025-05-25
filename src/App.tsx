import { useState } from "react";
import { CheckCircle, Circle, Trash } from "phosphor-react";

import type { Task } from "./types/tasks";

export  function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [input, setInput] = useState("");

  const addTask = () => {
    if (input.trim() === "") return;
    setTasks([...tasks, { id: Date.now(), text: input, completed: false, createdAt: new Date() }]);
    setInput("");
  };

  const toggleTask = (id: number) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 bg-white rounded-xl shadow">
      <h1 className="text-2xl font-bold mb-4">Gestor de Tarefas</h1>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 px-3 py-2 border rounded"
          placeholder="Nova tarefa..."
        />
        <button
          onClick={addTask}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Adicionar
        </button>
      </div>

      <ul className="space-y-2">
        {tasks.map((task) => (
          <li
            key={task.id}
            className="flex justify-between items-center p-3 border rounded hover:bg-gray-50"
          >
            <div className="flex-1">
              <p className={`text-base ${task.completed ? "line-through text-gray-500" : ""}`}>
                {task.text}
              </p>
              <p className="text-xs text-gray-400 mt-1">
              {task.createdAt.toLocaleDateString()} às {task.createdAt.toLocaleTimeString()}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => toggleTask(task.id)} className="text-green-600">
                {task.completed ? (
                  <CheckCircle size={24} weight="fill" />
                ) : (
                  <Circle size={24} />
                )}
              </button>
              <button onClick={() => deleteTask(task.id)} className="text-red-600">
                <Trash size={24} />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}