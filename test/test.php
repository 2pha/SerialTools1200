<?php
/*require("babel-polyfill");*/
require(dirname(__FILE__).'/../build/SerialTools1200.php');

$st = new SerialTools1200();

$GE0XX00000R = [
  'GE0GF01082R',
  'GE8AD01111R',
  'GE7LC01168R',
  'GE6HB01016R'
];

$GE0XX000000 = [
  'GE5GA001629',
  'GE4BZ001112',
  'GE3IA001117',
  'GE3IA001120',
  'GE9JC001076',
  'GE2LA001114',
];

$XX0XX00000 = [
  'GE6DD01053',
  'GE5GK95625',
  'GE7JG01497',
  'GE6EK21577',
  'NH2BL66897',
  'NH0EF23168',
  'NH2AE24884',
  'NH1bH41849'
];

$XX0X00X000 = [
  'MJ3K29D142',
  'AG7L11F204',
  'CG9830F159',
  'MJ6515F183',
  'AG8307F292',
  'AG7928F375'
];

$serials = [
  'GE0XX00000R' => $GE0XX00000R,
  'GE0XX000000' => $GE0XX000000,
  'XX0XX00000' => $XX0XX00000,
  'XX0X00X000' => $XX0X00X000
];


$inValid = [
  'GEGIA001117',
  'GE3IA00111Y',
  'MHTBF26656',
  'MH2ZF266i6',
  'MH2BFPPP',
  'MH2BF2MS56'
];

function valueToString( $value ){
  return ( !is_bool( $value ) ?  $value : ($value ? 'true' : 'false' )  );
}

function getFormatTest($serials, $st) {
  foreach($serials as $format => $ss){
    echo 'testing get format '.$format.PHP_EOL;
    foreach($ss as $s) {
      $returned = (string)$st->getFormat($s);
      echo(valueToString($returned).PHP_EOL);
      result('Format', $s, ($returned == $format));
    }
  }
}

function validTest($serials, $st) {
  foreach($serials as $format => $ss){
    echo 'testing is valid '.$format.PHP_EOL;
    foreach($ss as $s) {
      result('is valid ', $s, ($st->isValid($s) == true));
    }
  }
}

function partialTest($serials, $st) {
  foreach($serials as $format => $ss){
    echo 'testing is partially valid '.$format.PHP_EOL;
    foreach($ss as $s) {
      $s = substr($s, 0, -2);
      result('is partially valid ', $s, ($st->isValid($s, false) == true));
    }
  }
}

function partialFullTest($serials, $st) {
  foreach($serials as $format => $ss){
    echo 'testing is partially valid full '.$format.PHP_EOL;
    foreach($ss as $s) {
      $s = substr($s, 0, -2);
      result('is partially valid full ', $s, ($st->isValid($s, true) == false));
    }
  }
}

function tooLongTest($serials, $st) {
  foreach($serials as $format => $ss){
    echo 'testing too long '.$format.PHP_EOL;
    foreach($ss as $s) {
      $s = $s . '01';
      result('is too long ', $s, ($st->isValid($s) == false));
    }
  }
}

function invalidTest($serials, $st) {
  echo 'testing invalid '.PHP_EOL;
  foreach($serials as $s){
    result('invalid ', $s, ($st->isValid($s) == false));
  }
}

function result($check, $serial, $pass) {
  if($pass){
    echo "\033[32m $check $serial Pass \033[0m \n";
  }else{
    echo "\033[31m $check $serial FAIL \033[0m \n";
  }
}

getFormatTest($serials, $st);
validTest($serials, $st);
partialTest($serials, $st);
partialFullTest($serials, $st);
tooLongTest($serials, $st);
invalidTest($inValid, $st);
