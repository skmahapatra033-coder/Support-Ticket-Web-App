<?php
include "../../../dbcon/config.php";

$query = "SELECT id, priority_name, due_date FROM priority ORDER BY id DESC";
$result = mysqli_query($con, $query);

function slugify($text) {
    return strtolower(trim(preg_replace('/[^A-Za-z0-9-]+/', '-', $text), '-'));
}
?>

<table class="table table-bordered">
<thead>
<tr>
    <th>Sl. No. </th>
    <th>Name</th>
    <th>Due Date</th>
    <th>Action</th>
</tr>
</thead>
<tbody>

<?php if ($result && mysqli_num_rows($result) > 0): 
    $i=0;
    ?>
<?php while ($row = mysqli_fetch_assoc($result)): ?>
<tr id="row_<?php echo $row['id']; ?>">
    <td><?php echo ++$i; ?></td>
    <td><?php echo htmlspecialchars($row['priority_name']); ?></td>
     <td><?php echo htmlspecialchars($row['due_date']); ?></td>
    
    <td>
        <button class="btn btn-sm btn-primary edit-btn"
                data-id="<?php echo $row['id']; ?>"
                data-name="<?php echo htmlspecialchars($row['priority_name']); ?>"
                data-duedate="<?php echo htmlspecialchars($row['due_date']); ?>"
                >
            Edit
        </button>

        <button class="btn btn-sm btn-danger delete-btn"
                data-id="<?php echo $row['id']; ?>">
            Delete
        </button>
    </td>
</tr>
<?php endwhile; ?>
<?php else: ?>
<tr>
    <td colspan="3" class="text-center">No priority found</td>
</tr>
<?php endif; ?>

</tbody>
</table>
