<?php
include "../../../dbcon/config.php";

$limit  = 6;
$page   = isset($_POST['page']) && is_numeric($_POST['page']) ? (int)$_POST['page'] : 1;
$offset = ($page - 1) * $limit;

$search = trim($_POST['search'] ?? '');
$searchParam = "%{$search}%";

/* Count total */
$countSql = "SELECT COUNT(*) as total 
             FROM agents 
             WHERE name LIKE ? OR email LIKE ?";

$stmtCount = $con->prepare($countSql);
$stmtCount->bind_param("ss", $searchParam, $searchParam);
$stmtCount->execute();
$totalRecords = $stmtCount->get_result()->fetch_assoc()['total'];

$totalPages = ceil($totalRecords / $limit);

/* Fetch agents */
$sql = "SELECT 
        a.id, 
        a.name, 
        a.email, 
        a.profile,

        COUNT(t.id) AS totalTickets,

        SUM(CASE WHEN t.status = 'Open' THEN 1 ELSE 0 END)        AS openTickets,
        SUM(CASE WHEN t.status = 'Closed' THEN 1 ELSE 0 END)      AS closedTickets,
        SUM(CASE WHEN t.status = 'Rejected' THEN 1 ELSE 0 END)    AS rejectedTickets,
        SUM(CASE WHEN t.status = 'Under Testing' THEN 1 ELSE 0 END) AS progressTickets,
        SUM(CASE WHEN t.status = 'Testing Passed' THEN 1 ELSE 0 END)      AS passedTesting,
        SUM(CASE WHEN t.status = 'Testing Failed' THEN 1 ELSE 0 END)      AS failedTesting

        FROM agents a
        LEFT JOIN tickets t ON t.agent_id = a.id
        WHERE a.name LIKE ? OR a.email LIKE ?
        GROUP BY a.id
        ORDER BY a.id DESC
        LIMIT ?, ?";

$stmt = $con->prepare($sql);
$stmt->bind_param("ssii", $searchParam, $searchParam, $offset, $limit);
$stmt->execute();
$result = $stmt->get_result();
?>

<?php if ($result->num_rows > 0): ?>
    <?php while ($agent = $result->fetch_assoc()): 
        $profileImg = !empty($agent['profile'])
            ? "../uploads/agents/" . $agent['profile']
            : "../uploads/agents/male.png";
    ?>
          <div class="col-xl-4 col-md-6 mb-4">
                                                <div class="agent-card">
                                                    <div class="agent-header">
                                                        <img src="<?php echo $profileImg; ?>" class="agent-avatar">
                                                        <div class="agent-info">
                                                            <h5 class="agent-name"><?php echo htmlspecialchars($agent['name']); ?></h5>
                                                            <p class="agent-email"><?php echo htmlspecialchars($agent['email']); ?></p>
                                                        </div>
                                                    </div>

                                                    <div class="d-flex assigned-user justify-content-between pt-0">
                                                    <div class="d-flex">
                                                        <div class="counter-badge">
                                                            <div class="text-center badge badge-light font-weight-bold">
                                                                <?php echo $agent['totalTickets']; ?>
                                                            </div>
                                                    </div>

                                                    <div class="counter-badge">
                                                        <div class="text-center badge badge-warning font-weight-bold">
                                                            <?php echo $agent['openTickets']; ?>
                                                        </div>
                                                    </div>
                                                    <div class="counter-badge">
                                                        <div class="text-center badge badge-primary font-weight-bold">
                                                            <?php echo $agent['progressTickets']; ?>
                                                        </div>
                                                    </div>
                                                       <div class="counter-badge">
                                                        <div class="text-center badge badge-danger font-weight-bold">
                                                                <?php echo $agent['failedTesting']; ?>
                                                            </div>
                                                    </div>
                                                     <div class="counter-badge">
                                                        <div class="text-center badge badge-dark font-weight-bold">
                                                            <?php echo $agent['passedTesting']; ?>
                                                        </div>
                                                    </div>

                                                        <div class="counter-badge">
                                                        <div class="text-center badge badge-success font-weight-bold text-white bg-danger">
                                                            <?php echo $agent['closedTickets']; ?>
                                                        </div>
                                                    </div>

                                                        <div class="counter-badge">
                                                        <div class="text-center badge badge-info font-weight-bold">
                                                            <?php echo $agent['rejectedTickets']; ?>
                                                        </div>
                                                    </div>

                                                    </div>
                                                    <label class="custom-switch">
                                                        <button 
                                                            class="btn btn-sm btn-primary mr-2 view-agent-btn"
                                                            data-id="<?php echo $agent['id']; ?>">
                                                            View
                                                        </button>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
    <?php endwhile; ?>
<?php else: ?>
    <div class="col-12 text-center">
        <p>No agents found.</p>
    </div>
<?php endif; ?>
