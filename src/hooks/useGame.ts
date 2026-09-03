import {useCallback,useState} from 'react';
import {INITIAL_STATE} from '../game/initialState';
import {reduceGame} from '../game/engine';
import type {GameAction,GameState,Language,VideoCategory,VideoFormat} from '../types/game';
export type {Trend} from '../types/game';
export function useGame(){
 const [state,setState]=useState<GameState>(()=>{const raw=localStorage.getItem('youtube-sim-state');if(!raw)return INITIAL_STATE;try{return JSON.parse(raw) as GameState}catch{return INITIAL_STATE}});
 const dispatch=useCallback((action:GameAction)=>setState(prev=>{const next=reduceGame(prev,action);localStorage.setItem('youtube-sim-state',JSON.stringify(next));return next}),[]);
 const createProject=(title:string,category:VideoCategory,format:VideoFormat,language:Language,isSeries=false,seriesName='',thumbnail='')=>dispatch({type:'CREATE_PROJECT',title,category,format,language,imageStock:thumbnail,isSeries,seriesName});
 const workOnProject=(projectId:string,taskId:string)=>dispatch({type:'WORK_PROJECT',projectId,taskId});
 const createPlaylist=(title:string,description:string)=>dispatch({type:'CREATE_PLAYLIST',title,description});
 const addToPlaylist=(playlistId:string,videoId:string)=>dispatch({type:'ADD_TO_PLAYLIST',playlistId,videoId});
 return {...state,dispatch,rest:()=>dispatch({type:'REST'}),sleep:()=>dispatch({type:'SLEEP'}),work:(hours=3)=>dispatch({type:'WORK',hours}),createProject,workOnProject,advanceTurn:()=>dispatch({type:'WORK',hours:8}),publishVideo:(id:string)=>dispatch({type:'PUBLISH_VIDEO',projectId:id}),toggleFace:()=>dispatch({type:'TOGGLE_FACE'}),createPlaylist,addToPlaylist};
}