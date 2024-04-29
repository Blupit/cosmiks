<?php
if (isset($_POST['message'])) {
    $file = fopen('chat.txt', 'a');
    fwrite($file, $_POST['message'] . "\n");
    fclose($file);
}
?>
