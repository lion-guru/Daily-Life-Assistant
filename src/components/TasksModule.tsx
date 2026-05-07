import { useState } from "react";
import { Plus, Check, Circle, Trash2, Calendar } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

interface Task {
  id: string;
  title: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  dueDate?: string;
}

export default function TasksModule() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', title: 'Morning exercise', completed: true, priority: 'high' },
    { id: '2', title: 'Complete project report', completed: false, priority: 'high', dueDate: '2024-12-20' },
    { id: '3', title: 'Buy groceries', completed: false, priority: 'medium' },
    { id: '4', title: 'Call mom', completed: false, priority: 'low' },
  ]);
  const [newTask, setNewTask] = useState('');
  const [selectedPriority, setSelectedPriority] = useState<'low' | 'medium' | 'high'>('medium');

  const addTask = () => {
    if (newTask.trim()) {
      const task: Task = {
        id: Date.now().toString(),
        title: newTask,
        completed: false,
        priority: selectedPriority,
      };
      setTasks([task, ...tasks]);
      setNewTask('');
    }
  };

  const toggleTask = (id: string) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const priorityColors = {
    low: 'bg-slate-100 text-slate-600',
    medium: 'bg-amber-100 text-amber-700',
    high: 'bg-rose-100 text-rose-700',
  };

  const completedCount = tasks.filter(t => t.completed).length;
  const pendingCount = tasks.filter(t => !t.completed).length;

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-slate-700">Tasks</h2>
        <div className="flex gap-2 text-sm">
          <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full">
            {completedCount} Done
          </span>
          <span className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full">
            {pendingCount} Pending
          </span>
        </div>
      </div>

      <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200 space-y-3">
        <div className="flex gap-2">
          <Input
            placeholder="Add a new task..."
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addTask()}
          />
          <Button onClick={addTask} className="bg-emerald-600 hover:bg-emerald-700">
            <Plus className="w-4 h-4" />
          </Button>
        </div>
        <div className="flex gap-2">
          {(['low', 'medium', 'high'] as const).map((p) => (
            <button
              key={p}
              onClick={() => setSelectedPriority(p)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                selectedPriority === p ? priorityColors[p] : 'bg-slate-100 text-slate-400'
              }`}
            >
              {p.charAt(0).toUpperCase() + p.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        {tasks.map((task) => (
          <div
            key={task.id}
            className={`bg-white rounded-xl p-4 shadow-sm border border-slate-200 flex items-center gap-3 ${
              task.completed ? 'opacity-60' : ''
            }`}
          >
            <button
              onClick={() => toggleTask(task.id)}
              className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                task.completed
                  ? 'bg-emerald-500 border-emerald-500'
                  : 'border-slate-300 hover:border-emerald-500'
              }`}
            >
              {task.completed && <Check className="w-4 h-4 text-white" />}
            </button>
            <div className="flex-1">
              <p className={`text-slate-700 ${task.completed ? 'line-through' : ''}`}>
                {task.title}
              </p>
              {task.dueDate && (
                <p className="text-xs text-slate-400 flex items-center gap-1 mt-1">
                  <Calendar className="w-3 h-3" /> {task.dueDate}
                </p>
              )}
            </div>
            <span className={`px-2 py-1 rounded-full text-xs ${priorityColors[task.priority]}`}>
              {task.priority}
            </span>
            <button
              onClick={() => deleteTask(task.id)}
              className="text-slate-400 hover:text-rose-500 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}