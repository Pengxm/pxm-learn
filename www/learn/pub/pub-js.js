(function ($) {
    $.include = function (domScript) {
        var includeLen = $('div.include').length;
        $('div.include').each(function (index, element) {
            var path = $(element).data('path');
            $.get(path, function (data, ele) {
                // data = $('header').html();
                $(element).after(data).remove();

                console.log($(element).after(data));
                console.log(path);
                console.log(path + ' ::loaded');
                if (--includeLen === 0) {
                    loadDomScript(domScript);
                }
            });
        });
    };
    function loadDomScript(domScript) {
        while(domScript.length) {
            var domScriptPath = domScript.shift();
            $.getScript(domScriptPath);
        }
    }
    return $.include;
})(jQuery);
