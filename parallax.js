(()=>{
  const reduceMotion=window.matchMedia('(prefers-reduced-motion: reduce)');
  const style=document.createElement('style');
  style.textContent=`
    body{position:relative;isolation:isolate;background:#02070b!important}
    body::before{content:'';position:fixed;inset:-30vh 0;z-index:-1;pointer-events:none;background:url('assets/altair-bg.png.png') center top/100% auto no-repeat;transform:translate3d(0,var(--bg-parallax,0px),0) scale(1.06);transform-origin:center top;will-change:transform}
    @media(max-width:760px){body::before{inset:-22vh 0;background-size:auto 132%;background-position:center top;transform:translate3d(0,var(--bg-parallax,0px),0) scale(1.04)}}
    @media(prefers-reduced-motion:reduce){body::before{transform:none!important}}
  `;
  document.head.appendChild(style);

  let ticking=false;
  function updateParallax(){
    ticking=false;
    if(reduceMotion.matches){document.body.style.setProperty('--bg-parallax','0px');return;}
    const mobile=window.innerWidth<=760;
    const factor=mobile?0.11:0.18;
    const limit=mobile?190:360;
    const y=Math.max(-limit,Math.min(limit,-window.scrollY*factor));
    document.body.style.setProperty('--bg-parallax',`${y.toFixed(1)}px`);
  }
  function requestUpdate(){if(!ticking){ticking=true;requestAnimationFrame(updateParallax)}}
  window.addEventListener('scroll',requestUpdate,{passive:true});
  window.addEventListener('resize',requestUpdate,{passive:true});
  reduceMotion.addEventListener?.('change',requestUpdate);
  updateParallax();
})();
