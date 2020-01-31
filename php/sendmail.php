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
$messageReceived = '<table bgcolor="#ffffff" style="font-family: Arial, Helvetica, sans-serif !important;-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; mso-table-lspace: 0pt !important; mso-table-rspace: 0pt !important; border-spacing: 0 !important; border-collapse: collapse !important; width: 375px; overflow: hidden; margin: 10px auto;">';
$messageReceived .='<tr style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;padding: 0;"><td colspan="2" style="padding:10px;mso-table-lspace: 0pt !important; mso-table-rspace: 0pt !important;"><h3>FROM MONTREALWEB - CONTACT</h3></td></tr>';
$messageReceived .='<tr style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;"><td colspan="2" style="text-align:center;mso-table-lspace: 0pt !important; mso-table-rspace: 0pt !important;overflow: hidden;"><strong style="font-size: 36px;">MontrealWEB<sub>.ca</sub></strong></td></tr>';
$messageReceived .='<tr><td colspan="2" style="padding-top: 30px; mso-table-lspace: 0pt !important; mso-table-rspace: 0pt !important;overflow: hidden;"><p>Name: <strong>'.$data[0].'</strong></p><p>Phone: <strong>'.$data[1].'</strong></p><p>Email: <strong>'.$data[1].'</strong></p><p>Message:: <strong>'.$data[3].'</strong></p></td></tr>';
$messageReceived .='</table>';

if(mail('farzadek@gmail.com', 'FROM MONTREALWEB - CONTACT', $messageReceived)){
    echo 'ok';
} else {
    echo 'no';
}

if($data[1] != ''){
    $messageReceived = '<table bgcolor="#ffffff" style="font-family: Arial, Helvetica, sans-serif !important;-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; mso-table-lspace: 0pt !important; mso-table-rspace: 0pt !important; border-spacing: 0 !important; border-collapse: collapse !important; width: 375px; overflow: hidden; margin: 10px auto;">';
    $messageReceived .='<tr style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;padding: 0;"><td colspan="2" style="padding:10px;mso-table-lspace: 0pt !important; mso-table-rspace: 0pt !important;"><a href="http://montrealweb.ca" target="_blank"><img src="http://montrealweb.ca/images/logo.png" style="width: 70px; margin: 0 auto; display: block;"></a></td></tr>';
    $messageReceived .='<tr style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;"><td colspan="2" style="text-align:center;mso-table-lspace: 0pt !important; mso-table-rspace: 0pt !important;overflow: hidden;"><strong style="font-size: 36px;">MontrealWEB<sub>.ca</sub></strong></td></tr>';
    $messageReceived .='<tr><td colspan="2" style="padding-top: 30px; mso-table-lspace: 0pt !important; mso-table-rspace: 0pt !important;overflow: hidden;"><p>Dear '.$data[0].'</p><p>I have received your message and I will contact you as soon as possible.</p><p>Sincerely,</p><p>MontrealWeb<br/>Farzad Kamali<br/>(438) 300 - 0456</p></td></tr>';
    $messageReceived .='</table>';
    mail($data[1], 'MONTREALWEB.ca', $messageReceived);
}
?>
