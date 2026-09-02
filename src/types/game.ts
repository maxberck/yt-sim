export type VideoCategory = 'Gaming' | 'Tech' | 'Vlog' | 'ASMR' | 'Documentaire' | 'Cinéma' | 'Politique';
export type VideoFormat = 'short' | 'standard' | 'documentary' | 'live';
export type Language = 'Français' | 'Anglais' | 'Espagnol' | 'Japonais';
export type SkillKey = 'editing' | 'writing' | 'filming' | 'research' | 'thumbnail' | 'audio' | 'communication' | 'storytelling' | 'business';
export type ChannelTab = 'home' | 'videos' | 'playlists' | 'about';

export interface CreatorSkills { editing:number; writing:number; filming:number; research:number; thumbnail:number; audio:number; communication:number; storytelling:number; business:number; }
export interface Equipment { cameraLevel:number; micLevel:number; pcLevel:number; }
export interface Crew { editorsCount:number; cameramenCount:number; }
export interface CreatorProfile { name:string; subscribers:number; money:number; energy:number; maxEnergy:number; stress:number; week:number; reputation:number; knownLanguages:Language[]; showsFace:boolean; }
export interface Series { id:string; name:string; category:VideoCategory; popularity:number; loyalty:number; expectation:number; fatigue:number; season:number; episodeCount:number; lastViews:number; status:'active'|'resting'|'finished'; }
export interface ProductionTask { id:string; label:string; skill:SkillKey; energyCost:number; qualityGain:number; xpGain:number; requiredLevel:number; done:boolean; }
export interface VideoProject { id:string; title:string; category:VideoCategory; format:VideoFormat; language:Language; isFeat:boolean; isSeries:boolean; seriesId?:string; episodeNumber?:number; totalWeeks:number; weeksDone:number; quality:number; hype:number; tasks:ProductionTask[]; thumbnail:string; published:boolean; }
export interface PublishedVideo { id:string; projectId:string; title:string; category:VideoCategory; format:VideoFormat; thumbnail:string; views:number; subscribersGained:number; week:number; seriesId?:string; episodeNumber?:number; }
export interface Playlist { id:string; title:string; description:string; videoIds:string[]; }
export interface Trend { id:string; name:string; category:VideoCategory; intensity:number; lifetime:number; }
export interface SocialPost { id:string; source:string; text:string; category:'trend'|'news'|'drama'|'community'; relatedTrendId?:string; }
export interface BusinessOffer { id:string; company:string; type:'sponsor'|'agency'|'collab'|'platform'; title:string; amount?:number; commission?:number; minSubscribers:number; }
