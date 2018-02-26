var DETAIL_IMAGE_SELECTOR = "[data-image-role='target']";
var DETAIL_TITLE_SELECTOR = "[data-image-role='title']";
var THUMBNAIL_LINK_SELECTOR = "[data-image-role='trigger']";
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
}

initializeEvents();
