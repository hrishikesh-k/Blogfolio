!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.OpinionJS=t():e.OpinionJS=t()}(self,(function(){return(()=>{"use strict";var e={818:(e,t)=>{function n(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.user=t}var t,r;return t=e,(r=[{key:"listUsers",value:function(e){return this.user._request("/admin/users",{method:"GET",audience:e})}},{key:"getUser",value:function(e){return this.user._request("/admin/users/".concat(e.id))}},{key:"updateUser",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return this.user._request("/admin/users/".concat(e.id),{method:"PUT",body:JSON.stringify(t)})}},{key:"createUser",value:function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};return n.email=e,n.password=t,this.user._request("/admin/users",{method:"POST",body:JSON.stringify(n)})}},{key:"deleteUser",value:function(e){return this.user._request("/admin/users/".concat(e.id),{method:"DELETE"})}}])&&n(t.prototype,r),e}();t.default=r},453:(e,t,n)=>{function r(e){return(r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}t.Z=void 0;var o,a=function(e){if(e&&e.__esModule)return e;if(null===e||"object"!==r(e)&&"function"!=typeof e)return{default:e};var t=s();if(t&&t.has(e))return t.get(e);var n={},o=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var a in e)if(Object.prototype.hasOwnProperty.call(e,a)){var i=o?Object.getOwnPropertyDescriptor(e,a):null;i&&(i.get||i.set)?Object.defineProperty(n,a,i):n[a]=e[a]}return n.default=e,t&&t.set(e,n),n}(n(735)),i=(o=n(744))&&o.__esModule?o:{default:o};function s(){if("function"!=typeof WeakMap)return null;var e=new WeakMap;return s=function(){return e},e}function u(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function l(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var c=/^http:\/\//,d="/.netlify/identity",f=function(){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=t.APIUrl,r=void 0===n?d:n,o=t.audience,i=void 0===o?"":o,s=t.setCookie,l=void 0!==s&&s;u(this,e),r.match(c)&&console.warn("Warning:\n\nDO NOT USE HTTP IN PRODUCTION FOR GOTRUE EVER!\nGoTrue REQUIRES HTTPS to work securely."),i&&(this.audience=i),this.setCookie=l,this.api=new a.default(r)}var t,n;return t=e,(n=[{key:"_request",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};t.headers=t.headers||{};var n=t.audience||this.audience;return n&&(t.headers["X-JWT-AUD"]=n),this.api.request(e,t).catch((function(e){return e instanceof a.JSONHTTPError&&e.json&&(e.json.msg?e.message=e.json.msg:e.json.error&&(e.message="".concat(e.json.error,": ").concat(e.json.error_description))),Promise.reject(e)}))}},{key:"settings",value:function(){return this._request("/settings")}},{key:"signup",value:function(e,t,n){return this._request("/signup",{method:"POST",body:JSON.stringify({email:e,password:t,data:n})})}},{key:"login",value:function(e,t,n){var r=this;return this._setRememberHeaders(n),this._request("/token",{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:"grant_type=password&username=".concat(encodeURIComponent(e),"&password=").concat(encodeURIComponent(t))}).then((function(e){return i.default.removeSavedSession(),r.createUser(e,n)}))}},{key:"loginExternalUrl",value:function(e){return"".concat(this.api.apiURL,"/authorize?provider=").concat(e)}},{key:"confirm",value:function(e,t){return this._setRememberHeaders(t),this.verify("signup",e,t)}},{key:"requestPasswordRecovery",value:function(e){return this._request("/recover",{method:"POST",body:JSON.stringify({email:e})})}},{key:"recover",value:function(e,t){return this._setRememberHeaders(t),this.verify("recovery",e,t)}},{key:"acceptInvite",value:function(e,t,n){var r=this;return this._setRememberHeaders(n),this._request("/verify",{method:"POST",body:JSON.stringify({token:e,password:t,type:"signup"})}).then((function(e){return r.createUser(e,n)}))}},{key:"acceptInviteExternalUrl",value:function(e,t){return"".concat(this.api.apiURL,"/authorize?provider=").concat(e,"&invite_token=").concat(t)}},{key:"createUser",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];this._setRememberHeaders(t);var n=new i.default(this.api,e,this.audience);return n.getUserData().then((function(e){return t&&e._saveSession(),e}))}},{key:"currentUser",value:function(){var e=i.default.recoverSession(this.api);return e&&this._setRememberHeaders(e._fromStorage),e}},{key:"verify",value:function(e,t,n){var r=this;return this._setRememberHeaders(n),this._request("/verify",{method:"POST",body:JSON.stringify({token:t,type:e})}).then((function(e){return r.createUser(e,n)}))}},{key:"_setRememberHeaders",value:function(e){this.setCookie&&(this.api.defaultHeaders=this.api.defaultHeaders||{},this.api.defaultHeaders["X-Use-Cookie"]=e?"1":"session")}}])&&l(t.prototype,n),e}();t.Z=f,"undefined"!=typeof window&&(window.GoTrue=f)},744:(e,t,n)=>{function r(e){return(r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o,a=function(e){if(e&&e.__esModule)return e;if(null===e||"object"!==r(e)&&"function"!=typeof e)return{default:e};var t=s();if(t&&t.has(e))return t.get(e);var n={},o=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var a in e)if(Object.prototype.hasOwnProperty.call(e,a)){var i=o?Object.getOwnPropertyDescriptor(e,a):null;i&&(i.get||i.set)?Object.defineProperty(n,a,i):n[a]=e[a]}return n.default=e,t&&t.set(e,n),n}(n(735)),i=(o=n(818))&&o.__esModule?o:{default:o};function s(){if("function"!=typeof WeakMap)return null;var e=new WeakMap;return s=function(){return e},e}function u(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?u(Object(n),!0).forEach((function(t){c(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):u(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function c(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function d(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var f="gotrue.user",p={},h=null,m={api:1,token:1,audience:1,url:1},v={api:1},y=function(){return"undefined"!=typeof window},b=function(){function e(t,n,r){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.api=t,this.url=t.apiURL,this.audience=r,this._processTokenResponse(n),h=this}var t,n,r;return t=e,r=[{key:"removeSavedSession",value:function(){y()&&localStorage.removeItem(f)}},{key:"recoverSession",value:function(t){if(h)return h;var n=y()&&localStorage.getItem(f);if(n)try{var r=JSON.parse(n),o=r.url,i=r.token,s=r.audience;return o&&i?new e(t||new a.default(o,{}),i,s)._saveUserData(r,!0):null}catch(e){return console.error(new Error("Gotrue-js: Error recovering session: ".concat(e))),null}return null}}],(n=[{key:"update",value:function(e){var t=this;return this._request("/user",{method:"PUT",body:JSON.stringify(e)}).then((function(e){return t._saveUserData(e)._refreshSavedSession()}))}},{key:"jwt",value:function(e){var t=this.tokenDetails();if(null==t)return Promise.reject(new Error("Gotrue-js: failed getting jwt access token"));var n=t.expires_at,r=t.refresh_token,o=t.access_token;return e||n-6e4<Date.now()?this._refreshToken(r):Promise.resolve(o)}},{key:"logout",value:function(){return this._request("/logout",{method:"POST"}).then(this.clearSession.bind(this)).catch(this.clearSession.bind(this))}},{key:"_refreshToken",value:function(e){var t=this;return p[e]?p[e]:p[e]=this.api.request("/token",{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:"grant_type=refresh_token&refresh_token=".concat(e)}).then((function(n){return delete p[e],t._processTokenResponse(n),t._refreshSavedSession(),t.token.access_token})).catch((function(n){return delete p[e],t.clearSession(),Promise.reject(n)}))}},{key:"_request",value:function(e){var t=this,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};n.headers=n.headers||{};var r=n.audience||this.audience;return r&&(n.headers["X-JWT-AUD"]=r),this.jwt().then((function(r){return t.api.request(e,l({headers:Object.assign(n.headers,{Authorization:"Bearer ".concat(r)})},n)).catch((function(e){return e instanceof a.JSONHTTPError&&e.json&&(e.json.msg?e.message=e.json.msg:e.json.error&&(e.message="".concat(e.json.error,": ").concat(e.json.error_description))),Promise.reject(e)}))}))}},{key:"getUserData",value:function(){return this._request("/user").then(this._saveUserData.bind(this)).then(this._refreshSavedSession.bind(this))}},{key:"_saveUserData",value:function(t,n){for(var r in t)r in e.prototype||r in m||(this[r]=t[r]);return n&&(this._fromStorage=!0),this}},{key:"_processTokenResponse",value:function(e){this.token=e;try{var t=JSON.parse(function(e){var t=e.replace(/-/g,"+").replace(/_/g,"/");switch(t.length%4){case 0:break;case 2:t+="==";break;case 3:t+="=";break;default:throw"Illegal base64url string!"}var n=window.atob(t);try{return decodeURIComponent(escape(n))}catch(e){return n}}(e.access_token.split(".")[1]));this.token.expires_at=1e3*t.exp}catch(e){console.error(new Error("Gotrue-js: Failed to parse tokenResponse claims: ".concat(e)))}}},{key:"_refreshSavedSession",value:function(){return y()&&localStorage.getItem(f)&&this._saveSession(),this}},{key:"_saveSession",value:function(){return y()&&localStorage.setItem(f,JSON.stringify(this._details)),this}},{key:"tokenDetails",value:function(){return this.token}},{key:"clearSession",value:function(){e.removeSavedSession(),this.token=null,h=null}},{key:"admin",get:function(){return new i.default(this)}},{key:"_details",get:function(){var t={};for(var n in this)n in e.prototype||n in v||(t[n]=this[n]);return t}}])&&d(t.prototype,n),r&&d(t,r),e}();t.default=b},735:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.JSONHTTPError=t.TextHTTPError=t.HTTPError=t.getPagination=void 0;var r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},o=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),a=n(363);function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function s(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function u(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"getPagination",{enumerable:!0,get:function(){return a.getPagination}});var l=t.HTTPError=function(e){function t(e){i(this,t);var n=s(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e.statusText));return n.name=n.constructor.name,"function"==typeof Error.captureStackTrace?Error.captureStackTrace(n,n.constructor):n.stack=new Error(e.statusText).stack,n.status=e.status,n}return u(t,e),t}(function(e){function t(){var t=Reflect.construct(e,Array.from(arguments));return Object.setPrototypeOf(t,Object.getPrototypeOf(this)),t}return t.prototype=Object.create(e.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e,t}(Error)),c=t.TextHTTPError=function(e){function t(e,n){i(this,t);var r=s(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return r.data=n,r}return u(t,e),t}(l),d=t.JSONHTTPError=function(e){function t(e,n){i(this,t);var r=s(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return r.json=n,r}return u(t,e),t}(l),f=function(){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",n=arguments[1];i(this,e),this.apiURL=t,this.apiURL.match(/\/[^\/]?/)&&(this._sameOrigin=!0),this.defaultHeaders=n&&n.defaultHeaders||{}}return o(e,[{key:"headers",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return r({},this.defaultHeaders,{"Content-Type":"application/json"},e)}},{key:"parseJsonResponse",value:function(e){return e.json().then((function(t){if(!e.ok)return Promise.reject(new d(e,t));var n=(0,a.getPagination)(e);return n?{pagination:n,items:t}:t}))}},{key:"request",value:function(e){var t=this,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},o=this.headers(n.headers||{});return this._sameOrigin&&(n.credentials=n.credentials||"same-origin"),fetch(this.apiURL+e,r({},n,{headers:o})).then((function(e){var n=e.headers.get("Content-Type");return n&&n.match(/json/)?t.parseJsonResponse(e):e.ok?e.text().then((function(e){})):e.text().then((function(t){return Promise.reject(new c(e,t))}))}))}}]),e}();t.default=f},363:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0});var n=function(e,t){if(Array.isArray(e))return e;if(Symbol.iterator in Object(e))return function(e,t){var n=[],r=!0,o=!1,a=void 0;try{for(var i,s=e[Symbol.iterator]();!(r=(i=s.next()).done)&&(n.push(i.value),!t||n.length!==t);r=!0);}catch(e){o=!0,a=e}finally{try{!r&&s.return&&s.return()}finally{if(o)throw a}}return n}(e,t);throw new TypeError("Invalid attempt to destructure non-iterable instance")};t.getPagination=function(e){var t=e.headers.get("Link"),r={};if(null==t)return null;t=t.split(",");for(var o=e.headers.get("X-Total-Count"),a=0,i=t.length;a<i;a++){var s=t[a].replace(/(^\s*|\s*$)/,"").split(";"),u=n(s,2),l=u[0],c=u[1],d=l.match(/page=(\d+)/),f=d&&parseInt(d[1],10);c.match(/last/)?r.last=f:c.match(/next/)?r.next=f:c.match(/prev/)?r.prev=f:c.match(/first/)&&(r.first=f)}return r.last=Math.max(r.last||0,r.prev&&r.prev+1||0),r.current=r.next?r.next-1:r.last||1,r.total=o?parseInt(o,10):null,r}},213:(e,t,n)=>{n.r(t);var r=n(453);(e=n.hmd(e)).exports=function(e){let t,n=0,o=!1,a=e.title,i=e.scrollOffset||15,s=location.hash.substr(1),u=document.querySelector(e.form),l=document.querySelector(e.loadButton)||null,c=u.querySelector(e.textarea||"textarea"),d=document.querySelector(e.commentContainer)||document.body,f=new r.Z({APIUrl:e.apiUrl||location.protocol+"//"+location.hostname+"/.netlify/identity"});async function p(){let e="",t="",n="",r="abcdefghijklmnopqrstuvwxyz",o=r+"1234567890",a=o+"!@#$%^&*()-+<>ABCDEFGHIJKLMNOP";for(let i=0;i<5;i++)e+=o.charAt(Math.floor(Math.random()*o.length)),t+=r.charAt(Math.floor(Math.random()*r.length)),n+=a.charAt(Math.floor(Math.random()*a.length));o=null,r=null,a=null,e+="@"+t+".com",await f.signup(e,n);let i=await f.login(e,n);return e=null,t=null,n=null,i.token.access_token}function h(){window.dispatchEvent(new CustomEvent("comment-adding",{cancelable:!0}))&&(u.setAttribute("disabled",""),l&&l.setAttribute("disabled",""),O("<div></div><span>Adding comment...</span>",null,(function(){let e=new FormData;e.append("name",u.querySelector("input").value),e.append("email",u.querySelector('input[type="email"]').value),e.append("parent",u.getAttribute("data-reply")),e.append("comment",c.value),p().then((r=>{fetch("/api/addComment/?title="+a,{method:"POST",body:new URLSearchParams(e).toString(),headers:{Authorization:"Bearer "+r,"Content-Type":"application/x-www-form-urlencoded"}}).then((e=>{if(e.ok)return e.json();throw e.statusText})).then((r=>{window.dispatchEvent(new CustomEvent("comment-added",{cancelable:!0,detail:{data:r}}))&&S(t,(function(){l?g():(n++,k(r.ref["@ref"].id,r.data.name,r.ts,r.data.comment,r.data.parent),document.querySelector(".comment").previousElementSibling.innerHTML=n+(n>1?" comments":" comment")),u.reset(),o&&v(),c.style.height="125px",e=null,u.removeAttribute("disabled",""),l&&l.removeAttribute("disabled")}))})).catch((e=>{u.removeAttribute("disabled",""),l&&l.removeAttribute("disabled"),window.dispatchEvent(new CustomEvent("comment-add-error",{cancelable:!0,detail:{data:e}}))&&O("<span>"+e+"</span>",5e3)}))}))})))}function m(){c.value.length>0?window.dispatchEvent(new CustomEvent("comment-previewing",{cancelable:!0}))&&O("<div></div><span>Generating preview...</span>",null,(function(){u.setAttribute("disabled",""),l&&l.setAttribute("disabled","");let e=new FormData;e.append("comment",c.value),p().then((n=>{fetch("/api/previewComment/",{method:"POST",body:new URLSearchParams(e).toString(),headers:{Authorization:"Bearer "+n,"Content-Type":"application/x-www-form-urlencoded"}}).then((e=>{if(e.ok)return e.json();throw e.statusText})).then((n=>{if(window.dispatchEvent(new CustomEvent("comment-previewed",{cancelable:!0,detail:{data:n}}))){let r=document.querySelector("html");e=null,S(t,(function(){u.removeAttribute("disabled"),r.style.overflowY="hidden",l&&l.removeAttribute("disabled");let e=_("div",{class:"scale-up modal"},"<div class=animation><h3>Preview</h3><span>✖</span><hr><div><div class=comment>"+n+"</div></div></div>",document.body);e.querySelector("span").onclick=t=>{e.classList.remove("scale-up"),setTimeout((()=>{r.style.overflowY="auto",t.target.onclick=null,e.remove(),e=null,r=null}),500)}}))}})).catch((e=>{u.removeAttribute("disabled",""),l&&l.removeAttribute("disabled"),window.dispatchEvent(new CustomEvent("comment-preview-error",{cancelable:!0,detail:{data:e}}))&&O("<span>"+e+"</span>",5e3)}))}))})):O("<span>Please enter some text to preview</span>",5e3)}function v(){let e=document.querySelector(".label");e.querySelectorAll("*").forEach((e=>e.onclick=null)),u.removeAttribute("data-reply"),o=!1,e.remove(),e=null}function y(e){["animation","shake"].map((t=>e.classList.add(t))),setTimeout((()=>{["animation","shake"].map((t=>e.classList.remove(t))),e=null}),500)}function b(e){return Math.floor(e.getBoundingClientRect().top+window.pageYOffset)}function g(e){window.dispatchEvent(new CustomEvent("comments-loading",{cancelable:!0}))&&(l.setAttribute("disabled",""),u.setAttribute("disabled",""),O("<div></div><span>Loading comments...</span>",null,(function(){p().then((r=>{fetch("/api/getComments/?title="+a,{method:"POST",headers:{Authorization:"Bearer "+r}}).then((e=>{if(e.ok)return e.json();throw e.statusText})).then((e=>{window.dispatchEvent(new CustomEvent("comments-loaded",{cancelable:!0,detail:{data:e}}))&&(_("hr","","",d),e?(n=e.length,_("h3","",n+" "+(n>1?"comments":"comment"),d),e.forEach((e=>k(e[1]["@ref"].id,e[2],e[0],e[3],e[4])))):_("h3","","No comments yet",d))})).then((()=>{if(u.removeAttribute("disabled",""),S(t),l.onclick=null,l.remove(),l=null,parseInt(e)){let t=document.getElementById(e);t?w(b(t)-i,(function(){y(t),history.replaceState("","",location.href.split("#")[0])})):O("<span>Invalid comment ID</span>",5e3)}})).catch((e=>{u.removeAttribute("disabled",""),l&&l.removeAttribute("disabled"),window.dispatchEvent(new CustomEvent("comment-load-error",{cancelable:!0,detail:{data:e}}))&&O("<span>"+e+"</span>",5e3)}))}))})))}function w(e,t){e<0&&(e=0),window.pageYOffset===e?t():(window.addEventListener("scroll",(function n(){(window.pageYOffset===e||window.innerHeight+window.scrollY>=document.body.offsetHeight)&&(t(),e=null,t=null,window.removeEventListener("scroll",n))})),window.scrollTo({top:e,behavior:"smooth"}))}function S(e,t){e.classList.remove("fade-bottom"),setTimeout((()=>{e.querySelectorAll("*").forEach((e=>e.onclick=null)),e.remove(),t?t():e=null}),500)}function k(n,r,a,s,c){let f;!l&&(f=document.querySelector(".comment"));let p=_("div",{id:n,class:"comment"},"<div><div><div><div style=background:#"+(Math.random().toString(16)+"00000").slice(2,8)+"><h3>"+r.charAt(0)+"</h3></div></div><div><h3>"+r+"</h3><ul><li>"+new Intl.DateTimeFormat(e.dateFormat||"en-US",{day:"numeric",month:"short",year:"numeric"}).format(new Date(a/1e3))+"</li><li><a href="+e.form+">Reply</a></li></ul></div></div></div><div>"+s+"</div>",d,f);if(p.querySelector('a[href="'+e.form+'"]').onclick=n=>{n.preventDefault(),w(b(u)-55,(function(){function r(n){n.preventDefault(),w(b(s)-i,(function(){y(s),O('<span>Back to <a href="'+e.form+'">Form</a></span><span>✖</span>',null,(function(){t.querySelector('a[href^="#"]').onclick=e=>{e.preventDefault(),w(b(u)-55,(function(){y(document.querySelector(".label")),S(t)}))},t.querySelector("span + span").onclick=()=>{S(t)}}))}))}let a=n.target.closest(".comment").getAttribute("id");u.setAttribute("data-reply",a);let s=document.getElementById(a);if(o){let e=document.querySelector(".label");e.querySelector('a[href^="#"]').onclick=null,e.querySelector("span").innerHTML="<span>Replying to <a href=#"+a+"> #"+a+"</a></span>",e.querySelector('a[href^="#"]').onclick=r,y(e)}else{let e=_("span",{class:"label"},"<span>Replying to <a href=#"+a+">#"+a+"</a></span><span>✖</span>",document.body,u);e.querySelector('a[href^="#"]').onclick=r,e.children[1].onclick=v,y(e),o=!0}a=null}))},parseInt(c)){let e=p.children[1];e.insertAdjacentHTML("afterbegin","<span class=label><span>Replied to <a href=#"+c+"> #"+c+"</a></span></span>"),e.querySelector('a[href^="#"]').onclick=e=>{e.preventDefault();let r=document.getElementById(c);w(b(r)-i,(function(){y(r),O("<span>Back to <a href=#"+n+">#"+n+"</a></span><span>✖</span>",null,(function(){t.querySelector('a[href^="#"]').onclick=e=>{e.preventDefault();let r=document.getElementById(n);w(b(r)-i,(function(){y(r),S(t)}))},t.querySelector("span + span").onclick=()=>{S(t)},r=null}))}))},e=null}p=null,f=null}function O(e,n,r){function o(){t=_("div",{class:"animation fade-bottom notification"},e,document.body)}return t=document.querySelector(".notification"),t?S(t,o):o(),n&&setTimeout((()=>S(t,r)),n),r&&!n&&setTimeout((()=>r()),500),t}function _(e,t,n,r,o){let a=document.createElement(e);return Object.keys(t).forEach((e=>a.setAttribute(e,t[e]))),o?r.insertBefore(a,o):r.appendChild(a),a.innerHTML=n,a}this.destroy=()=>{!function(){if(l?(l.onclick=null,l.remove(),l=null):(u.nextElementSibling.remove(),u.nextElementSibling.remove()),o){let e=document.querySelector(".label");e.querySelectorAll("*").forEach((e=>{e.onclick=null})),e=null}t&&S(t),c.oninput=null,u.onsubmit=null,u.querySelector('button[type="button"]').onclick=null,u.remove(),document.querySelectorAll(".comment").forEach((e=>{e.querySelectorAll('a[href^="#"]').forEach((e=>{e.onclick=null,e=null})),e.remove(),e=null})),i=null,n=null,t=null,s=null,u=null,c=null,o=null,d=null,a=null,f=null}()},this.addComment=()=>{h()},this.showPreview=()=>{m()},this.removeReply=()=>{v()},this.manageShake=e=>{y(e)},this.calculateTop=e=>{b(e)},this.loadComments=e=>{g(e)},this.callbackScroll=(e,t)=>{w(e,t)},this.removeNotification=(e,t)=>{S(e,t)},this.createComment=(e,t,n,r,o)=>{k(e,t,n,r,o)},this.createNotification=(e,t,n)=>{O(e,t,n)},this.createElement=(e,t,n,r,o)=>{_(e,t,n,r,o)},e.autoLoad&&g(),parseInt(s)&&g(s),l.onclick=g,c.oninput=()=>{c.style.height="auto",c.style.height=c.scrollHeight+2+"px"},u.onsubmit=e=>{h(),e.preventDefault()},u.querySelector('button[type="button"]').onclick=e=>{m(),e.preventDefault()},window.dispatchEvent(new CustomEvent("comments-init"))}}},t={};function n(r){var o=t[r];if(void 0!==o)return o.exports;var a=t[r]={id:r,loaded:!1,exports:{}};return e[r](a,a.exports,n),a.loaded=!0,a.exports}return n.hmd=e=>((e=Object.create(e)).children||(e.children=[]),Object.defineProperty(e,"exports",{enumerable:!0,set:()=>{throw new Error("ES Modules may not assign module.exports or exports.*, Use ESM export syntax, instead: "+e.id)}}),e),n.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n(213)})()}));