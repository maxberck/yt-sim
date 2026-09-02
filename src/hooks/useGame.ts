import { useEffect, useMemo, useState } from 'react';
import type { BusinessOffer, CreatorProfile, CreatorSkills, Equipment, Crew, Language, ProductionTask, Series, SkillKey, SocialPost, Trend, VideoCategory, VideoFormat, VideoProject, PublishedVideo, Playlist } from '../types/game';

const SKILL_BASE_XP = 100;

const emptySkills: CreatorSkills = {
  editing: 1, writing: 1, filming: 1, research: 1, thumbnail: 1,
  audio: 1, communication: 1, storytelling: 1, business: 1,
};

const skillLabels: Record<SkillKey, string> = {
  editing: 'Montage', writing: 'Script', filming: 'Caméra', research: 'Recherche',
  thumbnail: 'Miniature', audio: 'Audio', communication: 'Communication', storytelling: 'Storytelling', business: 'Business',
};

const taskTemplates: Array<Omit<ProductionTask, 'done'>> = [
  { id: 'research', label: 'Faire les recherches', skill: 'research', energyCost: 12, qualityGain: 7, xpGain: 95, requiredLevel: 1 },
  { id: 'script', label: 'Écrire et améliorer le script', skill: 'writing', energyCost: 11, qualityGain: 7, xpGain: 90, requiredLevel: 1 },
  { id: 'filming', label: 'Tourner les plans', skill: 'filming', energyCost: 12, qualityGain: 6, xpGain: 85, requiredLevel: 1 },
  { id: 'camera', label: 'Travailler la présence caméra', skill: 'communication', energyCost: 10, qualityGain: 5, xpGain: 75, requiredLevel: 5 },
  { id: 'editing', label: 'Monter la vidéo', skill: 'editing', energyCost: 16, qualityGain: 10, xpGain: 120, requiredLevel: 1 },
  { id: 'audio', label: 'Nettoyer et mixer l’audio', skill: 'audio', energyCost: 9, qualityGain: 4, xpGain: 70, requiredLevel: 1 },
  { id: 'thumbnail', label: 'Optimiser la miniature', skill: 'thumbnail', energyCost: 10, qualityGain: 6, xpGain: 80, requiredLevel: 1 },
  { id: 'story', label: 'Polir le storytelling', skill: 'storytelling', energyCost: 11, qualityGain: 6, xpGain: 85, requiredLevel: 8 },
];

export function skillXpNeeded(level: number) {
  return Math.round(SKILL_BASE_XP * (1 + level * 0.075));
}

export function useGame() {
  const [creator, setCreator] = useState<CreatorProfile>({
    name: 'MonChaine', subscribers: 150, money: 1200, energy: 100, maxEnergy: 100,
    stress: 0, week: 1, reputation: 50, knownLanguages: ['Français'], showsFace: false,
  });
  const [skills, setSkills] = useState<CreatorSkills>(emptySkills);
  const [skillXp, setSkillXp] = useState<Record<SkillKey, number>>({
    editing: 0, writing: 0, filming: 0, research: 0, thumbnail: 0, audio: 0, communication: 0, storytelling: 0, business: 0,
  });
  const [equipment] = useState<Equipment>({ cameraLevel: 1, micLevel: 1, pcLevel: 1 });
  const [crew] = useState<Crew>({ editorsCount: 0, cameramenCount: 0 });
  const [projects, setProjects] = useState<VideoProject[]>([]);
  const [publishedVideos, setPublishedVideos] = useState<PublishedVideo[]>([]);
  const [playlists, setPlaylists] = useState<Playlist[]>([{ id: 'watch-later', title: 'À regarder plus tard', description: 'Ta sélection personnelle.', videoIds: [] }]);
  const [series, setSeries] = useState<Series[]>([]);
  const [notifications, setNotifications] = useState<{ id: string; message: string; type: 'success' | 'error' | 'info' }[]>([]);

  useEffect(() => { const raw=localStorage.getItem('youtube-sim-state'); if (!raw) return; try { const data=JSON.parse(raw); if(data.creator)setCreator(data.creator); if(data.skills)setSkills(data.skills); if(data.skillXp)setSkillXp(data.skillXp); if(data.projects)setProjects(data.projects); if(data.publishedVideos)setPublishedVideos(data.publishedVideos); if(data.playlists)setPlaylists(data.playlists); if(data.series)setSeries(data.series); } catch { /* ignore invalid saves */ } }, []);
  useEffect(() => { localStorage.setItem('youtube-sim-state', JSON.stringify({ creator, skills, skillXp, projects, publishedVideos, playlists, series })); }, [creator, skills, skillXp, projects, publishedVideos, playlists, series]);

  const trends = useMemo<Trend[]>(() => [
    { id: '1', name: 'Le nouveau jeu fait débat', category: 'Gaming', intensity: 1.8, lifetime: 4 },
    { id: '2', name: 'Documentaires sur les jeux rétro', category: 'Documentaire', intensity: 1.55, lifetime: 6 },
    { id: '3', name: 'Le drama du moment', category: 'Vlog', intensity: 1.35, lifetime: 2 },
    { id: '4', name: 'Setup PC à 10 000 €', category: 'Tech', intensity: 1.45, lifetime: 5 },
  ], []);

  const socialPosts = useMemo<SocialPost[]>(() => [
    { id: 'p1', source: 'TrendTok', text: 'Les documentaires gaming sont partout aujourd’hui.', category: 'trend', relatedTrendId: '2' },
    { id: 'p2', source: 'WebNews', text: 'Un gros créateur vient de relancer le débat sur les jeux rétro.', category: 'news' },
    { id: 'p3', source: 'Community', text: '« Quelqu’un peut faire une vraie vidéo sur ce sujet ? »', category: 'community' },
    { id: 'p4', source: 'TrendTok', text: 'Le drama du moment commence déjà à perdre de la vitesse.', category: 'drama' },
  ], []);

  const offers = useMemo<BusinessOffer[]>(() => [
    { id: 's1', company: 'Volt Energy', type: 'sponsor', title: 'Intégration dans une vidéo', amount: 400, minSubscribers: 500 },
    { id: 'a1', company: 'CreatorHouse', type: 'agency', title: 'Contrat créateur — 15 % de commission', commission: 15, minSubscribers: 5000 },
    { id: 'c1', company: 'PixelForge', type: 'collab', title: 'Collaboration gaming', minSubscribers: 1000 },
  ], []);

  const addNotification = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    const id = `${Date.now()}-${Math.random()}`;
    setNotifications(prev => [...prev, { id, message, type }]);
    window.setTimeout(() => setNotifications(prev => prev.filter(n => n.id !== id)), 3500);
  };

  const gainSkillXp = (skill: SkillKey, amount: number) => {
    setSkillXp(prev => {
      let xp = prev[skill] + amount;
      let level = skills[skill];
      while (level < 100 && xp >= skillXpNeeded(level)) {
        xp -= skillXpNeeded(level);
        level += 1;
        setSkills(s => ({ ...s, [skill]: level }));
        addNotification(`${skillLabels[skill]} passe au niveau ${level}.`, 'success');
      }
      return { ...prev, [skill]: xp };
    });
  };

  const rest = () => {
    setCreator(prev => ({ ...prev, energy: prev.maxEnergy, stress: Math.max(0, prev.stress - 25), week: prev.week + 1 }));
    setSeries(prev => prev.map(s => ({ ...s, fatigue: Math.max(0, s.fatigue - 8) })));
    addNotification('Semaine de repos : énergie restaurée.', 'success');
  };

  const createProject = (title: string, category: VideoCategory, format: VideoFormat, language: Language, isSeries: boolean, seriesName: string, thumbnail: string) => {
    const totalWeeks = format === 'short' ? 1 : format === 'standard' ? 2 : format === 'documentary' ? 4 : 1;
    const energyToStart = format === 'documentary' ? 20 : format === 'standard' ? 15 : 10;
    if (creator.energy < energyToStart) {
      addNotification('Pas assez d’énergie pour lancer ce projet.', 'error'); return;
    }
    let seriesId: string | undefined;
    let episodeNumber: number | undefined;
    if (isSeries) {
      const existing = series.find(s => s.name.toLowerCase() === seriesName.trim().toLowerCase());
      if (existing) {
        seriesId = existing.id; episodeNumber = existing.episodeCount + 1;
      } else {
        seriesId = `series-${Date.now()}`; episodeNumber = 1;
        setSeries(prev => [...prev, { id: seriesId!, name: seriesName.trim() || title, category, popularity: 5, loyalty: 5, expectation: 10, fatigue: 0, season: 1, episodeCount: 0, lastViews: 0, status: 'active' }]);
      }
    }
    setCreator(prev => ({ ...prev, energy: prev.energy - energyToStart, stress: Math.min(100, prev.stress + 5) }));
    const tasks = taskTemplates.map(task => ({ ...task, done: false }));
    if (!creator.showsFace) tasks.find(t => t.id === 'camera')!.done = true;
    const project: VideoProject = {
      id: `video-${Date.now()}`, title: title.trim(), category, format, language, isFeat: false, isSeries,
      seriesId, episodeNumber, totalWeeks, weeksDone: 0, quality: 35 + Math.min(20, skills.writing + skills.editing), hype: 0, tasks, thumbnail, published: false,
    };
    setProjects(prev => [...prev, project]);
    addNotification(`Projet « ${title.trim()} » lancé.`, 'success');
  };

  const workOnProject = (projectId: string, taskId: string) => {
    const project = projects.find(p => p.id === projectId);
    if (!project) return;
    const task = project.tasks.find(t => t.id === taskId);
    if (!task || task.done) return;
    if (skills[task.skill] < task.requiredLevel) { addNotification(`Compétence ${skillLabels[task.skill]} niveau ${task.requiredLevel} requise.`, 'error'); return; }
    if (creator.energy < task.energyCost) { addNotification('Énergie insuffisante.', 'error'); return; }
    setCreator(prev => ({ ...prev, energy: prev.energy - task.energyCost }));
    setProjects(prev => prev.map(p => p.id === projectId ? { ...p, quality: Math.min(100, p.quality + task.qualityGain + Math.floor(skills[task.skill] / 20)), tasks: p.tasks.map(t => t.id === taskId ? { ...t, done: true } : t) } : p));
    gainSkillXp(task.skill, task.xpGain);
  };

  const advanceTurn = () => {
    setCreator(prev => ({ ...prev, week: prev.week + 1, stress: Math.min(100, prev.stress + 2) }));
    setProjects(prev => prev.map(p => p.weeksDone < p.totalWeeks ? { ...p, weeksDone: p.weeksDone + 1 } : p));
    setSeries(prev => prev.map(s => ({ ...s, fatigue: Math.min(100, s.fatigue + (s.status === 'active' ? 2 : 0)) })));
    addNotification('Une semaine passe.', 'info');
  };

  const publishVideo = (projectId: string) => {
    const project = projects.find(p => p.id === projectId);
    if (!project || project.weeksDone < project.totalWeeks) return;
    const trend = trends.find(t => t.category === project.category);
    const matchingSeries = project.seriesId ? series.find(s => s.id === project.seriesId) : undefined;
    const audienceBase = project.category === 'Documentaire' || project.category === 'Cinéma' ? 1800 : project.category === 'Gaming' ? 900 : 650;
    const existingAudience = Math.max(1, creator.subscribers);
    const subscriberFactor = 1 + Math.log10(existingAudience) * 0.18;
    const qualityFactor = 0.35 + project.quality / 100;
    const trendFactor = trend ? 1 + (trend.intensity - 1) * 0.65 : 1;
    const seriesFactor = matchingSeries ? 1 + matchingSeries.loyalty / 160 : 1;
    const random = 0.65 + Math.random() * 0.8;
    const buzzChance = Math.min(0.18, 0.015 + Math.log10(existingAudience) * 0.018 + project.quality / 1000);
    const buzz = Math.random() < buzzChance;
    const buzzFactor = buzz ? 6 + Math.random() * 10 : 1;
    const views = Math.max(80, Math.round(audienceBase * subscriberFactor * qualityFactor * trendFactor * seriesFactor * random * buzzFactor));
    const subsGain = Math.max(2, Math.round(views * (project.category === 'Documentaire' ? 0.012 : 0.008) * (project.isSeries ? 1.15 : 1)));
    const moneyGain = Math.max(1, Math.round(views * 0.0025));
    const published: PublishedVideo = { id: `published-${Date.now()}`, projectId: project.id, title: project.title, category: project.category, format: project.format, thumbnail: project.thumbnail, views, subscribersGained: subsGain, week: creator.week, seriesId: project.seriesId, episodeNumber: project.episodeNumber };
    setPublishedVideos(prev => [published, ...prev]);
    if (project.seriesId && matchingSeries) {
      setPlaylists(prev => { const existing = prev.find(p => p.title === matchingSeries.name); if (existing) return prev.map(p => p.id===existing.id ? { ...p, videoIds: p.videoIds.includes(published.id) ? p.videoIds : [...p.videoIds, published.id] } : p); return [...prev, { id:`playlist-series-${matchingSeries.id}`, title:matchingSeries.name, description:'Épisodes de la série.', videoIds:[published.id] }]; });
    }
    setCreator(prev => ({ ...prev, subscribers: prev.subscribers + subsGain, money: prev.money + moneyGain, reputation: Math.min(100, prev.reputation + (buzz ? 4 : 1)) }));
    if (matchingSeries) {
      setSeries(prev => prev.map(s => s.id === matchingSeries.id ? { ...s, episodeCount: s.episodeCount + 1, lastViews: views, popularity: Math.min(100, s.popularity + Math.min(12, views / 50000)), loyalty: Math.min(100, s.loyalty + (views > 10000 ? 3 : 1)), expectation: Math.min(100, s.expectation + (views > 10000 ? 7 : 2)), fatigue: Math.min(100, s.fatigue + 8) } : s));
    }
    setProjects(prev => prev.filter(p => p.id !== projectId));
    addNotification(`${buzz ? 'BUZZ ! ' : ''}${views.toLocaleString('fr-FR')} vues · +${subsGain.toLocaleString('fr-FR')} abonnés · +${moneyGain} €`, buzz ? 'success' : 'info');
  };

  const toggleFace = () => setCreator(prev => ({ ...prev, showsFace: !prev.showsFace }));

  const createPlaylist = (title:string) => { if(!title.trim()) return; setPlaylists(prev => [...prev, { id:`playlist-${Date.now()}`, title:title.trim(), description:'', videoIds:[] }]); };
  const addToPlaylist = (playlistId:string, videoId:string) => setPlaylists(prev => prev.map(p => p.id===playlistId && !p.videoIds.includes(videoId) ? { ...p, videoIds:[...p.videoIds, videoId] } : p));
  return { creator, skills, skillXp, equipment, crew, projects, publishedVideos, playlists, series, notifications, trends, socialPosts, offers, rest, createProject, workOnProject, advanceTurn, publishVideo, toggleFace, createPlaylist, addToPlaylist };
}
