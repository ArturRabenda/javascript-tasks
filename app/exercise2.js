(function ()
{
    'use strict';

    window.exercise2 = {
        reverseNumber: function (number)
        {
            if (typeof number !== 'number') {
                return false;
            }
            number = number + '';
            return parseInt(number.split('').reverse().join(''));
        },
        squareOrCube: function (array)
        {
            for (var i = 0; i < array.length; i++) {
                if (array[i] % 2 === 0) {
                    array[i] = array[i] * array[i] * array[i];
                }
                else {
                    array[i] = array[i] * array[i];
                }
            }
            return array;
        },
        replaceString: function (list, string, newString)
        {
            var find;
            for (var i = 0; i < list.length; i++) {
                if (list[i] === string) {
                    find = true;
                    list[i] = newString;
                }
            }
            return (find === true) ? list : false;
        },
        maxArray: function (array)
        {
            var max = array[0];
            for (var i = 0; i < array.length; i++) {
                if (typeof array[i] === 'number') {
                    if (array[i] > max) {
                        max = array[i];
                    }
                } else {
                    return false;
                }
            }
            return max;
        },
        getObject: function (list, name)
        {
            for (var i = 0; i < list.length; i++) {
                if (list[i].name === name) {
                    return list[i];
                }
            }
            return false;
        }
    };
})();
