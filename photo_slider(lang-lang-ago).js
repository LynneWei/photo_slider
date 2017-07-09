$(function(){
  $('.js-show-photos').click(function (e) {
    var object = $(this);
    var ol = $("#myModal ol");
    var div = $(".carousel-inner");
    ol.html("");
    div.html("");
    var dataSlideTo = 0;
    var data_attribute_strings = ['identity-card-photo', 'portrait'];
    $.each(data_attribute_strings, function(index){
      var photo_name = '证照';
      switch(data_attribute_strings[index])
      {
        case 'identity-card-photo':
          photo_name = '身份证照';
          break;
        case 'portrait':
          photo_name = '现场照';
          break;
      }
      if(object.data(data_attribute_strings[index]).length>0){
        dataSlideTo = appendFunction(object.data(data_attribute_strings[index]), ol, div, dataSlideTo, photo_name);
      }
    });
    $("#myModal ol li:first-child").addClass("active");
    $(".carousel-inner div:first-child").addClass("active");
    $("#myModal").modal('show');
  });
});

function appendFunction(photos,ol,div,dataSlideTo, photo_name){
  $.each(photos,function(index){
      ol.append("<li data-target='#carousel-example-generic' data-slide-to='"+dataSlideTo+"'></li>");
      shasta_prefix = $("#shasta_prefix").val();
      div.append("<div class='item'><img class=\"item-img\" src=\""+shasta_prefix+"/"+photos[index]+"\" alt=\"\"><div class=\"carousel-caption image-preview\">"+photo_name+"</div></div>");
      dataSlideTo++;
  });
  return dataSlideTo;
}

$(function(){
  $(".button-one-deny").on("click",function(e){
    var practitioner_applying_id = $(e.target).data("id");
    var index = $(e.target).attr("data-index");
    $(".js-confirm-post").attr('data-id', practitioner_applying_id).attr('data-index', index);
  });
});

$(function(){
  $(".js-confirm-post").on("click",function(e){
    var rejected_reason = $(".js-deny-reason").val();
    index = $(".js-confirm-post").attr("data-index");
    practitioner_applying_id = $(".js-confirm-post").attr("data-id");
    $(".js-rejected-reason-"+index).val(rejected_reason);
    $(".js-confirm-post").attr('data-id', '').attr('data-index', '');
    $(".js-state").val("R");
    $("#edit_practitioner_applying_"+practitioner_applying_id).submit();
  });
});
