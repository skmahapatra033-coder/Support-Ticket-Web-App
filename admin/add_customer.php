<?php
ob_start();
include("../session.php");
include("../dbcon/pdocon.php");
include("apps/view/header.html");
include("apps/view/add_customer.html");
include("apps/view/footer.html");
?>