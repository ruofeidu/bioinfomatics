var LEN = 20; 
var MIN_RATIO = 0.45; 
var MAX_RATIO = 0.55; 
var PERFECT_RATIO = 0.5;

$(document).ready(function() {

	$("#out_a").mouseover(function(){
		$(this).select();
	});

	$("#in_a").mouseover(function(){
		$(this).select();
	});

	$("#in_b").mouseover(function(){
		$(this).select();
	});


	$('#analyze').click(function(){
		var a = parseFloat( $('#in_a').val() );
		var b = parseFloat( $('#in_b').val() );
		var pa = parseFloat( $('#pa').val() );
		var pb = parseFloat( $('#pb').val() );
		var res = (0.1 + pb - pa - 0.1) / (a - b) * (a - 50.0) ;
		console.log(res); 
		res = res + pa;	 
		console.log(pa); 
		$('#out_a').val(res); 
	}); 

});



