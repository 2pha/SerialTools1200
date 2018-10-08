<?php
class SerialTools1200
{

    public $currentYear;

    public $mks;

    public $monthMap;

    public $formats;


    public function __construct()
    {
        $this->currentYear = 2018;
        $this->mks         = [
            'mk2'  => [
                'start_year' => 1979,
                'end_year'   => 2010,
            ],
            'mk3'  => [
                'start_year' => 1989,
                'end_year'   => 1998,
            ],
            'mk4'  => [
                'start_year' => 1996,
                'end_year'   => 2005,
            ],
            'mk3d' => [
                'start_year' => 1997,
                'end_year'   => 2002,
            ],
            'm3d'  => [
                'start_year' => 1997,
                'end_year'   => 2002,
            ],
            'ltd'  => [
                'start_year' => 1995,
                'end_year'   => 2002,
            ],
            'mk5'  => [
                'start_year' => 2002,
                'end_year'   => 2010,
            ],
            'mk5g' => [
                'start_year' => 2002,
                'end_year'   => 2010,
            ],
            'm5g'  => [
                'start_year' => 2002,
                'end_year'   => 2010,
            ],
            'gld'  => [
                'start_year' => 2004,
                'end_year'   => 2004,
            ],
            'mk6'  => [
                'start_year' => 2007,
                'end_year'   => 2010,
            ],
            'gae'  => [
                'start_year' => 2016,
                'end_year'   => 0,
            ],
            'g'    => [
                'start_year' => 2016,
                'end_year'   => 0,
            ],
            'gl'   => [
                'start_year' => 2017,
                'end_year'   => 0,
            ],
        ];
        $this->monthMap    = [
            '1' => 1,
            'A' => 1,
            '2' => 2,
            'B' => 2,
            '3' => 3,
            'C' => 3,
            '4' => 4,
            'D' => 4,
            '5' => 5,
            'E' => 5,
            '6' => 6,
            'F' => 6,
            '7' => 7,
            'G' => 7,
            '8' => 8,
            'H' => 8,
            'S' => 8,
            '9' => 9,
            'I' => 9,
            'J' => 10,
            'K' => 11,
            'L' => 12,
        ];
        $this->formats     = [
            'GE0XX00000R' => [
                'regex'     => [
                    '[GE]{2}',
                    '[0-9]',
                    '[A-LS]',
                    '[A-Z]',
                    '[0-9]',
                    '[0-9]',
                    '[0-9]',
                    '[0-9]',
                    '[0-9]',
                    '[R]',
                ], 'maxlength' => 11,
            ],
            'GE0XX000000' => [
                'regex'     => [
                    '[GE]{2}',
                    '[0-9]',
                    '[A-LS]',
                    '[A-Z]',
                    '[0-9]',
                    '[0-9]',
                    '[0-9]',
                    '[0-9]',
                    '[0-9]',
                    '[0-9]',
                ], 'maxlength' => 11,
            ],
            'XX0XX00000'  => [
                'regex'     => [
                    '[GE|NH]{2}',
                    '[0-9]',
                    '[A-LS]',
                    '[A-Z]',
                    '[0-9]',
                    '[0-9]',
                    '[0-9]',
                    '[0-9]',
                    '[0-9]',
                ], 'maxlength' => 10,
            ],
            'XX0X00X000'  => [
                'regex'     => [
                    '[CG|AG|MJ|MU|DA]{2}',
                    '[0-9]',
                    '[(1-9)|(JKLS)]',
                    '[0-3]',
                    '[0-9]',
                    '[A-Z]',
                    '[0-9]',
                    '[0-9]',
                    '[0-9]',
                ], 'maxlength' => 10,
            ],
            'LA0XX000000' => [
                'regex'     => [
                    '[LA]{2}',
                    '[0-9]',
                    '[A-LS]',
                    '[A-Z]',
                    '[0-9]',
                    '[0-9]',
                    '[0-9]',
                    '[0-9]',
                    '[0-9]',
                    '[0-9]',
                ], 'maxlength' => 11,
            ],
        ];

    }//end __construct()


    public function check($string, $mk=false)
    {
        $results       = [
            'partiallyValid' => false,
            'fullyValid'     => false,
            'format'         => '',
            'dateData'       => [
                'day'   => 0,
                'month' => 0,
                'years' => [],
            ],
        ];
        $string        = strtoupper($string);
        $regexAddCount = (strlen($string) - 1);
        foreach ($this->formats as $format => $___) {
            if (!$results['partiallyValid'] && strlen($string) <= $this->formats[$format]['maxlength']) {
                    $regex = ['^'];
                for ($i = 0;
                    $i < $regexAddCount; $i++) {
                        array_push($regex, $this->formats[$format]['regex'][$i]);
                }array_push($regex, '$');
                $regexString = join('', $regex);
                if (preg_match('/'.$regexString.'/', $string)) {
                    $results['partiallyValid'] = true;
                }
            }if (!$results['fullyValid']) {
                $regex = ['^'];
                for ($i = 0;
                $i < count($this->formats[$format]['regex']); $i++) {
                    array_push($regex, $this->formats[$format]['regex'][$i]);
                }array_push($regex, '$');
                $regexString = join('', $regex);
                if (preg_match('/'.$regexString.'/', $string)) {
                    $results['fullyValid'] = true;
                    $results['format']     = $format;
                }
            }if ($results['fullyValid']) {
                if ($results['format'] == 'XX0X00X000') {
                    $dayval = substr($string, 4, 2);
                    $daynum = intval($dayval);
                    if ($daynum > 0 && $daynum <= 31) {
                        $results['dateData']['day'] = intval($dayval);
                    }
                }$results['dateData']['month'] = $this->monthMap[substr($string, 3, 1)];
                $yearval   = substr($string, 2, 1);
                $yearval   = intval($yearval);
                $startyear = 1979;
                if ($yearval < 9) {
                    $startyear += ($yearval + 1);
                }for ($i = $startyear;
                $i < $this->currentYear; $i += 10) {
                    if ($mk) {
                        if ($i >= $this->mks[$mk]['start_year'] && $i <= $this->mks[$mk]['end_year']) {
                            array_push($results['dateData']['years'], $i);
                        } else if ($i >= $this->mks[$mk]['start_year'] && $this->mks[$mk]['end_year'] == 0) {
                            array_push($results['dateData']['years'], $i);
                        }
                    } else {
                        array_push($results['dateData']['years'], $i);
                    }
                }return $results;
            }//end if
        }//end foreach

        return $results;

    }//end check()


}//end class
