<?php

namespace Twopha\SerialTools1200;

/*require("babel-polyfill");*/
require(dirname(__FILE__).'/../src/SerialTools1200.php');

$st = new SerialTools1200();

$GE0XX00000R = [
  'GE0GF01082R',
  'GE8AD01111R',
  'GE7LC01168R',
  'GE6HB01016R',
  'GE6SD01051R'
];

$GE0XX000000 = [
  'GE5GA001629',
  'GE4BZ001112',
  'GE3IA001117',
  'GE3IA001120',
  'GE9JC001076',
  'GE2LA001114'
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
  'AG7928F375',
  'AB7701F094',
  'MF5521F032'
];

$LA0XX000000 = [
  'LA6DA001164',
  'LA6DA001099',
  'LA6GA001042',
  'LA6DA001166',
  'LA7KA001024',
  'LA6SA001167',
  'LA7CA001121',
  'LA7EA001087',
  'LA7JA001072',
  'LA7JA001070'
];

$GM0XX000000 = [
  'GM0SC001065',
  'GM0HC001219',
  'GM0GC001131',
  'GM0FB001007',
  'GM9EA001173',
  'GM9HA001255',
  'GM9JB001373',
  'GM0FA700012',
];

$serials = [
  'GE0XX00000R' => $GE0XX00000R,
  'GE0XX000000' => $GE0XX000000,
  'XX0XX00000' => $XX0XX00000,
  'XX0X00X000' => $XX0X00X000,
  'LA0XX000000' => $LA0XX000000,
  'GM0XX000000' => $GM0XX000000,
];


$inValid = [
  'GEGIA001117',
  'GE3IA00111Y',
  'MHTBF26656',
  'MH2ZF266i6',
  'MH2BFPPP',
  'MH2BF2MS56'
];

$dateTests = [
  'GE5HS60790' => [
    'type' => 'mk2',
    'dateData' => [
      'day' => 0,
      'month' => 8,
      'years' => [1985, 1995, 2005]
    ]
  ],
  'MJ6109F047' => [
    'type' => 'mk2',
    'dateData' => [
      'day' => 9,
      'month' => 1,
      'years' => [1986, 1996, 2006]
    ]
  ],
  'LA6DA001164' => [
    'type' => 'gae',
    'dateData' => [
      'day' => 0,
      'month' => 4,
      'years' => [2016]
    ]
  ]
];



function valueToString($value){
  return ( !is_bool( $value ) ?  $value : ($value ? 'true' : 'false' )  );
}

function getFormatTest($serials, $st) {
  foreach($serials as $format => $ss){
    echo 'testing get format '.$format.PHP_EOL;
    foreach($ss as $s) {
      //$returned = (string)getFormat($s, $st);
      $check = $st->check($s);
      $returned = $check['format'];
      echo(valueToString($returned).PHP_EOL);
      result('Format', $s, ($returned == $format));
    }
  }
}

function validTest($serials, $st) {
  foreach($serials as $format => $ss){
    echo 'testing is fully valid '.$format.PHP_EOL;
    foreach($ss as $s) {
      $check = $st->check($s);
      result('is fully valid ', $s, ($check['fullyValid'] == true));
    }
  }
}

function partialTest($serials, $st) {
  foreach($serials as $format => $ss){
    echo 'testing is partially valid '.$format.PHP_EOL;
    foreach($ss as $s) {
      $s = substr($s, 0, -2);
      $check = $st->check($s);
      result('is partially valid ', $s, ($check['partiallyValid'] == true));
    }
  }
}

function partialFullTest($serials, $st) {
  foreach($serials as $format => $ss){
    echo 'testing is partially valid full '.$format.PHP_EOL;
    foreach($ss as $s) {
      $s = substr($s, 0, -2);
      $check = $st->check($s);
      result('is partially valid full ', $s, ($check['fullyValid'] == false));
    }
  }
}

function tooLongTest($serials, $st) {
  foreach($serials as $format => $ss){
    echo 'testing too long '.$format.PHP_EOL;
    foreach($ss as $s) {
      $s = $s . '01';
      $check = $st->check($s);
      result('is too long ', $s, (($check['fullyValid'] + $check['partiallyValid']) == false));
    }
  }
}

function invalidTest($serials, $st) {
  echo 'testing invalid '.PHP_EOL;
  foreach($serials as $s){
    $check = $st->check($s);
    result('invalid ', $s, (($check['fullyValid'] + $check['partiallyValid']) == false));
  }
}

function dateTest($serials, $st) {
  echo 'testing dates '.PHP_EOL;
  foreach($serials as $s => $value) {
    $check = $st->check($s);
    result('dates ', $s, arrayEqual($check['dateData'], $value['dateData'], $st));
  }
}

function result($check, $serial, $pass) {
  if($pass){
    echo "\033[32m $check $serial Pass \033[0m \n";
  }else{
    echo "\033[31m $check $serial FAIL \033[0m \n";
  }
}

function arrayEqual($array1, $array2) {
  return $array1 === $array2;
}

getFormatTest($serials, $st);
validTest($serials, $st);
partialTest($serials, $st);
partialFullTest($serials, $st);
tooLongTest($serials, $st);
invalidTest($inValid, $st);
dateTest($dateTests, $st);
