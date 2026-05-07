import { useState } from "react";
import { Sun, Moon, Coffee, Briefcase, Utensils, Dumbbell, BookOpen, Heart } from "lucide-react";

interface RoutineItem {
  id: string;
  time: string;
  activity: string;
  icon: React.ElementType;
  color: string;
  completed: boolean;
}

const defaultRoutine: RoutineItem[] = [
  { id: '1', time: '06:00', activity: 'Wake Up', icon: Sun, color: 'bg-amber-500', completed: false },
  { id: '2', time: '06:30', activity: 'Morning Exercise', icon: Dumbbell, color: 'bg-emerald-500', completed: false },
  { id: '3', time: '07:30', activity: 'Breakfast', icon: Coffee, color: 'bg-orange-500', completed: false },
  { id: '4', time: '09:00', activity: 'Work Start', icon: Briefcase, color: 'bg-blue-500', completed: false },
  { id: '5', time: '13:00', activity: 'Lunch Break', icon: Utensils, color: 'bg-rose-500', completed: false },
  { id: '6', time: '18:00', activity: 'Evening Walk', icon: Heart, color: 'bg-pink-500', completed: false },
  { id: '7', time: '20:00', activity: 'Reading Time', icon: BookOpen, color: 'bg-purple-500', completed: false },
  { id: '8', time: '22:00', activity: 'Sleep', icon: Moon, color: 'bg-indigo-500', completed: false },
];

export default function RoutineModule() {
  const [routine, setRoutine] = useState(defaultRoutine);

  const toggleComplete = (id: string) => {
    setRoutine(routine.map(item =>
      item.id === id ? { ...item, completed: !item.completed } : item
    ));
  };

  const completedCount = routine.filter(r => r.completed).length;
  const progress = (completedCount / routine.length) * 100;

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-bold text-slate-700">Daily Routine</h2>

      <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200">
        <div className="flex items-center justify-between mb-3">
          <p className="text-slate-600">Today's Progress</p>
          <p className="font-semibold text-emerald-600">{completedCount}/{routine.length}</p>
        </div>
        <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="space-y-2">
        {routine.map((item) => (
          <button
            key={item.id}
            onClick={() => toggleComplete(item.id)}
            className={`w-full bg-white rounded-xl p-4 shadow-sm border border-slate-200 flex items-center gap-4 transition-all ${
              item.completed ? 'opacity-60' : ''
            }`}
          >
            <div className={`w-12 h-12 ${item.color} rounded-xl flex items-center justify-center`}>
              <item.icon className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1 text-left">
              <p className={`font-medium text-slate-700 ${item.completed ? 'line-through' : ''}`}>
                {item.activity}
              </p>
              <p className="text-sm text-slate-400">{item.time}</p>
            </div>
            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
              item.completed
                ? 'bg-emerald-500 border-emerald-500'
                : 'border-slate-300'
            }`}>
              {item.completed && (
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}