/*
 * jQuery Embiggen plugin
 *
 * Author: Cameron Skene
 * Description: jQuery Embiggen Plugin. Displays linked to images center to window.
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 */

(function($){

    jQuery.fn.embiggen = function(options) {

        defaults = {
            vertical: true,
            bgcolor: "#191919",
            opacity: "0.98"
        };

        var o = $.extend(defaults, options);

        $(this).click(function(event) {
            
            event.preventDefault();

            var scrollTop = $(window).scrollTop();

            var overlay =   $("<div>", {
                                css: {
                                    "background-image": "url(img/ajax-loader.gif)",
                                    "position": "fixed",
                                    "top": 0,
                                    "left": 0,
                                    "width": "100%",
                                    "height": $(window).height(),
                                    "background-color": o.bgcolor,
                                    "background-position": "50% 50%",
                                    "background-repeat": "no-repeat",
                                    "z-index": "100",
                                    "opacity": o.opacity
                                },
                                click: function() {
                                    $(this).next().remove();
                                    $(this).remove();
                                }
                            })
                            .appendTo("body")

            $(window).resize(function(){
                $(overlay).css({
                    "height": $(window).height()
                })
            })

            var imgOBJ = new Image();

            $(imgOBJ).load(function() {

    			var x = $(window).width() - 50;
    			var y = $(window).height() - 50;
    			var imageWidth = imgOBJ.width;
    			var imageHeight = imgOBJ.height;
    			
                var imgElem = $('<img src="' + imgOBJ.src + '" width="' + imageWidth + '" />');
                    			
    			imgElem
                    .insertAfter(overlay)
                    .css({
                        "position": "absolute",
                        "top": "50%",
                        "left": "50%",
                        "z-index": "101"
                    })
                    .click(function(){
                        $(this).prev().remove();
                        $(this).remove();
                    })
                

    			if (o.vertical) {
    			    if (imageWidth > x) {
                        imageHeight = imageHeight * (x / imageWidth);
                        imageWidth = x;
                        if (imageHeight > y) {
                            imageWidth = imageWidth * (y / imageHeight);
                            imageHeight = y;
                        }
                    }
                    else if (imageHeight > y) {
                        imageWidth = imageWidth * (y / imageHeight);
                        imageHeight = y;
                        if (imageWidth > x) {
                            imageHeight = imageHeight * (x / imageWidth);
                            imageWidth = x;
                        }
                    }

                    imgElem
                        .css({
                            "top": "50%",
                            "width": imageWidth,
                            "height": imageHeight,
                            "margin-top": -imageHeight/2 + scrollTop,
                            "margin-left": -imageWidth/2
                        })

    			}

    			if (!o.vertical) {
    			    
    			    if (imageWidth > x) {
                        imageWidth = x;
                    }
                    
                    imgElem
                        .css({
                            "top": "25px",
                            "width": imageWidth,
                            "height": "auto",
                            "margin-top": scrollTop,
                            "margin-left": -imageWidth/2
                        })

    			}

                $(overlay).css("background-image", "none");

            })

            
            imgOBJ.src = this.href;

        })
        return this;
    };

})(jQuery);