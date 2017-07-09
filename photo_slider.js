Saltee.PhotoSlider = {

  //forEachCallback: null,

  carouselIndicatorsSelector:        null,
  carouselInnerSelector:             null,
  currentCarouselIndicatorsSelector: null,
  currentPhotoIndex:                 0,    //index 从0开始
  currentPhotoContainerSelector:     null,
  modalDialogSelector:               null,
  photoContainer:                    null,
  photoCodeList:                     null,
  photoList:                         null,
  photoSelector:                     null,
  showPhotoButtonSelector:           null,
  

  initialize: function(options)
  {
    var self = Saltee.PhotoSlider;

    self.carouselIndicatorsSelector = options.carouselIndicatorsSelector||".js-carousel-indicators";
    self.carouselInnerSelector      = options.carouselInnerSelector     ||".js-carousel-inner";
    self.modalDialogSelector        = options.modalDialogSelector       ||".js-photos-slider-model";
    self.photoSelector              = options.photoSelector             ||".js-photo-selector";
    self.showPhotoButtonSelector    = options.showPhotoButtonSelector   ||".js-show-photos";

    self.photoCodeList = options.photoCodeList;

    self.currentCarouselIndicatorsSelector = self.modalDialogSelector+">"+self.carouselIndicatorsSelector+">.js-carousel-photo-list:first-child";
    self.currentPhotoIndex                 = 0;
    self.currentPhotoContainerSelector     = self.carouselInnerSelector+">.item:first-child";
    self.photoContainer                    = $(self.carouselInnerSelector);
    self.photoList                         = $(self.modalDialogSelector).find(self.carouselIndicatorsSelector);
    
    $(self.photoSelector).on('click', self.showPhotoButtonSelector, self.onClickPhotoSliderFunction);
  },

  onClickPhotoSliderFunction: function(options)
  {
    var self = Saltee.PhotoSlider;

    var clickTarget = $(this);

    self.photoContainer.empty();
    self.photoList.empty();

    $.each(self.photoCodeList, function(index) {
      self.forEachPhotoCallback(self.photoCodeList, clickTarget, index);
    });
    $(self.currentCarouselIndicatorsSelector).addClass("active");
    $(self.currentPhotoContainerSelector).addClass("active");
    $(self.modalDialogSelector).modal("show");
  },

  forEachPhotoCallback: function(photoCodeList, photoPathStore, index)
  {
    var self = Saltee.PhotoSlider;

    var photoCode = photoCodeList[index];
    var photoName = '证照';

    switch(photoCodeList[index])
    {
      case 'identity-card-photos':
        photoName = '身份证照';
        break;
      case 'tenant-photos':
        photoName = '现场照';
        break;
      case 'tenant-identity-card-portraits':
        photoName = '身份证肖像照';
        break;
    };

    var currentPhotoIndex = self.currentPhotoIndex;
    var photoPath         = photoPathStore.data(photoCode);
    
    if (photoPath.length > 0)
    {
      currentPhotoIndex = self.appendFunction(photoPath, currentPhotoIndex, photoName);
    };
  },

  appendFunction: function(photo, currentPhotoIndex, photoName)
  {
    /*var index = currentPhotoIndex;
    var imageTemplateSelector = $("script#photo-slider-image-template").html();
    var itemTemplateSelector  = $("script#photo-slider-item-template").html();
    var imageTemplate = $(imageTemplateSelector);
    var itemTemplate = $(itemTemplateSelector);
    var imageSourceSelector          = "."+imageTemplate.attr("class")+">.js-item-img";
    var imageCarouselCaptionSelector = "."+imageTemplate.attr("class")+">.item >.js-carousel-caption";

    $.each(photo, function(index)
    {
      itemTemplate.data("slide-to", currentPhotoIndex);
      $(imageSourceSelector).attr("src", "/"+photo[index]);
      alert($(imageSourceSelector).attr("src"));
      $(imageCarouselCaptionSelector).text(photoName);
      self.photoList.append(itemTemplate);
      self.photoContainer.append(imageTemplate);

      index++;
    });

    return index;*/
    var self = Saltee.PhotoSlider;

    var index         = currentPhotoIndex;
    var imageTemplate = $($("script#photo-slider-image-template").html());
    var itemTemplate  = $($("script#photo-slider-item-template").html());

    $.each(photo, function(index)
    {
      itemTemplate.data("slide-to", index);
      imageTemplate.find(".js-item-img").attr("src", "/"+photo[index]);
      imageTemplate.find(".item > .js-carousel-caption").text(photoName);
      self.photoList.append(itemTemplate);
      self.photoContainer.append(imageTemplate);
      index++;
    });

    return index;
  }
};
