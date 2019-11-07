<?php
$type = '';
if(isset($_GET['type'])){
    $type = $_GET['type'];
}
$limit = 5;

switch ($type){
    case 'web':
        $files = scandir('../images/portfolio/web');
        array_splice($files, 0, 2);
        shuffle($files);
        $i = 0;
        if(sizeof($files) < $limit){
            $limit = sizeof($files);
        }
        $result = '[';
        while($i<$limit){
            $title = explode("$",$files[$i])[0];
            $s = explode('$',$files[$i])[1];
            $s = substr($s,0,-4);
            $s = explode('_',$s);
            $result .= '{"title":"'.$title.'",';
            $result .= '"url":"'.$files[$i].'","tags":[';
            for($j=0; $j<sizeof($s);$j++){
                $result .= '{"tag":"'.$s[$j].'"}';
                if($j<sizeof($s)-1){
                    $result .=',';
                }
            }
            $result .=']}';
            if($i<$limit-1){
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
        if(sizeof($files) < $limit){
            $limit = sizeof($files);
        }
        shuffle($files);
        $result = '[';
        while($i<$limit){
            $result .= '{"url":"'.$files[$i].'"}';
            if($i<$limit-1){
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
        if(sizeof($files) < $limit){
            $limit = sizeof($files);
        }
        shuffle($files);
        $result = '[';
        while($i<$limit){
            $result .= '{"category":"'. substr_replace(explode(".",$files[$i])[0],"", -2) . '",';
            $result .= '"url":"'. $files[$i] . '"}';
            if($i<$limit-1){
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
        if(sizeof($files) < $limit){
            $limit = sizeof($files);
        }
        shuffle($files);
        $result = '[';
        while($i<$limit){
            $result .= '{"url":"'.$files[$i].'"}';
            if($i<$limit-1){
                $result .= ',';
            }            
            $i++;
        }
        $result .= ']';    
        break;          
}

echo $result;
?>                