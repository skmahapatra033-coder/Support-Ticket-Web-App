<?php
include "../../../dbcon/config.php";

$query = "SELECT id, category_name FROM categories ORDER BY id DESC";
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
    <td><?php echo htmlspecialchars($row['category_name']); ?></td>
    <td>
        <button class="btn btn-sm btn-primary edit-btn"
                data-id="<?php echo $row['id']; ?>"
                data-name="<?php echo htmlspecialchars($row['category_name']); ?>">
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
    <td colspan="3" class="text-center">No categories found</td>
</tr>
<?php endif; ?>

</tbody>
</table>
