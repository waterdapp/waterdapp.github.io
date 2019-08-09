function getURLParameter(name) {
    return decodeURIComponent((new RegExp("[?|&]" + name + "=" + "([^&;]+?)(&|#|;|$)").exec(location.search) || [null, ""])[1].replace(/\+/g, "%20")) || null;
}

function endOfGame() {
    window.location = "end.html?score=" + encodeURIComponent(endDayScore);
}

function loadScore() {
    var score = getURLParameter("score");
    document.getElementById("scoreText").innerHTML = score;
    var shareText = 'I just lasted ' + score + ' days on Waterd! Play it now at https://waterdapp.github.io/';
    document.getElementById("twitterShare").href= "https://twitter.com/intent/tweet?text=" + shareText;
    document.getElementById("emailShare").href= "mailto:?subject=Check out this score I got on Waterd!&body=" + shareText;
    document.getElementById("evernoteShare").href= "https://www.evernote.com/clip.action?url=http%3A%2F%2Fwww.addthis.com%2F%23.XU0uu06seaw.evernote&title=Waterd - Online Plant Simulator&body=Waterd is an online plant simulator which lets you look after your very own virtual plant! Play it now at https://waterdapp.github.io/";
}