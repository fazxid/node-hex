/*
 * Node Hex
 * @author Fazxid | https://github.com/fazxid/node-hex
 */

class Nodehex {

    constructor() {
        this.hexlist = '0123456789ABCDEF';
    }

    toHex(str, encode='utf8') {
        let buf = Buffer.from(str, encode)
        return buf.toString('hex')
    }


    toString(str, encode='utf8') {
        let buf = Buffer.from(str, 'hex')
        return buf.toString(encode)
    }

    toStringWithoutLines(str, encode='utf8') {
        str = str.replaceAll('0A','00');
        let buf = Buffer.from(str, 'hex')
        return buf.toString(encode)
    }

    isHex(str) {

        if (str.length<=1) return false;
        for (let i = 0; i < str.length; i++) {
            if (this.hexlist.indexOf(str.charAt(i).toUpperCase())===-1) return false;
        }
        return true;

    }

    find(dump, str) {

        if (this.isHex(dump)!==true) dump = this.toHex(dump);
        if (this.isHex(str)!==true) str = this.toHex(str);

        if (dump.indexOf(str)===-1) return false;
        else return true;

    }

    findWithSlice(dump, find, length) {        

        if (this.isHex(dump)!==true) dump = this.toHex(dump);
        if (this.isHex(find)!==true) find = this.toHex(find);

        if(this.find(dump, find)===false) return false;

        var subStart, subEnd;

        if (length<0) {            
            subStart = (dump.search(find)-find.length);
            subEnd = Math.abs(length);

        } else {
            subStart = dump.search(find);
            subEnd = find.length+length;

        }

        return dump.substr(subStart, subEnd);


    }

    toUint16(hex) {
        return Uint16Array.from(Buffer.from(hex, 'hex'));
    }

    intToHex(s) {
        if (parseInt(s)<10) return `0${s}`;
        else return s.toString(16);
    }

    print(hex, length=16, showString=0) {
        var dump='', string='', cc=1;
        length=length*2;
        for (let i = 0; i < hex.length; i++) {
            dump+=hex.charAt(i).toUpperCase();
            string+=hex.charAt(i).toUpperCase();
            if (cc===length) {
                if (showString===1) { 
                    dump+=` | ${this.toStringWithoutLines(string)}\n`;
                    string='';
                } else {
                    dump+=`\n`;
                } 
                
                cc=0;
            }
            cc++;
        }

        if (showString===1) { 
            for (let i = 0; i < length-(string.length); i++) dump+=` `;
            dump+=` | ${this.toString(string)}\n`;
        }

        return dump;
    }

    printWithSpace(hex, length=16, showString=0) {
        var dump='', string='', cc=1;
        length=length;
        for (let i = 0; i < hex.length; i+=2) {
            dump+=`${hex.charAt(i).toUpperCase()}${hex.charAt(i+1).toUpperCase()} `;

            if (cc===length) {
                dump+=`\n`;
                cc=0;
            }
            cc++;
        }
        return dump;

    }

}


module.exports = new Nodehex();