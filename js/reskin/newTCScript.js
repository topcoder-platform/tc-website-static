// JavaScript Document


var MINIMUM_PAYMENT_ACCRUAL_AMOUNT;
var PAY_ME_CONFIRMATION_TEMPLATE;
var USER_PAYMENT_METHOD;

var ev = 'click';
if ($.support.touch) {
	ev = 'tap'
}
var app = {
	init : function() {
		app.setPlaceholder($('.connected .email'));
	},
	setPlaceholder : function(selector) {
		$(selector).each(function() {
			_this = $(this);
			var text = _this.attr('placeholder');
			_this.val(text).addClass('isBlured');
			_this.on('focus', function() {
				$(this).on('blur', function() {
					$(this).unbind('blur', arguments.callee);
					if ($.trim($(this).val()) === '') {
						$(this).val(text).addClass("isBlured");
					}
				});
				if ($(this).val() === text) {
					$(this).val('').removeClass("isBlured");
				}
			});
		});
	}
}

function tcTime() {
    w=window.open("http://www.topcoder.com/tc?module=Static&d1=calendar&d2=time","Time","top=2,left=2,width=250,height=50,resizable=yes,status=1");
    return;
}


// Popup show function
function showPopup(id) {
    var popup = $('#' + id),
        wrapper = popup.closest('.popup-wrapper');
    popup.show();
    wrapper.show();
}

// Popup hide function
function hidePopup(elem) {
    var popup = $(elem).closest('.popup'),
        wrapper = popup.closest('.popup-wrapper');
    popup.hide();
    wrapper.hide();
}

/**
 * Updates the text of Pay Me button with total amount of selected payments.
 */
function updatePayMe() {
    var total = calcTotalPayment();
    if (total >= 0) {
        $('#payMe').val('Pay Me: $' + total.toFixed(2));
    } else {
        $('#payMe').val('Pay Me: -$' + Math.abs(total.toFixed(2)));
    }
    if (total < MINIMUM_PAYMENT_ACCRUAL_AMOUNT || !isUserPaymentMethodValid()) {
        $('#payMe').attr('disabled', 'disabled');
    } else {
        $('#payMe').removeAttr('disabled');
    }
}

/**
 * Calculates the total amount of payments selected by user.
 *
 * @return {Number} a total amount of selected payments.
 */
function calcTotalPayment() {
    var total = 0.00;
    $('.payable:checked').each(function () {
        var amount = parseFloat($(this).parent().find('.paymentNetAmount').val());
        total += amount;
    });
    return total;
}

/**
 * Checks if current user has a payment method set to any value other than NULL or 1,3,4 (Not Set,Wire,ACH)
 */
function isUserPaymentMethodValid() {
    return (USER_PAYMENT_METHOD != null) && (USER_PAYMENT_METHOD != 1) && (USER_PAYMENT_METHOD != 3) && (USER_PAYMENT_METHOD != 4);
}

function showError(/*String*/ message, /*Object*/ dom){
    $(dom).after('<span class="bigRed">'+ message +'</span>');
}

/**
 * Validate the input field to update or create a second email.
 */
function validateAddSecondEmail( /*Object*/ inputControl){
    $('.bigRed').remove();

    var EMAIL_REGEX_CHECKER = new RegExp(".+@[^\\.]+(\\.[^\\.]+)*");

    if( !nonEmptyValidate($(inputControl).val()) ){
        showError("Please enter the email to continue.", inputControl);
        return false;
    }

    if( ! EMAIL_REGEX_CHECKER.test( $(inputControl).val() ) ){
        showError("The email has a bad format.", inputControl);
        return false;
    }

    return true;
}

/**
 * Validate the find user input field.
 */
function validateFindUserField(/*Object*/ inputControl){

    $('.bigRed').remove();

    if( !nonEmptyValidate($(inputControl).val()) ){
        showError("Please input something to search.", inputControl);
        return false;
    }

    return true;
}
/**
 * Validate the email type radio, which is to select the password recovery email account.
 */
function validateEmailTypeRadio(/*Object*/ emailTypeRadioTable){
    $('.emailTypeRadioMessage', emailTypeRadioTable).remove();
    var selected = $('input[type="radio"]:checked',emailTypeRadioTable);
    if( selected.length == 0 ){
        showEmailTypeRadioError( emailTypeRadioTable, "Please select one email to continue." );
        return false;
    }

    return true;
}

/**
 * This code is used in recoverByEmail.jsp to show error message when the email type is not selected correctly.
 */
function showEmailTypeRadioError(/*Object*/ emailTypeRadioTable, /*String*/ message ){
    $('tbody', emailTypeRadioTable).prepend('<tr class="emailTypeRadioMessage"><td colspan="2"><span class="bigRed">'+ message +'</span></td></tr>');
}

/*
 * Do not-empty validation.
 */
function nonEmptyValidate(/*String*/ query){
    return $.trim(query).length != 0;
}
/**
 * Check the password's length is between [ min, max ].
 */
function checkPasswordLength(/*String*/ password, /*int*/ min, /*int*/ max){
    return password.length >= min && password.length <= max;
}
/**
 * Check the input password contains only valid chars, which is defined in passwordAlphabet.
 */
function basicPasswordValidate(/*String*/ password, /*String*/ passwordAlphabet){
    for(var i = 0; i < password.length; i++){
        var appear = false;
        for(var j = 0; j < passwordAlphabet.length; j++){
            if(password.charAt(i) == passwordAlphabet.charAt(j)){
                appear = true;
            }
        }
        if(!appear)return false;
    }
    return true;
}



$(document).ready(function(){

    // setup current node
    if($("#nodeName").length && $("#nodeName").val()) {
        $('#' + $("#nodeName").val()).css({color:'#FF8A00'});
    }

    if( $("div.leftNavWrapper").parent().is("td")) {
        $("section.navigation").parent().css('width', '185px').css('display', 'block');

        $("body > table").addClass('mainContent');

        $("td.bodyColumn").nextAll().remove();
        $("td.statTableSpacer").nextAll().remove();
    }

   $("table").css('visibility', 'visible');

	// main Nav
	$('#mainNav').on(ev, function(){
		$('.sidebarNav').css('opacity', 1);
		$('.content, #navigation').toggleClass('moving');
		window.setTimeout(function(){$('body').toggleClass('stop-scrolling');},1);
	});
	$('#mainNav .root').on(ev, function(e){
		e.stopPropagation();
	});

	$('#mainNav .root > li').mouseenter(function(){
		$('.child',$(this)).stop().slideDown('fast');
	});
	$('#mainNav .root > li').mouseleave(function(){
		$('.child',$(this)).stop().slideUp('fast');
	});

	//Left Navigation
	$('.navigation li a').on(ev, function(){
		if($(this).siblings('ul').length && $(this).parents('li').hasClass('expanded')){
			$(this).parents('li').removeClass('expanded');
			$(this).siblings('ul').slideUp();
		}else{
			$(this).parents('li').addClass('expanded');
			$(this).siblings('ul').slideDown();
		}
	});

	//Tab
	$('.top-brand .actions').on(ev, 'a',function(){
		var idx = $(this).index($('.top-brand .actions a'));
		$('.top-brand .actions a').removeClass('active');
		$(this).addClass('active');
		$('.brand-container table').hide();
		$('.brand-container table').eq(idx).show();
	});

	//Chrome Hack
	if(navigator.userAgent.toLowerCase().match(/chrome/) != null) {
		$('#footer .twFollowIcon').css({
			'margin-left': '1px'
		});
	}

	app.init();

    // Popup close handler
    $('.popup-wrapper')
        .on(ev, '.close-popup', function () {
            hidePopup(this);
        })
        .on(ev, '.overlay', function () {
            var wrapper = $(this).closest('.popup-wrapper');
            wrapper.hide();
            $('.popup', wrapper).hide();
        });


    // payment page
    $('.uncheckAll').click(function() {
        $('.uncheckable').attr('checked', false);
        updatePayMe();
    });

    $('.checkAll').click(function () {
        $('.checkable').attr('checked', true);
        updatePayMe();
    });

    $('.payable').click(function() {
        if (!$(this).hasClass('negative')) {
            updatePayMe();
        }
    });

    $('#payMe').click(function() {
        if (isUserPaymentMethodValid()) {
            var total = calcTotalPayment();
            var confirmationMessage = PAY_ME_CONFIRMATION_TEMPLATE.replace('{0}', '$' + total.toFixed(2));

            if (confirm(confirmationMessage)) {
                var myForm = document.f;
                myForm.method = 'POST';
                myForm.module.value = 'PayMe';
                myForm.submit();
            }
        }
    });

    $('.getable').click(function () {
        var myForm = document.f;
        myForm.method = 'GET';
        myForm.module.value = 'PaymentHistory';

        $('input[name=paymentId]').attr('disabled', 'disabled');
    });

    updatePayMe();

    if ($(".post-container").length > 0) {

        var count = 0;

        try {

        // load the news
        $.get("/js/reskin/news.html", function (data) {
            $(data + '').find("#replacercode div.post").each(function () {

                if(count > 5) {
                    return false;
                }

                var title = $(this).find(".title a:eq(1)").text();
                var category = $(this).find(".title a:eq(0) span").text();
                var categoryLink = $(this).find(".title a:eq(0)").attr('href');
                var imgLink = $(this).find("div.entry img").attr('src');
                var imgLinkHref = $(this).find("div.entry img").parent().attr('href');
                $(this).find("div.entry img").remove();
                var entryContent = $(this).find("div.entry").html();
                var date = $(this).find(".byline").text();
                date = date.replace('Posted on', '');
                date = $.trim(date.replace(/by.*/, ''));
                var author = $(this).find(".byline span").text();
                var plink = $(this).find(".links a:eq(0)").attr('href');

                var templateHTML = $(".post-container").find(".postTemplate").html();
                var postItem = $('' + templateHTML);
                postItem.find("a.title").text(title).attr('href', plink);
                postItem.find("div.date span").text(date);
                postItem.find("div.author span").text(author);
                postItem.find("div.category a").text(category).attr('href', categoryLink);
                if(imgLink) {
                    postItem.find("a.figure img").attr('src', imgLink).attr('alt', '');
                    if(imgLinkHref) {
                        postItem.find("a.figure").attr('href', imgLinkHref);
                    }
                } else {
                    postItem.find("a.figure").remove();
                }

                postItem.find(".details").prepend(entryContent + '');
                postItem.find(".details .more a").attr('href', plink);

                $(".post-container").append($("<section class='post'></section>").html(postItem));
                count ++;
            })
        });

        } catch(e) {
            // ignore

        }
    }

    if($(".recentBlogPosts").length > 0) {

        try {

        jQuery.getFeed({
            url: '/js/reskin/rss.xml',
            success: function(feed) {
                $.each(feed.items, function(index, item){

                    if(index > 2) {
                        return;
                    }

                    var itemHTML = $("#blogTemplate").html();
                    var blogEntry = $('' + itemHTML);
                    var dateArray = item.updated.split(' ');
                    blogEntry.find('a:eq(0)').attr('href', item.link).text(dateArray[2] + ' ' + dateArray[1]);
                    blogEntry.append(item.description).find("br").remove();

                    blogEntry.insertBefore('#blogTemplate');
                })
            }
        });

        } catch(e) {
            // ignore
        }
    }


});