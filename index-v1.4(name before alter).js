//= require application.js
//= require shared/photo_slider.js
//= require_self

$(function()
{
  photoMappingList =
  {
    "identity-card-photos":           "身份证照",
    "tenant-photos":                  "现场照",
    "tenant-identity-card-portraits": "身份证肖像照"
  };

  Saltee.PhotoSlider.initialize(
    {
      carouselIndicatorListSelector: ".js-carousel-indicator-list",
      carouselInnerSelector:         ".js-carousel-inner",
      imageTemplateSelector:         "script#photo-slider-image-template",
      itemTemplateSelector:          "script#photo-slider-item-template",
      dialogSelector:                ".photo-slider-dialog",
      photoTableSelector:            ".js-photo-table",
      showPhotoButtonSelector:       ".js-show-photo-button",

      photoMappingList: photoMappingList
    }
  );
});
