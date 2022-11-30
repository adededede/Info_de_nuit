<?php

require_once '../app/views/layout/header.php';
require_once '../app/views/layout/menu.php';

echo 'bonjour : ' . $_GET['nom'] . '<br>'; 
echo 'language du navigateur : ' . substr($_SERVER['HTTP_ACCEPT_LANGUAGE'], 0, 2) . '<br>';
echo '============================================';

require_once '../app/views/layout/footer.php';