!function(){var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},n={},o=e.parcelRequire7ca8;null==o&&((o=function(e){if(e in t)return t[e].exports;if(e in n){var o=n[e];delete n[e];var i={id:e,exports:{}};return t[e]=i,o.call(i.exports,i,i.exports),i.exports}var l=new Error("Cannot find module '"+e+"'");throw l.code="MODULE_NOT_FOUND",l}).register=function(e,t){n[e]=t},e.parcelRequire7ca8=o);var i=o("h6c0i");const l={button:document.querySelector("button"),inputDelay:document.querySelector('input[name="delay"]'),inputStep:document.querySelector('input[name="step"]'),inputAmount:document.querySelector('input[name="amount"]')};function u(e,t){const n=Math.random()>.3,o={position:e,delay:t};return new Promise(((e,i)=>{setTimeout((()=>{n?e(o):(i((()=>console.log("error"))),console.log(t))}),t)}))}l.button.addEventListener("click",(function(e){e.preventDefault();let t=Number(l.inputAmount.value),n=Number(l.inputDelay.value),o=Number(l.inputStep.value),r=null;for(r=1;r<=t;r+=1)console.log("step:",o),console.log("delay:",n),console.log("position:",r),u(r,n).then((({position:e,delay:t})=>{i.Notify.success(`✅ Fulfilled promise ${e} in ${t}ms`)})).catch((({position:e,delay:t})=>{i.Notify.failure(`❌ Rejected promise ${e} in ${t}ms`)})),n+=o})),l.button.style.marginTop="10px",l.button.style.marginLeft="10px",l.button.style.maxHeight="50px"}();
//# sourceMappingURL=03-promises.43de81b5.js.map
