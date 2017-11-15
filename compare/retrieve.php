<?php

// function get_url_contents($url){
	// $crl = curl_init();
	// $timeout = 5;
	// curl_setopt ($crl, CURLOPT_URL,$url);
	// curl_setopt ($crl, CURLOPT_RETURNTRANSFER, 1);
	// curl_setopt ($crl, CURLOPT_CONNECTTIMEOUT, $timeout);
	// $ret = curl_exec($crl);
	// curl_close($crl);
	// return $ret;
// }
	$url = trim($_GET['url']);
    $html = file_get_contents($url);
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