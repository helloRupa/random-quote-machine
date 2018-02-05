getData_42190abhy = function (response) {
    var quote = document.getElementById("quotes").getElementsByTagName("p")[0];
    var author = document.getElementById("quotes").getElementsByTagName("cite")[0];
    try {
        if (!response) throw "New exception";
        var authorText = response.quoteAuthor;
        var quoteText = response.quoteText;
        quote.innerHTML = quoteText;
        if (authorText) author.innerHTML = authorText;
        else author.innerHTML = "Unknown";
    } catch (err) {
        quote.innerHTML = "Sorry, quotes are not currently available. Please check back later.";
        author.innerHTML = "Sad Malfunction Bear";
    }
};

(function () {
    window.onload = (function () {
        getSetHeight();
        makeQuoteScript();
        fadeIn();
        hTweet(1000);
        document.getElementById("getNewQuote").onclick = function () {
            getSetHeight();
            fadeOut();
            setTimeout(function () {
                makeQuoteScript();
            }, 1000);
            fadeIn();
            hTweet(2100);
        };
    })();

    function makeQuoteScript() {
        var script = document.createElement("script");
        script.id = "quoteScript";
        script.type = "text/javascript";
        script.src = "https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=jsonp&jsonp=getData_42190abhy";
        script.onerror = function (event) {
            document.getElementById("quotes").getElementsByTagName("p")[0].innerHTML = "Sorry, quotes are not currently available. Please check back later.";
            document.getElementById("quotes").getElementsByTagName("cite")[0].innerHTML ="Sad Malfunction Squatch";
        };
        document.getElementsByTagName("head")[0].appendChild(script);
        document.getElementById("quoteScript").remove();
    }

    function makeTweet() {
        var tweetBtn = document.getElementById("tweetBtn");
        var quote = document.getElementById("quotes").getElementsByTagName("p")[0].innerHTML;
        var author = document.getElementById("quotes").getElementsByTagName("cite")[0].innerHTML;
        tweetBtn.href = 'https://twitter.com/intent/tweet?text="' + quote + '"' + " -" + author;
    }

    function fadeOut() {
        document.getElementsByTagName("blockquote")[0].style.opacity = "0";
    }

    function fadeIn() {
        setTimeout(function () {
            document.getElementsByTagName("blockquote")[0].style.opacity = "1";
        }, 2000);
    }

    function getSetHeight() {
        var qcont = document.getElementById("quotes");
        var qblock = document.getElementsByTagName("blockquote")[0];
        var ht = qblock.scrollHeight;
        qcont.style.height = ht + "px";
    }

    function hTweet(time) {
        setTimeout(function () {
            getSetHeight();
            makeTweet();
        }, time);
    }
})();
