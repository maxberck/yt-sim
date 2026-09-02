import type { CreatorProfile } from '../types/game';

function Icon({ type }: { type: 'play' | 'users' | 'money' | 'bolt' }) {
  const paths = { play: 'M8 5v14l11-7z', users: 'M16 11a4 4 0 1 0-8 0 4 4 0 0 0 8 0ZM4 20c0-3 2.7-5 8-5s8 2 8 5', money: 'M12 3v18M17 7.5c0-1.7-2.2-3-5-3s-5 1.3-5 3 2.2 3 5 3 5 1.3 5 3-2.2 3-5 3-2.8 0-5-1.3-5-3', bolt: 'm13 2-9 12h7l-1 8 9-12h-7l1-8' };
  return <svg viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-current stroke-2"><path d={paths[type]} strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

export const HeaderHud = ({ creator }: { creator: CreatorProfile }) => (
  <header className="shrink-0 border-b border-white/10 bg-[#0f0f0f] px-4 py-3">
    <div className="flex items-center justify-between gap-3">
      <div className="flex items-center gap-2"><div className="grid h-7 w-7 place-items-center rounded-md bg-[#ff0033]"><Icon type="play" /></div><span className="text-sm font-bold tracking-tight">YouTube</span></div>
      <div className="text-[10px] font-semibold text-zinc-400">Semaine {creator.week}</div>
    </div>
    <div className="mt-3 grid grid-cols-3 gap-2">
      <div className="rounded-lg bg-[#181818] px-2 py-1.5"><div className="flex items-center gap-1 text-[9px] text-zinc-500"><Icon type="users" /> ABONNÉS</div><div className="mt-0.5 text-xs font-bold">{creator.subscribers.toLocaleString('fr-FR')}</div></div>
      <div className="rounded-lg bg-[#181818] px-2 py-1.5"><div className="flex items-center gap-1 text-[9px] text-zinc-500"><Icon type="money" /> €</div><div className="mt-0.5 text-xs font-bold">{creator.money.toLocaleString('fr-FR')}</div></div>
      <div className="rounded-lg bg-[#181818] px-2 py-1.5"><div className="flex items-center gap-1 text-[9px] text-zinc-500"><Icon type="bolt" /> ÉNERGIE</div><div className="mt-0.5 text-xs font-bold">{creator.energy}/{creator.maxEnergy}</div></div>
    </div>
  </header>
);
