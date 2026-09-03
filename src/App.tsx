import { useState } from 'react';
import { useGame } from './hooks/useGame';
import { HeaderHud } from './components/HeaderHud';
import { BottomNav } from './components/BottomNav';
import DashboardScreen from './screens/DashboardScreen';
import StudioScreen from './screens/StudioScreen';
import SocialScreen from './screens/SocialScreen';
import AgencyScreen from './screens/AgencyScreen';
import ChannelScreen from './screens/ChannelScreen';

export default function App(){
 const game=useGame(); const [activeScreen,setActiveScreen]=useState('dashboard');
 const screen=activeScreen==='dashboard'?<DashboardScreen creator={game.creator} trends={game.trends} rest={game.rest}/>:activeScreen==='channel'?<ChannelScreen creator={game.creator} videos={game.publishedVideos} playlists={game.playlists} series={game.series} createPlaylist={game.createPlaylist} addToPlaylist={game.addToPlaylist}/>:activeScreen==='studio'?<StudioScreen creator={game.creator} skills={game.skills} skillXp={game.skillXp} projects={game.projects} series={game.series} createProject={game.createProject} workOnProject={game.workOnProject} advanceTurn={game.advanceTurn} publishVideo={game.publishVideo} toggleFace={game.toggleFace}/>:activeScreen==='social'?<SocialScreen posts={game.socialPosts} trends={game.trends}/>:<AgencyScreen creator={game.creator} equipment={game.equipment} offers={game.offers} acceptOffer={game.acceptOffer}/>;
 return <div className="min-h-screen bg-black font-sans text-white"><div className="mx-auto flex h-screen w-full max-w-[430px] flex-col overflow-hidden bg-black sm:h-[850px] sm:rounded-[28px] sm:border sm:border-white/10 sm:shadow-2xl"><HeaderHud creator={game.creator}/><main className="min-h-0 flex-1 overflow-y-auto px-4 py-5">{screen}</main><BottomNav activeScreen={activeScreen} setActiveScreen={setActiveScreen}/><div className="pointer-events-none absolute inset-x-0 top-20 z-50 mx-auto flex max-w-[430px] flex-col gap-2 px-4">{game.notifications.map(n=><div key={n.id} className={`rounded-xl border p-3 text-[10px] font-bold shadow-xl ${n.type==='success'?'border-emerald-500/30 bg-emerald-950/90 text-emerald-200':n.type==='error'?'border-red-500/30 bg-red-950/90 text-red-200':'border-white/10 bg-zinc-900/95 text-zinc-200'}`}>{n.message}</div>)}</div></div></div>;
}
