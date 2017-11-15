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

// file_get_contents
	$opts = array('http' =>
		array(
			'method'  => 'GET',
			//'user_agent '  => "Mozilla/5.0 (X11; U; Linux x86_64; en-US; rv:1.9.2) Gecko/20100301 Ubuntu/9.10 (karmic) Firefox/3.6",
			'header' => array( 'Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*\/*;q=0.8' ), 
		)
	);
	$context  = stream_context_create($opts);

// curl_get_contents
	function curl_get_contents($url)
	{
	  $ch = curl_init();
	  curl_setopt($ch, CURLOPT_URL, $url);
	  curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
	  curl_setopt($ch, CURLOPT_COOKIEFILE, "cookie.txt");
	  curl_setopt($ch, CURLOPT_COOKIEJAR, "cookie.txt");
	  curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
	  $data = curl_exec($ch);
	print_r($url);
	  curl_close($ch);
	  return $data;
	}
	$html = curl_get_contents($url);
    //$html = file_get_contents($url, false, $context);
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