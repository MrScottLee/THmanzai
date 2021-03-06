function pre_check() {
    
    if (typeof FileReader == 'undefined') {
        alert("您的浏览器不支持FileReader，如需正常使用功能，请更换浏览器或将浏览器升级至最新版本");
    }
}

function main() {
    var db;
    if (window.XMLHttpRequest) {
        var xhr = new XMLHttpRequest();
    }
    else if (window.ActiveXObject) {
        var xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xhr.open("GET","db/touhou-manzai 2021.02.26.csv",true);
    xhr.send();
    //console.log(xhr.status);
    xhr.onreadystatechange = function() {
        if (xhr.readyState==4 && xhr.status==200){
            alert("yes");
            console.log(xhr.responseText);
        }
        //else {alert("no")}
        
    }
    //console.log(db);
    
    //var db = new File([],"../db/1.txt")
    /*var csv = new FileReader();
    csv.readAsText(db);
    csv.onload = function() {
        console.log(csv.result);
    }*/
    form = document.forms["_form"];
    form.onsubmit = function() {
        var parm_num = form.num.value;
        var parm_stage_1 = form.stage_1.value;
        var parm_stage_2 = form.stage_2.value;
        var parm_year_1 = form.year_1.value;
        var parm_year_2 = form.year_2.value;
        var parm_pop_1 = form.pop_1.value;
        var parm_pop_2 = form.pop_2.value;
        var parm_order = form.order.value;
        var parm_pv = form.pv.value;
    }
}

function bonus() {
    if (addEventListener) {
        document.addEventListener("keydown", keydown);
    }
    else if (attachEvent) {
        document.attachEvent("keydown", keydown);
    }
    function keydown(e) {
        if (e.keyCode == 90) {
            document.getElementById("_submit").click();
        }
        if (e.keyCode == 88) {
            document.getElementById("_reset").click();
        }
    }
}

window.onload = function() {
    pre_check();
    main();
    bonus();
    
}
