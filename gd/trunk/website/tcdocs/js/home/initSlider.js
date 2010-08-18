// JavaScript Document
$(document).ready(function(){
						   
	$.fn.silder = function(options){
	  
		// default configuration properties
		var defaults = {			
			prevId: 		'prevBtn',
			prevText: 		'Previous',
			nextId: 		'nextBtn',	
			nextText: 		'Next',
			controlsShow:	true,
			controlsBefore:	'',
			controlsAfter:	'',	
			controlsFade:	true,
			firstId: 		'firstBtn',
			firstText: 		'First',
			firstShow:		false,
			lastId: 		'lastBtn',	
			lastText: 		'Last',
			lastShow:		false,				
			vertical:		false,
			speed: 			800,
			auto:			false,
			pause:			2000,
			continuous:		false
		}; 
		
		var options = $.extend(defaults, options);  
				
		this.each(function() {  
			var obj = $(this); 				
			var s = $("li", obj).length;
			var w = $("li", obj).width(); 
			var h = $("li", obj).height(); 
			obj.width(w); 
			obj.height(h); 
			obj.css("overflow","hidden");
			var ts = s-1;
			var t = 0;
			$("ul", obj).css('width',s*w);			
			if(!options.vertical) $("li", obj).css('float','left');
			
			if(options.controlsShow){
				var html = options.controlsBefore;
				if(options.firstShow) html += '<span id="'+ options.firstId +'"><a href=\"javascript:void(0);\">'+ options.firstText +'</a></span>';
				html += ' <span id="'+ options.prevId +'"><a href=\"javascript:void(0);\">'+ options.prevText +'</a></span>';
				html += ' <span id="'+ options.nextId +'"><a href=\"javascript:void(0);\">'+ options.nextText +'</a></span>';
				if(options.lastShow) html += ' <span id="'+ options.lastId +'"><a href=\"javascript:void(0);\">'+ options.lastText +'</a></span>';
				html += options.controlsAfter;						
				$(obj).after(html);										
			};
	
			$("a","#"+options.nextId).click(function(){		
				animate("next",true);
			});
			$("a","#"+options.prevId).click(function(){		
				animate("prev",true);				
			});	
			$("a","#"+options.firstId).click(function(){		
				animate("first",true);
			});				
			$("a","#"+options.lastId).click(function(){		
				animate("last",true);				
			});		
			
			function animate(dir,clicked){
				var ot = t;				
				switch(dir){
					case "next":
						t = (ot>=ts) ? (options.continuous ? 0 : ts) : t+1;						
						break; 
					case "prev":
						t = (t<=0) ? (options.continuous ? ts : 0) : t-1;
						break; 
					case "first":
						t = 0;
						break; 
					case "last":
						t = ts;
						break; 
					default:
						break; 
				};	
				
				var diff = Math.abs(ot-t);
				var speed = diff*options.speed;						
				if(!options.vertical) {
					p = (t*w*-1);
					$("ul",obj).animate(
						{ marginLeft: p }, 
						speed
					);				
				} else {
					p = (t*h*-1);
					$("ul",obj).animate(
						{ marginTop: p }, 
						speed
					);					
				};
				
				if(!options.continuous && options.controlsFade){					
					if(t==ts){
						$("a","#"+options.nextId).hide();
						$("a","#"+options.lastId).hide();
					} else {
						$("a","#"+options.nextId).show();
						$("a","#"+options.lastId).show();					
					};
					if(t==0){
						$("a","#"+options.prevId).hide();
						$("a","#"+options.firstId).hide();
					} else {
						$("a","#"+options.prevId).show();
						$("a","#"+options.firstId).show();
					};					
				};				
				
				if(clicked) clearTimeout(timeout);
				if(options.auto && dir=="next" && !clicked){;
					timeout = setTimeout(function(){
						animate("next",false);
					},diff*options.speed+options.pause);
				};
				
			};
			// init
			var timeout;
			if(options.auto){;
				timeout = setTimeout(function(){
					animate("next",false);
				},options.pause);
			};		
		
			if(!options.continuous && options.controlsFade){					
				$("a","#"+options.prevId).hide();
				$("a","#"+options.firstId).hide();				
			};				
			
		});
	  
	};
	
	/**
		the scroll function of the bottom area
	**/
	
	//the current num
	current = 1; 
	
	//the current button num
	button = 1; 
	
	//the total scroll num
	images = 15; 
	
	//the scroll width
	width = 904; 
	
	//the defaule scroll speed
	var speed = 5000; 
	
	//auto scroll
	var auto = true; 
	
	//the object of timer
	var oTime = null; 
	
	// init the first text position
	//$('#p1').animate({"left": "0px"}, 400, "swing");
	$('#p1').css({'left':'0px',"opacity":0}).animate({"opacity": 1.0}, 1000);
	
	// the function of the next button
	$("#next a").click(function() {
								
		button = current;
		current++;
		
		//the last 
		if(current == (images+1)) {
			current = 1;
		}
		
		//move to left
		animateLeft(current,button,function(){
			if(auto == true){
				window.clearInterval(oTime); 
				oTime = setInterval(autoAnimateRight,speed);
			}
		});
		
	});
	
	// the function of the previous button
	$("#previous a").click(function() {
									
		button = current;
		current--
		
		//the first
		if (current == 0 ) {
			current = images
		}
		
		//move to right
		animateRight(current,button,function(){
			if(auto == true){
				window.clearInterval(oTime);
				oTime = setInterval(autoAnimateRight,speed);
			}
		});
		
	});
	
	// the function of the num button
	$("#buttons a").click(function() {
		
		//set button num
		button=current;
		clickButton = $(this).attr('id');
		current = parseInt(clickButton.slice(1));
		
		//scroll left
		if (current > button) {animateLeft(current,button,function(){
			if(auto == true){
				window.clearInterval(oTime);
				oTime = setInterval(autoAnimateRight,speed);
			}
		});}
		
		//scroll right
		if (current < button) {animateRight(current,button,function(){
			if(auto == true){
				window.clearInterval(oTime);
				oTime = setInterval(autoAnimateRight,speed);
			}
		});}
		
	});
	
	//the function of scroll left
	function animateLeft(current,button) {
		
		$('#p'+current).css("left",width +"px");
		//$('#p'+current).animate({"left": "0px"}, 500, "swing");
		//$('#p'+button).animate({"left": -width+"px"}, 500, "swing");
		$('#p'+current).css({"left":"0px","opacity":0}).animate({"opacity": 1.0}, 1000);
		$('#p'+button).css("left",-width+"px");
		setbutton();
		
	}
	
	//the function of scroll right
	function animateRight(current,button) {
		//$('#p'+current).css("left",-width+"px");
		//$('#p'+current).animate({"left": "0px"}, 500, "swing");
		//$('#p'+button).animate({"left": width+"px"}, 500, "swing");
		$('#p'+current).css({"left":-width+"px","opacity":0}).animate({"opacity": 1.0}, 1000);
		$('#p'+current).css({"left":"0px","opacity":0}).animate({"opacity": 1.0}, 1000);
		$('#p'+button).css("left",width+"px");
		setbutton();
	}
	
	//the function of set button num
	function setbutton () {
		
		//if the first,the previous button disable
		if(current == 1){
			$('#previous a').hide();
			$('#next a').show();
		}
		
		//if the last,the next button disable
		else if(current == images){
			$('#previous a').show();
			$('#next a').hide();
		}
		
		else{
			$('#previous a').show();
			$('#next a').show();
		}
		
		$('#b'+button).removeClass('hover');
		$('#b'+current).addClass('hover');
		
	}

	//the function auto scroll
	function autoAnimateRight(){
		
		button = current;
			current++
		if (current == images + 1 ) {current = 1}
		animateRight(current,button);
		
	}
	
	//set timer
	if(auto == true){
		oTime = setInterval(autoAnimateRight,speed);
	}
	
	/**
		the scroll function of the design area
	**/
	
	//the current num
	desingCurrent = 1;
	
	//the current button num
	desingButton = 1;
	
	//the total scroll num
	desingImages = 3;
	
	//the scroll width
	desingWidth = 450;
	
	//the defaule scroll speed
	var desingSpeed = 4000;
	
	//auto scroll
	var desingAuto = false;
	
	//the object of timer
	var desingOTime = null;
	
	// init the first text position
	$('#m1').animate({"left": "0px"}, 300, "swing");
	
	// the function of the next button
	$("#nextButton a").click(function() {
									  
		desingButton = desingCurrent;
		desingCurrent++;
		
		//the last
		if(desingCurrent == (desingImages+1)) {
			desingCurrent = 1;
		}
		
		//move to left
		desingAnimateLeft(desingCurrent,desingButton,function(){
			if(desingAuto == true){
				window.clearInterval(desingOTime);
				desingOTime = setInterval(desingAutoAnimateRight,desingSpeed);
			}
		});
		
	});
	
	// the function of the previous button
	$("#pervButton a").click(function() {
									  
		desingButton = desingCurrent;
		desingCurrent--
		
		//the first
		if (desingCurrent == 0 ) {
			desingCurrent = desingImages;
		}
		
		//move to right
		desingAnimateRight(desingCurrent,desingButton,function(){
			if(desingAuto == true){
				window.clearInterval(desingOTime);
				desingOTime = setInterval(desingAutoAnimateRight,desingSpeed);
			}
		});
		
	});
	
	//the function of scroll left
	function desingAnimateLeft(desingCurrent,desingButton) {
		
		//change the title
		$('#scrollTitle h2').text($('#m'+desingCurrent).find('h3').text());
		
		$('#m'+desingCurrent).css("left",desingWidth +"px");
		$('#m'+desingCurrent).animate({"left": "0px"}, 300, "swing");
		$('#m'+desingButton).animate({"left": -desingWidth+"px"}, 300, "swing");
		
		desingSetbutton();
		
	}
	
	//the function of scroll right
	function desingAnimateRight(desingCurrent,desingButton) {
		
		//change the title
		$('#scrollTitle h2').text($('#m'+desingCurrent).find('h3').text());
		
		$('#m'+desingCurrent).css("left",-desingWidth+"px");
		$('#m'+desingCurrent).animate({"left": "0px"}, 300, "swing");
		$('#m'+desingButton).animate({"left": desingWidth+"px"}, 300, "swing");
		
		desingSetbutton();
	}
	
	//the function auto scroll
	function desingAutoAnimateRight(){
		
		desingButton = desingCurrent;
		desingCurrent--
		if (desingCurrent == 0 ) {
			desingCurrent = desingImages;
		}
		desingAnimateRight(desingCurrent,desingButton);
		
	}
	
	//the function of set button num
	function desingSetbutton () {
		
		//the first
		if(desingCurrent == 1){
			$('#pervButton a').hide();
			$('#nextButton a').show();
		}
		
		//the last
		else if(desingCurrent == desingImages){
			$('#pervButton a').show();
			$('#nextButton a').hide();
		}
		
		else{
			$('#pervButton a').show();
			$('#nextButton a').show();
		}
		
	}

	if(desingAuto == true){
		desingOTime = setInterval(desingAutoAnimateRight,desingSpeed);
	}
	
	// inti match silder
	$("#matchSlider").silder({
		auto: true,
		continuous: true
	});
	
	// inti member silder
	$("#memberSlider").silder({
		prevId: 'prevBtn2',
		nextId: 'nextBtn2'
	});
	
	//toggle the tip above to the abouts us link
	if (!$.browser.msie || ($.browser.msie && $.browser.version.substr(0,1)>=7)) {
		$('#mainNav li').hover(function(){
			var tip = $(this).find('.tip');
			tip.css('left',0-(Math.round(tip.width()/2)) + Math.round($(this).width()/2) +  'px');
			tip.show();
		},function(){
			$(this).find('.tip').hide();
		});
	}
	
	/*the first link of the nav click
	$('li.firstHover,li.first').click(function(){
											   
		$('#homeTab').show();
		$('#developmentTab').hide();
		$('#designTab').hide();
	
	});
	
	//the third link of the nav click
	$('li.thirdHover,li.third').click(function(){
		
		$('#designTab').show();
		$('#developmentTab').hide();
		$('#homeTab').hide();
	
	});
	
	//the second link of the nav click
	$('li.secondHover,li.second').click(function(){
		
		$('#developmentTab').show();
		$('#designTab').hide();
		$('#homeTab').hide();
		$('#mainContent #content .content_inner #developmentTab .nav').css('background','url(i/nav_bg_2.gif) no-repeat');	
	});*/
	
	//ie6 png fix
	$('.getStartButton a,.map .intro .introInner,.masterLeftSide .button a,.masterLeftSide .button a.laungh,.masterLeftSide h2,#getStartTip,div#logo a').css('behavior','url(../css/iepngfix.htc)');
	
	//ie6 button 
	$('.masterLeftSide .button a').hover(function(){
		
		$(this).css('background','url(i/master_compete_button_hover.png) no-repeat');	
		
		
	},function(){
		
		$(this).css('background','url(i/master_compete_button.png) no-repeat');	
	
	});
	
	$('.masterLeftSide .button a.laungh').hover(function(){
		
		$(this).css('background','url(i/master_laungh_button_hover.png) no-repeat');	
		
		
	},function(){
		
		$(this).css('background','url(i/master_laungh_button.png) no-repeat');	
	
	});
	
	$('.getStartButton a').hover(function(){
		
		$(this).css('background','url(i/get_Started_button_hover.png) no-repeat');	
		
		
	},function(){
		
		$(this).css('background','url(i/get_Started_button.png) no-repeat');	
	
	}).click(function() {
		location.href = "/home/community";
	});
	
	// rand number
	var number = Math.floor(Math.random()*4+1); 
	$('#memberSlider li').eq(number-1).clone().insertBefore($('#memberSlider li').eq(0)).end().remove();
	
	
	$(".dropdownList").selectbox();
	

        $(".selectbox-wrapper ul li").click(function() {
                var loc = $(this).attr("id");
                loc = loc.replace("_input_", "");
                window.location = loc;
        });

});
