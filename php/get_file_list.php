<?php
$files = scandir('../images/portfolio/web');
array_splice($files, 0, 2);
$i = 0;
$result = '[';
while($i<sizeof($files)){
    $imgSrc = '../images/portfolio/web/'.$files[$i];
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
    if($i<sizeof($files)-1){
        $result .= ',';
    }
    $i++;
}
$result .= ']';
//$result = '[{ "title": "title1", "tags": [{ "tag": "tag1" }, { "tag": "tga2" }, { "tag": "tga3" }] }, { "title": "title2", "tags": [{ "tag": "tag1" }, { "tag": "tga2" }, { "tag": "tga3" }] }]';
echo $result;
?>                