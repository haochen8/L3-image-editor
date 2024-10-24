import{l as s,I as c}from"./ImageProcessor-DlgxIV8o.js";const g=document.getElementById("fileInput"),d=document.getElementById("rotateButton"),l=document.getElementById("resetButton"),m=document.getElementById("grayScaleButton"),u=document.getElementById("contrastInput"),I=document.getElementById("brightnessInput"),p=document.getElementById("noiseButton"),h=document.getElementById("invertButton"),n=document.getElementById("errorMessage"),v=document.getElementById("saveButton"),a=document.getElementById("canvas"),f=a.getContext("2d",{willREADFrequently:!0});let t;["dragenter","dragover","dragleave","drop"].forEach(e=>{a.addEventListener(e,o=>{o.preventDefault(),o.stopPropagation()})});a.addEventListener("drop",async e=>{const o=e.dataTransfer.files[0];if(o)try{const i=await s(o);t=new c(i),r(t.getImageData())}catch(i){console.error(i),n.textContent="Invalid image file, try png or jpg"}});a.addEventListener("click",()=>g.click());g.addEventListener("change",async e=>{const o=e.target.files[0];try{const i=await s(o);t=new c(i),r(t.getImageData())}catch(i){console.error(i),n.textContent="Invalid image file, try png or jpg"}});d.addEventListener("click",()=>{t?(n.textContent="",t.rotate(90),r(t.getImageData())):n.textContent="There is none image to rotate"});m.addEventListener("click",()=>{t?(n.textContent="",t.grayScale(),r(t.getImageData())):n.textContent="There is none image to apply grayscale"});p.addEventListener("click",()=>{t?(n.textContent="",t.noise(),r(t.getImageData())):n.textContent="There is none image to apply noise"});h.addEventListener("click",()=>{t?(n.textContent="",t.invert(),r(t.getImageData())):n.textContent="There is none image to invert"});I.addEventListener("input",e=>{if(t){const o=parseInt(e.target.value,10);t.brightness(o),r(t.getImageData())}else n.textContent="There is none image to adjust brightness"});u.addEventListener("input",e=>{if(t){n.textContent="";const o=parseFloat(e.target.value);t.contrast(o),r(t.getImageData())}else n.textContent="There is none image to adjust contrast"});l.addEventListener("click",()=>{t?(n.textContent="",t.reset(),r(t.getImageData())):n.textContent="There is none image to reset"});v.addEventListener("click",()=>{if(t){n.textContent="";const e=document.createElement("a");e.download="edited_image.png",e.href=a.toDataURL("image/png"),e.click()}else n.textContent="There is none image to save"});function x(){const e=a.getContext("2d");e.clearRect(0,0,a.width,a.height),e.fillStyle="#888",e.font="20px Arial",e.textAlign="center",e.fillText("Drop and drop an image or click to upload",a.width/2,a.height/2)}function r(e){a.width=e.width,a.height=e.height,n.textContent="",f.putImageData(e,0,0)}a.width=800;a.height=600;x();