<?php
class SerialTools1200
{
public $mks;
public $formats;
public function __construct() {
$this->mks = array("mk2" => array("start_year" => 1979, "end_year" => 2010), "mk3" => array("start_year" => 1989, "end_year" => 1998), "mk4" => array("start_year" => 1996, "end_year" => 2005), "mk3d" => array("start_year" => 1997, "end_year" => 2002), "m3d" => array("start_year" => 1997, "end_year" => 2002), "ltd" => array("start_year" => 1995, "end_year" => 2002), "mk5" => array("start_year" => 2002, "end_year" => 2010), "mk5g" => array("start_year" => 2002, "end_year" => 2010), "m5g" => array("start_year" => 2002, "end_year" => 2010), "gld" => array("start_year" => 2004, "end_year" => 2004), "mk6" => array("start_year" => 2007, "end_year" => 2010), "gae" => array("start_year" => 2016, "end_year" => 0), "g" => array("start_year" => 2016, "end_year" => 0), "gl" => array("start_year" => 2017, "end_year" => 0));
$this->formats = array("GE0XX00000R" => array("regex" => array('[GE]{2}', '[0-9]', '[A-L]', '[A-Z]', '[0-9]', '[0-9]', '[0-9]', '[0-9]', '[0-9]', '[R]'), "maxlength" => 11), "GE0XX000000" => array("regex" => array('[GE]{2}', '[0-9]', '[A-L]', '[A-Z]', '[0-9]', '[0-9]', '[0-9]', '[0-9]', '[0-9]', '[0-9]'), "maxlength" => 11), "XX0XX00000" => array("regex" => array('[GE|NH]{2}', '[0-9]', '[A-L]', '[A-Z]', '[0-9]', '[0-9]', '[0-9]', '[0-9]', '[0-9]'), "maxlength" => 10), "XX0X00X000" => array("regex" => array('[CG|AG|MJ|MU|DA]{2}', '[0-9]', '[(1-9)|(JKL)]', '[0-3]', '[0-9]', '[A-Z]', '[0-9]', '[0-9]', '[0-9]'), "maxlength" => 10), "LA0XX000000" => array("regex" => array('[LA]{2}', '[0-9]', '[A-Z]', '[A-Z]', '[0-9]', '[0-9]', '[0-9]', '[0-9]', '[0-9]', '[0-9]'), "maxlength" => 11));
}
public function getFormat($string, $full = true) {
$length = strlen($string);
if ($length < 2) {
return false;
}foreach ($this->formats as $format => $___){$skip = false;
if ($length > $this->formats[$format]['maxlength']) {
$skip = true;
}if (!$skip) {
$addCount = 0;
if ($full) {
$addCount = count($this->formats[$format]['regex']);
} else {strlen($string) - 1;
}$regex = array('^');
for ($i = 0;
$i < $addCount;$i++) {array_push($regex, $this->formats[$format]['regex'][$i]);
}if ($full) {
array_push($regex, '$');
}$regexString = join('', $regex);
if (preg_match("/".$regexString."/", strtoupper($string))) {
return $format;
}}}return false;
}
public function isValid($string, $full = true) {
if ($this->getFormat($string, $full)) {
return true;
}return false;
}

}

