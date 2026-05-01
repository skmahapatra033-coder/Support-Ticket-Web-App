<?php
include "../../../dbcon/config.php";

if (!$con) {
    die("Database connection failed: " . mysqli_connect_error());
}

/* ===============================
   PAGINATION + SEARCH
================================= */

$limit  = 6;
$page   = isset($_POST['page']) && is_numeric($_POST['page']) ? (int)$_POST['page'] : 1;
$page   = max($page, 1);
$offset = ($page - 1) * $limit;

$search = trim($_POST['search'] ?? '');
$searchParam = "%{$search}%";

/* ===============================
   TOTAL CUSTOMER COUNT
================================= */

$countSql = "SELECT COUNT(*) as total
             FROM client
             WHERE name LIKE ? OR email LIKE ?";

$stmtCount = $con->prepare($countSql);
if (!$stmtCount) {
    die("Count query error: " . $con->error);
}

$stmtCount->bind_param("ss", $searchParam, $searchParam);
$stmtCount->execute();
$countResult   = $stmtCount->get_result();
$totalRecords  = $countResult->fetch_assoc()['total'] ?? 0;
$stmtCount->close();

$totalPages = ($totalRecords > 0) ? ceil($totalRecords / $limit) : 1;

/* ===============================
   FETCH CUSTOMERS + TICKET STATUS COUNTS
================================= */

$sql = "SELECT 
        c.id, 
        c.name, 
        c.email, 
        c.profile,

        COUNT(t.id) AS totalTickets,

        SUM(CASE WHEN t.status = 'Open' THEN 1 ELSE 0 END)        AS openTickets,
        SUM(CASE WHEN t.status = 'Closed' THEN 1 ELSE 0 END)      AS closedTickets,
        SUM(CASE WHEN t.status = 'Rejected' THEN 1 ELSE 0 END)    AS rejectedTickets,
        SUM(CASE WHEN t.status = 'Under Testing' THEN 1 ELSE 0 END) AS progressTickets,
        SUM(CASE WHEN t.status = 'Testing Passed' THEN 1 ELSE 0 END)      AS passedTesting,
        SUM(CASE WHEN t.status = 'Testing Failed' THEN 1 ELSE 0 END)      AS failedTesting

        FROM client c
        LEFT JOIN tickets t ON t.customer_id = c.id
        WHERE c.name LIKE ? OR c.email LIKE ?
        GROUP BY c.id
        ORDER BY c.id DESC
        LIMIT ?, ?";

$stmt = $con->prepare($sql);
if (!$stmt) {
    die("Main query error: " . $con->error);
}

$stmt->bind_param("ssii", $searchParam, $searchParam, $offset, $limit);
$stmt->execute();
$result = $stmt->get_result();
?>

<!-- ===============================
     CUSTOMER CARDS
================================= -->

<?php if ($result && $result->num_rows > 0): ?>

    <?php while ($client = $result->fetch_assoc()): 
        
        $profileImg = !empty($client['profile'])
            ? "../uploads/client/" . $client['profile']
            : "../uploads/client/male.png";
    ?>

       <div class="col-xl-4 col-md-6 mb-4">
                <div class="agent-card">
                    <div class="agent-header">
                        <img src="<?php echo $profileImg; ?>" class="agent-avatar">
                        <div class="agent-info">
                            <h5 class="agent-name"><?php echo htmlspecialchars($client['name']); ?></h5>
                            <p class="agent-email"><?php echo htmlspecialchars($client['email']); ?></p>
                        </div>
                    </div>

                    <div class="d-flex assigned-user justify-content-between pt-0">
                    <div class="d-flex">
                        <div class="counter-badge">
                            <div class="text-center badge badge-light font-weight-bold">
                                <?php echo $client['totalTickets']; ?>
                            </div>
                    </div>

                    <div class="counter-badge">
                        <div class="text-center badge badge-warning font-weight-bold">
                            <?php echo $client['openTickets']; ?>
                        </div>
                    </div>
                    <div class="counter-badge">
                        <div class="text-center badge badge-primary font-weight-bold">
                            <?php echo $client['progressTickets']; ?>
                        </div>
                    </div>

                    <div class="counter-badge">
                        <div class="text-center badge badge-danger font-weight-bold">
                                <?php echo $client['failedTesting']; ?>
                            </div>
                    </div>
                    <div class="counter-badge">
                        <div class="text-center badge badge-dark font-weight-bold">
                            <?php echo $client['passedTesting']; ?>
                        </div>
                    </div>


                        <div class="counter-badge">
                        <div class="text-center badge badge-success font-weight-bold text-white bg-danger">
                            <?php echo $client['closedTickets']; ?>
                        </div>
                    </div>

                        <div class="counter-badge">
                        <div class="text-center badge badge-info font-weight-bold">
                            <?php echo $client['rejectedTickets']; ?>
                        </div>
                    </div>

                    </div>
                    <label class="custom-switch">
                        <button 
                            class="btn btn-sm btn-primary mr-2 view-agent-btn"
                            data-id="<?php echo $client['id']; ?>">
                            View
                        </button>
                    </label>
                </div>
            </div>
        </div>   

    <?php endwhile; ?>

<?php else: ?>

    <div class="col-12 text-center">
        <p>No client found.</p>
    </div>

<?php endif; ?>


<!-- ===============================
     PAGINATION
================================= -->

<?php if ($totalPages > 1): ?>

<div class="col-12 mt-3">
    <nav>
        <ul class="pagination justify-content-center">

            <?php if ($page > 1): ?>
                <li class="page-item">
                    <a href="#" class="page-link pagination-link" data-page="<?php echo $page - 1; ?>">
                        Previous
                    </a>
                </li>
            <?php endif; ?>

            <?php for ($i = 1; $i <= $totalPages; $i++): ?>
                <li class="page-item <?php echo ($i == $page) ? 'active' : ''; ?>">
                    <a href="#" class="page-link pagination-link" data-page="<?php echo $i; ?>">
                        <?php echo $i; ?>
                    </a>
                </li>
            <?php endfor; ?>

            <?php if ($page < $totalPages): ?>
                <li class="page-item">
                    <a href="#" class="page-link pagination-link" data-page="<?php echo $page + 1; ?>">
                        Next
                    </a>
                </li>
            <?php endif; ?>

        </ul>
    </nav>
</div>

<?php endif; ?>

<?php
$stmt->close();
$con->close();
?>
