<?php
$file = fopen('chat.txt', 'r');
while ($line = fgets($file)) {
    echo '<p>' . htmlspecialchars($line) . '</p>';
}
fclose($file);
?>
