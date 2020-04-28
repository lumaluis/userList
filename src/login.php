<?php
session_start();
if (!isset($_SESSION['logged'])) {
  if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $DATABASE_HOST = 'localhost';
    $DATABASE_USER = 'root';
    $DATABASE_PASS = '';
    $DATABASE_NAME = 'students';
    $con = mysqli_connect($DATABASE_HOST, $DATABASE_USER, $DATABASE_PASS, $DATABASE_NAME);
    if ( mysqli_connect_errno() ) {
      exit('Failed to connect to MySQL: ' . mysqli_connect_error());
    }
    if ( !isset($_POST['username'], $_POST['password']) ) {
      exit('Please fill fields!');
    }
    if ($stmt = $con->prepare('SELECT id, password FROM api_users WHERE username = ?')) {
      $stmt->bind_param('s', $_POST['username']);
      $stmt->execute();
      $stmt->store_result();
      if ($stmt->num_rows > 0) {
        $stmt->bind_result($id, $password);
        $stmt->fetch();
        if ($_POST['password'] === $password) {
          echo $_POST['remember'];
          session_regenerate_id();
          $_SESSION['logged'] = TRUE;
          $_SESSION['name'] = $_POST['username'];
          $_SESSION['id'] = $id;
          if($_POST['remember'] === 'false') {
            // TODO: Something to make the cookie not persistent
          }
          echo 'o44k';
        } else {
          echo 'Incorrect password!';
        }
      } else {
        echo 'Incorrect username!';
      }
      $stmt->close();
    }
  } else {
    echo 'Not Method POST';
  }
} else {
  echo 'ok';
}
?>
