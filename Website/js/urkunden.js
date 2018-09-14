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
    datenBoxFiller();
    farbMarkierer();+
    titleFiller();
  } else {
    setTimeout(checkContainer, 50); 
  }
}

function farbMarkierer(){
    $('[data-toggle="popover"]').hover(
      function (){$(this).css("background", "linear-gradient(#ffffff, #c5ccdd)");},
      function (){
          $(this).css("background", "initial");
      }
      );
}


function titleFiller(){
    $('#urkundenname').html(function (){
        return $('tei-titleStmt tei-title[type=main]').text();
        });
    $('#transkription').html(function (){
        var z = $('tei-respStmt:eq(0) tei-resp').text();
        var y = $('tei-respStmt:eq(0) tei-name').text();
        return z+' '+y;
        });
    $('#edition').html(function (){
        var z = $('tei-respStmt:eq(1) tei-resp').text();
        var y = $('tei-respStmt:eq(1) tei-name').text();
        return z+' '+y;
        });
    $('#uebersetzung').html(function (){
        var z = $('tei-respStmt:eq(2) tei-resp').text();
        var y = $('tei-respStmt:eq(2) tei-name').text();
        return z+' '+y;
        });
    $('#infotext').html(function (){
        return $('tei-titleStmt tei-title[type=desc]').text();
        });   
     $('#ueberschriftBild').attr("src", function (){
         var str = $("tei-titleStmt tei-title[type=main]").text();
         if (str === "Stiftungsurkunde"){
            return "img/urkunde1-1.png";
         }
         if (str === "Gründungsurkunde"){
            return "img/urkunde2-1.png";
         }
         if (str === "Kaiserliche Bestätigung"){
            return "img/urkunde3-1.png";
         }
         if (str === "Päpstliche Bestätigung"){
            return "img/urkunde4-1.png";
         }
     });
        

}


function datenBoxFiller(){
    ursprungBoxFiller();
    aeusserlichkeitBoxFiller();
    archivBoxFiller();
}

function ursprungBoxFiller(){
    $('#datumZeile').html(function (){
        var z =$('tei-origin tei-date').text();
        return '<i class="fas fa-calendar-alt body-icon fa-fw"></i>'+' '+z;
        });
    $('#ortZeile').html(function (){
        var z =$('tei-origin tei-settlement').text();
        return '<i class="fas fa-home body-icon fa-fw"></i>'+' '+z;
        });
}

function aeusserlichkeitBoxFiller(){
    $('#seiteZeile').html(function (){
        var z =$('tei-extent tei-measure').text();
        return '<i class="fas fa-file body-icon fa-fw"></i>'+' '+z+' '+'Seite(n)';
        });
    $('#materialZeile').html(function (){
        var z =$('tei-supportDesc tei-support').text();
        return '<i class="fas fa-edit body-icon fa-fw"></i>'+' '+z;
        });
    $('#hoeheZeile').html(function (){
        var z =$('tei-dimensions tei-height').text();
        return '<i class="fas fa-arrows-alt-v body-icon fa-fw"></i>'+' '+z+' cm';
        });
    $('#breiteZeile').html(function (){
        var z =$('tei-dimensions tei-width').text();
        return '<i class="fas fa-arrows-alt-h body-icon fa-fw"></i>'+' '+z+' cm';
        });
    $('#siegelZeile').html(function (){
        var z =$('tei-sealdesc tei-p').text();
        return '<i class="fas fa-medal body-icon fa-fw"></i>'+' '+z;
        });
}

function archivBoxFiller(){
    $('#archivOrtZeile').html(function (){
        var x =$('tei-msIdentifier tei-country').text();
        var y =$('tei-msIdentifier tei-region').text();
        var z =$('tei-msIdentifier tei-settlement').text();
        return '<i class="fas fa-map-marked-alt body-icon fa-fw"></i>'+' '+x+'>'+' '+y+'>'+' '+z;
        });
    $('#archivZeile').html(function (){
        var x =$('tei-msIdentifier tei-repository').text();
        var y =$('tei-msIdentifier tei-collection').text();
        return '<i class="fas fa-university body-icon fa-fw"></i>'+' '+x+'>'+' '+y;
        });
    $('#signaturZeile').html(function (){
        var z =$('tei-msIdentifier tei-idno').text();
        var y =$('tei-msIdentifier tei-idno').attr('ref');
        return '<i class="fas fa-folder-open body-icon fa-fw"></i>'+' '+'Sig.:'+' '+'<a target="_blank" href="'+y+'">'+z+'</a>';
        });
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
      farbMarkierer();
      return;
   }
   else {
      $('[data-toggle="popover"]').popover('disable');
      $('[data-toggle="popover"]').hover(
      function (){$(this).css("background", "initial");}
      );
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

$('#abschnitte-check').change(function() {
   if($(this).is(":checked")) {
      $("tei-ab[type='intitulatio']").addClass('abschnitt');
      $("tei-ab[type='promulgatio']").addClass('abschnitt');
      $("tei-ab[type='narratio']").addClass('abschnitt');
      $("tei-ab[type='dispositio']").addClass('abschnitt');
      $("tei-ab[type='sanctio']").addClass('abschnitt');
      $("tei-ab[type='corroboratio']").addClass('abschnitt');
      $("tei-ab[type='datierung']").addClass('abschnitt');
      $("tei-ab[type='subscriptio']").addClass('abschnitt');
      $("tei-ab[type='apprecatio']").addClass('abschnitt');
      return;
   }
   else {
      $("tei-ab[type='intitulatio']").removeClass('abschnitt');
      $("tei-ab[type='promulgatio']").removeClass('abschnitt');
      $("tei-ab[type='narratio']").removeClass('abschnitt');
      $("tei-ab[type='dispositio']").removeClass('abschnitt');
      $("tei-ab[type='sanctio']").removeClass('abschnitt');
      $("tei-ab[type='corroboratio']").removeClass('abschnitt');
      $("tei-ab[type='datierung']").removeClass('abschnitt');
      $("tei-ab[type='subscriptio']").removeClass('abschnitt');
      $("tei-ab[type='apprecatio']").removeClass('abschnitt');
      return;
   }
});

jQuery(document).ready(checkContainer);

  
function zuweisung() {
    $('tei-text tei-name').attr('title', function (x){
    var x =$('#popover-person-header-div').html();
    return x;
    });
    $('tei-text tei-name').attr('data-content', function (x){
    var x =$('#popover-person-content-div').html();
    return x;
    });
    $('tei-text tei-name').attr('data-toggle', 'popover');
    $('tei-text tei-placename').attr('title', function (x){
    var x =$('#popover-place-header-div').html();
    return x;
    });
    $('tei-text tei-placename').attr('data-content', function (x){
    var x =$('#popover-place-content-div').html();
    return x;
    });
    $('tei-text tei-placename').attr('data-toggle', 'popover');
    
    
    $('[data-toggle="popover"]').each(function () {
    var $elem = $(this);
    $elem.popover({
        placement: 'top',
        trigger: 'hover',
        html: true,
        container: $elem,
        delay: {show : 700, hide : 200}
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


    
    

