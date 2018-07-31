// Handlers for TEI elements
var CETEIcean_handlers = 
{
    // Adds span with appropriate classes for every tei:hi element
    // for convenient toggling
    "hi": function(elt) {
        var span = document.createElement('span');
        span.className = elt.getAttribute('rend');
        span.innerHTML = elt.innerHTML;
        return span;
    }
}

// Main init function for starting CETEIcean
// with our settings
function CETEIcean_init() {
    var CETEIcean = new CETEI(),
        filename = urkundeFromURL();
    
    CETEIcean.addBehaviors({"handlers": CETEIcean_handlers});
    
    CETEIcean.getHTML5('https://raw.githubusercontent.com/gedigiupb/urkunden_upb/master/' + filename, function(data) {
        document.getElementById("urkunde").innerHTML = "";
        document.getElementById("urkunde").appendChild(data);
        CETEIcean.addStyle(document, data);
    });
};

/*$.fn.extend({
    myToggleClass: function (val) {
        $(this).each( function(a,b) {
            if($(b).hasClass(val)) {
                $(b).removeClass(val);
                $(b).addClass('no_' + val);
            }
            else if($(b).hasClass('no_' + val)) {
                $(b).removeClass('no_' + val);
                $(b).addClass(val);
            }
        })
        return $(this);
    }
});
*/
function urkundeFromURL() {
    var url_string = window.location.href;
    var url = new URL(url_string);
    return url.searchParams.get("file");
};

function checkContainer () {
  if($('tei-expan').is(':visible')){ 
    myda();
    zuweisung();
  } else {
    setTimeout(checkContainer, 50); 
  }
}


function mylf() {
    $('tei-abbr').hide();
    $('tei-expan').show();
    $('.gold').addClass('no_gold');
    $('.gold').removeClass('gold');
    $('.caps').addClass('no_caps');
    $('.caps').removeClass('caps');
    $('.big').addClass('no_big');
    $('.big').removeClass('big');
    $('.middle').addClass('no_middle');
    $('.middle').removeClass('middle');
    $('.small').addClass('no_small');
    $('.small').removeClass('small');
    $('.red').addClass('no_red');
    $('.red').removeClass('red');
};

function myda() {
    $('tei-abbr').show();
    $('tei-expan').hide();
    $('.no_gold').addClass('gold');
    $('.no_gold').removeClass('no_gold');
    $('.no_caps').addClass('caps');
    $('.no_caps').removeClass('no_caps');
    $('.no_big').addClass('big');
    $('.no_big').removeClass('no_big');
    $('.no_middle').addClass('middle');
    $('.no_middle').removeClass('no_middle');
    $('.no_small').addClass('small');
    $('.no_small').removeClass('no_small');
    $('.no_red').addClass('red');
    $('.no_red').removeClass('no_red');
};

$('#einstellungen input').change(
    function() {
        switch ($(this).val()) {
            case 'lf': mylf(); break;
            case 'da': myda(); break;
        }
    }
);

$('#popover-check').change(function() {
   if($(this).is(":checked")) {
      $('[data-toggle="popover"]').popover('enable');
      return;
   }
   else {
      $('[data-toggle="popover"]').popover('disable');
      return;
   }
});

$('#linebreak-check').change(function() {
   if($(this).is(":checked")) {
      $('tei-lb').show();
      return;
   }
   else {
      $('tei-lb').hide();
      return;
   }
});

jQuery(document).ready(checkContainer);

  
function zuweisung() {
    $('tei-name').attr('title', function (x){
    var x =$('#popover-person-header-div').html();
    return x;
    });
    $('tei-name').attr('data-content', function (x){
    var x =$('#popover-person-content-div').html();
    return x;
    });
    $('tei-name').attr('data-placement', 'top');
    $('tei-name').attr('data-trigger', 'hover');
    $('tei-name').attr('data-toggle', 'popover');
    $('tei-name').attr('data-html', 'true');
    
    $('tei-placename').attr('title', function (x){
    var x =$('#popover-place-header-div').html();
    return x;
    });
    $('tei-placename').attr('data-content', function (x){
    var x =$('#popover-place-content-div').html();
    return x;
    });
    $('tei-placename').attr('data-placement', 'top');
    $('tei-placename').attr('data-trigger', 'hover');
    $('tei-placename').attr('data-toggle', 'popover');
    $('tei-placename').attr('data-html', 'true');
    
    /*Aktiviert mit .popover und macht, dass es bleibt wenn man drüber hovert.*/
    $('[data-toggle="popover"]').popover({
    html: true, trigger: 'manual', animation:false
  }).on("mouseenter", function () {
        var _this = this;
        var checkBox = document.getElementById("popover-check");
        $(this).popover("show");
        if (checkBox.checked == true){
        $(this).css("background", "linear-gradient(#ffffff, #e8e8e8)");
        }
        $(".popover").on("mouseleave", function () {
            $(_this).popover('hide');
            $(_this).css("background", "initial");
        });
    }).on("mouseleave", function () {
        var _this = this;
        setTimeout(function () {
            if (!$(".popover:hover").length) {
                $(_this).popover("hide");
                $(_this).css("background", "initial");
            }
        });
});
    
};

$(document).ready(function (){
    $('.collapse').on('shown.bs.collapse', function (){
        $(this).parent().find('.fa-plus-circle').removeClass('fa-plus-circle').addClass('fa-minus-circle')
    }).on('hidden.bs.collapse', function (){
        $(this).parent().find('.fa-minus-circle').removeClass('fa-minus-circle').addClass('fa-plus-circle')
    })
});
