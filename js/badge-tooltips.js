// JavaScript Document
$(document).ready(function() {
						 
	$('.quoteBadgesItem').each(function () {
		$(this).badgeTooltips({
			title: $(this).find('.achievementName').text(),
			content: $(this).find('.achievementDesc').text()//,
		});
    });
	
	if($.browser.msie){
		$('.quoteBadgesItem').css({'margin-left':'3px'});
	}
});

;(function ($) {
    /* TC tips JQuery plug-in. */
    $.fn.badgeTooltips = function (s) {
        s = $.extend({
                         title:'',
                         type:'quoteBadgesItemTips',
                         content:'',
                         time:''
                     }, s || {});
        if (!window.hover) {
            window.hover =
            $('<div class="toolTips"><h3></h3><div class="tipsContent"><p></p><span class="timeStamp"></span></div><div class="tipsArrow"></div></div>');
            $('body').append(window.hover);
            window.hover.css('display', 'none');
        }
        this.s = s;
        this.data('s', s);
        this.hover(
			function () {
				var s = $(this).data('s');
				window.hover.addClass(s.type);
				$('h3', window.hover).text(s.title);
				$('p', window.hover).text(s.content);
				$('span', window.hover).html(s.time);
				window.hover.show();
				var offset = $(this).offset();
				var t = offset.top - window.hover.outerHeight() - 2;
				var l = offset.left + $(this).outerWidth() / 2 - 44;
				window.hover.css({
									 left:l + 'px',
									 top:t + 'px'
								 });
				window.hover.css('display', 'block');
			},
			function () {
				var s = $(this).data('s');
				window.hover.removeClass(s.type);
				window.hover.css('display', 'none');
			}
        );
        return this;
    };
})(jQuery);

