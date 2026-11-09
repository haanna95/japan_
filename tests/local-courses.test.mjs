import test from 'node:test';
import assert from 'node:assert/strict';
import {handlePlan,validateInput} from '../server/gemini.mjs';
const v={field:'packaging',people:20,days:1,date:'2099-11-29',styles:['rest'],preferences:[],localCourseIds:['G01']};
test('local course IDs are validated and route including intermediate SCC reaches model',async()=>{assert.throws(()=>validateInput({...v,localCourseIds:['unknown']}));let called=false;const r=await handlePlan(new Request('https://example.com/api/plan',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(v)}),{GEMINI_API_KEY:'test-only'},async(url,options)=>{called=true;const prompt=JSON.parse(options.body).contents[0].parts[0].text;assert.match(prompt,/SCC \(중간 복귀\)/);assert.match(prompt,/앨리웨이 광교/);assert.match(prompt,/198석은 확인 전 참고 수치/);return new Response('',{status:429});});assert.ok(called);assert.equal(r.status,429);});
