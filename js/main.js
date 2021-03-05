function pre_check() {
    if (!addEventListener) {
        alert("您的浏览器不支持addEventListener方法，如需正常使用功能，请更换浏览器或将浏览器升级至最新版本");
    };
};

function main() {
    form = document.forms["_form"];
    form.onsubmit = function() {
        alert("yes")
    }
};

function bonus() {
    document.addEventListener("keydown", keydown);
    function keydown(e) {
        if (e.keyCode == 90) {
            document.getElementById("_submit").click();
        };
        if (e.keyCode == 88) {
            document.getElementById("_reset").click();
        };
    };
};

window.onload = function() {
    pre_check();
    main();
    bonus();
    
};