const qaMode = new URLSearchParams(location.search).has('qa')

const projects = [
  { id:'lottolab', index:'01', name:'LOTTO LAB', type:'Mobile Application · Android', shortType:'MOBILE · ANDROID', status:'ANDROID', headline:'AI × SAJU × LOTTERY', description:'AI와 사주 분석을 결합한 ALL-IN-ONE 로또 플랫폼. 번호 추천, 분석, 저장 등 로또 관련 경험을 하나의 Android 앱으로 통합했습니다.', tags:['AI Recommendation','Android','Mobile UX'], image:'assets/lottolab.webp', mode:'icon', url:'https://play.google.com/store/apps/details?id=com.pixground.lotterymobile', cta:'GOOGLE PLAY' },
  { id:'orbit', index:'02', name:'ORBIT', type:'Web Platform · FinTech Research', shortType:'WEB PLATFORM · FINTECH', status:'FINTECH', headline:'CRYPTO × STOCK × ETF', description:'가상자산, 국내주식, 해외주식, ETF를 하나의 리서치 경험으로 연결하는 멀티에셋 플랫폼. 뉴스, 인사이트, 자산 정보와 다국어 구조를 포함합니다.', tags:['Multi-Asset','Research','Global UX'], image:'assets/orbit.webp', mode:'screen', url:null, cta:'PRIVATE PROJECT' },
  { id:'earnboxing', index:'03', name:'EARNBOXING', type:'Mini App · Toss', shortType:'MINI APP · TOSS', status:'TOSS MINI APP', headline:'PLAY × REWARD × TOSS', description:'Toss Apps-in-Toss 환경과 MCP 규격을 고려해 설계한 인터랙티브 리워드 Mini App. 제한된 플랫폼 환경에서 반복 참여 UX를 설계했습니다.', tags:['Apps-in-Toss','Reward UX','Mini App'], image:'assets/earnboxing.webp', mode:'icon', url:null, cta:'TARGET: APPS-IN-TOSS' },
  { id:'decision-room', index:'04', name:'AI DECISION ROOM', type:'Enterprise SaaS · AI Collaboration', shortType:'ENTERPRISE SAAS · AI', status:'PLANNING + DEV', headline:'HUMAN × MULTI AI × DECISION', description:'채팅방 안에서 인간과 여러 AI Agent가 함께 의견을 제안·분석하고, 인간이 최종 판단을 수행하는 Enterprise Decision Platform.', tags:['Multi AI Agent','Decision Flow','Enterprise'], image:null, mode:'ai', url:null, cta:'IN DEVELOPMENT' }
]

const nodesRoot = document.getElementById('orbitNodes')
const detail = document.getElementById('projectDetail')
const mobileRoot = document.getElementById('projectsMobile')
const progressFill = document.getElementById('progressFill')
const progressIndex = document.getElementById('progressIndex')
const work = document.getElementById('work')
let activeIndex = 0
let progress = 0

function aiPreview(){return `<div class="ai-preview"><div class="ai-preview__bar"><span>DECISION ROOM / 04</span><i></i><span>LIVE AGENTS 04</span></div><div class="ai-preview__body"><div class="ai-preview__thread"><div class="agent-line"><b>STRATEGY</b><span>시장성과 사용자 흐름을 기준으로 안을 비교합니다.</span></div><div class="agent-line"><b>RISK</b><span>운영 비용과 예외 시나리오를 점검합니다.</span></div><div class="agent-line"><b>TECH</b><span>구현 복잡도와 확장성 기준으로 판단합니다.</span></div></div><div class="ai-preview__decision"><small>HUMAN CONFIRMATION</small><strong>DECISION<br>READY</strong><span>03 / 04 AGENTS ALIGNED</span></div></div></div>`}

function visual(p, mobile=false){
  const cls = mobile ? 'mobile-project__visual' : 'project-preview'
  if (!p.image) return `<div class="${cls} project-preview--ai">${aiPreview()}</div>`
  return `<div class="${cls} project-preview--${p.mode}"><img src="${p.image}" alt="${p.name} 프로젝트 화면" ${mobile?'loading="lazy"':''}></div>`
}

function renderNodes(){
  nodesRoot.innerHTML = projects.map((p,i)=>`<button class="orbit-node" data-i="${i}" type="button"><span class="orbit-node__dot"></span><span class="orbit-node__copy"><strong>${p.name}</strong><small>${p.shortType}</small></span></button>`).join('')
  nodesRoot.querySelectorAll('.orbit-node').forEach(btn=>btn.addEventListener('click',()=>scrollToProject(+btn.dataset.i)))
}
function renderDetail(){
  const p=projects[activeIndex]
  detail.innerHTML=`<div class="project-detail__meta"><span>${p.index} / 04</span><span>${p.status}</span></div><h3>${p.name}</h3><p class="project-detail__type">${p.type}</p><p class="project-detail__headline">${p.headline}</p><p class="project-detail__description">${p.description}</p><div class="project-tags">${p.tags.map(t=>`<span>${t}</span>`).join('')}</div>${p.url?`<a href="${p.url}" target="_blank" rel="noreferrer" class="text-link">${p.cta}<span>↗</span></a>`:`<span class="project-status">${p.cta}</span>`}${visual(p)}`
}
function renderMobile(){
  mobileRoot.innerHTML=projects.map(p=>`<article class="mobile-project"><div class="mobile-project__top"><span>${p.index}</span><span>${p.status}</span></div><h3>${p.name}</h3><p class="project-detail__type">${p.type}</p><p>${p.description}</p>${visual(p,true)}${p.url?`<a href="${p.url}" target="_blank" rel="noreferrer" class="text-link">${p.cta}<span>↗</span></a>`:`<span class="project-status">${p.cta}</span>`}</article>`).join('')
}
function updateOrbit(){
  const rotation=-progress*270
  document.querySelectorAll('.orbit-node').forEach((node,i)=>{
    const angle=(i*90+rotation)*Math.PI/180
    const x=50+Math.cos(angle)*34, y=50+Math.sin(angle)*35, depth=(Math.cos(angle)+1)/2
    node.style.left=`${x}%`;node.style.top=`${y}%`;node.style.transform=`translate(-50%,-50%) scale(${.76+depth*.28})`;node.style.opacity=.34+depth*.66;node.style.zIndex=Math.round(depth*10+1);node.classList.toggle('is-active',i===activeIndex)
  })
  progressFill.style.width=`${progress*100}%`;progressIndex.textContent=projects[activeIndex].index
}
function scrollToProject(i){
  if(innerWidth<=900)return
  const start=work.offsetTop, distance=work.offsetHeight-innerHeight
  scrollTo({top:start+distance*(i/(projects.length-1)),behavior:'smooth'})
}
function onScroll(){
  document.getElementById('header').classList.toggle('is-scrolled',scrollY>24)
  if(innerWidth>900){const start=work.offsetTop, distance=Math.max(1,work.offsetHeight-innerHeight);progress=Math.min(1,Math.max(0,(scrollY-start)/distance));const next=Math.min(3,Math.round(progress*3));if(next!==activeIndex){activeIndex=next;renderDetail()}updateOrbit()}
  const hero=document.querySelector('.core-scene');if(hero&&matchMedia('(prefers-reduced-motion: no-preference)').matches){hero.style.transform=`translateY(${Math.min(32,scrollY*.035)}px) scale(${1+Math.min(.035,scrollY*.00004)})`}
  const portal=document.querySelector('.portal-wrap img');if(portal){const r=document.querySelector('.contact').getBoundingClientRect();const q=Math.min(1,Math.max(0,1-r.top/innerHeight));portal.style.transform=`translateY(${-q*12}px) scale(${1+q*.03})`}
}
renderNodes();renderDetail();renderMobile();updateOrbit();addEventListener('scroll',onScroll,{passive:true});addEventListener('resize',onScroll);onScroll()

// Mobile menu
const menuButton=document.getElementById('menuButton'), mobileMenu=document.getElementById('mobileMenu')
menuButton.addEventListener('click',()=>{const open=mobileMenu.classList.toggle('is-open');menuButton.setAttribute('aria-expanded',String(open))})
mobileMenu.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{mobileMenu.classList.remove('is-open');menuButton.setAttribute('aria-expanded','false')}))

// White square pointer particles
const canvas=document.getElementById('pointerParticles'),ctx=canvas.getContext('2d',{alpha:true}),particles=[];let dpr=1,raf
const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches||!matchMedia('(pointer:fine)').matches
function resizeCanvas(){dpr=Math.min(devicePixelRatio||1,2);canvas.width=innerWidth*dpr;canvas.height=innerHeight*dpr;canvas.style.width=innerWidth+'px';canvas.style.height=innerHeight+'px';ctx.setTransform(dpr,0,0,dpr,0,0)}resizeCanvas();addEventListener('resize',resizeCanvas)
function spawn(e,count,speed,spread){if(reduce)return;for(let i=0;i<count;i++){if(particles.length>650)particles.shift();const sz=Math.random()*9+1, sp=spread*(Math.min(speed,30)*.045+.15);particles.push({x:e.clientX,y:e.clientY,size:sz,decay:Math.random()*.12+.08,vx:(Math.random()-.5)*sp-(e.movementX||0)*.08,vy:(Math.random()-.5)*sp-(e.movementY||0)*.08,g:(Math.random()-.7)*.025,o:Math.random()*.4+.5})}}
addEventListener('pointermove',e=>{const v=Math.hypot(e.movementX||0,e.movementY||0);spawn(e,Math.min(3+Math.floor(v*.25),10),v,10)},{passive:true});addEventListener('click',e=>spawn(e,72,18,62),{passive:true})
function animate(){ctx.clearRect(0,0,innerWidth,innerHeight);for(let i=particles.length-1;i>=0;i--){const p=particles[i],s=Math.max(0,p.size);ctx.fillStyle=`rgba(255,255,255,${p.o})`;ctx.fillRect(Math.round(p.x-s/2),Math.round(p.y-s/2),Math.max(1,Math.round(s)),Math.max(1,Math.round(s)));p.x+=p.vx*.18;p.y+=p.vy*.18;p.vy+=p.g;p.vx*=.985;p.vy*=.985;p.size-=p.decay;p.o-=.012;if(p.size<=.2||p.o<=0)particles.splice(i,1)}raf=requestAnimationFrame(animate)}
if (!qaMode) animate()
