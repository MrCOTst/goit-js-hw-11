var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},n={},t={},o=e.parcelRequirea610;null==o&&((o=function(e){if(e in n)return n[e].exports;if(e in t){var o=t[e];delete t[e];var r={id:e,exports:{}};return n[e]=r,o.call(r.exports,r,r.exports),r.exports}var i=new Error("Cannot find module '"+e+"'");throw i.code="MODULE_NOT_FOUND",i}).register=function(e,n){t[e]=n},e.parcelRequirea610=o);var r=o("iQIUW"),i=o("fhPA4");function s(e){return`\n        <div class="photo-card">\n        <img src="${e.webformatURL}" alt="${e.tags} " loading="lazy" />\n        <div class="info">\n          <p class="info-item">\n            <b>Likes: </b>${e.likes}\n          </p>\n          <p class="info-item">\n            <b>Views: </b>${e.views}\n          </p>\n          <p class="info-item">\n            <b>Comments: </b>${e.comments}\n          </p>\n          <p class="info-item">\n            <b>Downloads: </b>${e.downloads}\n          </p>\n        </div>\n      </div>`}const a={submit:document.querySelector('button[type="submit"]'),inputSearch:document.querySelector(".search-form"),galleryConteiner:document.querySelector(".gallery"),observe:document.querySelector(".observe")},l=new(0,i.default);function c(){l.fetchArticles().then((e=>{if(function(e){const n=e.hits.map((e=>s(e))).join("");a.galleryConteiner.insertAdjacentHTML("beforeend",n)}(e),f.observe(a.observe),2===l.page&&e.hits.length&&r.Notify.success(`Hooray! We found ${e.totalHits} images.`),e.hits.length||e.totalHits)return console.log(e.hits.length/l.fotoForPage<1),!e.hits.length&&e.totalHits&&e.hits.length/l.fotoForPage<1?(r.Notify.info("We're sorry, but you've reached the end of search results."),void f.unobserve(a.observe)):void 0;r.Notify.warning("Sorry, there are no images matching your search query. Please try again.")}))}function u(){a.galleryConteiner.innerHTML=""}a.inputSearch.addEventListener("submit",(function(e){if(e.preventDefault(),u(),l.query=e.currentTarget.elements.searchQuery.value.trim(),""===l.query)return r.Notify.info("Please enter something."),void u();l.resetPage(),c()}));const f=new IntersectionObserver((e=>{e.forEach((e=>{if(e.isIntersecting&&""!==l.query){c();const{height:e}=document.querySelector(".gallery").firstElementChild.getBoundingClientRect();window.scrollBy({top:2*e,behavior:"smooth"})}}))}),{rootMargin:"100px"});
//# sourceMappingURL=02-infinite scroll.a00e0439.js.map
