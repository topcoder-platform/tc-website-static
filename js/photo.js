/*
 * Copyright (C) 2011 TopCoder Inc., All Rights Reserved.
 */
/**
 * Used to handle user upload/remove photo logic.
 * 
 * @author TCSASSEMBLER
 * @version 1.0
 */
$(document).ready(function() {

    var coor = null;
    
    $('#submitPhotoLink').click(function() {
        $('.popup').css("height", $(document).height());
        $('.popupUploadPhoto').show();
    });
    
    $('#removePhotoLink').click(function() {
        $('.popup').css("height", $(document).height());
        $('.popupRemovePhoto').show();
    });
    
    /* BUTTON CANCEL UPLOAD PHOTO */
	$('.btnCancel').live('click', function() {
		$('.popupUploadPhoto').hide();
	});
        
	/* BUTTON NO REMOVE PHOTO */
	$('.btnNo').live('click', function() {
		$('.popupRemovePhoto').hide();
	});
	
	/* BUTTON YES REMOVE PHOTO */
	$('.btnYes').live('click', function() {
		$('.popupRemovePhoto').hide();
        
        var request = {};
        request.removalReason = "Self removal";
        
        $.ajax({
            type: 'post',
            url:  "photo?module=remove",
            data: request,
            cache: false,
            dataType: 'json',
            async : false,
            success: handleRemoveResult
        });
	});        
        
    /* SHOW WINDOW OPEN FILE */
	photoSelected = function() {
        $('#photoUploadForm').submit(); 
    };
    
    if ($.browser.msie) {
        // IE suspends timeouts until after the file dialog closes
        $('input[name=photoFile]').click(function(event) {
            setTimeout(function() {
                photoSelected();
            }, 0);
        });
    } else {
        // All other browsers behave
        $('input[name=photoFile]').change(photoSelected);
    }
        
    var picWidth = $("#uploadImage").width();
    var picHeight = $("#uploadImage").height();
    
    $('.btnUpload').click(function() {
        if (!previewPath) {
            alert("Please select a photo first");
        } else {
            $("#submitPhotoForum input[name=previewPath]").val(previewPath);
            $("#submitPhotoForum input[name=lx]").val();
            
            if (coor) {
                $("#submitPhotoForum input[name=lx]").val(coor.x);
                $("#submitPhotoForum input[name=ly]").val(coor.y);
                $("#submitPhotoForum input[name=rx]").val(coor.x + coor.w);
                $("#submitPhotoForum input[name=ry]").val(coor.y + coor.h);
                
                $("#submitPhotoForum input[name=picWidth]").val(picWidth);
                $("#submitPhotoForum input[name=picHeight]").val(picHeight);
            }
            
            $("#submitPhotoForum").submit();
        }
        
    });
    
    if (previewPath) {
        $('.popupUploadPhoto').show();
        
        var src = previewPath;
        $("#uploadImage").html("<img>");
        $("#uploadImage img").attr("src", src);
        $('#photoUploadRight img').attr("src", src);
        $('#photoUploadRight img').css("width", "113px");
        $('#photoUploadRight img').css("height", "158px");
        
        if (originalFile) {
            $("#photoUploadLeft .locateInput .inner").html(originalFile);
        }
        
        var targetHeight = 270.0, targetWidth = 380.0;
        var newImage = new Image();
        newImage.src = src;
        newImage.onload = function onLoadImg() {
            var aspect = newImage.height / newImage.width;
            if (aspect > ( targetHeight / targetWidth )) {
                $("#uploadImage img").css("height", "270px");
                $("#uploadImage img").css("width", Math.round(270/aspect)+"px");
            } else {
                $("#uploadImage img").css("width", "380px");
                $("#uploadImage img").css("height", Math.round(380*aspect)+"px");
            }
            picWidth = $("#uploadImage").width();
            picHeight = $("#uploadImage").height();
        
            $("#uploadImage img").Jcrop({
                onChange: showPreview,
                onSelect: showPreview,
                aspectRatio: 115/138
            });
	}
    }
    
    function showPreview(coords) {
        if (parseInt(coords.w) > 0)
        {
            coor = coords;
            var rx = 113 / coords.w;
            var ry = 136 / coords.h
            
            $('#photoUploadRight img').css({
                width: Math.round(rx * picWidth) + 'px',
                height: Math.round(ry * picHeight) + 'px',
                marginLeft: '-' + Math.round(rx * coords.x + 3) + 'px',
                marginTop: '-' + Math.round(ry * coords.y + 4) + 'px'
            });
        }
    }
    
    function handleRemoveResult(result) {
        if (result.success) {
            $('#photoUploadForm input').val("");
            $("#submitPhotoLink").parent().show();
            $("#removePhotoLink").parent().hide();
            
            $("img.memberPhoto").attr("src", "/i/m/nophoto_submit.gif");
            alert("Remove photo successful");
        } else if (result.error) {
            alert(result.error.message);
        }
    }
    
    $('.popup').css("height", $(document).height());
})

