import React from 'react';

export default function AdBanner() {
  return (
    <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-center mx-4 my-3 flex flex-col items-center justify-center min-h-[70px] shadow-sm relative overflow-hidden">
      <div className="absolute top-0 right-0 bg-slate-200 text-[10px] px-2 py-0.5 rounded-bl-lg text-slate-500 font-medium">Ad</div>
      <span className="text-sm font-semibold text-slate-400">Sponsored Content</span>
      <span className="text-xs text-slate-400 mt-1">Placeholder for AdMob / AdSense</span>
    </div>
  );
}
