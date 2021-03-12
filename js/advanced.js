function rs_pre() {
    rs_hide = document.getElementsByClassName("hide");
    rs_show = document.getElementsByClassName("show");
    funct = document.getElementsByClassName("funct");
    hide_funct = document.getElementsByClassName("hide_funct");
    
    rs.onclick = function() {
        if (rs.checked) {
            while (rs_hide.length != 0) {
                rs_hide[0].className = "show";
            }
            while (funct.length != 0) {
                funct[0].className = "hide_funct";
            }
            
            document.getElementById("p_stage_1").innerHTML = "装傻担当（ボケ）：";
            document.getElementById("p_stage_2").innerHTML = "吐槽担当（ツッコミ）：";
            document.getElementById("p_year_1").innerHTML = "装傻担当（ボケ）：";
            document.getElementById("p_year_2").innerHTML = "吐槽担当（ツッコミ）：";
            document.getElementById("p_pop_1").innerHTML = "装傻担当（ボケ）：";
            document.getElementById("p_pop_2").innerHTML = "吐槽担当（ツッコミ）：";
        }
        else {
            while (rs_show.length != 0) {
                rs_show[0].className = "hide";
            }
            while (hide_funct.length != 0) {
                hide_funct[0].className = "funct";
            }
            
            if (fm.checked) {
                document.getElementById("p_stage_1").innerHTML = "其中一人：";
                document.getElementById("p_stage_2").innerHTML = "另外一人：";
                document.getElementById("p_year_1").innerHTML = "其中一人：";
                document.getElementById("p_year_2").innerHTML = "另外一人：";
                document.getElementById("p_pop_1").innerHTML = "其中一人：";
                document.getElementById("p_pop_2").innerHTML = "另外一人：";
            }
        }
    }
    
    function rs_req(rs_parm, parm) {
        if (rs_parm.checked) {
            parm.setAttribute("required", "required");
        }
        else {
            parm.removeAttribute("required");
        }
    }
    form.rs_num.onclick = function() {rs_req(form.rs_num, form.num)};
    form.rs_stage_1.onclick = function() {rs_req(form.rs_stage_1, form.stage_1)};
    form.rs_stage_2.onclick = function() {rs_req(form.rs_stage_2, form.stage_2)};
    form.rs_year_1.onclick = function() {rs_req(form.rs_year_1, form.year_1)};
    form.rs_year_2.onclick = function() {rs_req(form.rs_year_2, form.year_2)};
    form.rs_pop_1.onclick = function() {rs_req(form.rs_pop_1, form.pop_1)};
    form.rs_pop_2.onclick = function() {rs_req(form.rs_pop_2, form.pop_2)};
    form.rs_order.onclick = function() {rs_req(form.rs_order, form.order)};
    form.rs_pv.onclick = function() {rs_req(form.rs_pv, form.pv)};
}

function rs_da() {
    var out_rs = [0,0,0,0,0,0];
    
    if (form.rs_num.checked) {
        var desc_num = "参赛编号为" + parm_num;
        var s_num = document.createElement("p");
        s_num.innerHTML = desc_num;
        frag.appendChild(s_num);
    }
    else {
        nothing++;
    }
    
    if (form.rs_stage_1.checked) {
        var desc_stage_1 = "装傻担当（ボケ）" + dict_stage_sgl[parm_stage_1];
        var s_stage_1 = document.createElement("p");
        s_stage_1.innerHTML = desc_stage_1;
        frag.appendChild(s_stage_1);
    }
    else {
        nothing++;
    }
    
    if (form.rs_stage_2.checked) {
        var desc_stage_2 = "吐槽担当（ツッコミ）" + dict_stage_sgl[parm_stage_2];
        var s_stage_2 = document.createElement("p");
        s_stage_2.innerHTML = desc_stage_2;
        frag.appendChild(s_stage_2);
    }
    else {
        nothing++;
    }
    
    if (form.rs_year_1.checked) {
        var desc_year_1 = "装傻担当（ボケ）初登场距当届漫才" + parm_year_1 + "年";
        var s_year_1 = document.createElement("p");
        s_year_1.innerHTML = desc_year_1;
        frag.appendChild(s_year_1);
    }
    else {
        nothing++;
    }
    
    if (form.rs_year_2.checked) {
        var desc_year_2 = "吐槽担当（ツッコミ）初登场距当届漫才" + parm_year_2 + "年";
        var s_year_2 = document.createElement("p");
        s_year_2.innerHTML = desc_year_2;
        frag.appendChild(s_year_2);
    }
    else {
        nothing++;
    }
    
    if (form.rs_pop_1.checked) {
        var desc_pop_1 = "装傻担当（ボケ）在当届漫才前的最新人气排名为" + parm_pop_1 + "名";
        var s_pop_1 = document.createElement("p");
        s_pop_1.innerHTML = desc_pop_1;
        frag.appendChild(s_pop_1);
    }
    else {
        nothing++;
    }
    
    if (form.rs_pop_2.checked) {
        var desc_pop_2 = "吐槽担当（ツッコミ）在当届漫才前的最新人气排名为" + parm_pop_2 + "名";
        var s_pop_2 = document.createElement("p");
        s_pop_2.innerHTML = desc_pop_2;
        frag.appendChild(s_pop_2);
    }
    else {
        nothing++;
    }
    
    if (form.rs_order.checked) {
        var desc_order = "漫才表演顺序为第" + parm_order + "位";
        var s_order = document.createElement("p");
        s_order.innerHTML = desc_order;
        frag.appendChild(s_order);
    }
    else {
        nothing++;
    }
    
    if (form.rs_pv.checked) {
        var s_pv = document.createElement("p");
        s_pv.innerHTML = dict_pv[parm_pv];
        frag.appendChild(s_pv);
    }
    else {
        nothing++;
    }
    
    for (var j = 0; j < db_rank.length; j++) {
        if (form.rs_num.checked && parm_num != db_num[j]) {
            var cond_num = false;
        }
        else {var cond_num = true}
        
        if (form.rs_stage_1.checked && parm_stage_1 != db_stage_1[j]) {
            var cond_stage_1 = false;
        }
        else {var cond_stage_1 = true}
        
        if (form.rs_stage_2.checked && parm_stage_2 != db_stage_2[j]) {
            var cond_stage_2 = false;
        }
        else {var cond_stage_2 = true}
        
        if (form.rs_year_1.checked && parm_year_1 != db_year_1[j]) {
            var cond_year_1 = false;
        }
        else {var cond_year_1 = true}
        
        if (form.rs_year_2.checked && parm_year_2 != db_year_2[j]) {
            var cond_year_2 = false;
        }
        else {var cond_year_2 = true}
        
        if (form.rs_pop_1.checked && parm_pop_1 != db_pop_1[j]) {
            var cond_pop_1 = false;
        }
        else {var cond_pop_1 = true}
        
        if (form.rs_pop_2.checked && parm_pop_2 != db_pop_2[j]) {
            var cond_pop_2 = false;
        }
        else {var cond_pop_2 = true}
        
        if (form.rs_order.checked && parm_order != db_order[j]) {
            var cond_order = false;
        }
        else {var cond_order = true}
        
        if (form.rs_pv.checked && parm_pv != db_pv[j]) {
            var cond_pv = false;
        }
        else {var cond_pv = true}
        
        var cond = cond_num && cond_stage_1 && cond_stage_2 && cond_year_1 && cond_year_2 && cond_pop_1 && cond_pop_2 && cond_order && cond_pv;
        
        if (cond) {
            da_base(out_rs, j);
        }
    }
    
    if (nothing == 9) {
        header.innerHTML = "请至少勾选一项";
    }
    else {
        da_claim(out_rs, "同时满足以上条件");
    }
}

function fm_pre() {
    fm.onclick = function() {
        if (!rs.checked && fm.checked) {
            document.getElementById("p_stage_1").innerHTML = "其中一人：";
            document.getElementById("p_stage_2").innerHTML = "另外一人：";
            document.getElementById("p_year_1").innerHTML = "其中一人：";
            document.getElementById("p_year_2").innerHTML = "另外一人：";
            document.getElementById("p_pop_1").innerHTML = "其中一人：";
            document.getElementById("p_pop_2").innerHTML = "另外一人：";
        }
        else {
            document.getElementById("p_stage_1").innerHTML = "装傻担当（ボケ）：";
            document.getElementById("p_stage_2").innerHTML = "吐槽担当（ツッコミ）：";
            document.getElementById("p_year_1").innerHTML = "装傻担当（ボケ）：";
            document.getElementById("p_year_2").innerHTML = "吐槽担当（ツッコミ）：";
            document.getElementById("p_pop_1").innerHTML = "装傻担当（ボケ）：";
            document.getElementById("p_pop_2").innerHTML = "吐槽担当（ツッコミ）：";
        }
    }
}

function da_rm(out, j) {
    out[0]--;
    if (db_rank[j] == 1) {
        out[1]--;
    }
    if (db_rank[j] == 2) {
        out[2]--;
    }
    if (db_rank[j] == 3) {
        out[3]--;
    }
    if (db_rank[j] == 4) {
        out[4]--;
    }
    if (db_rank[j] == 5) {
        out[5]--;
    }
}

function da_sgl_fm(parm, db_1, db_2, out) {
    da_sgl(parm, db_1, out);
    da_sgl(parm, db_2, out);
    for (var j = 0; j < db_rank.length; j++) {
        if (parm == db_1[j] && parm == db_2[j]) {
            da_rm(out, j);
        }
    }
}

function da_sgl_appr_fm(parm, db_1, db_2, appr, out) {
    da_sgl_appr(parm, db_1, appr, out);
    da_sgl_appr(parm, db_1, appr, out);
    for (var j = 0; j < db_rank.length; j++) {
        var cond = ((db_1[j] >= Number(parm)-appr && db_1[j] <= Number(parm)+appr) && 
                    (db_2[j] >= Number(parm)-appr && db_2[j] <= Number(parm)+appr));
        if (cond) {
            da_rm(out, j);
        }
    }
}

function da_dbl_appr_fm(parm_1, parm_2, db_1, db_2, appr_1, appr_2, out) {
    da_dbl_appr(parm_1, parm_2, db_1, db_2, appr_1, appr_2, out);
    da_dbl_appr(parm_1, parm_2, db_2, db_1, appr_1, appr_2, out);
    for (var j = 0; j < db_rank.length; j++) {
        var cond = ((db_1[j] >= Number(parm_1)-appr_1 && db_1[j] <= Number(parm_1)+appr_1) && 
                    (db_1[j] >= Number(parm_2)-appr_2 && db_1[j] <= Number(parm_2)+appr_2) && 
                    (db_2[j] >= Number(parm_1)-appr_1 && db_2[j] <= Number(parm_1)+appr_1) && 
                    (db_2[j] >= Number(parm_2)-appr_2 && db_2[j] <= Number(parm_2)+appr_2));
        if (cond) {
            da_rm(out, j);
        }
    }
}

function stage_fm(out_stage) {
    if (parm_stage_1 != "") {
        out_stage["stage_1f"] = [0,0,0,0,0,0];
        da_sgl_fm(parm_stage_1, db_stage_1, db_stage_2, out_stage["stage_1f"]);
        var desc_stage_1f = "其中一人" + dict_stage_sgl[parm_stage_1];
        da_claim(out_stage["stage_1f"], desc_stage_1f);
    }
    else {
        nothing++;
    }
    
    if (parm_stage_2 != "") {
        if (parm_stage_1 != parm_stage_2) {
            out_stage["stage_2f"] = [0,0,0,0,0,0];
            da_sgl_fm(parm_stage_2, db_stage_1, db_stage_2, out_stage["stage_2f"]);
            var desc_stage_2f = "其中一人" + dict_stage_sgl[parm_stage_2];
            da_claim(out_stage["stage_2f"], desc_stage_2f);
        }
    }
    else {
        nothing++;
    }
    
    if (parm_stage_1 != "" && parm_stage_2 != "") {
        out_stage["stage_f"] = [0,0,0,0,0,0];
        da_dbl(parm_stage_1, parm_stage_2, db_stage_1, db_stage_2, out_stage["stage_f"]);
        if (parm_stage_1 == parm_stage_2) {
            var desc_stage_f = "两人" + dict_stage_dbl[parm_stage_1];
        }
        else {
            da_dbl(parm_stage_1, parm_stage_2, db_stage_2, db_stage_1, out_stage["stage_f"]);
            var desc_stage_f = desc_stage_1f + "、另外一人" + dict_stage_dbl[parm_stage_2];
        }
        da_claim(out_stage["stage_f"], desc_stage_f);
    }
}

function year_fm(out_year) {
    if (parm_year_1 != "") {
       out_year["year_1f"] = [0,0,0,0,0,0];
       da_sgl_fm(parm_year_1, db_year_1, db_year_2, out_year["year_1f"]);
       var desc_year_1f = "其中一人初登场距当届漫才" + parm_year_1 + "年";
       da_claim(out_year["year_1f"], desc_year_1f);
       
       var up_year_1f = Number(parm_year_1) + 1,
           low_year_1f = Number(parm_year_1) - 1;
       var desc_year_1af = "其中一人初登场距当届漫才时间在" + low_year_1f + "年至" + up_year_1f + "年之间";
       if (out_year["year_1f"][0] == 0) {
           out_year["year_1af"] = [0,0,0,0,0,0];
           da_sgl_appr_fm(parm_year_1, db_year_1, db_year_2, 1, out_year["year_1af"]);
           da_claim(out_year["year_1af"], desc_year_1af);
       }
    }
    else {
        nothing++;
    }
    
    if (parm_year_2 != "") {
       if (parm_year_1 != parm_year_2) {
           out_year["year_2f"] = [0,0,0,0,0,0];
           da_sgl_fm(parm_year_2, db_year_1, db_year_2, out_year["year_2f"]);
           var desc_year_2f = "其中一人初登场距当届漫才" + parm_year_2 + "年";
           da_claim(out_year["year_2f"], desc_year_2f);
           
           var up_year_2f = Number(parm_year_2) + 1,
               low_year_2f = Number(parm_year_2) - 1;
           var desc_year_2af = "其中一人初登场距当届漫才时间在" + low_year_2f + "年至" + up_year_2f + "年之间";
           if (out_year["year_2f"][0] == 0) {
               out_year["year_2af"] = [0,0,0,0,0,0];
               da_sgl_appr_fm(parm_year_2, db_year_1, db_year_2, 1, out_year["year_2af"]);
               da_claim(out_year["year_2af"], desc_year_2af);
           }
       }
    }
    else {
        nothing++;
    }
    
    if (parm_year_1 != "" && parm_year_2 != "") {
        out_year["year_f"] = [0,0,0,0,0,0];
        da_dbl(parm_year_1, parm_year_2, db_year_1, db_year_2, out_year["year_f"]);
        if (parm_year_1 == parm_year_2) {
            var desc_year_f = "两人初登场距当届漫才时间均为" + parm_year_1 + "年";
        }
        else {
            da_dbl(parm_year_1, parm_year_2, db_year_2, db_year_1, out_year["year_f"]);
            var desc_year_f = desc_year_1f + "、另外一人初登场距当届漫才" + parm_year_2 + "年";
        }
        da_claim(out_year["year_f"], desc_year_f);
        
        if (out_year["year_f"][0] == 0) {
            out_year["year_af"] = [0,0,0,0,0,0];
            if (parm_year_1 == parm_year_2) {
                da_dbl_appr(parm_year_1, parm_year_2, db_year_1, db_year_2, 1, 1, out_year["year_af"]);
                var desc_year_af = "两人初登场距当届漫才时间均在" + low_year_1f + "年至" + up_year_1f + "年之间";
            }
            else {
                da_dbl_appr_fm(parm_year_1, parm_year_2, db_year_1, db_year_2, 1, 1, out_year["year_af"]);
                var desc_year_af = desc_year_1af + "、另外一人初登场距当届漫才时间在" + low_year_2f + "年至" + up_year_2f + "年之间";
            }
            da_claim(out_year["year_af"], desc_year_af);
        }
    }
}

function pop_fm(out_pop) {
    if (parm_pop_1 != "") {
        out_pop["pop_1f"] = [0,0,0,0,0,0];
        da_sgl_fm(parm_pop_1, db_pop_1, db_pop_2, out_pop["pop_1f"]);
        var desc_pop_1f = "其中一人在当届漫才前的最新人气排名为" + parm_pop_1 + "名";
        da_claim(out_pop["pop_1f"], desc_pop_1f);
        
        if (parm_pop_1 >= 1 && parm_pop_1 <= 10) {
            var appr_pop_1f = 1;
        }
        else if (parm_pop_1 <= 20) {
            var appr_pop_1f = 2;
        }
        else if (parm_pop_1 <= 50) {
            var appr_pop_1f = 5;
        }
        else {
            var appr_pop_1f = 10;
        }
        var up_pop_1f = Number(parm_pop_1) + appr_pop_1f,
            low_pop_1f = Number(parm_pop_1) - appr_pop_1f;
        var desc_pop_1af = "其中一人在当届漫才前的最新人气排名在" + low_pop_1f + "名至" + up_pop_1f + "名之间";
        if (out_pop["pop_1f"][0] == 0) {
            out_pop["pop_1af"] = [0,0,0,0,0,0];
            da_sgl_appr_fm(parm_pop_1, db_pop_1, db_pop_2, appr_pop_1f, out_pop["pop_1af"]);
            da_claim(out_pop["pop_1af"], desc_pop_1af);
        }
    }
    else {
        nothing++;
    }
    
    if (parm_pop_2 != "") {
        if (parm_pop_1 != parm_pop_2) {
            out_pop["pop_2f"] = [0,0,0,0,0,0];
            da_sgl_fm(parm_pop_2, db_pop_1, db_pop_2, out_pop["pop_2f"]);
            var desc_pop_2f = "其中一人在当届漫才前的最新人气排名为" + parm_pop_2 + "名";
            da_claim(out_pop["pop_2f"], desc_pop_2f);
            
            if (parm_pop_2 >= 1 && parm_pop_2 <= 10) {
                var appr_pop_2f = 1;
            }
            else if (parm_pop_2 <= 20) {
                var appr_pop_2f = 2;
            }
            else if (parm_pop_2 <= 50) {
                var appr_pop_2f = 5;
            }
            else {
                var appr_pop_2f = 10;
            }
            var up_pop_2f = Number(parm_pop_2) + appr_pop_2f,
                low_pop_2f = Number(parm_pop_2) - appr_pop_2f;
            var desc_pop_2af = "其中一人在当届漫才前的最新人气排名在" + low_pop_2f + "名至" + up_pop_2f + "名之间";
            if (out_pop["pop_2f"][0] == 0) {
                out_pop["pop_2af"] = [0,0,0,0,0,0];
                da_sgl_appr_fm(parm_pop_2, db_pop_1, db_pop_2, appr_pop_2f, out_pop["pop_2af"]);
                da_claim(out_pop["pop_2af"], desc_pop_2af);
            }
        }
    }
    else {
        nothing++;
    }
    
    if (parm_pop_1 != "" && parm_pop_2 != "") {
        out_pop["pop_f"] = [0,0,0,0,0,0];
        da_dbl(parm_pop_1, parm_pop_2, db_pop_1, db_pop_2, out_pop["pop_f"]);
        if (parm_pop_1 == parm_pop_2) {
            var desc_pop_f = "两人在当届漫才前的最新人气排名为" + parm_pop_1 + "名";
        }
        else {
            da_dbl(parm_pop_1, parm_pop_2, db_pop_2, db_pop_1, out_pop["pop_f"]);
            var desc_pop_f = desc_pop_1f + "、另外一人在当届漫才前的最新人气排名为" + parm_pop_2 + "名";
        }
        da_claim(out_pop["pop_f"], desc_pop_f);
        
        if (out_pop["pop_f"][0] == 0) {
            out_pop["pop_af"] = [0,0,0,0,0,0];
            if (parm_pop_1 == parm_pop_2) {
                da_dbl_appr(parm_pop_1, parm_pop_2, db_pop_1, db_pop_2, appr_pop_1f, appr_pop_2f, out_pop["pop_af"]);
                var desc_pop_af = "两人在当届漫才前的最新人气排名均在" + low_pop_1f + "名至" + up_pop_1f + "名之间";
            }
            else {
                da_dbl_appr_fm(parm_pop_1, parm_pop_2, db_pop_1, db_pop_2, appr_pop_1f, appr_pop_2f, out_pop["pop_af"]);
                var desc_pop_af = desc_pop_1af + "、另外一人在当届漫才前的最新人气排名在" + low_pop_2f + "名至" + up_pop_2f + "名之间";
            }
            da_claim(out_pop["pop_af"], desc_pop_af);
        }
    }
}

function po_da() {
    if (parm_pv != "NaN") {
        var out_po = [0,0,0,0,0];
        for (var j = 0; j < db_order.length; j++) {
            if (parm_pv == db_pv[j]) {
                out_po[0]++;
                if (db_order[j] == 1) {
                    out_po[1]++;
                }
                if (db_order[j] == 2) {
                    out_po[2]++;
                }
                if (db_order[j] == 3) {
                    out_po[3]++;
                }
                if (db_order[j] == 4) {
                    out_po[4]++;
                }
            }
        }
        var txt_po = "（小组" + dict_pv[parm_pv] + "时，对应的漫才表演顺序";
        if (out_po[1] != 0) {
            var txt_po_1 = Number(out_po[1] / out_po[0] * 100).toFixed(2);
            var txt_po = txt_po + "有" + txt_po_1 + "%为第一位、"
        }
        if (out_po[2] != 0) {
            var txt_po_2 = Number(out_po[2] / out_po[0] * 100).toFixed(2);
            var txt_po = txt_po + "有" + txt_po_2 + "%为第二位、"
        }
        if (out_po[3] != 0) {
            var txt_po_3 = Number(out_po[3] / out_po[0] * 100).toFixed(2);
            var txt_po = txt_po + "有" + txt_po_3 + "%为第三位、"
        }
        if (out_po[4] != 0) {
            var txt_po_4 = Number(out_po[4] / out_po[0] * 100).toFixed(2);
            var txt_po = txt_po + "有" + txt_po_4 + "%为第四位、"
        }
        var txt_po = txt_po.substring(0, txt_po.lastIndexOf("、")) + "。）";
    }
    else {
        var txt_po = "（小组未在PV中登场时，对应的漫才表演顺序一般为第五位，作为败者复活组出场。）";
    }
    var s_po = document.createElement("p");
    s_po.innerHTML = txt_po;
    frag.appendChild(s_po);
}