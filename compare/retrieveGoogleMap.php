<?php

function get_url_contents($url){
	$crl = curl_init();
	$timeout = 5;
	curl_setopt ($crl, curlopt_url,$url);
	curl_setopt ($crl, curlopt_returntransfer, 1);
	curl_setopt ($crl, curlopt_followlocation, 1);
	curl_setopt ($crl, curlopt_connecttimeout, $timeout);
	$ret = curl_exec($crl);
	curl_close($crl);
	return $ret;
}
	//$url = trim($_GET['url']);
	$url = "https://www.google.com/maps/place/University+of+South+Florida/@28.0587031,-82.4160426,17z/data=!3m1!4b1!4m5!3m4!1s0x88c2c7bec3c6ffd3:0xb1f4741e5c51906a!8m2!3d28.0587031!4d-82.4138539";
	$url = "https://www.google.com/maps/place/University+of+South+Florida/@28.0587031,-82.4160426,17z";
	
    //$html = file_get_contents($url);
	$html = get_url_contents($url);
	
	var_dump($html); 
	
	$pos = strpos($html, '<body');
	if ($pos !== false) {
		$html = substr($html, $pos); 
	}
	$pos = strpos($html, '</header>');
	if ($pos !== false) {
		$html = substr($html, $pos); 
	}
	$pattern = '/\<script.*\<\/script\>/iU'; //notice the U flag - it is important here
	$html = preg_replace($pattern, '', $html);
	$pattern = '#<script(.*?)>(.*?)</script>#is';
	$html = preg_replace($pattern, '', $html);
	
    echo strip_tags($html);
?>