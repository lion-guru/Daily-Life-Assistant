import { useState, useEffect } from 'react';
import { Battery, Smartphone, Volume2, Mic, Share2 } from 'lucide-react';

export default function ToolsModule() {
  const [battery, setBattery] = useState<{level: number, charging: boolean} | null>(null);
  
  useEffect(() => {
    if ('getBattery' in navigator) {
      (navigator as any).getBattery().then((batt: any) => {
        setBattery({ level: batt.level * 100, charging: batt.charging });
        batt.addEventListener('levelchange', () => setBattery(prev => ({...prev!, level: batt.level * 100})));
        batt.addEventListener('chargingchange', () => setBattery(prev => ({...prev!, charging: batt.charging})));
      });
    }
  }, []);

  const triggerVibration = (pattern: number[]) => {
    if ('vibrate' in navigator) {
      navigator.vibrate(pattern);
    } else {
      alert("Vibration API is not supported on this browser/device.");
    }
  };

  const speakText = () => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance("Hello! This is a hidden feature of your mobile. Your phone can speak!");
      window.speechSynthesis.speak(utterance);
    } else {
      alert("Text-to-Speech is not supported.");
    }
  };

  const shareApp = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'LifeKit App',
          text: 'Check out this awesome app with hidden mobile features!',
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing', err);
      }
    } else {
      alert("Native Share API is not supported on this browser.");
    }
  };

  return (
    <div className="p-4 space-y-4 pb-24">
      <div>
        <h2 className="text-2xl font-bold text-slate-800">Hidden Tools</h2>
        <p className="text-sm text-slate-500 mt-1">Powerful mobile features that people rarely use!</p>
      </div>
      
      <div className="grid gap-4">
        {/* Battery */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
          <div className={`p-3 rounded-full ${battery?.charging ? 'bg-emerald-100 text-emerald-600' : 'bg-blue-100 text-blue-600'}`}>
            <Battery className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-slate-700">Smart Battery API</h3>
            <p className="text-xs text-slate-500 mt-1">
              {battery 
                ? `${Math.round(battery.level)}% - ${battery.charging ? 'Charging ⚡' : 'Discharging'}`
                : 'Battery API not supported'}
            </p>
          </div>
        </div>

        {/* Haptics */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 space-y-4">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-full bg-purple-100 text-purple-600">
              <Smartphone className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-slate-700">Haptic Engine</h3>
              <p className="text-xs text-slate-500 mt-1">Control phone's vibration motor</p>
            </div>
          </div>
          <div className="flex gap-2 flex-wrap">
            <button onClick={() => triggerVibration([50])} className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 active:scale-95 transition-all">Tap</button>
            <button onClick={() => triggerVibration([200])} className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 active:scale-95 transition-all">Heavy</button>
            <button onClick={() => triggerVibration([100, 50, 100, 50, 100])} className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 active:scale-95 transition-all">Heartbeat</button>
          </div>
        </div>

        {/* Text to Speech */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-full bg-amber-100 text-amber-600">
              <Volume2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-slate-700">Text-to-Speech</h3>
              <p className="text-xs text-slate-500 mt-1">Phone reading text</p>
            </div>
          </div>
          <button onClick={speakText} className="p-2 bg-amber-50 text-amber-600 rounded-lg hover:bg-amber-100 active:scale-95 transition-all">
            Test
          </button>
        </div>

        {/* Native Share */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-full bg-rose-100 text-rose-600">
              <Share2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-slate-700">Native Share</h3>
              <p className="text-xs text-slate-500 mt-1">System share dialog</p>
            </div>
          </div>
          <button onClick={shareApp} className="p-2 bg-rose-50 text-rose-600 rounded-lg hover:bg-rose-100 active:scale-95 transition-all">
            Share
          </button>
        </div>

      </div>
    </div>
  );
}
