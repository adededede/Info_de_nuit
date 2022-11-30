<?php
echo 'list of players : <br>';
foreach ($playersList as $player ) {
    echo '<li>' . $player->firstname . ' | ' . $player->lastname . '</li>';
}
?>