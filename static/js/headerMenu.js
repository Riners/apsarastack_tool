$(document).ready(function() {
	$('.header .headerNav').mouseenter(function() {
		$(this).find('.subMenu').addClass('active');
		$(this).find('.bottom-line').addClass('active');
	}).mouseleave(function(){
		$(this).find('.subMenu').removeClass('active');
		$(this).find('.bottom-line').removeClass('active');
	})
    var subMenuList = $('.subMenu');
    subMenuList.map((index, item) => {
    	console.log($(item).children().length, index)
    	if($(item).children().length) {
    		$(item).css({'minHeight':'90px'})
    	}else{
    		$(item).css({'minHeight':'0px'})
    	}
    })
})
