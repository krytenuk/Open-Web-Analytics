<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">

	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1" />
		<title>Open Web Analytics - <?=$page_title;?></title>
	</head>
	
	<body>
	
	<? include('css.tpl');?>
	
	<style>
	body {background-color:#cccccc;}
	.wrap {margin:10px 40px 20px 40px; background-color:#ffffff; border:1px solid #000000; padding:8px;}

	</style>
		
	<DIV class="owa_banner"><?include ('header.tpl');?></DIV>

	<div class="wrap">
	
		<? include('msgs.tpl');?>
	
		<?=$content;?>
		<?=$body;?>
	</div>
	
	</body>
</html>