<?php
$type = '';
if(isset($_GET['type'])){
    $type = $_GET['type'];
}


switch ($type){
    case 'web':
        $files = scandir('../images/portfolio/web');
        array_splice($files, 0, 2);
        $i = 0;
        $result = '[';
        while($i<sizeof($files)){
            $title = explode("$",$files[$i])[0];
            $s = explode('$',$files[$i])[1];
            $s = substr($s,0,-4);
            $s = explode('_',$s);
            $result .= '{"url":"images/portfolio/web/'.$files[$i].'"}';
            if($i<sizeof($files)-1){
                $result .= ',';
            }
            $i++;
        }
        $result .= ']';
        break;
/* =========================================================== */
    case 'graphic':
        $files = scandir('../images/portfolio/graphic');
        array_splice($files, 0, 2);
        $i = 0;
        $result = '[';
        while($i<sizeof($files)){
            $result .= '{"url":"'.$files[$i].'"}';
            if($i<sizeof($files)-1){
                $result .= ',';
            }            
            $i++;
        }
        $result .= ']';    
        break;
/* =========================================================== */
    case 'ui':
        $files = scandir('../images/portfolio/ui');
        array_splice($files, 0, 2);
        $i = 0;
        $result = '[';
        while($i<sizeof($files)){ 
            $result .= '{"category":"'. substr_replace(explode(".",$files[$i])[0],"", -2) . '",';
            $result .= '"url":"'. $files[$i] . '"}';
            if($i<sizeof($files)-1){
                $result .= ',';
            }
            $i++;
        }
        $result .= ']';
        break;    
/* =========================================================== */
    case 'email':
        $files = scandir('../images/portfolio/email');
        array_splice($files, 0, 2);
        $i = 0;
        $result = '[';
        while($i<sizeof($files)){
            $result .= '{"url":"'.$files[$i].'"}';
            if($i<sizeof($files)-1){
                $result .= ',';
            }            
            $i++;
        }
        $result .= ']';    
        break;          
}

echo $result;
?>                