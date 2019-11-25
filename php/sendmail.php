<?php
$data = ['', '', '', ''];
if(isset($_GET['name'])){
    $data[0] = $_GET['name'];
}
if(isset($_GET['email'])){
    $data[1] = $_GET['email'];
}
if(isset($_GET['phone'])){
    $data[2] = $_GET['phone'];
}
if(isset($_GET['message'])){
    $data[3] = $_GET['message'];
}
if($data[1] != ''){

}
$messageReceived = '<h3>FROM MONTREALWEB - CONTACT</h3><p>Name: <strong>'.$data[0].'</strong></p><p>Phone: <strong>'.$data[2].'</strong></p><p>Email: <strong>'.$data[1].'</strong></p><hr/><p>Message: <strong>'.$data[3].'</strong></p>';
if(mail('farzadek@gmail.com', 'FROM MONTREALWEB - CONTACT', $messageReceived)){
    echo 'ok';
} else {
    echo 'no';
}

if($data[1] != ''){
    $messageReceived = '<p>Dear '.$data[0].'</p><p>We have received your message and we will contact you as soon as possible. <br/>Sincerely,<br/>MontrealWeb</p>';
    mail($data[1], 'MONTREALWEB.ca', $messageReceived);
}
?>