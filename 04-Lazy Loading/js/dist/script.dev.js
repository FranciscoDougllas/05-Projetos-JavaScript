"use strict";

var images = document.querySelectorAll(".image-container img");
var observer = new IntersectionObserver(function (entries, observer) {
  entries.forEach(function (entry) {
    if (!entry.isIntersecting) return;
    var image = entry.target;
    image.src = image.src.replace("&w=10&", "&w=1000&");
    observer.unobserve(image);
  });
}, {});
images.forEach(function (image) {
  observer.observe(image);
});