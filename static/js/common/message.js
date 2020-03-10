function Message($scope, messageStyle, messageDuring, messageTitle) {
    $scope.messageShow = true;
    $scope.messageTitle = messageTitle;
    var screenHeight = window.screen.height;
    var screenWidth = window.screen.width;
	var myMessage=angular.element(document.querySelector('.myMessage'));
	if(messageStyle == 'success') {
		myMessage.removeClass('pangu-message-content-error')
		myMessage.addClass('pangu-message-content-success')
	}else{
		myMessage.removeClass('pangu-message-content-success')
		myMessage.addClass('pangu-message-content-error')
	}
	myMessage.css({'left':(screenWidth-100)/2,'top':0}).animate({top:(screenHeight-100)/2.5},150);
    setTimeout(function(){
    	myMessage.css({'top':-100});
		$scope.messageShow = false;
		$scope.$apply();
    }, messageDuring) 
}
