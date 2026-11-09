export const ratioKeys=['industry','culture','food','rest'];
export function rebalanceRatios(current,key,value){
 const next={...current,[key]:Math.max(0,Math.min(100,Math.round(value)))};
 const others=ratioKeys.filter(k=>k!==key),remaining=100-next[key],total=others.reduce((n,k)=>n+current[k],0);
 const shares=others.map(k=>({key:k,value:total?remaining*current[k]/total:remaining/others.length}));
 shares.forEach(s=>next[s.key]=Math.floor(s.value));
 let extra=remaining-shares.reduce((n,s)=>n+next[s.key],0);
 shares.sort((a,b)=>(b.value%1)-(a.value%1)).slice(0,extra).forEach(s=>next[s.key]++);
 return next;
}
