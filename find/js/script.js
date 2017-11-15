var LEN = 20; 
var MIN_RATIO = 0.45; 
var MAX_RATIO = 0.55; 
var PERFECT_RATIO = 0.5;

function Update() {
	LEN = $("#query").val(); 
	MIN_RATIO =  (parseInt($("#min_ratio").val())) / 100; 
	MAX_RATIO =  (parseInt($("#max_ratio").val())) / 100; 
	PERFECT_RATIO = (parseInt($("#perfect_ratio").val())) / 100; 
}

function UDChar(ch) {
	var ans = '';  
	if (ch == 'A') {
		ans = 'T'; 
	}
	else if (ch == 'T') {
		ans = 'A'; 
	}
	else if (ch == 'U') {
		ans = 'A'; 
	}
	else if (ch == 'C') {
		ans = 'G'; 
	}
	else if (ch == 'G') {
		ans = 'C'; 
	}
	return ans; 
}

function Trim(str) {
	return str.trim().replace(/\r|\n|\s/ig, "");
}

function UpsideDown(str){
	str = Trim(str);
	var ans = ""; 
	var n = str.length; 
	for (var i = 0; i < n; ++i) ans = ans.concat(UDChar(str[n-i-1]));
	return ans;  
}

function FindXYZW(a, b) {
	b = Trim(b).toUpperCase(); 
	console.log(b); 
	var occurTimes = [0, 0, 0, 0];
	var occurID = [0, 0, 0, 0];
	var str = ""; 
	var total = 0; 
	var aCharCode = "A".charCodeAt(0);
	
	for (var i = 0; i < b.length; ++i) {
		var cid = b.charCodeAt(i) - aCharCode;
		console.log(cid);
		++occurTimes[cid];
		if (occurTimes[cid] == 1) {
			++total; 
			occurID[cid] = total; 
			if (total == 1) {
				str += "(\\w)";
			} else {
				str += "((?!(";
				for (var j = 1; j < total; ++j) {
					str += "\\" + j;
					if (j != total - 1) str += "|";
				}
				str += "))\\w)";
			}
		} else {
			str += "\\" + occurID[cid];
		}
	}
	console.log(str);
	$("#in_reg").val(str); 
	Find($('#in_a').val(), $('#in_reg').val()); 
}

function Find(a, b) {
	a = Trim(a); 
	b = Trim(b); 
	var patternLength = 7;
	console.log(b); 
	var reg = new RegExp(b, "gi");
	//var b = /([ATCG])(\1){2}([ATCG])(\2){2}([ATCG])(\3){1}/ig;
	
	var c = a;
	var last = 0; 
	var foundLocation = 0; 
	var res = ""; 
	
	var allResults = a.match(reg);
	res = res + '<font class="' + "outside" + '">Results: ' + allResults + "</font>" + "<br />"; 
	
	while (foundLocation !== -1) {
		foundLocation = c.search(reg);
		if (foundLocation === -1) break; 
		console.log(c.substr(foundLocation, patternLength));
		res = res + '<font class="' + "inside" + '">' + c.substr(0, foundLocation) + "</font>"; 
		c = c.substr(foundLocation);
		res = res + '<font class="' + "tmhelx" + '">' + c.substr(0, patternLength) + "</font>"; 
		c = c.substr(patternLength);
	}
	res = res + '<font class="' + "inside" + '">' + c.substr(0, c.length) + "</font>"; 
	
	// res = ""; 
	
	// var last = 0; 
	// for (var i = 0; i < a.length - l; ++i) {
		// if (a[i] !== a[i+1] || a[i] !== a[i+2] ) continue; 
		// if (a[i] === a[i+3] || a[i+3] !== a[i+4] || a[i+4] != a[i+5] ) continue;
		// if (a[i] === a[i+6] || a[i+3] === a[i+6] ) continue; 
		// str = '<font class="' + "inside" + '">' + a.substr(last, i - last) + "</font>"; 
		// res = res + str; 
		// str = '<font class="' + "tmhelx" + '">' + a.substr(i, 7) + "</font>"; 
		// res = res + str; 
		// console.log( a.substr(i, l) ); 
	// }
	// str = '<font class="' + "inside" + '">' + a.substr(last, a.length - last) + "</font>"; 
	// res = res + str; 
	
	$("#colortext").html(res); 
}

$(document).ready(function() {

	$("#out_a").mouseover(function(){
		$(this).select();
	});
	
	$("#out_b").mouseover(function(){
		$(this).select();
	});

	$("#out_bt").mouseover(function(){
		$(this).select();
	});

	$("#in_a").mouseover(function(){
		$(this).select();
	});

	$("#in_b").mouseover(function(){
		$(this).select();
	});

	$('#upside_down').click(function(){
		Update(); 
		$('#out_a').val(UpsideDown($('#in_a').val())); 
		$('#out_b').val(UpsideDown($('#in_b').val())); 
	}); 

	$('#findxyzw').click(function(){
		Update(); 
		FindXYZW($('#in_a').val(), $('#in_xyzw').val()); 
	}); 

	$('#findreg').click(function(){
		Update(); 
		Find($('#in_a').val(), $('#in_reg').val()); 
	}); 

});



