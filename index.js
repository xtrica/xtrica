/*
 * xtrica v1.0.1514895434 (https://xtrica.com)
 * Copyright 2017-2018 (or 2150?) Xtrica
 * Licensed under MIT
 */
export default function(container){this.topScene=null
this.currentScene=null
this.isTransitioning=!1
this.windowHasListener=!1
this.container=container
this.toScene=(el)=>{let vm=this
return new Promise(function(resolve,reject){vm.isTransitioning=!0
if((el!==vm.currentScene)&&((el===vm.topScene)||(el&&el.classList&&el.classList.contains('xscene')))){let xscenes=vm.container.querySelectorAll('.xscene')
if(el===vm.topScene){vm.currentScene=xscenes[0]?xscenes[0]:vm.topScene
vm.topScene.style.marginTop='0'}else{for(let i=0,n=xscenes.length;i<n;i++){if(el===xscenes[i]){vm.currentScene=el
vm.topScene.style.marginTop=(i*-100)+'vh'
break}}}
setTimeout(()=>{if(vm.currentScene!==vm.topScene){let autofocus=vm.currentScene.querySelector('.xautofocus')
if(autofocus){autofocus.focus()}}
vm.isTransitioning=!1
resolve()},600)}else{vm.isTransitioning=!1
resolve()}})}
this.onKeydown=(event)=>{let vm=this
switch(!0){case(event.shiftKey&&parseInt(event.keyCode)===9):{event.preventDefault()
event.stopPropagation()
if(!!vm.currentScene&&vm.currentScene!==vm.topScene){let focusable=vm.currentScene.querySelectorAll('.xel')
if(!!focusable&&focusable.length){let focused=!1
let n=focusable.length
for(let i=0;i<n;i++){if(focusable[i]===event.target){if(focusable[i-1]){focusable[i-1].focus()}else{focusable[n-1].focus()}
focused=!0}}
if(!focused){focusable[n-1].focus()}}}
break}
case(parseInt(event.keyCode)===9):{event.preventDefault()
event.stopPropagation()
if(vm.currentScene&&vm.currentScene!==vm.topScene){let focusable=vm.currentScene.querySelectorAll('.xel')
if(!!focusable&&focusable.length){let focused=!1
for(let i=0,n=focusable.length;i<n;i++){if(focusable[i]===event.target){if(focusable[i+1]){focusable[i+1].focus()}else{focusable[0].focus()}
focused=!0}}
if(!focused){focusable[0].focus()}}}
break}
case(parseInt(event.keyCode)===13):{event.preventDefault()
event.stopPropagation()
if(!!vm.currentScene&&vm.currentScene!==vm.topScene&&!vm.isTransitioning){if(event.target.classList.contains('xev')){event.target.click()}else{let submit=vm.currentScene.querySelector('.xnext')
if(submit){submit.click()}}}
break}
case(parseInt(event.keyCode)===27):{event.preventDefault()
event.stopPropagation()
if(!!vm.currentScene&&vm.currentScene!==vm.topScene&&!vm.isTransitioning){let cancel=vm.currentScene.querySelector('.xback')
if(cancel){cancel.click()}}
break}
default:return}}
this.enter=()=>{if(this.topScene){this.toScene(this.topScene)
setTimeout(()=>{this.container.style.opacity=1},100)
return!0}else{if(!this.windowHasListener){window.addEventListener('keydown',this.onKeydown)
this.windowHasListener=!0}
this.topScene=document.createElement('div')
this.topScene.id='xtricaTop'
this.topScene.setAttribute('style','border:0 !important;display:block !important;height:0 !important;opacity:0 !important;overflow:hidden !important;padding:0 !important;transition:margin-top 600ms ease;-o-transition:margin-top 600ms ease;-ms-transition:margin-top 600ms ease;-moz-transition:margin-top 600ms ease;-webkit-transition:margin-top 600ms ease;width:100% !important;')
if(this.container.insertBefore(this.topScene,this.container.firstChild)){this.toScene(this.topScene)
setTimeout(()=>{this.container.style.opacity=1},100)
return!0}else{return!1}}}
this.init=()=>{if(!document.getElementById('xtricaStylesheet')){this.container.setAttribute('style','bottom: 0 !important; display: block !important; height: 100vh !important; left: 0 !important; opacity: 0; overflow-x: hidden !important; overflow-y: hidden !important; position: fixed !important; right: 0 !important; top: 0 !important; transition: opacity 300ms linear !important; -o-transition: opacity 300ms linear !important; -ms-transition: opacity 300ms linear !important; -moz-transition: opacity 300ms linear !important; -webkit-transition: opacity 300ms linear !important; width: 100% !important;')
let stylesheet=document.createElement('style')
stylesheet.id='xtricaStylesheet'
stylesheet.type='text/css'
if(stylesheet.styleSheet){stylesheet.styleSheet.cssText='.xscene { display: block !important; height: 100vh !important; overflow-y: scroll !important; position: relative !important; width: 100% !important; -webkit-overflow-scrolling: touch; }'}else{stylesheet.appendChild(document.createTextNode('.xscene { display: block !important; height: 100vh !important; overflow-y: scroll !important; position: relative !important; width: 100% !important; }'))}
document.head.appendChild(stylesheet)
return!0}else{return!1}}
this.cleanup=()=>{if(this.topScene){this.topScene.parentElement.removeChild(this.topScene)
this.topScene=null}
if(this.windowHasListener){window.removeEventListener('keydown',this.onKeydown)
this.windowHasListener=!1}}
this.exit=()=>{let vm=this
return new Promise(function(resolve,reject){vm.container.style.opacity=0
setTimeout(()=>{vm.cleanup()
resolve()},300)})}
this.init()}