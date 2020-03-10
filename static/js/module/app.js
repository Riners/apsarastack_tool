var myApp=angular.module('myApp',['ui.bootstrap','ngClipboard','ngSanitize', 'angularFileUpload']);
myApp.config(function($interpolateProvider) {
	$interpolateProvider.startSymbol('/{/');
	$interpolateProvider.endSymbol('/}/');
});
