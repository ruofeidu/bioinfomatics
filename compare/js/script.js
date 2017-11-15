var LEN = 20; 
var MIN_RATIO = 0.45; 
var MAX_RATIO = 0.55; 
var PERFECT_RATIO = 0.5;

function Update() {
	LEN = $("#query").val(); 
	MIN_RATIO =  (parseInt($("#min_ratio").val())) / 100; 
	MAX_RATIO =  (parseInt($("#max_ratio").val())) / 100; 
	PERFECT_RATIO = (parseInt($("#perfect_ratio").val())) / 100; 
	$('#in_a').val( $('#in_a').val().toUpperCase() );
	$('#in_b').val( $('#in_b').val().toUpperCase() );
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
	return str.trim().replace(/[\r\n\s]/g,"");
}

function UpsideDown(str){
	str = Trim(str);
	var ans = ""; 
	var n = str.length; 
	for (var i = 0; i < n; ++i) ans = ans.concat(UDChar(str[n-i-1]));
	return ans;  
}

function Analyze(a, b) {
	a = Trim(a); 
	b = Trim(b); 
	var n = a.length; 
	var m = b.length; 
	var ans_a = Array(); 
	var ans_b = Array(); 
	var l = LEN; 
	if (n < l || m < l) {
		alert("Opps, one of the DNA smaller than " + l); 
		return ""; 
	}
	var lmin = Math.floor(l * MIN_RATIO); 
	var lmax = Math.ceil(l * MAX_RATIO); 
	console.log(lmin, lmax); 
	for (var i = lmin; i <= lmax; ++i) ans_a[i] = Array(); 
	for (var i = lmin; i <= lmax; ++i) ans_b[i] = Array();

	var cnt = 0; 
	for (var i = 0; i < l; ++i) {
		if (a[i] == 'C' || a[i] == 'G') {
			++cnt; 
		}
	}

	if (cnt >= lmin && cnt <= lmax) {
		ans_a[cnt].push(l-1); 
	}

	for (var i = l; i < n; ++i) {
		if (a[i-l] == 'C' || a[i-l] == 'G') {
			--cnt; 
		}
		if (a[i] == 'C' || a[i] == 'G') {
			++cnt; 
		}
		if (cnt >= lmin && cnt <= lmax) {
			ans_a[cnt].push(i); 
		}
	}

	cnt = 0; 
	for (var i = 0; i < l; ++i) {
		if (b[i] == 'C' || b[i] == 'G') {
			++cnt; 
		}
	}

	if (cnt >= lmin && cnt <= lmax) {
		ans_b[cnt].push(l-1); 
	}

	for (var i = l; i < m; ++i) {
		if (b[i-l] == 'C' || b[i-l] == 'G') {
			--cnt; 
		}
		if (b[i] == 'C' || b[i] == 'G') {
			++cnt; 
		}
		if (cnt >= lmin && cnt <= lmax) {
			ans_b[cnt].push(i); 
		}
	}


	//output
	var mid = Math.floor(l * PERFECT_RATIO); 
	if (i < lmin || i > lmax) {
		mid = Math.ceil(l * PERFECT_RATIO); 
	}
	var i = mid; 
	var j = 0; 
	var res_a = ""; 
	var res_b = ""; 
	var res_c = ""; 

	var sorry_a = true;
	var sorry_b = true; 

	while (i >= lmin && i <= lmax) {

		if (ans_a[i].length != 0) {
			sorry_a = false; 
			var tmp = "GC" + i + " (" + Math.round(i/l*100) + "%), total " + ans_a[i].length + ":\n"; 
			res_a = res_a.concat(tmp); 
			for (var x in ans_a[i]) {
				var y = ans_a[i][x]; 
				//console.log(y); 
				res_a = res_a.concat(a.substr(y-l+1, l) + "\n"); 
			}
		}

		if (ans_b[i].length != 0) {
			sorry_b = false; 
			var tmp = "GC" + i + " (" + Math.round(i/l*100) + "%), total " + ans_a[i].length + ":\n"; 
			res_b = res_b.concat(tmp); 
			res_c = res_c.concat(tmp); 
			for (var x in ans_b[i]) {
				var y = ans_b[i][x]; 
				//console.log(y); 
				res_b = res_b.concat(b.substr(y-l+1, l) + "\n"); 
				res_c = res_c.concat(UpsideDown(b.substr(y-l+1, l)) + "\n"); 
					
			}
		}


		if (j == 0) {
			++j; 
			i = mid - j; 
		} else {
			if (i < mid){
				i = mid + j; 
			} else {
				++j; 
				i = mid - j; 
			}
		}
	}

	if (sorry_a) $('#out_a').val("Sorry, nothing between " + MIN_RATIO + " and " + MAX_RATIO + " is found."); else $('#out_a').val(res_a); 
	if (sorry_b) $('#out_b').val("Sorry, nothing between " + MIN_RATIO + " and " + MAX_RATIO + " is found."); else $('#out_b').val(res_b); 
	if (sorry_b) $('#out_bt').val("Sorry, nothing between " + MIN_RATIO + " and " + MAX_RATIO + " is found."); else 
	$('#out_bt').val(res_c); 

}

var getTokensFromString = function(s) {
	// console.log(s); 
	s = s.replace(/(^\s*)|(\s*$)/gi,"");
	s = s.replace(/[ ]{2,}/gi," ");
	s = s.replace(/\n /,"\n");
	return s.split(' ');
}

var getTokensFromStringWithoutCommas = function(s) {
	s = s.replace(/(~|`|!|@|#|$|%|^|&|\*|\(|\)|{|}|\[|\]|;|:|\"|'|<|,|\.|>|\?|\/|\\|\||-|_|\+|=)/g," ");
	s = s.replace(/(^\s*)|(\s*$)/gi,"");
	s = s.replace(/[ ]{2,}/gi," ");
	s = s.replace(/\n /,"\n");
	//s = s.replace(/[,.]/gi,"");
	return s.split(' ');
}

var a, b; 


var getNormalRow = function(_a, _b) {
	return "<div class='row normal' align='center'><div class='col-md-5'>" + 
		_a + "</div><div class='col-md-2'></div><div class='col-md-5'>" + _b + "</div></div>";
}

var getPlagiarismRow = function(_a, _b, _nums) {
	return "<div class='row plagiarism' align='center'><div class='col-md-5'>" + 
		_a + "</div><div class='col-md-2'>" +
		_nums +
		"</div><div class='col-md-5'>" + _b + "</div></div>";
}

var areWordsEqual = function (x, y) {
	return x.toLowerCase() == y.toLowerCase(); 
	//return x.replace(/[,.]/g, '').toLowerCase() == y.replace(/[,.]/g, '').toLowerCase(); 
}

// brute force
var Compare = function(_a, _b) {
	
	var MIN_NUM_WORDS = 3; 
	var MIN_LENGTH = 6; 
	
	
	a = getTokensFromStringWithoutCommas(_a); 
	b = getTokensFromStringWithoutCommas(_b); 
	//var A = getTokensFromString(_a); 
	//var B = getTokensFromString(_b); 
	var A = a, B = b; 
	// console.log(a); 
	console.log(b); 
	
	var n = a.length;
	var m = b.length; 
	var cntPlagiarism = 0; 
	var html = ""; 
	
	if (n * m > 5000 * 5000) {
		html += getNormalRow("words exceed ", 5000 * 5000); 
		$("#result").html(html); 
		return; 
	}
	
	var lastJ = 0;
	var i = 0;
	var itr = 0; 
	var MAX_ITR = 1000000000; 
	
	var normal_a = "", normal_b = ""; 
	var plagiarism_a = "", normal_b = "";
	
	while (i < n) {
		var sames = 0; 
		var curLength = 0; 
		var maxJ = 0, maxSames = 0, maxLength = 0; 
		
		for (var j = 0; j < m - MIN_NUM_WORDS; ++j) {
			sames = 0; 
			curLength = 0; 
			while (i + sames < n && j + sames < m &&
			 areWordsEqual(a[i + sames], b[j + sames]) ) {
				curLength += a[i + sames].length; 	
				++sames;
			}
			
			if (sames >= MIN_NUM_WORDS && curLength >= MIN_LENGTH &&
				sames >= maxSames && curLength >= maxLength
				) {
				maxSames = sames; 
				maxLength = curLength; 
				maxJ = j; 
			}
		}
		
		if (maxSames >= MIN_NUM_WORDS && maxLength >= MIN_LENGTH) {
			cntPlagiarism += maxSames; 
			if (normal_a.length > 0 || lastJ != maxJ) {
				if (lastJ < maxJ) 
					normal_b = B.slice(lastJ, maxJ).join(' ');
				else 
					normal_b = "[Jumped paragraph]"; 
				html += getNormalRow( normal_a, normal_b ); 
			}
			// console.log(i); 
			// console.log(maxSames); 
			// console.log(a.slice(i, i + maxSames)); 
			// console.log(b.slice(maxJ, maxJ + maxSames)); 
			html += getPlagiarismRow( A.slice(i, i + maxSames).join(' '), B.slice(maxJ, maxJ + maxSames).join(' '), maxSames); 
			lastJ = maxJ + maxSames; 
			i = i + maxSames;
			normal_a = "";			
		} else {		
			normal_a += (normal_a.length == 0) ? A[i] : (" " + A[i]); 
			++i; 
		}
	}
	
	if (normal_a.length > 0 || lastJ != maxJ) {
		html += getNormalRow( normal_a, B.slice(lastJ, b.length).join(' ') ); 
	}
	var percentageA = cntPlagiarism / n * 100; 
	var percentageB = cntPlagiarism / m * 100; 
	
	
	$('#textA').html('Text A, ' + n + ' words, ' + cntPlagiarism + ' copied, ' 
	+ percentageA.toFixed(2) + '% similarity'); 
	$('#textB').html('Text B, ' + m + ' words, ' + percentageB.toFixed(2) + '% similarity' ); 
	$("#result").html(html); 
}

function isURL(str) {
  var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
  '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|'+ // domain name
  '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
  '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
  '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
  '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
  return pattern.test(str);
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


	$('#compare').click(function(){
		var bval = $("#in_b").val().trim(); 
		if (isURL(bval)) {
			$.ajax({
			  url: 'retrieve.php?url=' + bval,
			  type: 'GET', 
			  cache: false,
			  success: function(data) {
					$('#status').html("Success");
					Compare($("#in_a").val(), data); 
			  },
			  error: function(e) {
					$('#status').html("Failed to fetch URL");
			  }
			});
		} else {
			$('#status').html("Offline");
			Compare($("#in_a").val(), $("#in_b").val()); 
		}
	}); 

});



