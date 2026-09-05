export const evaluators={
  'shot-list-coverage-validator': i=>{const rows=(i.required||[]).map(r=>{const hits=(i.shots||[]).filter(s=>s.scene===r.scene&&(s.ratios||[]).includes(r.ratio)).map(s=>s.id);return{...r,shots:hits,covered:hits.length>0}});return{valid:rows.length>0&&rows.every(x=>x.covered),rows,missing:rows.filter(x=>!x.covered)}},
  'storyboard-sequence-gap-detector': i=>{const nums=(i.frames||[]).map(x=>Number(x.sequence)).filter(Number.isFinite).sort((a,b)=>a-b),duplicates=[...new Set(nums.filter((x,n)=>n&&x===nums[n-1]))],missing=[];for(let n=nums[0]||1;n<=(nums.at(-1)||0);n++)if(!nums.includes(n))missing.push(n);return{valid:nums.length>0&&!duplicates.length&&!missing.length,missing,duplicates}}
};
export function evaluate(slug,input){const fn=evaluators[slug];if(!fn)throw new Error('Unknown tool');return fn(input)}
