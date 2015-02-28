<?php 
	$__global = "/DCNFS/users/web/pages/ssarsfie/";
	$__local = "../";
	$__prefix = $__global;
	include $__prefix.'inc/doc_header.php';
?>
	<link rel="stylesheet" href="/~ssarsfie/css/standard_gs_styles.css">
	<link rel="stylesheet" href="css/styles.css">

	<link rel="icon" href="/~ssarsfie/img/favicon.png">
	<link rel="apple-touch-icon" href="/~ssarsfie/img/favicon.png">
	
	<!--GAME SCRIPT-->	
	<script src="js/deque.js?v=1"></script>
	<script src="js/gameplay.js?v=1"></script>
	<script src="js/leaderboard.js?v=1"></script>

	<title> Scott Mathias Sarsfield's Web Site </title>
</head>
<body>
	<?php include $__prefix.'inc/header.php';?>
	
	<div class="page-title">
		<span>Flood It</span>
	</div>
	
	<div class="content-area"><div>

		<div class="content" style="background-color:green">
			<img class="game-screenshot" alt="Flood It" src="img/splash.png" />
			<div class="game-description">
				<p>
					<span style="font-weight:bold;">Flood It</span> is a simple game where
					you attempt to change the color the fewest number of times to fill the
					entire grid.  Good luck.
				</p>
			</div>
		</div>
		
		<input class="game-launch-button" type="button" onclick="launchGame()" value="Launch Game" />
		
		<div class="content" style="text-align:center;padding:10px;">
			<h3 style="font-family:Courier,serif;">Controls</h3>
			<span>Simply click on the buttons at the bottom</span>
		</div>
	
		<div id="leaderboard" class="content">
			<h3 class="classy">Leaderboard</h3>
			<div id="rankings">
			</div>
		</div>
		
		
	
	</div></div>
	
	<script>
		$(document).ready(function(){
			$("#leaderboard #rankings").append( renderLeaderboard() );
		});
	</script>

<?php
	include $__prefix.'inc/footer.php';
 ?>
