function getURLParameter(name) {
    return decodeURIComponent((new RegExp("[?|&]" + name + "=" + "([^&;]+?)(&|#|;|$)").exec(location.search) || [null, ""])[1].replace(/\+/g, "%20")) || null;
}

function endOfGame() {
    window.open("end.html?score=" + encodeURIComponent(endDayScore));
}

function loadScore() {
    var score = getURLParameter("score");
    document.getElementById("scoreText").innerHTML = score;
    var tweetText = 'I just got a score of ' + score + ' on Waterd. Play it now at https://waterdapp.github.io/';
    document.getElementById("href").href= "https://twitter.com/intent/tweet?text=" + tweetText;
}