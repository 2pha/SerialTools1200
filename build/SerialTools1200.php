<?php
class SerialTools1200
{
public $currentYear;
public $mks;
public $monthMap;
public $formats;
public function __construct() {
$this->currentYear = 2018;
$this->mks = array("mk2" => array("start_year" => 1979, "end_year" => 2010), "mk3" => array("start_year" => 1989, "end_year" => 1998), "mk4" => array("start_year" => 1996, "end_year" => 2005), "mk3d" => array("start_year" => 1997, "end_year" => 2002), "m3d" => array("start_year" => 1997, "end_year" => 2002), "ltd" => array("start_year" => 1995, "end_year" => 2002), "mk5" => array("start_year" => 2002, "end_year" => 2010), "mk5g" => array("start_year" => 2002, "end_year" => 2010), "m5g" => array("start_year" => 2002, "end_year" => 2010), "gld" => array("start_year" => 2004, "end_year" => 2004), "mk6" => array("start_year" => 2007, "end_year" => 2010), "gae" => array("start_year" => 2016, "end_year" => 0), "g" => array("start_year" => 2016, "end_year" => 0), "gr" => array("start_year" => 2017, "end_year" => 0));
$this->monthMap = array("1" => 1, "A" => 1, "2" => 2, "B" => 2, "3" => 3, "C" => 3, "4" => 4, "D" => 4, "5" => 5, "E" => 5, "6" => 6, "F" => 6, "7" => 7, "G" => 7, "8" => 8, "H" => 8, "S" => 8, "9" => 9, "I" => 9, "J" => 10, "K" => 11, "L" => 12);
$this->formats = array("GE0XX00000R" => array("regex" => array('[GE]{2}', '[0-9]', '[A-LS]', '[A-Z]', '[0-9]', '[0-9]', '[0-9]', '[0-9]', '[0-9]', '[R]'), "maxlength" => 11), "GE0XX000000" => array("regex" => array('[GE]{2}', '[0-9]', '[A-LS]', '[A-Z]', '[0-9]', '[0-9]', '[0-9]', '[0-9]', '[0-9]', '[0-9]'), "maxlength" => 11), "XX0XX00000" => array("regex" => array('[GE|NH]{2}', '[0-9]', '[A-LS]', '[A-Z]', '[0-9]', '[0-9]', '[0-9]', '[0-9]', '[0-9]'), "maxlength" => 10), "XX0X00X000" => array("regex" => array('[CG|AB|AG|MJ|MU|DA]{2}', '[0-9]', '[(1-9)|(JKLS)]', '[0-3]', '[0-9]', '[A-Z]', '[0-9]', '[0-9]', '[0-9]'), "maxlength" => 10), "LA0XX000000" => array("regex" => array('[LA]{2}', '[0-9]', '[A-LS]', '[A-Z]', '[0-9]', '[0-9]', '[0-9]', '[0-9]', '[0-9]', '[0-9]'), "maxlength" => 11));
}
public function check($string, $mk = false) {
$results = array("partiallyValid" => false, "fullyValid" => false, "inValid" => true, "serial" => $string, "format" => '', "dateData" => array("day" => 0, "month" => 0, "years" => array()));
if (!strlen($string)) {
return $results;
}
$string = strtoupper($string);
$regexAddCount = strlen($string) - 1;
foreach ($this->formats as $format => $___){if (!$results['partiallyValid'] && strlen($string) <= $this->formats[$format]['maxlength']) {
$regex = array('^');
for ($i = 0;
$i < $regexAddCount;$i += 1) {array_push($regex, $this->formats[$format]['regex'][$i]);
}array_push($regex, '$');
$regexString = join('', $regex);
if (preg_match("/".$regexString."/", $string)) {
$results['partiallyValid'] = true;
}}
if (!$results['fullyValid']) {
$regex = array('^');
for ($i = 0;
$i < count($this->formats[$format]['regex']);$i++) {array_push($regex, $this->formats[$format]['regex'][$i]);
}array_push($regex, '$');
$regexString = join('', $regex);
if (preg_match("/".$regexString."/", $string)) {
$results['fullyValid'] = true;
$results['format'] = $format;
}}
if ($results['fullyValid'] || $results['partiallyValid']) {
$results['inValid'] = false;
}
if ($results['fullyValid']) {
if ($results['format'] === 'XX0X00X000') {
$dayval = substr($string, 4, 2);
$daynum = intval($dayval);
if ($daynum > 0 && $daynum <= 31) {
$results['dateData']['day'] = intval($dayval);
}}
$results['dateData']['month'] = $this->monthMap[substr($string, 3, 1)];
$yearval = substr($string, 2, 1);
$yearval = intval($yearval);
$startyear = 1979;
if ($yearval < 9) {
$startyear += $yearval + 1;
}
for ($i = $startyear;
$i < $this->currentYear;$i += 10) {if ($mk) {
if ($i >= $this->mks[$mk]['start_year'] && $i <= $this->mks[$mk]['end_year']) {
array_push($results['dateData']['years'], $i);
} else if ($i >= $this->mks[$mk]['start_year'] && $this->mks[$mk]['end_year'] === 0) {
array_push($results['dateData']['years'], $i);
}} else {array_push($results['dateData']['years'], $i);
}}
return $results;
}}
return $results;
}

}

