function br() {
    var linebreak = document.createElement("p");
    linebreak.innerHTML = " ";
    frag.appendChild(linebreak);
}

function da_base(out, j) {
    out[0]++;
    if (db_rank[j] == 1) {
        out[1]++;
    }
    if (db_rank[j] == 2) {
        out[2]++;
    }
    if (db_rank[j] == 3) {
        out[3]++;
    }
    if (db_rank[j] == 4) {
        out[4]++;
    }
    if (db_rank[j] == 5) {
        out[5]++;
    }
}

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

function da_claim(out, desc) {
    if (out[0] == 0) {
        var txt = "没有出现过" + desc + "的情况。";
    }
    else if (out[0] == 1) {
        var txt = desc + "的情况出现过<span>1次</span>，对应的积分排名为第" + out.lastIndexOf(1) + "名。";
    }
    else {
        var txt = desc + "的情况出现过<span>" + out[0] + "次</span>，对应的积分排名共有";
        if (out[1] != 0) {
            var txt = txt + out[1] + "次第1名、";
        }
        if (out[2] != 0) {
            var txt = txt + out[2] + "次第2名、";
        }
        if (out[3] != 0) {
            var txt = txt + out[3] + "次第3名、";
        }
        if (out[4] != 0) {
            var txt = txt + out[4] + "次第4名、";
        }
        if (out[5] != 0) {
            var txt = txt + out[5] + "次第5名、";
        }
        var txt = txt.substring(0, txt.lastIndexOf("、"));
        if (txt.indexOf("、") != -1) {
            var txt = txt.substring(0, txt.lastIndexOf("、")) + "和" + txt.substring(txt.lastIndexOf("、") + 1);
        }
        txt += "。";
    }
    var section = document.createElement("p");
    section.innerHTML = txt;
    frag.appendChild(section);
}

var dict_stage_sgl = {
    0:"是东方Project的主人公之一",
    0.1:"在书籍中初登场",
    0.2:"在官方音乐CD中初登场",
    0.3:"在特殊弹幕类游戏中初登场",
    0.5:"在初登场时是一面道中",
    1:"在初登场时是一面BOSS",
    1.5:"在初登场时是二面道中",
    2:"在初登场时是二面BOSS",
    2.5:"在初登场时是三面道中",
    3:"在初登场时是三面BOSS",
    3.5:"在初登场时是四面道中",
    4:"在初登场时是四面BOSS",
    4.5:"在初登场时是五面道中",
    5:"在初登场时是五面BOSS",
    5.5:"在初登场时是六面道中",
    6:"在初登场时是六面BOSS",
    6.1:"在格斗作中初登场",
    7:"在初登场时是EX面BOSS",
    8:"在初登场时是PH面BOSS",
};

var dict_stage_dbl = {
    0:"都是东方Project的主人公",
    0.1:"均在书籍中初登场",
    0.2:"均在官方音乐CD中初登场",
    0.3:"均在特殊弹幕类游戏中初登场",
    0.5:"在初登场时都是一面道中",
    1:"在初登场时都是一面BOSS",
    1.5:"在初登场时都是二面道中",
    2:"在初登场时都是二面BOSS",
    2.5:"在初登场时都是三面道中",
    3:"在初登场时都是三面BOSS",
    3.5:"在初登场时都是四面道中",
    4:"在初登场时都是四面BOSS",
    4.5:"在初登场时都是五面道中",
    5:"在初登场时都是五面BOSS",
    5.5:"在初登场时都是六面道中",
    6:"在初登场时都是六面BOSS",
    6.1:"均在格斗作中初登场",
    7:"在初登场时都是EX面BOSS",
    8:"在初登场时都是PH面BOSS",
};

var dict_pv = {
    1:"在PV中第一位登场",
    2:"在PV中第二位登场",
    3:"在PV中第三位登场",
    4:"在PV中第四位登场",
    NaN:"无PV或未在PV中登场"
};