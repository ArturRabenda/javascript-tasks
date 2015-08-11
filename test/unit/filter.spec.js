describe('filter', function ()
{
    'use strict';

    beforeEach(module('app'));

    var withoutHFilter;

    describe('quote', function ()
    {
        it('should places the text in quotes', inject(function (quoteFilter)
        {
            expect(quoteFilter('To be, or not to be...')).toEqual('"To be, or not to be..."');
            expect(quoteFilter('Test test')).toEqual('"Test test"');
        }));
    });

    describe('withoutH', function ()
    {
        beforeEach(inject(function (_withoutHFilter_)
        {
            withoutHFilter = _withoutHFilter_;
        }));

        it('should removes all the letters H', inject(function ()
        {
            expect(withoutHFilter('TestH test')).toEqual('Test test');
        }));
        it('should removes all the letters h', inject(function ()
        {
            expect(withoutHFilter('Test testh')).toEqual('Test test');
        }));
        it('should removes all the letters H and h', inject(function ()
        {
            expect(withoutHFilter('Testh htestH')).toEqual('Test test');
        }));
    });

    describe('firstLetterUpp', function ()
    {
        it('should places the text in quotes', inject(function (firstLetterUpFilter)
        {
            expect(firstLetterUpFilter('Up-to-the-minute')).toEqual('Up-To-The-Minute');
            expect(firstLetterUpFilter('the Hobbit: the Battle of the five Armies')).toEqual('The Hobbit: The Battle Of The Five Armies');
            expect(firstLetterUpFilter('first letter up')).toEqual('First Letter Up');
            expect(firstLetterUpFilter('Visit BBC News for up-to-the-minute news, breaking news, video, audio and stories.')).toEqual('Visit Bbc News For Up-To-The-Minute News, Breaking News, Video, Audio And Stories.');
        }));
    });
});
