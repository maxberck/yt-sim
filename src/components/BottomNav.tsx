import type { ReactNode } from 'react';
interface Props { activeScreen: string; setActiveScreen: (screen: string) => void; }
const items: Array<{id: string; label: string; icon: ReactNode}> = [
  { id: 'channel', label: 'Ma chaîne', icon: <path d="M4 6h16v13H4zM8 10h8M8 14h5"/> },
  { id: 'dashboard', label: 'Accueil', icon: <path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1V10Z"/> },
  { id: 'studio', label: 'Studio', icon: <path d="M4 5h16v14H4zM8 9h8M8 13h5"/> },
  { id: 'social', label: 'Réseaux', icon: <path d="M4 5h16v12H8l-4 3V5ZM8 9h8M8 13h5"/> },
  { id: 'business', label: 'Business', icon: <path d="M4 7h16v13H4zM9 7V4h6v3M8 12h8"/> },
];
export const BottomNav = ({ activeScreen, setActiveScreen }: Props) => <nav className="grid shrink-0 grid-cols-5 border-t border-white/10 bg-[#0f0f0f]">{items.map(item => <button key={item.id} onClick={() => setActiveScreen(item.id)} className={`flex flex-col items-center gap-1 py-2 text-[9px] font-semibold ${activeScreen === item.id ? 'text-white' : 'text-zinc-500'}`}><svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current stroke-2">{item.icon}</svg>{item.label}</button>)}</nav>;
