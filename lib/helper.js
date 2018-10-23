module.exports = {
 
    
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

    removeDuplicates : function (array){
        return( array.filter(function(elem, pos) {
            return array.indexOf(elem) == pos;
        }))
    }


}