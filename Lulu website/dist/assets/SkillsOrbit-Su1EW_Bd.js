import{n as e,t}from"./GlassCard-B1-6bg8N.js";import{D as n,E as r,T as i,a,c as o,l as s,m as c,n as l,o as u,p as d,r as f,s as p,t as m}from"./index-a6WqmBZu.js";var h=n(r(),1),g=i(),_=`
  varying vec3 vNormal;
  varying vec3 vPosition;
  varying vec3 vWorldPosition;
  varying vec2 vUv;

  void main() {
    vec4 worldPos = modelMatrix * vec4(position, 1.0);
    vWorldPosition = worldPos.xyz;
    vNormal = normalize(mat3(modelMatrix) * normal);
    vPosition = position;
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`,v=`
  varying vec3 vNormal;
  varying vec3 vPosition;
  varying vec3 vWorldPosition;
  varying vec2 vUv;
  uniform vec3 uBaseColor;
  uniform vec3 uHoverColor;
  uniform float uHover;
  uniform float uTime;
  uniform vec3 uViewPosition;

  float hash(vec3 p) {
    return fract(sin(dot(p, vec3(127.1, 311.7, 74.7))) * 43758.5453);
  }

  float noise(vec3 p) {
    vec3 i = floor(p);
    vec3 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(mix(hash(i), hash(i + vec3(1,0,0)), f.x),
          mix(hash(i + vec3(0,1,0)), hash(i + vec3(1,1,0)), f.x), f.y),
      mix(mix(hash(i + vec3(0,0,1)), hash(i + vec3(1,0,1)), f.x),
          mix(hash(i + vec3(0,1,1)), hash(i + vec3(1,1,1)), f.x), f.y), f.z);
  }

  float fbm(vec3 p) {
    float v = 0.0;
    float a = 0.5;
    float f = 1.0;
    for (int i = 0; i < 5; i++) {
      v += a * noise(p * f);
      f *= 2.1;
      a *= 0.45;
    }
    return v;
  }

  void main() {
    vec3 N = normalize(vNormal);
    vec3 V = normalize(uViewPosition - vWorldPosition);

    // Vibrant Fresnel — much stronger atmosphere
    float fresnel = pow(1.0 - abs(dot(N, V)), 2.2);
    float fresnelEdge = pow(1.0 - abs(dot(N, V)), 4.5);
    float fresnelCore = pow(1.0 - abs(dot(N, V)), 7.0);

    // Surface detail with more contrast
    float n1 = fbm(vPosition * 4.5 + uTime * 0.08);
    float n2 = fbm(vPosition * 8.5 - uTime * 0.12);
    float n3 = fbm(vPosition * 18.0 + uTime * 0.06);
    float surfaceDetail = n1 * 0.45 + n2 * 0.35 + n3 * 0.2;

    // Brighter surface
    vec3 surfaceColor = mix(uBaseColor, uHoverColor, uHover * 0.6);
    surfaceColor = mix(surfaceColor * 0.6, surfaceColor * 1.6, surfaceDetail);

    // Stronger lighting
    vec3 lightDir = normalize(vec3(1.0, 0.5, 0.4));
    float diffuse = dot(N, lightDir) * 0.5 + 0.5;
    float specular = pow(max(dot(reflect(-lightDir, N), V), 0.0), 24.0) * 0.5;

    // Bright atmosphere glow
    vec3 atmosColor = mix(uBaseColor, vec3(0.7, 0.85, 1.0), 0.55) * 2.8;

    // Build color
    vec3 color = surfaceColor * (0.3 + diffuse * 0.6);
    color += specular * uBaseColor * 2.0;

    // Thick fresnel atmosphere halo
    color += atmosColor * fresnel * (0.7 + uHover * 0.6);
    // Sharp edge glow
    color += atmosColor * fresnelEdge * 0.5;
    // Inner bright ring
    color += atmosColor * fresnelCore * 0.4;

    // Hover brightening
    color *= 1.0 + uHover * 0.5;
    // Boost overall brightness
    color *= 1.15;

    gl_FragColor = vec4(color, 1.0);
  }
`;function y({position:e=[0,0,0],radius:t=.6,baseColor:n=`#8B5CF6`,hoverColor:r=`#C4B5FD`,label:i,orbitRadius:a=0,orbitSpeed:c=0,onClick:l,hasRing:d=!1}){let m=(0,h.useRef)(null),y=(0,h.useRef)(null),b=(0,h.useRef)(null),x=(0,h.useRef)(null),[S,C]=(0,h.useState)(!1),w=(0,h.useRef)(Math.random()*Math.PI*2),T=(0,h.useRef)(0),E=(0,h.useMemo)(()=>({uBaseColor:{value:new u(n)},uHoverColor:{value:new u(r)},uHover:{value:0},uTime:{value:0},uViewPosition:{value:new s(0,0,8)}}),[n,r]),D=(0,h.useMemo)(()=>{let e=new o(t*1.35,t*2.3,160);return e.rotateX(Math.PI/2+.4),e},[t]);return f(({camera:e},t)=>{if(y.current&&a>0&&(w.current+=t*c*.45,y.current.position.x=Math.cos(w.current)*a,y.current.position.z=Math.sin(w.current)*a*.5),m.current){T.current+=t*2,m.current.rotation.y=T.current;let n=S?1.4:1,r=p.lerp(m.current.scale.x,n,.18);m.current.scale.setScalar(r),E.uHover.value=p.lerp(E.uHover.value,+!!S,.2),E.uTime.value+=t,E.uViewPosition.value.copy(e.position)}b.current&&(b.current.rotation.z+=t*.5),x.current&&x.current.scale.setScalar(1+Math.sin(Date.now()*.002)*.04)}),(0,g.jsxs)(`group`,{ref:y,children:[(0,g.jsxs)(`mesh`,{ref:x,position:e,children:[(0,g.jsx)(`sphereGeometry`,{args:[t*1.5,32,32]}),(0,g.jsx)(`meshBasicMaterial`,{color:n,transparent:!0,opacity:.08,side:1,depthWrite:!1})]}),d&&(0,g.jsxs)(`mesh`,{ref:b,position:e,children:[(0,g.jsx)(`primitive`,{object:D,attach:`geometry`}),(0,g.jsx)(`meshBasicMaterial`,{color:S?r:n,transparent:!0,opacity:S?.45:.22,side:2,depthWrite:!1})]}),(0,g.jsxs)(`mesh`,{ref:m,position:e,onClick:e=>{e.stopPropagation(),l?.()},onPointerOver:()=>C(!0),onPointerOut:()=>C(!1),children:[(0,g.jsx)(`sphereGeometry`,{args:[t,80,80]}),(0,g.jsx)(`shaderMaterial`,{vertexShader:_,fragmentShader:v,uniforms:E})]}),(0,g.jsxs)(`mesh`,{position:e,scale:[1.3,1.3,1.3],children:[(0,g.jsx)(`sphereGeometry`,{args:[t,48,48]}),(0,g.jsx)(`meshBasicMaterial`,{color:S?r:n,transparent:!0,opacity:S?.28:.12,side:1,depthWrite:!1})]}),(0,g.jsxs)(`mesh`,{position:e,scale:[1.1,1.1,1.1],children:[(0,g.jsx)(`sphereGeometry`,{args:[t,48,48]}),(0,g.jsx)(`meshBasicMaterial`,{color:n,transparent:!0,opacity:S?.15:.06,side:0,depthWrite:!1})]}),S&&(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)(`pointLight`,{position:e,color:r,intensity:4,distance:5}),(0,g.jsx)(`pointLight`,{position:[e[0],e[1]+1,e[2]],color:n,intensity:2,distance:3})]})]})}function b({radius:e=5,tiltX:t=0,tiltZ:n=0,dotCount:r=12,dotColor:i=`#6C5CE7`,lineColor:o=`#FFFFFF`,speed:c=.3,dotSize:l=.06}){let d=(0,h.useRef)(null),m=(0,h.useMemo)(()=>{let t=[];for(let n=0;n<=128;n++){let r=n/128*Math.PI*2;t.push(new s(Math.cos(r)*e,0,Math.sin(r)*e))}return new a().setFromPoints(t)},[e]),_=(0,h.useMemo)(()=>Array.from({length:r},(e,t)=>({angle:t/r*Math.PI*2,y:(Math.random()-.5)*.3})),[r]),v=(0,h.useRef)([]);f((t,n)=>{d.current&&(d.current.rotation.y+=n*c*.1),v.current.forEach((t,r)=>{if(!t)return;let i=_[r];i.angle+=n*c*(.6+Math.random()*.02),t.position.x=Math.cos(i.angle)*e,t.position.z=Math.sin(i.angle)*e,t.position.y+=Math.sin(Date.now()*.001+r)*5e-4,t.position.y=p.clamp(t.position.y,-.15,.15);let a=1+Math.sin(Date.now()*.003+r)*.4;t.scale.setScalar(a)})});let y=new u(i),b=new u(o);return(0,g.jsxs)(`group`,{ref:d,rotation:[t,0,n],children:[(0,g.jsxs)(`lineSegments`,{children:[(0,g.jsx)(`primitive`,{object:m,attach:`geometry`}),(0,g.jsx)(`lineBasicMaterial`,{color:b,transparent:!0,opacity:.08,depthWrite:!1})]}),_.map((e,t)=>(0,g.jsxs)(`mesh`,{ref:e=>{v.current[t]=e},children:[(0,g.jsx)(`sphereGeometry`,{args:[l,8,8]}),(0,g.jsx)(`meshBasicMaterial`,{color:y,transparent:!0,opacity:.9,depthWrite:!1})]},t))]})}var x=[{name:`React`,category:`frontend`,level:95,color:`#61DAFB`},{name:`TypeScript`,category:`frontend`,level:90,color:`#3178C6`},{name:`Next.js`,category:`frontend`,level:88,color:`#FFFFFF`},{name:`Tailwind CSS`,category:`frontend`,level:92,color:`#06B6D4`},{name:`Vue.js`,category:`frontend`,level:75,color:`#4FC08D`},{name:`Node.js`,category:`backend`,level:85,color:`#339933`},{name:`Python`,category:`backend`,level:80,color:`#3776AB`},{name:`PostgreSQL`,category:`backend`,level:78,color:`#4169E1`},{name:`GraphQL`,category:`backend`,level:72,color:`#E10098`},{name:`Figma`,category:`design`,level:85,color:`#F24E1E`},{name:`Three.js`,category:`design`,level:80,color:`#FFFFFF`},{name:`Framer Motion`,category:`design`,level:82,color:`#0055FF`},{name:`Docker`,category:`tools`,level:75,color:`#2496ED`},{name:`Git`,category:`tools`,level:90,color:`#F05032`},{name:`Vite`,category:`tools`,level:88,color:`#BD34FE`}],S={frontend:`#61DAFB`,backend:`#339933`,design:`#F24E1E`,tools:`#BD34FE`},C={frontend:`Frontend`,backend:`Backend`,design:`Design`,tools:`DevOps & Tools`},w=x.reduce((e,t)=>((e[t.category]??=[]).push(t),e),{}),T=Object.keys(w),E=[{radius:3.8,tiltX:.4,tiltZ:.1,speed:.6},{radius:5.2,tiltX:-.3,tiltZ:-.15,speed:.45},{radius:6.6,tiltX:.25,tiltZ:.2,speed:.35},{radius:8,tiltX:-.2,tiltZ:-.1,speed:.28}];function D(){let[n,r]=(0,h.useState)(null);return(0,g.jsxs)(`section`,{id:`skills`,className:`relative min-h-screen w-full overflow-hidden py-24`,children:[(0,g.jsx)(l,{camera:{fov:50,near:.1,far:100,position:[0,1.5,12]},children:(0,g.jsxs)(h.Suspense,{fallback:null,children:[(0,g.jsx)(m,{}),(0,g.jsx)(`ambientLight`,{intensity:.4}),T.map((e,t)=>(0,g.jsx)(b,{radius:E[t].radius,tiltX:E[t].tiltX,tiltZ:E[t].tiltZ,dotColor:S[e],speed:E[t].speed,dotCount:10+t*3},e)),T.flatMap((e,t)=>w[e].map((n,i)=>(0,g.jsx)(y,{radius:.35+n.level*.004,baseColor:n.color??S[e],hoverColor:S[e],orbitRadius:E[t].radius,orbitSpeed:E[t].speed*(.7+i*.2),onClick:()=>r(n)},n.name))),(0,g.jsx)(y,{position:[0,0,0],radius:.7,baseColor:`#FFFFFF`,hoverColor:`#6C5CE7`,label:`Core`})]})}),(0,g.jsx)(`div`,{className:`pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-cosmic-void/40 via-transparent to-cosmic-void/80`}),(0,g.jsxs)(`div`,{className:`relative z-10`,children:[(0,g.jsx)(e,{title:`Skill Orbit`,subtitle:`Where My Abilities Orbit`,align:`center`}),(0,g.jsx)(`div`,{className:`mx-auto mb-12 flex flex-wrap justify-center gap-4`,children:T.map(e=>(0,g.jsxs)(`span`,{className:`glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs text-text-secondary`,children:[(0,g.jsx)(`span`,{className:`inline-block h-2 w-2 rounded-full`,style:{backgroundColor:S[e]}}),C[e]]},e))})]}),(0,g.jsx)(c,{children:n&&(0,g.jsx)(d.div,{initial:{opacity:0,y:20,scale:.95},animate:{opacity:1,y:0,scale:1},exit:{opacity:0,y:20,scale:.95},className:`relative z-20 mx-auto max-w-sm px-4`,children:(0,g.jsxs)(t,{hoverEffect:`glow`,className:`p-6 text-center`,children:[(0,g.jsx)(`div`,{className:`mx-auto mb-3 h-3 w-3 rounded-full`,style:{backgroundColor:n.color??S[n.category]}}),(0,g.jsx)(`h3`,{className:`font-heading text-lg font-bold text-white`,children:n.name}),(0,g.jsx)(`p`,{className:`mt-1 text-xs text-text-muted uppercase tracking-wider`,children:C[n.category]}),(0,g.jsx)(`div`,{className:`mt-4 h-1.5 w-full overflow-hidden rounded-full bg-white/[0.06]`,children:(0,g.jsx)(d.div,{initial:{width:0},animate:{width:`${n.level}%`},transition:{duration:1,ease:`easeOut`},className:`h-full rounded-full`,style:{background:`linear-gradient(90deg, ${n.color??S[n.category]}, ${S[n.category]})`}})}),(0,g.jsxs)(`p`,{className:`mt-2 font-mono text-xs text-text-muted`,children:[`Proficiency: `,n.level,`%`]}),(0,g.jsx)(`button`,{onClick:()=>r(null),className:`mt-4 text-xs text-text-muted underline transition-colors hover:text-white`,children:`Close`})]})})})]})}export{D as default};