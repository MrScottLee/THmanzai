function rs_pre() {
    rs = document.getElementById("rs");
    rs_hide = document.getElementsByClassName("hide");
    rs_show = document.getElementsByClassName("show");
    
        
    rs.onclick = function() {
        if (rs.checked) {
            while (rs_hide.length != 0) {
                rs_hide[0].className = "show";
            }
        }
        else {
            while (rs_show.length != 0) {
                rs_show[0].className = "hide";
            }
        }
    }
    form.onreset = function() {
        while (rs_show.length != 0) {
            rs_show[0].className = "hide";
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

function rs_da(frag, header) {
    var nothing = 0;
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
        var txt_rs = da_claim(out_rs, "同时满足以上条件");
        var s_rs = document.createElement("p");
        s_rs.innerHTML = txt_rs;
        frag.appendChild(s_rs);
    }
}
