Saltee.PhotoSlider = {

  carouselIndicatorsSelector:        null,
  carouselInnerSelector:             null,
  currentCarouselIndicatorsSelector: null,
  currentPhotoIndex:                 0,    //index 从0开始
  currentPhotoContainerSelector:     null,
  imageTemplateSelector:             null,
  itemTemplateSelector:              null,
  modalDialogSelector:               null,
  photoContainer:                    null,
  //photoCodeList:                   null,
  photoList:                         null,
  photoMappingList:                  null,
  //photoNameList:                   null,
  photoSelector:                     null,
  showPhotoButtonSelector:           null,

  initialize: function(options)
  {
    var self = Saltee.PhotoSlider;

    self.carouselIndicatorsSelector = options.carouselIndicatorsSelector||".js-carousel-indicators";
    self.carouselInnerSelector      = options.carouselInnerSelector     ||".js-carousel-inner";
    self.imageTemplateSelector      = options.imageTemplateSelector     ||"script#photo-slider-image-template";
    self.itemTemplateSelector       = options.itemTemplateSelector      ||"script#photo-slider-item-template";
    self.modalDialogSelector        = options.modalDialogSelector       ||".js-photos-slider-model";
    self.photoSelector              = options.photoSelector             ||".js-lodge-information-table";
    self.showPhotoButtonSelector    = options.showPhotoButtonSelector   ||".js-show-photos";

    self.currentCarouselIndicatorsSelector = self.modalDialogSelector+">"+self.carouselIndicatorsSelector+">.js-carousel-photo-list:first-child";
    self.currentPhotoIndex                 = 0;
    self.currentPhotoContainerSelector     = self.carouselInnerSelector+">.item:first-child";
    self.photoContainer                    = $(self.carouselInnerSelector);
    self.photoList                         = $(self.modalDialogSelector).find(self.carouselIndicatorsSelector);

    if (!options.photoMappingList)
      throw "The photoMappingList argument is required.";

    self.photoMappingList = options.photoMappingList;
    /*self.photoCodeList = options.photoCodeList;
    self.photoNameList = options.photoNameList;*/

    $(self.photoSelector).on('click', self.showPhotoButtonSelector, self.onShowPhotoButtonClicked);
  },

  onShowPhotoButtonClicked: function(event)
  {
    var self = Saltee.PhotoSlider;

    var clickTarget = $(this);

    self.photoContainer.empty();
    self.photoList.empty();

    console.info("---- self.photoMappingList = ");
    console.info(self.photoMappingList);

    $.each(
      //self.photoCodeList,
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
    /*if (2===listIndex)
    {
      return;
    }*/
    var self = Saltee.PhotoSlider;
    
    photoCode = listIndex;
    photoName = self.photoMappingList[listIndex];
    //var photoMappingRelationship = self.photoMappingList[listIndex];
    /*console.info("---- listIndex = ");
    console.info(listIndex);
    console.info("---- self.photoMappingList[listIndex] = ");
    console.info(self.photoMappingList[listIndex]);*/
    /*var photoCode         = self.photoCodeList[listIndex];
    var photoName         = self.photoNameList[listIndex];*/
    /*console.info("---- listIndex = "+listIndex+", photoCode = "+photoCode+", photoName = "+photoName);*/
    var photoPathList     = photoPathStore.data(photoCode);
    /*console.info("---- photoPathList = ");
    console.info(photoPathList);*/
    /*console.info("----photoPathList = ");
    console.info(photoPathList);*/
    if (!photoPathList)
    {
      throw "photoPathList is required";
      return;
    }

    if (photoPathList.length > 0)
    {
      var itemImagePathSelector = ".item-img";
      $.each(
        photoPathList,
        function(index)
        {
          var itemTemplate = $($(self.itemTemplateSelector).html());
          /*console.info("--*-- $("+self.itemTemplateSelector+").html() = ");
          console.info($(self.itemTemplateSelector).html());
          console.info("---- itemTemplate.html() = ");
          console.info(itemTemplate.html());*/
          itemTemplate.data("slide-to", self.currentPhotoIndex);
          /*console.info("---- after data[slide-to] was set: itemTemplate.html() = ");
          console.info(itemTemplate.html());*/
          self.photoList.append(itemTemplate);

          var imageTemplate = $($(self.imageTemplateSelector).html());
          /*console.info("---- $("+self.imageTemplateSelector+").html() = ");
          console.info($(self.imageTemplateSelector).html());
          console.info("---- self.currentPhotoIndex = ");
          console.info(self.currentPhotoIndex);
          console.info("photoPathList["+index+"] = ");
          console.info(photoPathList[index]);*/
          $(itemImagePathSelector, imageTemplate).attr("src", "/"+photoPathList[index]);
          //console.info("$(itemImagePathSelector).attr()#"+$(itemImagePathSelector).attr("src"));
          imageTemplate.find(".image-preview").text(photoName);
          /*console.info("---- imageTemplate.html() = ");
          console.info(imageTemplate.html());*/
          self.photoContainer.append(imageTemplate);

          self.currentPhotoIndex++;
        }
      );
      /*$.each(photoPathList, function(index)
      {
        $(self.itemTemplateSelector).data("slide-to", index);
        $(self.imageTemplateSelector).find(".item-img").attr("src", "/"+photoPathList[index]);
        $(self.imageTemplateSelector).find(".image-preview").text(photoName);
        self.photoList.append($(self.imageTemplateSelector));
        self.photoContainer.append($(self.imageTemplateSelector));

        index++;
      });*/
    };
  },

  /*appendItem: function(photoPathList, currentPhotoIndex, photoName)
  {
    var self = Saltee.PhotoSlider;

    var index         = currentPhotoIndex;
    var imageTemplate = $($("script#photo-slider-image-template").html());
    var itemTemplate  = $($("script#photo-slider-item-template").html());

    $.each(photoPathList, function(index)
    {
      itemTemplate.data("slide-to", index);
      imageTemplate.find(".item-img").attr("src", "/"+photoPathList[index]);
      imageTemplate.find(".image-preview").text(photoName);
      self.photoList.append(itemTemplate);
      self.photoContainer.append(imageTemplate);
      index++;
    });

    return index;
  }*/
};
