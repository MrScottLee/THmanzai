function style() {
    var css = document.getElementsByTagName("link")[2];
    if (window.innerWidth >= window.innerHeight) {
        css.setAttribute("href", "css/landscape.css");
    }
    else {
        css.setAttribute("href", "css/portrait.css");
    }
    
    var nav_lang = document.getElementsByTagName("td")[0];
    nav_lang.onclick = function() {
        nav_lang.focus();
    }
    var nav_funct = document.getElementsByTagName("td")[2];
    nav_funct.onclick = function() {
        nav_funct.focus();
    }
    
    var nav = document.getElementsByClassName("nav")[0];
    nav.onclick = function() {
        if (nav_lang == document.activeElement) {
            nav_lang.blur();
        }
        if (nav_funct == document.activeElement) {
            nav_funct.blur();
        }
    }
    var bod = document.getElementsByClassName("body")[0];
    bod.onclick = function() {
        if (nav_lang == document.activeElement) {
            nav_lang.blur();
        }
        if (nav_funct == document.activeElement) {
            nav_funct.blur();
        }
    }    
}

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
    
    rs = document.getElementById("rs");
    fm = document.getElementById("fm");
    po = document.getElementById("po");
    adv = document.getElementById("adv");
    rs_pre();
    fm_pre();
    
    form.onreset = function() {
        while (rs_show.length != 0) {
            rs_show[0].className = "hide";
        }
        
        while (hide_funct.length != 0) {
            hide_funct[0].className = "funct";
        }
        
        form.num.removeAttribute("required");
        form.stage_1.removeAttribute("required");
        form.stage_2.removeAttribute("required");
        form.year_1.removeAttribute("required");
        form.year_2.removeAttribute("required");
        form.pop_1.removeAttribute("required");
        form.pop_2.removeAttribute("required");
        form.order.removeAttribute("required");
        form.pv.removeAttribute("required");
        
        document.getElementById("p_stage_1").innerHTML = "装傻担当（ボケ）：";
        document.getElementById("p_stage_2").innerHTML = "吐槽担当（ツッコミ）：";
        document.getElementById("p_year_1").innerHTML = "装傻担当（ボケ）：";
        document.getElementById("p_year_2").innerHTML = "吐槽担当（ツッコミ）：";
        document.getElementById("p_pop_1").innerHTML = "装傻担当（ボケ）：";
        document.getElementById("p_pop_2").innerHTML = "吐槽担当（ツッコミ）：";
    }
    
    form.onsubmit = function() {
        //获取表单信息
        param_num = form.num.value;
        param_stage_1 = form.stage_1.value;
        param_stage_2 = form.stage_2.value;
        param_year_1 = form.year_1.value;
        param_year_2 = form.year_2.value;
        param_pop_1 = form.pop_1.value;
        param_pop_2 = form.pop_2.value;
        param_order = form.order.value;
        param_pv = form.pv.value;
        
        var output = document.getElementById("output");
        output.innerHTML = "";
        frag = document.createDocumentFragment();
        header = document.createElement("p");
        header.innerHTML = "在历届漫才中：";
        frag.appendChild(header);
        br();
        nothing = 0;
        
        if (!rs.checked) {
            //处理num
            var out_num = {};
            if (param_num != "") {
                param_num = Number(param_num);
                out_num["index"] = [0,0,0,0,0,0];
                da_sgl(param_num, db_num, out_num["index"]);
                var desc_num = "参赛编号为" + param_num;
                
                if (out_num["index"][0] == 0) {
                    var txt_num = "没有出现过" + desc_num + "的情况。";
                    if (!adv.checked) {
                        txt_num += "建议使用高级模式进行再分析。";
                    }
                }
                else if (out_num["index"][0] == 1) {
                    var txt_num = desc_num + "的情况出现过<span>1次</span>，对应的积分排名为第" + out_num["index"].lastIndexOf(1) + "名。";
                }
                else {
                    var txt_num = desc_num + "的情况出现过<span>" + out_num["index"][0] + "次</span>，对应的积分排名共有";
                    if (out_num["index"][1] != 0) {
                        var txt_num = txt_num + out_num["index"][1] + "次第1名、";
                    }
                    if (out_num["index"][2] != 0) {
                        var txt_num = txt_num + out_num["index"][2] + "次第2名、";
                    }
                    if (out_num["index"][3] != 0) {
                        var txt_num = txt_num + out_num["index"][3] + "次第3名、";
                    }
                    if (out_num["index"][4] != 0) {
                        var txt_num = txt_num + out_num["index"][4] + "次第4名、";
                    }
                    if (out_num["index"][5] != 0) {
                        var txt_num = txt_num + out_num["index"][5] + "次第5名、";
                    }
                    var txt_num = txt_num.substring(0, txt_num.lastIndexOf("、"));
                    if (txt_num.indexOf("、") != -1) {
                        var txt_num = (txt_num.substring(0, txt_num.lastIndexOf("、")) + "和" + 
                                       txt_num.substring(txt_num.lastIndexOf("、") + 1));
                    }
                    txt_num += "。";
                }
                var s_num = document.createElement("p");
                s_num.innerHTML = txt_num;
                frag.appendChild(s_num);
                
                if (adv.checked) {
                    num_adv(out_num);
                }
                br();
            }
            else {
                nothing++;
            }
            
            //处理stage
            var out_stage = {};
            if (!fm.checked) {
                if (param_stage_1 != "") {
                    out_stage["stage_1"] = [0,0,0,0,0,0];
                    da_sgl(param_stage_1, db_stage_1, out_stage["stage_1"]);
                    var desc_stage_1 = "装傻担当（ボケ）" + dict_stage_sgl[param_stage_1];
                    da_claim(out_stage["stage_1"], desc_stage_1);
                    if (param_stage_2 == "") {
                        br();
                    }
                }
                else {
                    nothing++;
                }
                
                if (param_stage_2 != "") {
                    out_stage["stage_2"] = [0,0,0,0,0,0];
                    da_sgl(param_stage_2, db_stage_2, out_stage["stage_2"]);
                    var desc_stage_2 = "吐槽担当（ツッコミ）" + dict_stage_sgl[param_stage_2];
                    da_claim(out_stage["stage_2"], desc_stage_2);
                    if (param_stage_1 == "") {
                        br();
                    }
                }
                else {
                    nothing++;
                }   
                
                if (param_stage_1 != "" && param_stage_2 != "") {
                    out_stage["stage"] = [0,0,0,0,0,0];
                    da_dbl(param_stage_1, param_stage_2, db_stage_1, db_stage_2, out_stage["stage"]);
                    if (param_stage_1 != param_stage_2) {
                        var desc_stage = desc_stage_1 + "、" + desc_stage_2;
                    }
                    else {
                        var desc_stage = "两人" + dict_stage_dbl[param_stage_1];
                    }
                    da_claim(out_stage["stage"], desc_stage);
                    br();
                }
            }
            else {
                stage_fm(out_stage);
            }
            
            //处理year
            var out_year = {};
            if (!fm.checked) {
                if (param_year_1 != "") {
                    param_year_1 = Number(param_year_1);
                    out_year["year_1"] = [0,0,0,0,0,0];
                    da_sgl(param_year_1, db_year_1, out_year["year_1"]);
                    var desc_year_1 = "装傻担当（ボケ）初登场距当届漫才" + param_year_1 + "年";
                    da_claim(out_year["year_1"], desc_year_1);
                    
                    var up_year_1 = Number(param_year_1) + 1,
                        low_year_1 = Number(param_year_1) - 1;
                    var desc_year_1a = "装傻担当（ボケ）初登场距当届漫才时间在" + low_year_1 + "年至" + up_year_1 + "年之间";
                    if (out_year["year_1"][0] == 0) {
                        out_year["year_1a"] = [0,0,0,0,0,0];
                        da_sgl_appr(param_year_1, db_year_1, 1, out_year["year_1a"]);
                        da_claim(out_year["year_1a"], desc_year_1a);
                    }
                    
                    if (param_year_2 == "") {
                        br();
                    }
                }
                else {
                    nothing++;
                }
                
                if (param_year_2 != "") {
                    param_year_2 = Number(param_year_2);
                    out_year["year_2"] = [0,0,0,0,0,0];
                    da_sgl(param_year_2, db_year_2, out_year["year_2"]);
                    var desc_year_2 = "吐槽担当（ツッコミ）初登场距当届漫才" + param_year_2 + "年";
                    da_claim(out_year["year_2"], desc_year_2);
                    
                    var up_year_2 = Number(param_year_2) + 1,
                        low_year_2 = Number(param_year_2) - 1;
                    var desc_year_2a = "吐槽担当（ツッコミ）初登场距当届漫才时间在" + low_year_2 + "年至" + up_year_2 + "年之间";
                    if (out_year["year_2"][0] == 0) {
                        out_year["year_2a"] = [0,0,0,0,0,0];
                        da_sgl_appr(param_year_2, db_year_2, 1, out_year["year_2a"]);
                        da_claim(out_year["year_2a"], desc_year_2a);
                    }
                    
                    if (param_year_1 == "") {
                        br();
                    }
                }
                else {
                    nothing++;
                }
                
                if (param_year_1 != "" && param_year_2 != "") {
                    out_year["year"] = [0,0,0,0,0,0];
                    da_dbl(param_year_1, param_year_2, db_year_1, db_year_2, out_year["year"]);
                    if (param_year_1 != param_year_2) {
                        var desc_year = desc_year_1 + "、" + desc_year_2;
                    }
                    else {
                        var desc_year = "两人初登场距当届漫才时间均为" + param_year_1 + "年";
                    }
                    da_claim(out_year["year"], desc_year);
                    
                    if (out_year["year"][0] == 0) {
                        out_year["year_a"] = [0,0,0,0,0,0];
                        da_dbl_appr(param_year_1, param_year_2, db_year_1, db_year_2, 1, 1, out_year["year_a"]);
                        if (param_year_1 != param_year_2) {
                            var desc_year_a = desc_year_1a + "、" + desc_year_2a;
                        }
                        else {
                            var desc_year_a = "两人初登场距当届漫才时间均在" + low_year_1 + "年至" + up_year_1 + "年之间";
                        }
                        da_claim(out_year["year_a"], desc_year_a);
                    }
                    
                    br();
                }
            }
            else {
                year_fm(out_year);
            }
            
            
            //处理pop
            var out_pop = {};
            if (!fm.checked) {
                if (param_pop_1 != "") {
                    param_pop_1 = Number(param_pop_1);
                    out_pop["pop_1"] = [0,0,0,0,0,0];
                    da_sgl(param_pop_1, db_pop_1, out_pop["pop_1"]);
                    var desc_pop_1 = "装傻担当（ボケ）在当届漫才前的最新人气排名为" + param_pop_1 + "名";
                    da_claim(out_pop["pop_1"], desc_pop_1);
                    
                    if (param_pop_1 >= 1 && param_pop_1 <= 10) {
                        var appr_pop_1 = 1;
                    }
                    else if (param_pop_1 <= 20) {
                        var appr_pop_1 = 2;
                    }
                    else if (param_pop_1 <= 50) {
                        var appr_pop_1 = 5;
                    }
                    else {
                        var appr_pop_1 = 10;
                    }
                    var up_pop_1 = Number(param_pop_1) + appr_pop_1,
                        low_pop_1 = Number(param_pop_1) - appr_pop_1;
                    var desc_pop_1a = "装傻担当（ボケ）在当届漫才前的最新人气排名在" + low_pop_1 + "名至" + up_pop_1 + "名之间";
                    if (out_pop["pop_1"][0] == 0) {
                        out_pop["pop_1a"] = [0,0,0,0,0,0];
                        da_sgl_appr(param_pop_1, db_pop_1, appr_pop_1, out_pop["pop_1a"]);
                        da_claim(out_pop["pop_1a"], desc_pop_1a);
                    }
                    
                    if (param_pop_2 == "") {
                        br();
                    }
                }
                else {
                    nothing++;
                }
                
                if (param_pop_2 != "") {
                    param_pop_2 = Number(param_pop_2);
                    out_pop["pop_2"] = [0,0,0,0,0,0];
                    da_sgl(param_pop_2, db_pop_2, out_pop["pop_2"]);
                    var desc_pop_2 = "吐槽担当（ツッコミ）在当届漫才前的最新人气排名为" + param_pop_2 + "名";
                    da_claim(out_pop["pop_2"], desc_pop_2);
                    
                    if (param_pop_2 >= 1 && param_pop_2 <= 10) {
                        var appr_pop_2 = 1;
                    }
                    else if (param_pop_2 <= 20) {
                        var appr_pop_2 = 2;
                    }
                    else if (param_pop_2 <= 50) {
                        var appr_pop_2 = 5;
                    }
                    else {
                        var appr_pop_2 = 10;
                    }
                    var up_pop_2 = Number(param_pop_2) + appr_pop_2,
                        low_pop_2 = Number(param_pop_2) - appr_pop_2;
                    var desc_pop_2a = "吐槽担当（ツッコミ）在当届漫才前的最新人气排名在" + low_pop_2 + "名至" + up_pop_2 + "名之间";
                    if (out_pop["pop_2"][0] == 0) {
                        out_pop["pop_2a"] = [0,0,0,0,0,0];
                        da_sgl_appr(param_pop_2, db_pop_2, appr_pop_2, out_pop["pop_2a"]);
                        da_claim(out_pop["pop_2a"], desc_pop_2a);
                    }
                    
                    if (param_pop_1 == "") {
                        br();
                    }
                }
                else {
                    nothing++;
                }
                
                if (param_pop_1 != "" && param_pop_2 != "") {
                    out_pop["pop"] = [0,0,0,0,0,0];
                    da_dbl(param_pop_1, param_pop_2, db_pop_1, db_pop_2, out_pop["pop"]);
                    if (param_pop_1 != param_pop_2) {
                        var desc_pop = desc_pop_1 + "、" + desc_pop_2;
                    }
                    else {
                        var desc_pop = "两人在当届漫才前的最新人气排名为" + param_pop_1 + "名";
                    }   
                    da_claim(out_pop["pop"], desc_pop);
                    
                    if (out_pop["pop"][0] == 0) {
                        out_pop["pop_a"] = [0,0,0,0,0,0];
                        da_dbl_appr(param_pop_1, param_pop_2, db_pop_1, db_pop_2, appr_pop_1, appr_pop_2, out_pop["pop_a"]);
                        if (param_pop_1 != param_pop_2) {
                            var desc_pop_a = desc_pop_1a + "、" + desc_pop_2a;
                        }
                        else {
                            var desc_pop_a = "两人在当届漫才前的最新人气排名均在" + low_pop_1 + "名至" + up_pop_1 + "名之间";
                        }
                        da_claim(out_pop["pop_a"], desc_pop_a);
                    }
                    
                    br();
                }
            }
            else {
                pop_fm(out_pop);
            }
            
            
            //处理order
            var out_order = {};
            if (param_order != "") {
                out_order["index"] = [0,0,0,0,0,0];
                da_sgl(param_order, db_order, out_order["index"]);
                var desc_order = "漫才表演顺序为第" + param_order + "位";
                da_claim(out_order["index"], desc_order);
                
                br();
            }
            else {
                nothing++;
            }
            
            //处理pv
            var out_pv = {};
            if (param_pv != "") {
                out_pv["index"] = [0,0,0,0,0,0];
                da_sgl(param_pv, db_pv, out_pv["index"]);
                da_claim(out_pv["index"], dict_pv[param_pv]);
                if (po.checked) {
                    po_da();
                }
            }
            else {
                nothing++;
            }
            
            if (nothing == 9) {
                header.innerHTML = "表单内容不能为空！";
            }
        }
        else {
            rs_da();
        }
        output.appendChild(frag);
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
    style();
    main();
    bonus();
}