<?php
require './app/views/layout/menu.php';
?>
<div class='view'>

    <?php
    echo '<center>';
    echo '<h1>SISAssociation</h1>';
    echo '<h3>Nuit de l\'info 2022</h3>';
    echo '<p>Voici un site simple et facile d\'utilisation pour en apprendre un maximum sur les maladies sexuellement transmissibles, le consentement et autre sujet pahre d\'une sexualité saine.</p>';

    $link_address_jouer = '?route=jouer';
    $link_address_informer = '?route=info';

    echo '<div style="width:500px;">';
    echo "<a href='$link_address_jouer' class='button' style='
    margin-top: 100px;
    height: 50px;
    width: 120px;
    margin-left: 70px;' onclick='click_jouer'>Jouer</button>";
    echo "<a href='$link_address_informer'  class='button' style='
    margin-top: 100px;
    height: 50px;
    width: 120px;
    margin-left: 70px;' onclick='click_jouer'>M'informer</button>";
    echo "</div>";
    echo "</center>";

    ?>

</div>