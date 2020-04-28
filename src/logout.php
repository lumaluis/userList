<?php
  session_start();
  if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
  session_destroy();
  echo 'ok';
  } else {
    echo 'Not Method DELETE';
  }
?>
