<?php
require './app/views/layout/menu.php';
?>
<div class='view'>

    <?php

    echo '<p></p><center><h1>Informations utiles et importantes</h1></center><p></p>';
    echo '<ol>';
    $link_address = '?route=consentement';
    echo "<li><a class='$home' href='$link_address'>Le consentement</a></li>";
    $link_address = '?route=malsain';
    echo "<li><a class='$info' href='$link_address'>Définir quand une relation est malsaine</a></li>";
    echo '</ol>';

    require 'liensUtiles.html';

    ?>

</div>