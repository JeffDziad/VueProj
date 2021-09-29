const underscore = document.getElementById('underscore-animate');
let underscore_status = false;
let underscore_Interval = setInterval(function() {
    if(underscore_status) {
        underscore.style.display = "none";
        underscore_status = false;
    } else {
        underscore.style.display = "inline";
        underscore_status = true;
    }
}, 500);