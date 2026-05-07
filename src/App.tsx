import { useState, useEffect } from "react";
import { Home, ClipboardList, Wallet, Calendar, Settings, Activity, Bot, Wrench, Cloud, Quote } from "lucide-react";
import NotesModule from "./components/NotesModule";
import TasksModule from "./components/TasksModule";
import ExpensesModule from "./components/ExpensesModule";
import RoutineModule from "./components/RoutineModule";
import HabitsModule from "./components/HabitsModule";
import ToolsModule from "./components/ToolsModule";
import AIAssistantModule from "./components/AIAssistantModule";
import AdBanner from "./components/AdBanner";

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [isAIActive, setIsAIActive] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case 'notes':
        return <NotesModule />;
      case 'tasks':
        return <TasksModule />;
      case 'expenses':
        return <ExpensesModule />;
      case 'routine':
        return <RoutineModule />;
      case 'habits':
        return <HabitsModule />;
      case 'tools':
        return <ToolsModule />;
      default:
        return <HomeDashboard onNavigate={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 relative pb-20">
      <header className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white px-4 py-5 shadow-md sticky top-0 z-10">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight">LifeKit</h1>
            <p className="text-emerald-100 text-xs font-medium uppercase tracking-wider mt-0.5">Your Smart Companion</p>
          </div>
          <button 
            onClick={() => setActiveTab('settings')}
            className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
          >
            <Settings className="w-5 h-5 text-white" />
          </button>
        </div>
      </header>

      <AdBanner />
      
      <main className="animate-in fade-in duration-300">
        {renderContent()}
      </main>

      {/* Floating AI Button */}
      <button 
        onClick={() => setIsAIActive(true)}
        className="fixed bottom-24 right-4 w-14 h-14 bg-emerald-600 text-white rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.12)] flex items-center justify-center hover:bg-emerald-700 hover:scale-105 transition-all z-40 group"
      >
        <Bot className="w-6 h-6 group-hover:animate-pulse" />
      </button>

      {/* AI Assistant Module Overlay */}
      {isAIActive && <AIAssistantModule onClose={() => setIsAIActive(false)} />}

      <nav className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-slate-200 shadow-[0_-10px_40px_rgba(0,0,0,0.05)] z-40 pb-safe">
        <div className="flex justify-around py-2">
          {[
            { id: 'home', icon: Home, label: 'Home' },
            { id: 'notes', icon: ClipboardList, label: 'Notes' },
            { id: 'tasks', icon: Calendar, label: 'Tasks' },
            { id: 'habits', icon: Activity, label: 'Habits' },
            { id: 'tools', icon: Wrench, label: 'Tools' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center py-2 px-3 rounded-xl transition-all ${
                activeTab === tab.id
                  ? 'text-emerald-600 bg-emerald-50 scale-105 shadow-sm'
                  : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'
              }`}
            >
              <tab.icon className={`w-5 h-5 ${activeTab === tab.id ? 'fill-emerald-100' : ''}`} />
              <span className="text-[10px] font-medium mt-1">{tab.label}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
}

function HomeDashboard({ onNavigate }: { onNavigate: (tab: string) => void }) {
  const [quote, setQuote] = useState<{text: string, author: string} | null>(null);
  const [weather, setWeather] = useState<{temp: number, desc: string} | null>(null);

  useEffect(() => {
    // Free API 1: Random Quotes
    fetch('https://dummyjson.com/quotes/random')
      .then(res => res.json())
      .then(data => setQuote({ text: data.quote, author: data.author }))
      .catch(() => setQuote({ text: "Stay positive, work hard, make it happen.", author: "Unknown" }));

    // Free API 2: Open-Meteo Weather (Using Delhi Coordinates as default)
    fetch('https://api.open-meteo.com/v1/forecast?latitude=28.61&longitude=77.23&current_weather=true')
      .then(res => res.json())
      .then(data => {
        setWeather({ temp: data.current_weather.temperature, desc: 'Delhi' });
      })
      .catch(() => setWeather({ temp: 30, desc: 'Offline' }));
  }, []);

  const quickActions = [
    { id: 'notes', title: 'Quick Notes', desc: 'Jot down thoughts', icon: ClipboardList, color: 'bg-gradient-to-br from-amber-400 to-orange-500' },
    { id: 'tasks', title: 'Tasks', desc: 'Manage your to-do', icon: Calendar, color: 'bg-gradient-to-br from-blue-400 to-indigo-500' },
    { id: 'expenses', title: 'Expenses', desc: 'Track spending', icon: Wallet, color: 'bg-gradient-to-br from-rose-400 to-pink-500' },
    { id: 'tools', title: 'Hidden Tools', desc: 'Mobile APIs', icon: Wrench, color: 'bg-gradient-to-br from-slate-400 to-slate-600' },
  ];

  return (
    <div className="p-4 space-y-6">
      <section className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -mr-10 -mt-10"></div>
        <h2 className="text-xl font-bold relative z-10">Good Morning! 👋</h2>
        <p className="text-emerald-100 mt-1 relative z-10 text-sm">Let's make today productive.</p>
        <div className="mt-5 flex gap-4 relative z-10">
          <div className="bg-white/20 backdrop-blur-sm rounded-xl px-4 py-3 flex-1 border border-white/10 shadow-sm">
            <p className="text-3xl font-extrabold">12</p>
            <p className="text-xs text-emerald-100 font-medium uppercase tracking-wider mt-1">Tasks</p>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-xl px-4 py-3 flex-1 border border-white/10 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-3xl font-extrabold">{weather ? `${weather.temp}°` : '--'}</p>
              <p className="text-xs text-emerald-100 font-medium uppercase tracking-wider mt-1">{weather ? weather.desc : 'Loading'}</p>
            </div>
            <Cloud className="w-8 h-8 text-emerald-100 opacity-80" />
          </div>
        </div>
      </section>

      {/* Free API: Daily Quote */}
      {quote && (
        <section className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 relative">
          <Quote className="w-6 h-6 text-slate-200 absolute top-3 right-3" />
          <p className="text-sm text-slate-600 font-medium italic pr-6">"{quote.text}"</p>
          <p className="text-xs text-slate-400 mt-2 font-semibold">- {quote.author}</p>
        </section>
      )}

      <section>
        <div className="flex justify-between items-end mb-3">
          <h3 className="text-slate-800 font-bold text-lg">Quick Actions</h3>
          <span className="text-xs text-emerald-600 font-medium cursor-pointer">View all</span>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {quickActions.map((action) => (
            <button
              key={action.id}
              onClick={() => onNavigate(action.id)}
              className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 text-left hover:shadow-md hover:-translate-y-0.5 transition-all group"
            >
              <div className={`w-12 h-12 ${action.color} rounded-xl flex items-center justify-center mb-3 shadow-inner group-hover:scale-110 transition-transform`}>
                <action.icon className="w-6 h-6 text-white" />
              </div>
              <h4 className="font-semibold text-slate-800">{action.title}</h4>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">{action.desc}</p>
            </button>
          ))}
        </div>
      </section>

      <AdBanner />

      <section className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
        <h3 className="text-slate-800 font-bold text-lg mb-4">Today's Summary</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between group cursor-pointer">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center">
                <Calendar className="w-4 h-4 text-amber-600" />
              </div>
              <span className="text-slate-600 font-medium group-hover:text-amber-600 transition-colors">Pending Tasks</span>
            </div>
            <span className="font-bold text-amber-500">5 tasks</span>
          </div>
          
          <div className="flex items-center justify-between group cursor-pointer">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                <ClipboardList className="w-4 h-4 text-blue-600" />
              </div>
              <span className="text-slate-600 font-medium group-hover:text-blue-600 transition-colors">Notes Created</span>
            </div>
            <span className="font-bold text-blue-500">8 notes</span>
          </div>
          
          <div className="flex items-center justify-between group cursor-pointer">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-rose-100 flex items-center justify-center">
                <Wallet className="w-4 h-4 text-rose-600" />
              </div>
              <span className="text-slate-600 font-medium group-hover:text-rose-600 transition-colors">Total Expenses</span>
            </div>
            <span className="font-bold text-rose-500">₹12,340</span>
          </div>
        </div>
      </section>
    </div>
  );
}