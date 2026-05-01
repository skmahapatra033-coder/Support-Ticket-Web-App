<?php
ob_start();
include("../session.php");
include("../dbcon/pdocon.php");
include("apps/view/header.html");
include("apps/view/priority.html");
include("apps/view/footer.html");
?>