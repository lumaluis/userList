<?php
session_start();
if (isset($_SESSION['logged'])) {
  if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $DATABASE_HOST = 'localhost';
    $DATABASE_USER = 'root';
    $DATABASE_PASS = '';
    $DATABASE_NAME = 'students';
    $con = mysqli_connect($DATABASE_HOST, $DATABASE_USER, $DATABASE_PASS, $DATABASE_NAME);
    if ( mysqli_connect_errno() ) {
      exit('Failed to connect to MySQL: ' . mysqli_connect_error());
    }

    if ($stmt = $con->prepare('SELECT * FROM students_list')) {
      $stmt->execute();
      $result = $stmt->get_result();
      $result = $result->fetch_all(MYSQLI_ASSOC);
      if (count($result) > 0) {
        print_r(json_encode($result));
      } else {
        echo 'fail';
      }

      $stmt->close();
    }
  } else {
    echo 'Not Method GET';
  }
} else {
  header('Location: login.html');
}
?>
