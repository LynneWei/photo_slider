Saltee.PhotoSlider = {

  carouselIndicatorsSelector: null,
  carouselInnerSelector:      null,
  imageTemplateSelector:      null,
  itemTemplateSelector:       null,
  modalDialogSelector:        null,
  photoSelector:              null,
  showPhotoButtonSelector:    null,

  currentCarouselIndicatorsSelector: null,
  currentPhotoContainerSelector:     null,

  photoContainer: null,
  photoList:      null,

  currentPhotoIndex: 0,    //index 从0开始

  photoMappingList: null,

  initialize: function(options)
  {
    var self = Saltee.PhotoSlider;

    self.carouselIndicatorsSelector = options.carouselIndicatorsSelector||".js-carousel-indicators";
    self.carouselInnerSelector      = options.carouselInnerSelector     ||".js-carousel-inner";
    self.imageTemplateSelector      = options.imageTemplateSelector     ||"script#photo-slider-image-template";
    self.itemTemplateSelector       = options.itemTemplateSelector      ||"script#photo-slider-item-template";
    self.modalDialogSelector        = options.modalDialogSelector       ||".js-photos-slider-model";
    self.photoSelector              = options.photoSelector             ||".js-lodge-information-table";
    self.showPhotoButtonSelector    = options.showPhotoButtonSelector   ||".js-show-photo-button";

    self.currentCarouselIndicatorsSelector = self.modalDialogSelector+">"+self.carouselIndicatorsSelector+">.js-carousel-photo-list:first-child";
    self.currentPhotoContainerSelector     = self.carouselInnerSelector+">.item:first-child";

    self.photoContainer = $(self.carouselInnerSelector);
    self.photoList      = $(self.modalDialogSelector).find(self.carouselIndicatorsSelector);

    self.currentPhotoIndex = 0;

    if (options.photoMappingList)
    {
      self.photoMappingList = options.photoMappingList;
    }
    else
    {
      throw "The photoMappingList argument is required.";
    }

    $(self.photoSelector).on('click', self.showPhotoButtonSelector, self.onShowPhotoButtonClicked);
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
    $(self.modalDialogSelector).modal("show");
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

    //if (photoPathList.length > 0)
    //{
      var itemImagePathSelector = ".item-img";
      $.each(
        photoPathList,
        function(index)
        {
          var itemTemplate = $($(self.itemTemplateSelector).html());

          itemTemplate.data("slide-to", self.currentPhotoIndex);
          self.photoList.append(itemTemplate);

          var imageTemplate = $($(self.imageTemplateSelector).html());

          $(itemImagePathSelector, imageTemplate).attr("src", "/"+photoPathList[index]);
          imageTemplate.find(".image-preview").text(photoName);
          self.photoContainer.append(imageTemplate);

          self.currentPhotoIndex++;
        }
      );
    //}
  }
};
