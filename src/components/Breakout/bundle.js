(()=>{"use strict";const t=class{constructor(t,e,i=75,s=20,h=1,d="red",r=10,o=30,n=30){this.x=t*(i+r)+n,this.y=e*(s+r)+o,this.width=i,this.height=s,this.status=h,this.color=d}},e=document.getElementById("myCanvas"),i=e.getContext("2d"),s=[];function h(t,e){i.beginPath(),i.arc(t,e,30,0,2*Math.PI),i.arc(t+30,e,25,0,2*Math.PI),i.fillStyle="white",i.fill()}!function(){for(let e=0;e<5;e+=1){s[e]=[];for(let i=0;i<3;i+=1)s[e][i]=new t(e,i)}}();let d=3,r=0;const o="red",n=new class{constructor(t,e,i=10,s="red",h=2,d=-2){this.x=t,this.y=e,this.radius=i,this.color=s,this.dx=h,this.dy=d}move(){this.x+=this.dx,this.y+=this.dy}render(t){t.beginPath(),t.arc(this.x,this.y,this.radius,0,2*Math.PI),t.fillStyle=this.color,t.fill(),t.closePath()}}(e.width/2,e.height-30,10,"red"),l=new class{constructor(t,e=75,i=10,s="red",h=7,d){this.x=t,this.width=e,this.height=i,this.color=s,this.dx=h,this.keyPressed="none",this.canvas=d}move(){"left"===this.keyPressed?this.x-=this.dx:"right"===this.keyPressed&&(this.x+=this.dx)}render(t){t.beginPath(),t.rect(this.x,this.canvas.height-this.height,this.width,this.height),t.fillStyle=this.color,t.fill(),t.closePath()}}((e.width-75)/2,75,10,"red",7,e);document.addEventListener("mousemove",(function(t){const i=t.clientX-e.offsetLeft;i>0&&i<e.width&&(l.x=i-l.width/2)}),!1),document.addEventListener("keydown",(function(t){"Right"===t.key||"ArrowRight"===t.key?l.keyPressed="right":"Left"!==t.key&&"ArrowLeft"!==t.key||(l.keyPressed="left")}),!1),document.addEventListener("keyup",(function(t){"Right"===t.key||"ArrowRight"===t.key?l.keyPressed="none":"Left"!==t.key&&"ArrowLeft"!==t.key||(l.keyPressed="none")}),!1),function t(){i.clearRect(0,0,e.width,e.height),function(){const t=i.createLinearGradient(0,0,0,320);t.addColorStop(0,"cornflowerblue"),t.addColorStop(1,"white"),i.fillStyle=t,i.fillRect(0,0,480,320)}(),h(100,60),h(300,100),n.render(i),l.render(i),i.font="16px Arial",i.fillStyle=o,i.fillText("Lives: "+d,e.width-65,20),i.font="16px Arial",i.fillStyle=o,i.fillText("Score: "+r,8,20),function(){for(let t=0;t<5;t+=1)for(let e=0;e<3;e+=1)1===s[t][e].status&&(i.beginPath(),i.rect(s[t][e].x,s[t][e].y,s[t][e].width,s[t][e].height),i.fillStyle=o,i.fill(),i.closePath())}(),function(){for(let t=0;t<5;t+=1)for(let e=0;e<3;e+=1){const i=s[t][e];1===i.status&&n.x>i.x&&n.x<i.x+i.width&&n.y>i.y&&n.y<i.y+i.height&&(n.dy=-n.dy,i.status=0,r+=1,15===r&&(alert("YOU WIN, CONGRATULATIONS!"),document.location.reload()))}}(),(n.x+n.dx>e.width-n.radius||n.x+n.dx<n.radius)&&(n.dx=-n.dx),n.y+n.dy<n.radius?n.dy=-n.dy:n.y+n.dy>e.height-n.radius&&(n.x>l.x&&n.x<l.x+l.width?n.dy=-n.dy:(d-=1,d?(n.x=e.width/2,n.y=e.height-30,n.dx=2,n.dy=-2,l.x=(e.width-l.width)/2):(alert("GAME OVER"),document.location.reload()))),n.move(),l.move(),requestAnimationFrame(t)}()})();