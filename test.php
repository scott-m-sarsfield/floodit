<?php include '../inc/doc_header.php';?>
	<link rel="stylesheet" href="gs_styles.css">
	<title> Scott Mathias Sarsfield's Web Site </title>
</head>
<body>
	<?php include '../inc/header.php';?>
	
	<div class="container">
		<div class="row">
			<div class="twocol">
				<?php include '../inc/left_panel.php';?>
			</div>


			<div class="eightcol" style="padding-top:20px;padding-bottom: 30px;">

<!--GAME SCRIPT-->	
<script src="gameplay.js"></script>
<?php include 'lb.php';?>
<?php addJava();?>

<!--GAME LAYOUT-->
<div id="gamescreen">

	<!--TITLE PANEL-->
	<div id="gs_title">
		<h2 class="classy">Flood It</h2>
	</div>

	<!--LAUNCH PANEL-->
	<div id="gs_launch">
		<input id="restart" type="button" onclick="launchGame() " value="RESTART" />	
	</div>
	
	<!--DISPLAY PANEL-->
	<div id="gs_display">
	</div>

	<!--CONTROL PANEL-->
	<div id="gs_control">
	</div>

	<!--HELP PANEL [DEVELOPING-->
	<div id="game_helper"></div>

</div>
<br /><br />
<div id="leaderboard">
	<h3 class="classy">Leaderboard</h3>
	<div id="rankings">
		<?php printTable();?>
	</div>
</div>

<!--END GAME-->
		</div>
		<div class="twocol last">
			<?php include '../inc/right_panel.php';?>
		</div>
	</div>
</div>

<?php include '../inc/footer.php';?>
