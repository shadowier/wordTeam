const _ = require("lodash");
const qwcWordTeam = require("./lib/qwcWordTeam");

function process_onerow (row) {
    
    //0. 输入检测
    if ( !(row) ) {
        console.log("oneRow","一条数据不符合！");
        return false;
    }
    if(row.zlc==55){// zlc字段只有 0 1 55
        console.log("oneRow","zlc字段==55！");
        return false;
    }
    if(row.dp>=2){//dp 字段： 0 1 2 55 555
        console.log("oneRow", "dp字段>=2！");
        return false;
    }
    if(row.spf>=2){///spf字段： 0 1 2 55
        console.log("oneRow", "spf字段>=2！");
        return false;
    }
    if(row.fhlArea!=89 && row.fhlArea!=91 && row.fhlArea!=94){///fhlArea字段： 89 91 94 55
        console.log("oneRow", "fhlArea != 89 91 94！");
        return false;
    }
    if(!row.wc1 || row.wc1==55 || row.wc1==555){///wc1字段： NULL 55
        console.log("oneRow", "wc1 = NULL 55！");
        return false;
    }
    if(!row.wc3 || row.wc3==55 || row.wc3==555){///wc2字段： NULL 55
        console.log("oneRow", "wc3 = NULL 55！");
        return false;
    }
    
    //1. 判断是否为中立场，区别处理 - 非中立场怎么办 - 中立场怎么办
    //2. 计算qwcWordTeam(世界队对应的转换表)
    //3. 返回 sid leagueId time a b azh bzh qwc
    let res_obj   = null;
    let qwcWT_val = null;
    
    let qwcWT = new qwcWordTeam();
    
    
    if(row.zlc==1)
    {//中立场 - 地陪方若是在客场，需要转换到主场位置
        //如果地陪方再客场，需要对掉AB队位置以及数据
        if(row.dp==0)
        {
            qwcWT_val = qwcWT.fhl0_12(row.fhlArea,  1,  row.wc3);
            //---确保不是undefined  --- 这个转换表没有0 不需要特殊处理
            if(!qwcWT_val){
                res_obj = {
                    scheduleId : row.scheduleId,
                    leagueId   : row.leagueId,
                    zlc        : row.zlc,
                    mtime      : row.mtime,
                    teanAId    : row.teanBId, //对掉
                    teanBId    : row.teanAId, //对掉
                    teanAzh    : row.teanBzh, //对掉
                    teanBzh    : row.teanAzh, //对掉
                    qwc        : qwcWT_val,
                }
            }
        }else if(row.dp==1){
            qwcWT_val = qwcWT.fhl0_12(row.fhlArea,  1,  row.wc1);
            //---确保不是undefined  --- 这个转换表没有0 不需要特殊处理
            if(!qwcWT_val){
                res_obj = {
                    scheduleId : row.scheduleId,
                    leagueId   : row.leagueId,
                    zlc        : row.zlc,
                    mtime      : row.mtime,
                    teanAId    : row.teanAId,
                    teanBId    : row.teanBId,
                    teanAzh    : row.teanAzh,
                    teanBzh    : row.teanBzh,
                    qwc        : qwcWT_val,
                }
            }
        }
        
        
    }else if(row.zlc==0){//非中立场 - 按表转换
        //地陪方初赔-获取-小处理
        let dp_wcp = null;
        switch (row.dp) {
            case 1:
                dp_wcp = row.wc1;
                break;
            case 0:
                dp_wcp = row.wc3;
                break;
            default:
        }
        
        console.log(row.fhlArea,  row.dp,  dp_wcp);
        
        qwcWT_val = qwcWT.fhl0_12(row.fhlArea,  row.dp,  dp_wcp);
        //---确保不是undefined  --- 这个转换表没有0 不需要特殊处理
        if(qwcWT_val){
            res_obj = {
                scheduleId : row.scheduleId,
                leagueId   : row.leagueId,
                zlc        : row.zlc,
                mtime      : row.mtime,
                teanAId    : row.teanAId,
                teanBId    : row.teanBId,
                teanAzh    : row.teanAzh,
                teanBzh    : row.teanBzh,
                qwc        : qwcWT_val,
            }
        }
    }else {}
    
    return res_obj;
}



let aaa =
    { scheduleId: 720409,
        leagueId: 137,
        zlc: 0,
        mtime: '2012-11-25T12:30:00.000Z',
    teanAId: 945,
    teanBId: 680,
    teanAzh: '特普利斯',
    teanBzh: '布尔诺',
    wc1: '1.73',
    wc3: '4.5',
    spf: 1,
    dp: 1,
    fhlArea: 91 };

console.log(  process_onerow(aaa)   );