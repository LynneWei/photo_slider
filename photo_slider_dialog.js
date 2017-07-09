/*!
* photo_slider.js v1.0
*
* @param photoMappingList required
*
* @param dialogSelector          ".js-photo-slider-dialog"
* @param imageTemplateSelector   "script#js-photo-slider-dialog-image-template"
* @param itemTemplateSelector    "script#js-photo-slider-dialog-item-template"
* @param photoTable      ".js-photo-table"
* @param showPhotoButtonSelector ".js-show-photo-button"
*
* for example:
* photoMappingList =
*   {
*     "identity-card-photos":           "身份证照",
*     "tenant-photos":                  "现场照",
*     "tenant-identity-card-portraits": "身份证肖像照"
*   };
*
* Saltee.PhotoSlider.initialize(
*   {
*     photoMappingList: photoMappingList
*   }
* );
*
*/
Saltee.PhotoSliderDialog = {

  carouselIndicatorListSelector:     null,
  carouselInnerSelector:             null,
  currentCarouselIndicatorsSelector: null,
  currentPhotoContainerSelector:     null,
  itemImagePathSelector:             null,
  photoNameSelector:                 null,

  imageTemplateSelector:   null,
  itemTemplateSelector:    null,
  showPhotoButtonSelector: null,

  dialogSelector:     null,
  photoTableSelector: null,

  dialog:         null,
  photoContainer: null,
  photoList:      null,
  photoTable:     null,

  currentPhotoIndex: 0,    // index 从0开始

  photoMappingList: null,

  initialize: function(options)
  {
    var self = Saltee.PhotoSliderDialog;

    // http://getbootstrap.com/javascript/#carousel
    self.carouselIndicatorListSelector     = ".carousel-indicators";
    self.carouselInnerSelector             = ".carousel-inner";
    self.currentPhotoContainerSelector     = ".item:first-child";
    self.currentCarouselIndicatorsSelector = ".carousel-indicators:first-child";
    self.itemImagePathSelector             = ".item-img";
    self.photoNameSelector                 = ".image-preview";

    self.imageTemplateSelector   = options.imageTemplateSelector  ||"script#js-photo-slider-dialog-image-template";
    self.itemTemplateSelector    = options.itemTemplateSelector   ||"script#js-photo-slider-dialog-item-template";
    self.showPhotoButtonSelector = options.showPhotoButtonSelector||".js-show-photo-button";

    self.dialogSelector     = options.dialogSelector    ||".js-photo-slider-dialog";
    self.photoTableSelector = options.photoTableSelector||".js-photo-table";

    //self.dialog = options.dialog||$(".js-photo-slider-dialog");   //安全性问题
    self.dialog         = $(self.dialogSelector);
    self.photoContainer = $(self.carouselInnerSelector);
    self.photoList      = $(self.dialogSelector).find(self.carouselIndicatorListSelector);
    self.photoTable     = $(self.photoTableSelector);

    self.currentPhotoIndex = 0;

    if (options.photoMappingList)
    {
      self.photoMappingList = options.photoMappingList;
    }
    else
    {
      throw "The photoMappingList argument is required.";
    }

    self.photoTable.on('click', self.showPhotoButtonSelector, self.onShowPhotoButtonClicked);
  },

  onShowPhotoButtonClicked: function(event)
  {
    var self = Saltee.PhotoSliderDialog;

    var clickTarget = $(this);

    self.photoContainer.empty();
    self.photoList.empty();

    $.each(
      self.photoMappingList,
      function(index)
      {
        self.appendCarouselItem(clickTarget, index);
      }
    );

    $(self.currentCarouselIndicatorsSelector).addClass("active");
    $(self.currentPhotoContainerSelector).addClass("active");
    $(self.dialogSelector).modal("show");
  },

  appendCarouselItem: function(photoPathStore, listIndex)
  {
    var self = Saltee.PhotoSliderDialog;

    var photoCode     = listIndex;
    var photoPathList = photoPathStore.data(photoCode);
    var photoName     = self.photoMappingList[listIndex];

    if (!photoPathList)
    {
      throw "photoPathList is required";
    }

    $.each(
      photoPathList,
      function(index)
      {
        var itemTemplate = $($(self.itemTemplateSelector).html());
        itemTemplate.data("slide-to", self.currentPhotoIndex);
        self.photoList.append(itemTemplate);

        var imageTemplate = $($(self.imageTemplateSelector).html());
        $(self.itemImagePathSelector, imageTemplate).attr("src", "/"+photoPathList[index]);
        $(self.photoNameSelector, imageTemplate).text(photoName);
        self.photoContainer.append(imageTemplate);

        self.currentPhotoIndex++;
      }
    );
  }
};
