function main() {
    //使用Ajax导入CSV数据库
    if (window.XMLHttpRequest) {
        var xhr = new XMLHttpRequest();
    }
    else if (window.ActiveXObject) {
        var xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }
    else {
        document.getElementById("warn").innerHTML = "无法从服务器获得数据库，如需正常使用功能，请更换浏览器或将当前浏览器升级至最新版本后重试。";
    }
    xhr.open("get", "db/touhou-manzai 2021.02.26.csv", true);
    xhr.send();
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            //将CSV数据库处理为数组
            var db = xhr.responseText.split("\r\n");
            db.shift();
            db.pop();
            db_num = new Array();
            db_stage_1 = new Array();
            db_stage_2 = new Array();
            db_year_1 = new Array();
            db_year_2 = new Array();
            db_pop_1 = new Array();
            db_pop_2 = new Array();
            db_order = new Array();
            db_pv = new Array();
            db_rank = new Array();
            
            function dp() {
                var obj = {};
                for (var i = 0; i < db.length; i++) {
                    obj["db_line" + i] = db[i].split(",");
                    db_num.push(obj["db_line" + i][1]);
                    db_stage_1.push(obj["db_line" + i][2]);
                    db_stage_2.push(obj["db_line" + i][3]);
                    db_year_1.push(obj["db_line" + i][4]);
                    db_year_2.push(obj["db_line" + i][5]);
                    db_pop_1.push(obj["db_line" + i][6]);
                    db_pop_2.push(obj["db_line" + i][7]);
                    db_order.push(obj["db_line" + i][8]);
                    db_pv.push(obj["db_line" + i][9]);
                    db_rank.push(obj["db_line" + i][10]);
                }
            }
            
            dp();
        }
    }
    
    
    form = document.forms["_form"];
    
    rs_pre();
    
    form.onsubmit = function() {
        //获取表单信息
        parm_num = form.num.value;
        parm_stage_1 = form.stage_1.value;
        parm_stage_2 = form.stage_2.value;
        parm_year_1 = form.year_1.value;
        parm_year_2 = form.year_2.value;
        parm_pop_1 = form.pop_1.value;
        parm_pop_2 = form.pop_2.value;
        parm_order = form.order.value;
        parm_pv = form.pv.value;
        
        var output = document.getElementById("output");
        output.innerHTML = "";
        var frag = document.createDocumentFragment();
        var header = document.createElement("p");
        header.innerHTML = "在历届漫才中：";
        frag.appendChild(header);
        
        if (!rs.checked) {
            var nothing = 0;
            
            function da_sgl(parm, db, out) {
                for (var j = 0; j < db_rank.length; j++) {
                    if (parm == db[j]) {
                        da_base(out, j);
                    }
                }
            }
            
            function da_dbl(parm_1, parm_2, db_1, db_2, out) {
                for (var j = 0; j < db_rank.length; j++) {
                    if (parm_1 == db_1[j] && parm_2 == db_2[j]) {
                        da_base(out, j);
                    }
                }
            }
          
            function da_sgl_appr(parm, db, appr, out) {
                for (var j = 0; j < db_rank.length; j++) {
                    if (db[j] >= Number(parm)-appr && db[j] <= Number(parm)+appr) {
                        da_base(out, j);
                    }
                }
            }
        
            function da_dbl_appr(parm_1, parm_2, db_1, db_2, appr_1, appr_2, out) {
                for (var j = 0; j < db_rank.length; j++) {
                    var cond = (db_1[j] >= Number(parm_1)-appr_1 && db_1[j] <= Number(parm_1)+appr_1 && 
                                db_2[j] >= Number(parm_2)-appr_2 && db_2[j] <= Number(parm_2)+appr_2);
                    if (cond) {
                        da_base(out, j);
                    }
                }
            }
            
            //处理num
            var out_num = {};
            if (parm_num != "") {
                out_num["index"] = [0,0,0,0,0,0];
                da_sgl(parm_num, db_num, out_num["index"]);
                var desc_num = "参赛编号为" + parm_num;
                var txt_num = da_claim(out_num["index"], desc_num);
                if (out_num["index"][0] == 0) {
                    txt_num += "建议使用高级检索模式进行再检索。";
                }
                var s_num = document.createElement("p");
                s_num.innerHTML = txt_num;
                frag.appendChild(s_num);
            }
            else {
                nothing++;
            }
            
            //处理stage
            var out_stage = {};
            if (parm_stage_1 != "") {
                out_stage["stage_1"] = [0,0,0,0,0,0];
                da_sgl(parm_stage_1, db_stage_1, out_stage["stage_1"]);
                var desc_stage_1 = "装傻担当（ボケ）" + dict_stage_sgl[parm_stage_1];
                var txt_stage_1 = da_claim(out_stage["stage_1"], desc_stage_1);
                var s_stage_1 = document.createElement("p");
                s_stage_1.innerHTML = txt_stage_1;
                frag.appendChild(s_stage_1);
            }
            else {
                nothing++;
            }
            
            if (parm_stage_2 != "") {
                out_stage["stage_2"] = [0,0,0,0,0,0];
                da_sgl(parm_stage_2, db_stage_2, out_stage["stage_2"]);
                var desc_stage_2 = "吐槽担当（ツッコミ）" + dict_stage_sgl[parm_stage_2];
                var txt_stage_2 = da_claim(out_stage["stage_2"], desc_stage_2);
                var s_stage_2 = document.createElement("p");
                s_stage_2.innerHTML = txt_stage_2;
                frag.appendChild(s_stage_2);
            }
            else {
                nothing++;
            }
            
            if (parm_stage_1 != "" && parm_stage_2 != "") {
                out_stage["stage"] = [0,0,0,0,0,0];
                da_dbl(parm_stage_1, parm_stage_2, db_stage_1, db_stage_2, out_stage["stage"]);
                if (parm_stage_1 != parm_stage_2) {
                    var desc_stage = desc_stage_1 + "、" + desc_stage_2;
                }
                else {
                    var desc_stage = "两人" + dict_stage_dbl[parm_stage_1];
                }
                var txt_stage = da_claim(out_stage["stage"], desc_stage);
                var s_stage = document.createElement("p");
                s_stage.innerHTML = txt_stage;
                frag.appendChild(s_stage);
            }
            
            //处理year
            var out_year = {};
            if (parm_year_1 != "") {
                out_year["year_1"] = [0,0,0,0,0,0];
                da_sgl(parm_year_1, db_year_1, out_year["year_1"]);
                var desc_year_1 = "装傻担当（ボケ）初登场距当届漫才" + parm_year_1 + "年";
                var txt_year_1 = da_claim(out_year["year_1"], desc_year_1);
                var s_year_1 = document.createElement("p");
                s_year_1.innerHTML = txt_year_1;
                frag.appendChild(s_year_1);
                
                var up_year_1 = Number(parm_year_1) + 1,
                    low_year_1 = Number(parm_year_1) - 1;
                var desc_year_1a = "装傻担当（ボケ）初登场距当届漫才时间在" + low_year_1 + "年至" + up_year_1 + "年之间";
                if (out_year["year_1"][0] == 0) {
                    out_year["year_1a"] = [0,0,0,0,0,0];
                    da_sgl_appr(parm_year_1, db_year_1, 1, out_year["year_1a"]);
                    var txt_year_1a = da_claim(out_year["year_1a"], desc_year_1a);
                    var s_year_1a = document.createElement("p");
                    s_year_1a.innerHTML = txt_year_1a;
                    frag.appendChild(s_year_1a);
                }
            }
            else {
                nothing++;
            }
            
            if (parm_year_2 != "") {
                out_year["year_2"] = [0,0,0,0,0,0];
                da_sgl(parm_year_2, db_year_2, out_year["year_2"]);
                var desc_year_2 = "吐槽担当（ツッコミ）初登场距当届漫才" + parm_year_2 + "年";
                var txt_year_2 = da_claim(out_year["year_2"], desc_year_2);
                var s_year_2 = document.createElement("p");
                s_year_2.innerHTML = txt_year_2;
                frag.appendChild(s_year_2);
                
                var up_year_2 = Number(parm_year_2) + 1,
                    low_year_2 = Number(parm_year_2) - 1;
                var desc_year_2a = "吐槽担当（ツッコミ）初登场距当届漫才时间在" + low_year_2 + "年至" + up_year_2 + "年之间";
                if (out_year["year_2"][0] == 0) {
                    out_year["year_2a"] = [0,0,0,0,0,0];
                    da_sgl_appr(parm_year_2, db_year_2, 1, out_year["year_2a"]);
                    var txt_year_2a = da_claim(out_year["year_2a"], desc_year_2a);
                    var s_year_2a = document.createElement("p");
                    s_year_2a.innerHTML = txt_year_2a;
                    frag.appendChild(s_year_2a);
                }
            }
            else {
                nothing++;
            }
            
            if (parm_year_1 != "" && parm_year_2 != "") {
                out_year["year"] = [0,0,0,0,0,0];
                da_dbl(parm_year_1, parm_year_2, db_year_1, db_year_2, out_year["year"]);
                if (parm_year_1 != parm_year_2) {
                    var desc_year = desc_year_1 + "、" + desc_year_2;
                }
                else {
                    var desc_year = "两人初登场距当届漫才时间均为" + parm_year_1 + "年"
                    }
                var txt_year = da_claim(out_year["year"], desc_year);
                var s_year =document.createElement("p");
                s_year.innerHTML = txt_year;
                frag.appendChild(s_year);
                
                if (out_year["year"][0] == 0) {
                    out_year["year_a"] = [0,0,0,0,0,0];
                    da_dbl_appr(parm_year_1, parm_year_2, db_year_1, db_year_2, 1, 1, out_year["year_a"]);
                    if (parm_year_1 != parm_year_2) {
                        var desc_year_a = desc_year_1a + "、" + desc_year_2a;
                    }
                    else {
                        var desc_year_a = "两人初登场距当届漫才时间均在" + low_year_1 + "年至" + up_year_1 + "年之间";
                    }
                    var txt_year_a = da_claim(out_year["year_a"], desc_year_a);
                    var s_year_a =document.createElement("p");
                    s_year_a.innerHTML = txt_year_a;
                    frag.appendChild(s_year_a);
                }
            }
            
            //处理pop
            var out_pop = {};
            if (parm_pop_1 != "") {
                out_pop["pop_1"] = [0,0,0,0,0,0];
                da_sgl(parm_pop_1, db_pop_1, out_pop["pop_1"]);
                var desc_pop_1 = "装傻担当（ボケ）在当届漫才前的最新人气排名为" + parm_pop_1 + "名";
                var txt_pop_1 = da_claim(out_pop["pop_1"], desc_pop_1);
                var s_pop_1 = document.createElement("p");
                s_pop_1.innerHTML = txt_pop_1;
                frag.appendChild(s_pop_1);
                
                if (parm_pop_1 >= 1 && parm_pop_1 <= 10) {
                    var appr_pop_1 = 1;
                }
                else if (parm_pop_1 <= 20) {
                    var appr_pop_1 = 2;
                }
                else if (parm_pop_1 <= 50) {
                    var appr_pop_1 = 5;
                }
                else {
                    var appr_pop_1 = 10;
                }
                var up_pop_1 = Number(parm_pop_1) + appr_pop_1,
                    low_pop_1 = Number(parm_pop_1) - appr_pop_1;
                var desc_pop_1a = "装傻担当（ボケ）在当届漫才前的最新人气排名在" + low_pop_1 + "名至" + up_pop_1 + "名之间";
                if (out_pop["pop_1"][0] == 0) {
                    out_pop["pop_1a"] = [0,0,0,0,0,0];
                    da_sgl_appr(parm_pop_1, db_pop_1, appr_pop_1, out_pop["pop_1a"]);
                    var txt_pop_1a = da_claim(out_pop["pop_1a"], desc_pop_1a);
                    var s_pop_1a = document.createElement("p");
                    s_pop_1a.innerHTML = txt_pop_1a;
                    frag.appendChild(s_pop_1a);
                }
            }
            else {
                nothing++;
            }
            
            if (parm_pop_2 != "") {
                out_pop["pop_2"] = [0,0,0,0,0,0];
                da_sgl(parm_pop_2, db_pop_2, out_pop["pop_2"]);
                var desc_pop_2 = "吐槽担当（ツッコミ）在当届漫才前的最新人气排名为" + parm_pop_2 + "名";
                var txt_pop_2 = da_claim(out_pop["pop_2"], desc_pop_2);
                var s_pop_2 = document.createElement("p");
                s_pop_2.innerHTML = txt_pop_2;
                frag.appendChild(s_pop_2);
                
                if (parm_pop_2 >= 1 && parm_pop_2 <= 10) {
                    var appr_pop_2 = 1;
                }
                else if (parm_pop_2 <= 20) {
                    var appr_pop_2 = 2;
                }
                else if (parm_pop_2 <= 50) {
                    var appr_pop_2 = 5;
                }
                else {
                    var appr_pop_2 = 10;
                }
                var up_pop_2 = Number(parm_pop_2) + appr_pop_2,
                    low_pop_2 = Number(parm_pop_2) - appr_pop_2;
                var desc_pop_2a = "吐槽担当（ツッコミ）在当届漫才前的最新人气排名在" + low_pop_2 + "名至" + up_pop_2 + "名之间";
                if (out_pop["pop_2"][0] == 0) {
                    out_pop["pop_2a"] = [0,0,0,0,0,0];
                    da_sgl_appr(parm_pop_2, db_pop_2, appr_pop_2, out_pop["pop_2a"]);
                    var txt_pop_2a = da_claim(out_pop["pop_2a"], desc_pop_2a);
                    var s_pop_2a = document.createElement("p");
                    s_pop_2a.innerHTML = txt_pop_2a;
                    frag.appendChild(s_pop_2a);
                }
            }
            else {
                nothing++;
            }
            
            if (parm_pop_1 != "" && parm_pop_2 != "") {
                out_pop["pop"] = [0,0,0,0,0,0];
                da_dbl(parm_pop_1, parm_pop_2, db_pop_1, db_pop_2, out_pop["pop"]);
                if (parm_pop_1 != parm_pop_2) {
                    var desc_pop = desc_pop_1 + "、" + desc_pop_2;
                }
                else {
                    var desc_pop = "两人在当届漫才前的最新人气排名为" + parm_pop_1 + "名"
                    }
                var txt_pop = da_claim(out_pop["pop"], desc_pop);
                var s_pop =document.createElement("p");
                s_pop.innerHTML = txt_pop;
                frag.appendChild(s_pop);
                
                if (out_pop["pop"][0] == 0) {
                    out_pop["pop_a"] = [0,0,0,0,0,0];
                    da_dbl_appr(parm_pop_1, parm_pop_2, db_pop_1, db_pop_2, appr_pop_1, appr_pop_2, out_pop["pop_a"]);
                    if (parm_pop_1 != parm_pop_2) {
                        var desc_pop_a = desc_pop_1a + "、" + desc_pop_2a;
                    }
                    else {
                        var desc_pop_a = "两人在当届漫才前的最新人气排名均在" + low_pop_1 + "名至" + up_pop_1 + "名之间";
                    }
                    var txt_pop_a = da_claim(out_pop["pop_a"], desc_pop_a);
                    var s_pop_a =document.createElement("p");
                    s_pop_a.innerHTML = txt_pop_a;
                    frag.appendChild(s_pop_a);
                }
            }
            
            //处理order
            var out_order = {};
            if (parm_order != "") {
                out_order["index"] = [0,0,0,0,0,0];
                da_sgl(parm_order, db_order, out_order["index"]);
                var desc_order = "漫才表演顺序为第" + parm_order + "位";
                var txt_order = da_claim(out_order["index"], desc_order);
                var s_order = document.createElement("p");
                s_order.innerHTML = txt_order;
                frag.appendChild(s_order);
            }
            else {
                nothing++;
            }
            
            //处理pv
            var out_pv = {};
            if (parm_pv != "") {
                out_pv["index"] = [0,0,0,0,0,0];
                da_sgl(parm_pv, db_pv, out_pv["index"]);
                var txt_pv = da_claim(out_pv["index"], dict_pv[parm_pv]);
                var s_pv = document.createElement("p");
                s_pv.innerHTML = txt_pv;
                frag.appendChild(s_pv);
            }
            else {
                nothing++;
            }
            
            
            if (nothing == 9) {
                header.innerHTML = "表单内容不能为空！";
            }
            
            output.appendChild(frag);
        }
        else {
            rs_da(frag, header);
            output.appendChild(frag);
        }
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
        if (e.keyCode == 90 || e.which == 90 || e.charCode == 90) {
            document.getElementById("_submit").click();
        }
        if (e.keyCode == 88 || e.which == 88 || e.charCode == 88) {
            document.getElementById("_reset").click();
        }
        if (e.keyCode == 67 || e.which == 67 || e.charCode == 67) {
            document.getElementById("rs").click();
        }
    }
}

window.onload = function() {
    main();
    bonus();
}