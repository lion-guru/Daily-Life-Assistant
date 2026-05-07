import { useState } from "react";
import { Plus, Wallet, TrendingUp, Coffee, ShoppingBag, Car, Film, Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

interface Expense {
  id: string;
  title: string;
  amount: number;
  category: 'food' | 'shopping' | 'travel' | 'entertainment' | 'other';
  date: Date;
}

const categoryIcons = {
  food: { icon: Coffee, color: 'bg-amber-500', bg: 'bg-amber-50' },
  shopping: { icon: ShoppingBag, color: 'bg-blue-500', bg: 'bg-blue-50' },
  travel: { icon: Car, color: 'bg-emerald-500', bg: 'bg-emerald-50' },
  entertainment: { icon: Film, color: 'bg-purple-500', bg: 'bg-purple-50' },
  other: { icon: Wallet, color: 'bg-slate-500', bg: 'bg-slate-50' },
};

export default function ExpensesModule() {
  const [expenses, setExpenses] = useState<Expense[]>([
    { id: '1', title: 'Breakfast', amount: 150, category: 'food', date: new Date() },
    { id: '2', title: 'Metro Pass', amount: 200, category: 'travel', date: new Date() },
    { id: '3', title: 'Groceries', amount: 850, category: 'shopping', date: new Date() },
  ]);
  const [isAdding, setIsAdding] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newAmount, setNewAmount] = useState('');
  const [newCategory, setNewCategory] = useState<Expense['category']>('other');

  const addExpense = () => {
    if (newTitle.trim() && newAmount) {
      const expense: Expense = {
        id: Date.now().toString(),
        title: newTitle,
        amount: parseFloat(newAmount),
        category: newCategory,
        date: new Date(),
      };
      setExpenses([expense, ...expenses]);
      setNewTitle('');
      setNewAmount('');
      setIsAdding(false);
    }
  };

  const deleteExpense = (id: string) => {
    setExpenses(expenses.filter(e => e.id !== id));
  };

  const totalToday = expenses.reduce((sum, e) => sum + e.amount, 0);

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-slate-700">Expenses</h2>
        <Button
          onClick={() => setIsAdding(true)}
          className="bg-emerald-600 hover:bg-emerald-700"
        >
          <Plus className="w-4 h-4 mr-1" /> Add
        </Button>
      </div>

      <div className="bg-gradient-to-br from-rose-500 to-pink-600 rounded-2xl p-5 text-white">
        <p className="text-rose-100 text-sm">Today's Spending</p>
        <p className="text-3xl font-bold mt-1">₹{totalToday.toLocaleString('hi-IN')}</p>
        <div className="flex items-center gap-2 mt-3 text-sm text-rose-100">
          <TrendingUp className="w-4 h-4" />
          <span>Track your daily expenses</span>
        </div>
      </div>

      {isAdding && (
        <div className="bg-white rounded-xl p-4 shadow-md border border-slate-200 space-y-3">
          <Input
            placeholder="Expense title..."
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
          <Input
            type="number"
            placeholder="Amount (₹)..."
            value={newAmount}
            onChange={(e) => setNewAmount(e.target.value)}
          />
          <div className="flex flex-wrap gap-2">
            {(Object.keys(categoryIcons) as Expense['category'][]).map((cat) => {
              const { icon: Icon, color } = categoryIcons[cat];
              return (
                <button
                  key={cat}
                  onClick={() => setNewCategory(cat)}
                  className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm transition-all ${
                    newCategory === cat
                      ? `${color} text-white`
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </button>
              );
            })}
          </div>
          <div className="flex gap-2">
            <Button onClick={addExpense} className="bg-emerald-600 hover:bg-emerald-700">
              Save
            </Button>
            <Button variant="outline" onClick={() => setIsAdding(false)}>
              Cancel
            </Button>
          </div>
        </div>
      )}

      <div className="space-y-2">
        {expenses.map((expense) => {
          const { icon: Icon, color, bg } = categoryIcons[expense.category];
          return (
            <div
              key={expense.id}
              className="bg-white rounded-xl p-4 shadow-sm border border-slate-200 flex items-center gap-3"
            >
              <div className={`w-10 h-10 ${bg} rounded-lg flex items-center justify-center`}>
                <Icon className={`w-5 h-5 ${color.replace('bg-', 'text-')}`} />
              </div>
              <div className="flex-1">
                <p className="font-medium text-slate-700">{expense.title}</p>
                <p className="text-xs text-slate-400">{expense.category}</p>
              </div>
              <p className="font-semibold text-slate-700">₹{expense.amount}</p>
              <button
                onClick={() => deleteExpense(expense.id)}
                className="text-slate-400 hover:text-rose-500 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}