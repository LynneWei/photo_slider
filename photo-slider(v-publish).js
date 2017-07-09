/*!
* photo_slider.js v1.0
*
* @param photoMappingList        required
* @param dialogSelector          ".photo-slider-dialog"
* @param imageTemplateSelector   "script#photo-slider-image-template"
* @param itemTemplateSelector    "script#photo-slider-item-template"
* @param photoTableSelector      ".js-photo-table"
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
Saltee.PhotoSlider = {

  carouselIndicatorListSelector:     null,
  carouselInnerSelector:             null,
  currentCarouselIndicatorsSelector: null,
  currentPhotoContainerSelector:     null,
  itemImagePathSelector:             null,
  photoNameSelector:                 null,

  dialogSelector:          null,
  imageTemplateSelector:   null,
  itemTemplateSelector:    null,
  photoSelector:           null,
  showPhotoButtonSelector: null,

  photoContainer: null,
  photoList:      null,

  currentPhotoIndex: 0,    // index 从0开始

  photoMappingList: null,

  initialize: function(options)
  {
    var self = Saltee.PhotoSlider;

    // http://getbootstrap.com/javascript/#carousel
    self.carouselIndicatorListSelector     = ".carousel-indicators";
    self.carouselInnerSelector             = ".carousel-inner";
    self.currentPhotoContainerSelector     = ".item:first-child";
    self.currentCarouselIndicatorsSelector = ".carousel-indicators:first-child";
    self.itemImagePathSelector             = ".item-img";
    self.photoNameSelector                 = ".image-preview";

    self.dialogSelector          = options.dialogSelector         ||".photo-slider-dialog";
    self.imageTemplateSelector   = options.imageTemplateSelector  ||"script#photo-slider-image-template";
    self.itemTemplateSelector    = options.itemTemplateSelector   ||"script#photo-slider-item-template";
    self.photoTableSelector      = options.photoTableSelector     ||".js-photo-table";
    self.showPhotoButtonSelector = options.showPhotoButtonSelector||".js-show-photo-button";

    self.photoContainer = $(self.carouselInnerSelector);
    self.photoList      = $(self.dialogSelector).find(self.carouselIndicatorListSelector);

    self.currentPhotoIndex = 0;

    if (options.photoMappingList)
    {
      self.photoMappingList = options.photoMappingList;
    }
    else
    {
      throw "The photoMappingList argument is required.";
    }

    $(self.photoTableSelector).on('click', self.showPhotoButtonSelector, self.onShowPhotoButtonClicked);
  },

  onShowPhotoButtonClicked: function(event)
  {
    var self = Saltee.PhotoSlider;

    var clickTarget = $(this);

    self.photoContainer.empty();
    self.photoList.empty();

    $.each(
      self.photoMappingList,
      function(index)
      {
        self.appendItem(clickTarget, index);
      }
    );

    $(self.currentCarouselIndicatorsSelector).addClass("active");
    $(self.currentPhotoContainerSelector).addClass("active");
    $(self.dialogSelector).modal("show");
  },

  appendItem: function(photoPathStore, listIndex)
  {
    var self = Saltee.PhotoSlider;

    photoCode = listIndex;
    photoName = self.photoMappingList[listIndex];

    var photoPathList = photoPathStore.data(photoCode);

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
