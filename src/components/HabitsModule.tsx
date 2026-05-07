import { useState } from "react";
import { Check, Plus, Trophy, Flame } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export default function HabitsModule() {
  const [habits, setHabits] = useState([
    { id: '1', name: 'Drink Water (2L)', streak: 5, todayCompleted: false, color: 'bg-blue-500' },
    { id: '2', name: 'Read 10 Pages', streak: 12, todayCompleted: true, color: 'bg-purple-500' },
  ]);
  const [newHabit, setNewHabit] = useState('');

  const addHabit = () => {
    if (newHabit.trim()) {
      setHabits([...habits, {
        id: Date.now().toString(),
        name: newHabit,
        streak: 0,
        todayCompleted: false,
        color: 'bg-emerald-500'
      }]);
      setNewHabit('');
    }
  };

  const toggleHabit = (id: string) => {
    setHabits(habits.map(h => {
      if (h.id === id) {
        return { 
          ...h, 
          todayCompleted: !h.todayCompleted,
          streak: h.todayCompleted ? h.streak - 1 : h.streak + 1
        };
      }
      return h;
    }));
  };

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-slate-700">Habit Tracker</h2>
        <Trophy className="w-6 h-6 text-amber-500" />
      </div>

      <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200 flex gap-2">
        <Input
          placeholder="Enter a new habit..."
          value={newHabit}
          onChange={(e) => setNewHabit(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addHabit()}
        />
        <Button onClick={addHabit} className="bg-emerald-600 hover:bg-emerald-700">
          <Plus className="w-4 h-4" />
        </Button>
      </div>

      <div className="space-y-3">
        {habits.map(habit => (
          <div key={habit.id} className="bg-white rounded-xl p-4 shadow-sm border border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button 
                onClick={() => toggleHabit(habit.id)}
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                  habit.todayCompleted ? habit.color : 'bg-slate-100 border-2 border-slate-200'
                }`}
              >
                {habit.todayCompleted && <Check className="w-5 h-5 text-white" />}
              </button>
              <div>
                <p className={`font-medium ${habit.todayCompleted ? 'text-slate-400 line-through' : 'text-slate-700'}`}>
                  {habit.name}
                </p>
                <div className="flex items-center gap-1 text-xs text-orange-500 mt-1">
                  <Flame className="w-3 h-3" />
                  <span>{habit.streak} day streak</span>
                </div>
              </div>
            </div>
          </div>
        ))}
        {habits.length === 0 && (
          <div className="text-center py-10 text-slate-400 text-sm">
            No habits added. Start building good habits today!
          </div>
        )}
      </div>
    </div>
  );
}
