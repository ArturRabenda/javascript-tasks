(function ()
{
    'use strict';

    window.arraysAnswers = {
        indexOf: function (arr, item)
        {
            /*
             if (Array.prototype.indexOf) { return arr.indexOf(item); }
             */

            for (var i = 0, len = arr.length; i < len; i++) {
                if (arr[i] === item) {
                    return i;
                }
            }
            return -1;
        },

        sum: function (arr)
        {
            var sum = 0;

            for (var i = 0, len = arr.length; i < len; i++) {
                sum += arr[i];
            }
            return sum;
        },

        copy: function (arr)
        {
            return arr.slice();
        },

        remove: function (arr, item)
        {
            while (-1 < arr.indexOf(item)) {
                arr.splice(arr.indexOf(item), 1);
            }
        },

        removeFromCopy: function (arr, item)
        {
            var result = arr.slice();
            while (-1 < result.indexOf(item)) {
                result.splice(result.indexOf(item), 1);
            }
            return result;
        },

        appendToCopy: function (arr, item)
        {
            return arr.concat([item]);
        },

        append: function (arr, item)
        {
            arr.push(item);
            return arr;
        },

        truncate: function (arr)
        {
            return arr.pop();
        },

        prepend: function (arr, item)
        {
            arr.unshift(item);
            return arr;
        },

        curtail: function (arr)
        {
            return arr.shift();
        },

        concat: function (arr1, arr2)
        {
            return arr1.concat(arr2);
        },

        insert: function (arr, index, item)
        {
            arr.splice(index, 0, item);
            return arr;
        },

        count: function (arr, item)
        {
            var count = 0;

            for (var i = 0, len = arr.length; i < len; i++) {
                if (arr[i] === item) {
                    count++;
                }
            }
            return count;
        },

        duplicates: function (arr)
        {
            var dupes = [];
            arr.forEach(function (item, index)
            {
                if (-1 === dupes.indexOf(item) && arr.indexOf(item) !== index) {
                    dupes.push(parseInt(item, 10) || item);
                }
            });
            return dupes;
        },

        square: function (arr)
        {
            var ret = [];

            for (var i = 0, len = arr.length; i < len; i++) {
                ret.push(arr[i] * arr[i]);
            }
            return ret;
        },

        findAllOccurrences: function (arr, target)
        {
            var ret = [];

            for (var i = 0, len = arr.length; i < len; i++) {
                if (arr[i] === target) {
                    ret.push(i);
                }
            }
            return ret;
        }
    };
})();
