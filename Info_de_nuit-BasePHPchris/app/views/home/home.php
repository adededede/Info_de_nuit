
<?php 
    require '../app/views/layout/header.php'; 
    require '../app/views/layout/menu.php';
?>
<div class='view'>
    <?php

        echo 'bonjour : ' . $_GET['nom'] . '<br>'; 
        echo 'language du navigateur : ' . substr($_SERVER['HTTP_ACCEPT_LANGUAGE'], 0, 2) . '<br>';
        echo '============================================';

        

    ?>
</div>

<?php 
    require '../app/views/layout/footer.php';
?>