<?php
  session_start();
  if (!isset($_SESSION['logged'])) {
    header('Location: login.html');
    exit;
  } else {
    header('Location: user-list.html');
  }
?>
