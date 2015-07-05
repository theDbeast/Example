/**
 * @fileOverview - Article feeds
 * @author - Payal Joshi 
 * @date - 06/05/2015
 * @requires - jQuery Library
*/

/**
 * Global Scope - Variables
 */
var $win = $(window);
var article_count, articleid;
var hash = window.location.href.toString();

/**
 * BEGINNING OF INIT FUNCTIONALITY FOR Dom ready
 */

$(document).ready(function () {

    if ($win.width() <= 480 && hash.search('channel1|channel2|channel3|channel4') > 0) {

        loadMobilefeed();
    }
    else {
        article_count = 1;
        $.getJSON('../Example/feed/data.json', function (data) {
            while (article_count <= 5) {
                var imgout, dateout, title, body, tag;
                $.each(data["article-" + article_count + ""], function (i, outdata) {
                    switch (i) {
                        case 'image':
                            imgout = '../Example/images/' + outdata;
                            break;
                        case 'title':
                            title = "<h2>" + outdata + "</h2>";
                            break;
                        case 'date':
                            dateout = "<p class='posted'>" + outdata + "</p>";
                            break;
                        case 'body':
                            body = "<p>" + outdata + "</p>";
                            break;
                        case 'tags':
                            tag = "<p><b>Tags: </b>" + outdata + "</p>";
                            break;
                    }
                });
                $("#article" + article_count).append("<a><img id='headimg' src=" + imgout + "/></a><section><header>" + title + "" + dateout + "</header>" + body + "" + tag + "</section>");
                article_count++;
            }
        });
    }
});
/**
 * CORE SCROLL FUNCTION
 */
var article_nocount = 6;
$win.scroll(function () {
    if ($win.height() + $win.scrollTop() === $(document).height()) {
        if (article_nocount <= 10) {
            loadarticle();
        }
    }
});
/**
 * CALLBACK ON SCROLL
 */
function loadarticle() {
    $.getJSON('../Example/feed/data.json', function (data) {
        var imgout, dateout, title, body, tag;
        $.each(data["article-" + article_nocount + ""], function (i, tweet) {
            switch (i) {
                case 'image':
                    imgout = '../Example/images/' + tweet;
                    break;
                case 'title':
                    title = "<h2>" + tweet + "</h2>";
                    break;
                case 'date':
                    dateout = "<p class='posted'>" + tweet + "</p>";
                    break;
                case 'body':
                    body = "<p>" + tweet + "</p>";
                    break;
                case 'tags':
                    tag = "<p><b>Tags: </b>" + tweet + "</p>";
                    break;
            }
        });
        $("#article" + article_nocount).append("<a><img id='headimg' src=" + imgout + "/></a><section><header>" + title + "" + dateout + "</header>" + body + "" + tag + "</section>");
        article_nocount++;
    });
}
function parsePolitics() {
    articleid = 0;
    $.getJSON('../Example/feed/data.json', function (data) {
        while (articleid < 10) {
            articleid++;
            $.each(data["article-" + articleid + ""], function (i, tweet) {
                if (i === 'tags' && jQuery.inArray("Politics", tweet) >= 0) {
                    loadcategory(articleid);
                }
            });
        }
    });
}
function parseEntertainment() {
    articleid = 0;
    $.getJSON('../Example/feed/data.json', function (data) {
        while (articleid < 10) {
            articleid++;
            $.each(data["article-" + articleid + ""], function (i, tweet) {
                if (i === 'tags' && jQuery.inArray("Entertainment", tweet) >= 0) {
                    loadcategory(articleid);
                }
            });
        }
    });
}
function parseBooks() {
    articleid = 0;
    $.getJSON('../Example/feed/data.json', function (data) {
        while (articleid < 10) {
            articleid++;
            $.each(data["article-" + articleid + ""], function (i, tweet) {
                if (i === 'tags' && jQuery.inArray("Books", tweet) >= 0) {
                    loadcategory(articleid);
                }
            });
        }
    });
}
function parseComapny() {
    articleid = 0;
    $.getJSON('../Example/feed/data.json', function (data) {
        while (articleid < 10) {
            articleid++;
            $.each(data["article-" + articleid + ""], function (i, tweet) {
                if (i === 'tags' && jQuery.inArray("Company", tweet) >= 0) {
                    loadcategory(articleid);
                }
            });
        }
    });
}
function loadcategory(articleid) {
    $.getJSON('../Example/feed/data.json', function (data) {
        var imgout, dateout, title, body, tags;
        $.each(data["article-" + articleid + ""], function (i, tweet) {
            switch (i) {
                case 'image':
                    imgout = '../Example/images/' + tweet;
                    break;
                case 'title':
                    title = "<h2>" + tweet + "</h2>";
                    break;
                case 'date':
                    dateout = "<p class='posted'>" + tweet + "</p>";
                    break;
                case 'body':
                    body = "<p>" + tweet + "</p>";
                    break;
                case 'tags':
                    tag = "<p><b>Tags: </b>" + tweet + "</p>";
                    break;
            }
        });
        $("#article" + articleid).append("<a><img id='headimg' src=" + imgout + "/></a><section><header>" + title + "" + dateout + "</header>" + body + "" + tag + "</section>");
    });
}
/**
 * CATEGORY CLICK EVENTS
 */
$("#nav ul li a").click(function () {

    var id = $(this).attr('id');
    if (id !== 'home') {
        $(this).removeAttr('href');
    }
    if (id === 'channel1') {
        $("[id^=article]").empty();
        parsePolitics();
        $win.unbind('scroll');
    }
    else if (id === 'channel2') {
        $("[id^=article]").empty();
        parseEntertainment();
        $win.unbind('scroll');
    }
    else if (id === 'channel3') {

        $("[id^=article]").empty();
        parseBooks();
        $win.unbind('scroll');
    }
    else if (id === 'channel4') {
        $("[id^=article]").empty();
        parseComapny();
        $win.unbind('scroll');
    }

});
/**
 * MOBILE RENDERING
 */
function loadMobilefeed() {
    if (hash.search('channel1') > 0) {
        $("[id^=article]").empty();
        parsePolitics();
        $win.unbind('scroll');
    }
    if (hash.search('channel2') > 0) {
        $("[id^=article]").empty();
        parseEntertainment();
        $win.unbind('scroll');
    }
    if (hash.search('channel3') > 0) {
        $("[id^=article]").empty();
        parseBooks();
        $win.unbind('scroll');
    }
    if (hash.search('channel4') > 0) {
        $("[id^=article]").empty();
        parseComapny();
        $win.unbind('scroll');
    }
}