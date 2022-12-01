<?php 
    require '../app/views/layout/header.php'; 
    require '../app/views/layout/menu.php';
?>

<div class="view">
    <?php
        echo 'list of players : <br>';
        echo '<ul>';
        foreach ($playersList as $player ) {
            echo '<li>' . $player->firstname . ' | ' . $player->lastname . '</li>';
        }
        echo '</ul>';
    ?>
</div>

<?php 
    require '../app/views/layout/footer.php';
?>


