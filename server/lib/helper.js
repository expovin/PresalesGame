const Config = require('./settings');
const settings = new Config();
const Reset = "\x1b[0m";
const Bright = "\x1b[1m";
const Dim = "\x1b[2m";
const Underscore = "\x1b[4m";
const Blink = "\x1b[5m";
const Reverse = "\x1b[7m";
const Hidden = "\x1b[8m";

const FgBlack = "\x1b[30m";
const FgRed = "\x1b[31m";
const FgGreen = "\x1b[32m";
const FgYellow = "\x1b[33m";
const FgBlue = "\x1b[34m";
const FgMagenta = "\x1b[35m";
const FgCyan = "\x1b[36m";
const FgWhite = "\x1b[37m";

const BgBlack = "\x1b[40m";
const BgRed = "\x1b[41m";
const BgGreen = "\x1b[42m";
const BgYellow = "\x1b[43m";
const BgBlue = "\x1b[44m";
const BgMagenta = "\x1b[45m";
const BgCyan = "\x1b[46m";
const BgWhite = "\x1b[47m";

var count = {passed : 0, failed: 0};

module.exports = {
 
    /** Distribuzione Gaussiana e non uniforme 
     *  Type parameter define the type ofgeneration
     *      0 : Uniform distribution (default)
     *      1 : Non linear (Lower value more likely)
     *      2 : Non linear (Higher value more likely)
     *      3 : Normal (Gaussian) distribution
     * 
     *  Round specify the number of decimal digit (default 0)
     *  the number need to be negative:
     *     -1 : One digital number
     *     -2 : Two digital number 
     *      etc...
     * */   
    
    generateRandomValue : function (min, max, type=0, round=0,likelihood=1){

        var nonce;
        switch(type){
            case 0: nonce=Math.random() * (max - min) + min; break;
            case 1 :
                do{
                    var first = Math.random() * (max - min) + min;
                    var second = Math.random() * (max - min) + min;
                } while(first > second)
                nonce=first;
                break;

            case 2:
                do{
                    var first = Math.random() * (max - min) + min;
                    var second = Math.random() * (max - min) + min;
                } while(second > first)
                nonce=first;
                break;  
                
            case 3:
                var distribution = gaussian(min, max);
                nonce = distribution.pdf(Math.random());
                break;

            case 4:
                nonce = Math.pow(Math.random(),settings.NonLinearRandomCurves[likelihood]) * (max - min) + min;
                break;
        }
        return(Math.round(nonce,round));
    },

    printOut(chk,modul,func,message) {

        var status;
        var color;
        if(chk){
            status="PASSED";
            color=FgGreen;
            count.passed ++;
        }
            
        else{
            status="FAILED"
            color=FgRed;
            count.failed ++;
        }
            

        console.log(color,"["+status+"]"+Reset+"\t["+modul+"]\t["+func+"]\t - "+message);
        return count;
    },

    resetCount() {
        count = {passed : 0, failed: 0};
    },


    removeDuplicates : function (array){
        return( array.filter(function(elem, pos) {
            return array.indexOf(elem) == pos;
        }))
    }


}