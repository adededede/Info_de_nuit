<div class='menu'>
    <?php
    $home = "";
    $info = "";
    $temoin = "";
    $actu = "";
    $about = "";
    $contact = "";

    switch ($_GET['route']) {
        case 'home':
            $home = "active";
            break;
        case 'info':
            $info = "active";
            break;
        case 'temoin':
            $temoin = "active";
            break;
        case 'contact':
            $contact = "active";
            break;
        case 'news':
            $news = "active";
            break;
        case 'about':
            $about = "active";
            break;
    }
    //ATENTION LEACTIVE NE MARCHE PAS
    echo '<ul>';
    $link_address = '?route=home';
    echo "<li><a class='$home' href='$link_address'>Home</a></li>";
    $link_address = '?route=info';
    echo "<li><a class='$info' href='$link_address'>Informations</a></li>";
    $link_address = '?route=temoin';
    echo "<li><a class='$temoin' href='$link_address'>Témoignages</a></li>";
    $link_address = '?route=news';
    echo "<li><a class='$actu' href='$link_address'>Actualités</a></li>";
    $link_address = '?route=contact';
    echo "<li><a class='$contact' href='$link_address'>Contacts</a></li>";
    $link_address = '?route=about';
    echo "<li><a class='$about' href='$link_address'>A Propos</a></li>";
    echo '</ul>';

    ?>

</div>