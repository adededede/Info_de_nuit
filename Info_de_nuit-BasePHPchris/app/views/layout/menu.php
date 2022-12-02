<div class='menu'>
    <?php

    //ATENTION LEACTIVE NE MARCHE PAS
    echo '<ul>';
    $link_address = '?route=home';
    echo "<li><a class=\"active\" href='$link_address'>Home</a></li>";
    $link_address = '?route=info';
    echo "<li><a href='$link_address'>Informations</a></li>";
    $link_address = '?route=temoin';
    echo "<li><a  href='$link_address'>Témoignages</a></li>";
    $link_address = '?route=news';
    echo "<li><a  href='$link_address'>Actualités</a></li>";
    $link_address = '?route=contact';
    echo "<li><a  href='$link_address'>Contacts</a></li>";
    $link_address = '?route=about';
    echo "<li><a  href='$link_address'>A Propos</a></li>";
    echo '</ul>';

    ?>

</div>