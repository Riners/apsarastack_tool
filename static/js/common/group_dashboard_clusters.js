$(document).ready(function() {
	//console.log($('.chart-tab .tab-ul li'),"li")
	var tabList = Array.prototype.slice.call($('.chart-tab .tab-ul li'));
	var ulLength = 0;
	var tabTotal = 0;
	tabList.map(function(item, index) {
		ulLength = ulLength + item.offsetWidth + 4;
		tabTotal = index + 1;
	})
	var ul = $('.chart-tab .tab-ul');
	ul.css({'width':ulLength > 1068 ? ulLength : 1068});
//	ul.css({'minWidth':1068});
	var tabBtnLeft = $('.btn-left');
	var tabBtnRight = $('.btn-right');
	var positionLeft = 0;
	var index = 0;
	tabBtnLeft.click(function() {
		index++;
		if(index > 0) {
			index = 0
		}else{
			ul.animate({'left':index*(150+2)},500)
		}
	})
    tabBtnRight.click(function() {
		index--;
		if(index < -tabTotal+7) {
			index = -tabTotal+7;
		}else{
			ul.animate({'left':index*(150+2)},500)
		}
	})
})