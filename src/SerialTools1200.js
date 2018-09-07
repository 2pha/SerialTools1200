//@ts-check

export class SerialTools1200 {

  constructor() {

    this.mks = {
      'mk2': {
        'start_year': 1979,
        'end_year': 2010
      },
      'mk3': {
        'start_year': 1989,
        'end_year': 1998
      },
      'mk4': {
        'start_year': 1996,
        'end_year': 2005
      },
      'mk3d': {
        'start_year': 1997,
        'end_year': 2002
      },
      'm3d': {
        'start_year': 1997,
        'end_year': 2002
      },
      'ltd': {
        'start_year': 1995,
        'end_year': 2002
      },
      'mk5': {
        'start_year': 2002,
        'end_year': 2010
      },
      'mk5g': {
        'start_year': 2002,
        'end_year': 2010
      },
      'm5g': {
        'start_year': 2002,
        'end_year': 2010
      },
      'gld': {
        'start_year': 2004,
        'end_year': 2004
      },
      'mk6': {
        'start_year': 2007,
        'end_year': 2010
      },
      'gae': {
        'start_year': 2016,
        'end_year': 0
      },
      'g': {
        'start_year': 2016,
        'end_year': 0
      },
      'gl': {
        'start_year': 2017,
        'end_year': 0
      }
    };

    this.formats = {
      'GE0XX00000R': {
        regex: [
          '[GE]{2}',
          '[0-9]',
          '[A-L]',
          '[A-Z]',
          '[0-9]',
          '[0-9]',
          '[0-9]',
          '[0-9]',
          '[0-9]',
          '[R]'
        ],
        'maxlength': 11
      },
      'GE0XX000000': {
        regex: [
          '[GE]{2}',
          '[0-9]',
          '[A-L]',
          '[A-Z]',
          '[0-9]',
          '[0-9]',
          '[0-9]',
          '[0-9]',
          '[0-9]',
          '[0-9]'
        ],
        'maxlength': 11
      },
      'XX0XX00000': {
        regex: [
          '[GE|NH]{2}',
          '[0-9]',
          '[A-L]',
          '[A-Z]',
          '[0-9]',
          '[0-9]',
          '[0-9]',
          '[0-9]',
          '[0-9]'
        ],
        'maxlength': 10
      },
      'XX0X00X000': {
        regex: [
          '[CG|AG|MJ|MU|DA]{2}',
          '[0-9]',
          '[(1-9)|(JKL)]',
          '[0-3]',
          '[0-9]',
          '[A-Z]',
          '[0-9]',
          '[0-9]',
          '[0-9]'
        ],
        'maxlength': 10
      },
      'LA0XX000000': {
        regex: [
          '[LA]{2}',
          '[0-9]',
          '[A-Z]',
          '[A-Z]',
          '[0-9]',
          '[0-9]',
          '[0-9]',
          '[0-9]',
          '[0-9]',
          '[0-9]'
        ],
        'maxlength': 11
      },
    };
  }

  getFormat(string, full = true) {

    let length = string.length;
    if (length < 2) {
      return false;
    }

    // Use a for loop so can convert to PHP.
    for(let format in this.formats) {
      let skip = false;
      if(length > this.formats[format]['maxlength']) {
        skip = true;
      }

      if(!skip) {
        let addCount = 0;
        if(full){
          addCount = this.formats[format]['regex'].length;
        }else{
          string.length - 1;
        }

        // Put it into an array, because php conversion does not work well with string cancatination.
        let regex = ['^'];
        //for(let i = 0; i < length; i++) {
          for(let i = 0; i < addCount; i++) {
          // Access format object like an array so converts to php.
          //if (i < this.formats[format]['regex'].length) {
            //regex = regex + this.formats[format]['regex'][i];
            regex.push(this.formats[format]['regex'][i]);
          //}
        }

        if (full) {
          regex.push('$');
        }
        let regexString = regex.join('');
        //console.log(regexString);
        if (string.toUpperCase().match(regexString)) {
          return format;
        }
      }
    }

    return false;
  }

  isValid(string, full = true) {
    if(this.getFormat(string, full)) {
      return true;
    }
    return false;
  }

}

//export default {SerialTools1200}