<?php
header("Content-Type: application/json");
require "../../../pdocon.php"; // contains $pdo connection

try {

    $stmt = $pdo->prepare("
        SELECT 
            t.due_date,
            t.ticket_title,
            t.email,
            t.category_id,
            t.agent_id,
            t.customer_id,
            t.ticket_type,
            p.priority_name,
            t.estimate_effort,
            t.actual_effort,
            t.classification,
            t.description,
            t.approve_status
        FROM tickets inner join priority p
        ORDER BY t.created_at DESC
    ");

    $stmt->execute();
    $tickets = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode([
        "status" => "success",
        "data"   => $tickets
    ]);

} catch (PDOException $e) {
    echo json_encode([
        "status" => "error",
        "message" => $e->getMessage()
    ]);
}
