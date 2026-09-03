import {useCallback,useState} from 'react';
import {INITIAL_STATE} from '../game/initialState';
import {reduceGame} from '../game/engine';
import type {GameAction,GameState,Language,VideoCategory,Trend} from '../types/game';
export type {Trend} from '../types/game';

export function useGame(){
 const [state,setState]=useState<GameState>(()=>{const raw=localStorage.getItem('youtube-sim-state');if(!raw)return INITIAL_STATE;try{return JSON.parse(raw) as GameState}catch{return INITIAL_STATE}});
 const dispatch=useCallback((action:GameAction)=>setState(prev=>{const next=reduceGame(prev,action);localStorage.setItem('youtube-sim-state',JSON.stringify(next));return next}),[]);
 const createProject=(title:string,category:VideoCategory,language:Language,isFeat:boolean,turns:number,imageStock:string)=>dispatch({type:'CREATE_PROJECT',title,category,language,imageStock,format:turns>1?'documentary':'standard'});
 return {...state,rest:()=>dispatch({type:'REST'}),sleep:()=>dispatch({type:'SLEEP'}),work:(hours=3)=>dispatch({type:'WORK',hours}),createProject,advanceTurn:()=>dispatch({type:'WORK',hours:8}),publishVideo:(id:string)=>dispatch({type:'PUBLISH_VIDEO',projectId:id})};
}
