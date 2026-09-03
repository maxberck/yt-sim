import type { GameState } from '../types/game';
export const INITIAL_STATE: GameState = {
time:{date:'2026-09-03',hour:8},
creator:{name:'MonChaine',age:18,subscribers:150,money:1200,energy:100,maxEnergy:100,stress:0,reputation:10,knownLanguages:['Français'],job:'Étudiant',week:1,showsFace:false},
skills:{editing:1,writing:1,filming:1,research:1,thumbnail:1,audio:1,communication:1,storytelling:1,business:1},
equipment:{cameraLevel:1,micLevel:1,pcLevel:1},crew:{editorsCount:0,cameramenCount:0,communityManagersCount:0,managersCount:0},
reputationStats:{notoriety:5,popularity:10,credibility:8,trust:10,creatorRelations:5},
audience:[{id:'gaming',name:'Gaming',share:.55,loyalty:25,interests:['Gaming']},{id:'tech',name:'Tech',share:.15,loyalty:15,interests:['Tech']},{id:'curious',name:'Curieux occasionnels',share:.3,loyalty:5,interests:['Vlog','Documentaire','Cinéma']}],
projects:[],publishedVideos:[],playlists:[],series:[],
trends:[{id:'t1',name:'Speedrun du nouveau jeu',category:'Gaming',intensity:1.8,lifetimeHours:72,bonusMultiplier:1.8},{id:'t2',name:'Setup à 10 000 €',category:'Tech',intensity:1.45,lifetimeHours:96,bonusMultiplier:1.45},{id:'t3',name:'Enquête sur les arnaques du net',category:'Politique',intensity:1.7,lifetimeHours:120,bonusMultiplier:1.7}],
socialPosts:[{id:'p1',source:'Tendances',text:'Le speedrun du nouveau jeu commence à exploser.',category:'trend'},{id:'p2',source:'Communauté',text:'Les spectateurs demandent davantage de vidéos gaming.',category:'community'}],
offers:[],worldCreators:[{id:'c1',name:'NéoPlay',category:'Gaming',subscribers:4200,reputation:38,growthRate:.006,active:true},{id:'c2',name:'TechLab',category:'Tech',subscribers:18000,reputation:62,growthRate:.004,active:true},{id:'c3',name:'MilaVlog',category:'Vlog',subscribers:76000,reputation:70,growthRate:.003,active:true}],
pendingRevenue:0,notifications:[]
};