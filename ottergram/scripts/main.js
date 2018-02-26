var DETAIL_IMAGE_SELECTOR = "[data-image-role='target']";
var DETAIL_TITLE_SELECTOR = "[data-image-role='title']";
var DETAIL_FRAME_SELECTOR = "[data-image-role='frame']";
var THUMBNAIL_LINK_SELECTOR = "[data-image-role='trigger']";
var HIDDEN_DETAIL_CLASS = "hidden-detail";
var TINY_EFFECT_CLASS = "is-tiny";
var ESC_KEY = 27;
var curThumbnail = 0;
var thumbArrLength;
var nextThumb;
var thumbnails;

function setDetails(imageUrl, titleText) {
  "use strict";
  var detailImage = document.querySelector(DETAIL_IMAGE_SELECTOR);
  detailImage.setAttribute("src", imageUrl);

  var detailTitle = document.querySelector(DETAIL_TITLE_SELECTOR);
  detailTitle.textContent = titleText;
}

function arrayNumFromThumb(thumbnail) {
  "use strict";
  return thumbnail.getAttribute("data-image-arraynum");
}

function imageFromThumb(thumbnail) {
  "use strict";
  return thumbnail.getAttribute("data-image-url");
}

function titleFromThumb(thumbnail) {
  "use strict";
  return thumbnail.getAttribute("data-image-title");
}

function setDetailsFromThumb(thumbnail) {
  "use strict";
  curThumbnail = arrayNumFromThumb(thumbnail);
  setDetails(imageFromThumb(thumbnail), titleFromThumb(thumbnail));
  showDetails();
}

function addThumbClickHandler(thumb) {
  "use strict";
  thumb.addEventListener("click", function(event) {
    event.preventDefault();
    setDetailsFromThumb(thumb);
  });
}

function getThumbnailsArray() {
  "use strict";
  var thumbnails = document.querySelectorAll(THUMBNAIL_LINK_SELECTOR);
  var thumbnailArray = [].slice.call(thumbnails);
  thumbArrLength = thumbnailArray.length;
  return thumbnailArray;
}

function leftButton() {
  "use strict";
  if (curThumbnail == 0) {
    nextThumb = thumbnails[thumbArrLength - 1];
    setDetailsFromThumb(nextThumb);
  } else {
    nextThumb = thumbnails[curThumbnail - 1];
    setDetailsFromThumb(nextThumb);
  }
}

function rightButton() {
  "use strict";
  if (curThumbnail == thumbArrLength - 1) {
    nextThumb = thumbnails[0];
    setDetailsFromThumb(nextThumb);
  } else {
    curThumbnail = parseInt(curThumbnail);
    nextThumb = thumbnails[curThumbnail + 1];
    setDetailsFromThumb(nextThumb);
  }
}

function hideDetails() {
  "use strict";
  document.body.classList.add(HIDDEN_DETAIL_CLASS);
}

function showDetails() {
  "use strict";
  var frame = document.querySelector(DETAIL_FRAME_SELECTOR);
  document.body.classList.remove(HIDDEN_DETAIL_CLASS);
  frame.classList.add(TINY_EFFECT_CLASS);
  setTimeout(function() {
    frame.classList.remove(TINY_EFFECT_CLASS);
  }, 50);
}

function addKeyPressHandler() {
  "use strict";
  document.body.addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === ESC_KEY) {
      hideDetails();
    }
  });
}

function initializeEvents() {
  "use strict";
  thumbnails = getThumbnailsArray();
  thumbnails.forEach(addThumbClickHandler);
  document.getElementById("left-button").addEventListener("click", function(event) {
    event.preventDefault();
    leftButton();
  });
  document.getElementById("right-button").addEventListener("click", function(event) {
    event.preventDefault();
    rightButton();
  });
  addKeyPressHandler();
}

initializeEvents();
