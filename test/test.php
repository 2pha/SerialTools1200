<?php
/*require("babel-polyfill");*/
require(dirname(__FILE__).'/../build/SerialTools1200.php');

$st = new SerialTools1200();
/*
$GE0XX = [
  'GE3IA001117',
  'GE6DD01053',
  'GE3IA001120',
  'GE5GK95625',
  'GE1JC001587',
  'GE9JC001076',
  'GE9JC001060',
  'GE2LA001246',
  'GE2LA001114',
  'GE7JG01497',
  'GE6EK21577'
];

$XX0XX = [
  'MH2BF26656',
  'NH2BL66897',
  'NH0EF23168',
  'NH2AE24884',
  'NC2CF27088',
  'LA7CA001029',
  'NH1bH41849'
];

$XX0000X = [
  'CG9830F159',
  'MJ6515F183',
  'AG8307F292',
  'AG7928F375'
];

$XX0X00X = [
  'MJ3K29D142',
  'AG7L11F204'
];
*/

$GE0XX00000X = [
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
/*
$serials = [
  'GE0XX' => $GE0XX,
  'XX0XX' => $XX0XX,
  'XX0000X' => $XX0000X,
  'XX0X00X' => $XX0X00X
];
*/
$serials = [
  'GE0XX00000X' => $GE0XX00000X,
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
invalidTest($inValid, $st);
