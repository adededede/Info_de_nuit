<?php
require './app/views/layout/menu.php';
?>
<div class='view'>

    <?php

    echo '<ul>';
    $link_address = '?route=consentement';
    echo "<li><a class='$home' href='$link_address'>Le consentement</a></li>";
    $link_address = '?route=malsain';
    echo "<li><a class='$info' href='$link_address'>Définir quand une relation est malsaine</a></li>";
    echo '</ul>';

    require 'liensUtiles.html';

    ?>

</div>