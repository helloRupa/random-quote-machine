(function () {
    function showError(err) {
        let quote = document.getElementById("quotes").getElementsByTagName("p")[0];
        let author = document.getElementById("quotes").getElementsByTagName("cite")[0];
        quote.textContent = "Sorry, quotes are not currently available. Please check back later.";
        author.textContent = "Sad Malfunction Bear";
        console.log(err);
    }

    function showQuote(response) {
        let quote = document.getElementById("quotes").getElementsByTagName("p")[0];
        let author = document.getElementById("quotes").getElementsByTagName("cite")[0];
        let quoteText = response.quoteText.trim();
        let authorText = response.quoteAuthor.trim();
        quote.textContent = quoteText;
        if (authorText) author.textContent = authorText;
        else author.textContent = "Unknown";
    }

    function jsonP(url, callbackName, callbackFn) {
        let script = document.createElement("script");
        script.src = `${url}&jsonp=${callbackName}`;
        window[callbackName] = function (response) {
            try {
                if (!response) throw "New exception";
                if (typeof callbackFn === "function") callbackFn(response);
            } catch (err) {
                showError(err);
            }
        };
        script.onerror = function (err) {
            showError(err);
        };
        document.getElementsByTagName("head")[0].appendChild(script);
        script.remove();
    }

    function makeTweet() {
        let tweetBtn = document.getElementById("tweetBtn");
        let quote = document.getElementById("quotes").getElementsByTagName("p")[0].textContent;
        quote = quote.replace(/;/g, ",");
        let author = document.getElementById("quotes").getElementsByTagName("cite")[0].textContent;
        tweetBtn.href = `https://twitter.com/intent/tweet?text="${quote}" -${author}`;
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
        let qCont = document.getElementById("quotes");
        let qBlock = document.getElementsByTagName("blockquote")[0];
        let ht = qBlock.scrollHeight;
        qCont.style.height = ht + "px";
    }

    function hTweet(time) {
        setTimeout(function () {
            getSetHeight();
            makeTweet();
        }, time);
    }

    (function () {
        let url = "https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=jsonp";
        getSetHeight();
        jsonP(url, "handleRes", showQuote);
        fadeIn();
        hTweet(1000);
        document.getElementById("getNewQuote").onclick = function () {
            getSetHeight();
            fadeOut();
            setTimeout(function () {
                jsonP(url, "handleRes", showQuote);
            }, 1000);
            fadeIn();
            hTweet(2100);
        };
    })();
})();