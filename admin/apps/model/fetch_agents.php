<?php
header("Content-Type: application/json");
include "../../../dbcon/config.php";

$result = $con->query("SELECT id, name FROM agents ORDER BY name ASC");

$agents = [];

while($row = $result->fetch_assoc()){
    $agents[] = $row;
}

echo json_encode([
    "status" => "success",
    "agents" => $agents
]);
