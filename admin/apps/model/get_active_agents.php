<?php
include "../../../dbcon/config.php";
header("Content-Type: application/json");

/* ===============================
   INPUT
================================= */

$page   = isset($_GET['page']) ? max(1,(int)$_GET['page']) : 1;
$limit  = isset($_GET['limit']) ? (int)$_GET['limit'] : 6;
$offset = ($page - 1) * $limit;

$search = trim($_GET['search'] ?? '');
$status = $_GET['status'] ?? 'Active';

$searchParam = "%{$search}%";

/* ===============================
   TOTAL RECORDS
================================= */

$countSql = "SELECT COUNT(*) as total
             FROM agents
             WHERE (name LIKE ? OR email LIKE ?)
             AND status = ?";

$stmt = $con->prepare($countSql);
$stmt->bind_param("sss",$searchParam,$searchParam,$status);
$stmt->execute();
$totalRecords = $stmt->get_result()->fetch_assoc()['total'];
$totalPages = max(1,ceil($totalRecords/$limit));

/* ===============================
   FETCH AGENTS
================================= */

$sql = "SELECT 
        a.id,a.name,a.email,a.profile,

        COUNT(t.id) totalTickets,
        SUM(t.status='Open') openTickets,
        SUM(t.status='Closed') closedTickets,
        SUM(t.status='Rejected') rejectedTickets,
        SUM(t.status='Under Testing') progressTickets,
        SUM(t.status='Testing Passed') passedTesting,
        SUM(t.status='Testing Failed') failedTesting

        FROM agents a
        LEFT JOIN tickets t ON t.agent_id=a.id
        WHERE (a.name LIKE ? OR a.email LIKE ?)
        AND a.status=?
        GROUP BY a.id
        ORDER BY a.id DESC
        LIMIT ?,?";

$stmt=$con->prepare($sql);
$stmt->bind_param("sssii",$searchParam,$searchParam,$status,$offset,$limit);
$stmt->execute();

$res=$stmt->get_result();
$data=[];

while($row=$res->fetch_assoc()){
    foreach($row as $k=>$v){
        if($v===null) $row[$k]=0;
    }
    $data[]=$row;
}

echo json_encode([
    "data"=>$data,
    "page"=>$page,
    "totalPages"=>$totalPages,
    "totalRecords"=>$totalRecords
]);
