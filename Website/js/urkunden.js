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

function mylf() {
    $('tei-lb').hide();
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
    $('tei-lb').show();
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

$('#ansichten input').change(
    function() {
        switch ($(this).val()) {
            case 'lf': mylf(); break;
            case 'da': myda(); break;
        }
    }
);
