!function(){function e(){let e=window.location.hostname;return"cnfans.com"===e?"211067":"mulebuy.com"===e?"200131166":"hoobuy.com"===e?"utm_source=share&utm_medium=product_details&inviteCode=K8WG2g81":""}function o(){let e=setInterval(()=>{let e=document.querySelector("input#agree.form-check-input");e&&e.disabled&&(e.disabled=!1,e.checked=!0)},500);setTimeout(()=>{clearInterval(e)},12e3)}function t(){let o=new URL(window.location.href),t=o.hostname,l=e();("cnfans.com"===t||"mulebuy.com"===t||"hoobuy.com"===t)&&o.pathname.includes("/product")&&o.searchParams.get("ref")!==l&&(o.searchParams.set("ref",l),window.location.replace(o.toString()))}function l(e,o,t=5e3){let l=Date.now();!function n(){let a=document.querySelector(e);a?o(a):Date.now()-l<t&&setTimeout(n,100)}()}function n(){let o=window.location.hostname,t=new URL(window.location.href).searchParams.get("ref"),n=e();if("cnfans.com"===o||"mulebuy.com"===o){if(t===n){let r=document.getElementById("keywords-modal");r&&(r.style.display="none",r.remove(),chrome.storage.local.get(["removalCount"],e=>{let o=e.removalCount||0;o++,chrome.storage.local.set({removalCount:o}),a()}))}}else"hoobuy.com"===o?t===n&&l(".el-overlay",e=>{e.style.display="none",e.remove(),chrome.storage.local.get(["removalCount"],e=>{let o=e.removalCount||0;o++,chrome.storage.local.set({removalCount:o}),a()})}):("www.hagobuy.com"===o||"www.hegobuy.com"===o)&&l("div.risk-modal.ant-modal-root",e=>{e.style.display="none",e.remove(),document.body.style.overflow="",document.documentElement.style.overflow="",chrome.storage.local.get(["removalCount"],e=>{let o=e.removalCount||0;o++,chrome.storage.local.set({removalCount:o}),a()})})}function a(){let e=document.createElement("div");e.id="removal-notification",e.style.position="fixed",e.style.bottom="10px",e.style.right="10px",e.style.padding="10px 20px",e.style.backgroundColor="#4caf50",e.style.color="#fff",e.style.fontSize="14px",e.style.borderRadius="5px",e.style.boxShadow="0 0 10px rgba(0, 0, 0, 0.5)",e.style.zIndex="10000",e.style.transition="opacity 1s ease-out",e.textContent="Warm Reminder Removed successfully!",document.body.appendChild(e),setTimeout(()=>{e.style.opacity="0",setTimeout(()=>{e.remove()},1e3)},1e4)}"loading"===document.readyState?document.addEventListener("DOMContentLoaded",()=>{t(),n(),o()}):(t(),n(),o())}();
