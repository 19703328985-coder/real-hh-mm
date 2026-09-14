'use strict';
const byId=id=>document.getElementById(id);
const modal=byId('experience'), letter=byId('letter'), wishPanel=byId('wish-panel'), flight=byId('flight'), input=byId('wish');
let timers=[],activeWish='';
function clearFlight(){timers.forEach(clearTimeout);timers=[];flight.classList.remove('flying','reduced')}
function showPanel(name){clearFlight();letter.hidden=name!=='letter';wishPanel.hidden=name!=='wish';flight.hidden=name!=='flight';modal.classList.toggle('flight-mode',name==='flight');modal.setAttribute('aria-labelledby',name==='letter'?'experience-title':name==='wish'?'wish-title':'flight-title');modal.scrollTop=0;}
function writeWish(){showPanel('wish');byId('error').hidden=true;input.focus()}
function finishFlight(){byId('flight-status').textContent='愿望已送往新的一岁';byId('arrival').hidden=false;byId('flight-title').focus()}
function takeoff(){showPanel('flight');byId('arrival').hidden=true;byId('travel-wish').textContent=activeWish;byId('wish-quote').textContent=activeWish;byId('flight-status').textContent='起飞 · 愿望正在离地';byId('close').focus();const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;if(reduced)flight.classList.add('reduced');void flight.offsetWidth;flight.classList.add('flying');if(!reduced){timers.push(setTimeout(()=>byId('flight-status').textContent='爬升 · 穿越夜色',2800));timers.push(setTimeout(()=>byId('flight-status').textContent='飞向更远的天空',5600))}timers.push(setTimeout(finishFlight,reduced?500:8200))}
byId('open').addEventListener('click',()=>{showPanel('letter');modal.showModal();document.body.style.overflow='hidden';byId('experience-title').focus()});
byId('close').addEventListener('click',()=>modal.close());
modal.addEventListener('close',()=>{clearFlight();document.body.style.overflow='';byId('open').focus()});
byId('write-wish').addEventListener('click',writeWish);
byId('back').addEventListener('click',()=>{showPanel('letter');byId('experience-title').focus()});
input.addEventListener('input',()=>{byId('wish-count').textContent=input.value.length+' / 120';byId('error').hidden=true;input.setCustomValidity('')});
byId('wish-form').addEventListener('submit',e=>{e.preventDefault();const value=input.value.trim();if(!value){byId('error').hidden=false;input.focus();return}activeWish=value;takeoff()});
byId('replay').addEventListener('click',takeoff);
byId('new-wish').addEventListener('click',()=>{input.value='';byId('wish-count').textContent='0 / 120';writeWish()});
