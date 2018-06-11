
const _ = require("lodash");
const qwcWordTeam = require("./lib/qwcWordTeam");


//210个世界队ids  http://zq.win007.com/cn/paiming.html
const wteamids210 = [[650,"德国"],[778,"巴西"],[645,"比利时"],[765,"葡萄牙"],[766,"阿根廷"],[648,"瑞士"],[649,"法国"],[772,"西班牙"],[780,"智利"],[637,"波兰"],[774,"秘鲁"],[638,"丹麦"],[744,"英格兰"],[823,"突尼斯"],[819,"墨西哥"],[775,"哥伦比亚"],[767,"乌拉圭"],[768,"克罗地亚"],[646,"荷兰"],[771,"意大利"],[7384,"威尔士"],[756,"冰岛"],[644,"瑞典"],[797,"美国"],[914,"哥斯达黎加"],[647,"奥地利"],[759,"北爱尔兰"],[815,"塞内加尔"],[752,"斯洛伐克"],[634,"乌克兰"],[630,"爱尔兰"],[776,"巴拉圭"],[635,"罗马尼亚"],[641,"苏格兰"],[642,"塞尔维亚"],[783,"伊朗"],[762,"土耳其"],[811,"刚果民主共和国"],[777,"委内瑞拉"],[913,"澳大利亚"],[782,"波黑"],[813,"摩洛哥"],[5282,"黑山"],[757,"希腊"],[747,"捷克"],[735,"埃及"],[789,"尼日利亚"],[799,"牙买加"],[640,"挪威"],[745,"匈牙利"],[793,"喀麦隆"],[810,"加纳"],[791,"布基纳法索"],[769,"保加利亚"],[798,"巴拿马"],[761,"阿尔巴尼亚"],[773,"玻利维亚"],[790,"佛得角"],[794,"洪都拉斯"],[903,"日本"],[898,"韩国"],[18406,"阿尔及利亚"],[736,"芬兰"],[779,"厄瓜多尔"],[632,"斯洛文尼亚"],[746,"俄罗斯"],[817,"马里"],[809,"科特迪瓦"],[812,"几内亚"],[891,"沙特阿拉伯"],[17976,"库拉索"],[803,"南非"],[896,"中国"],[802,"乌干达"],[885,"吉尔吉斯斯坦"],[899,"叙利亚"],[770,"马其顿"],[807,"赞比亚"],[750,"白俄罗斯"],[795,"加拿大"],[887,"阿联酋"],[897,"黎巴嫩"],[879,"巴勒斯坦"],[749,"卢森堡"],[796,"萨尔瓦多"],[753,"塞浦路斯"],[902,"阿曼"],[875,"乌兹别克"],[874,"伊拉克"],[808,"贝宁"],[806,"刚果"],[912,"特立尼达和多巴哥"],[788,"加蓬"],[636,"爱沙尼亚"],[754,"法罗群岛"],[901,"格鲁吉亚"],[893,"印度"],[748,"阿美尼亚"],[760,"以色列"],[734,"利比亚"],[904,"卡塔尔"],[5290,"塞拉利昂"],[883,"越南"],[6680,"几内亚比绍"],[5281,"毛里塔尼亚"],[5292,"莫桑比克"],[4494,"纳米比亚"],[909,"海地"],[5302,"尼日尔"],[14862,"津巴布韦"],[5295,"马达加斯加"],[876,"朝鲜"],[1562,"菲律宾"],[921,"肯尼亚"],[8025,"中非共和国"],[900,"巴林"],[881,"约旦"],[884,"塔吉克斯坦"],[763,"哈萨克斯坦"],[969,"马拉维"],[5288,"中华台北"],[886,"泰国"],[922,"卢旺达"],[8028,"安提瓜和巴布达"],[877,"也门"],[821,"圣基茨和尼维斯"],[792,"苏丹"],[758,"阿塞拜疆"],[825,"土库曼斯坦"],[816,"多哥"],[4636,"斯威士兰"],[894,"安道尔"],[2363,"新西兰"],[905,"立陶宛"],[1563,"缅甸联邦"],[5091,"尼加拉瓜"],[4937,"坦桑尼亚"],[804,"安哥拉"],[631,"拉脱维亚"],[801,"危地马拉"],[6675,"科摩罗"],[888,"中国香港"],[6651,"阿富汗"],[5286,"赤道几内亚"],[4637,"埃塞俄比亚"],[5294,"布隆迪"],[882,"马尔代夫"],[920,"博茨瓦纳"],[7538,"多米尼加共和国"],[5296,"莱索托"],[814,"利比里亚"],[5764,"科索沃"],[2865,"所罗门群岛"],[8027,"苏利南共和国"],[20868,"南苏丹"],[6661,"瓦努阿图"],[6662,"新喀里多尼亚"],[7492,"波多黎各"],[4638,"毛里求斯"],[1992,"巴巴多斯"],[8030,"塔希提群岛"],[8029,"圭亚那"],[890,"印度尼西亚"],[6650,"尼泊尔"],[6124,"斐济"],[5291,"乍得"],[5092,"伯利兹"],[8026,"圣路西亚"],[1565,"柬埔寨"],[889,"马来西亚"],[7296,"格瑞那达"],[892,"新加坡"],[751,"摩尔多瓦"],[1494,"圣文森特及格瑞那丁"],[5039,"冈比亚"],[7293,"多米尼克"],[895,"科威特"],[5293,"百慕大群岛"],[880,"老挝"],[8031,"巴布亚新几内亚"],[764,"列支敦士登"],[1991,"古巴"],[7300,"阿鲁巴"],[7818,"不丹"],[755,"马耳他"],[3325,"中国澳门"],[18477,"圣多美与普林西比"],[5768,"蒙古"],[5769,"关岛"],[1564,"东帝汶"],[8035,"美属萨摩亚"],[8034,"库克"],[8032,"萨摩亚"],[3627,"文莱"],[5289,"塞舌尔"],[3352,"孟加拉国"],[6975,"吉布提"],[7295,"美属维津群岛"],[7304,"蒙塞拉特岛"],[824,"斯里兰卡"],[7298,"特克斯和凯科斯群岛"],[3353,"巴基斯坦"],[7306,"开曼群岛"],[907,"圣马力诺"],[7302,"英属维津群岛"],[8033,"汤加"],[7297,"安圭拉"],[7301,"巴哈马"],[5297,"厄立特里亚"],[6976,"索马里"]];
const pureids = [650,778,645,765,766,648,649,772,780,637,774,638,744,823,819,775,767,768,646,771,7384,756,644,797,914,647,759,815,752,634,630,776,635,641,642,783,762,811,777,913,782,813,5282,757,747,735,789,799,640,745,793,810,791,769,798,761,773,790,794,903,898,18406,736,779,632,746,817,809,812,891,17976,803,896,802,885,899,770,807,750,795,887,897,879,749,796,753,902,875,874,808,806,912,788,636,754,901,893,748,760,734,904,5290,883,6680,5281,5292,4494,909,5302,14862,5295,876,1562,921,8025,900,881,884,763,969,5288,886,922,8028,877,821,792,758,825,816,4636,894,2363,905,1563,5091,4937,804,631,801,6675,888,6651,5286,4637,5294,882,920,7538,5296,814,5764,2865,8027,20868,6661,6662,7492,4638,1992,8030,8029,890,6650,6124,5291,5092,8026,1565,889,7296,892,751,1494,5039,7293,895,5293,880,8031,764,1991,7300,7818,755,3325,18477,5768,5769,1564,8035,8034,8032,3627,5289,3352,6975,7295,7304,824,7298,3353,7306,907,7302,8033,7297,7301,5297,6976];

/**
 *      小处理函数
 */

//判断一个球队是否在210个国家队范围
function isIn210 (tid) {
    return _.indexOf( pureids, tid) != -1;
}
function is2TeamidOk (tid1,tid2) {
    tid1 = tid1*1;
    tid2 = tid2*1;
    if(!(tid1 && tid2 && _.isInteger(tid1) && _.isInteger(tid2))){
        console.log('is2In210', "输入两个球队id不对");
        return false;
    }
    return isIn210(tid1) && isIn210(tid2); //两个都在210中才返回true
}


/**
 *      判断一行数据是否满足世界队情况,
 *      返回入库格式： sid time a b azh bzh qwc
 */

function process_onerow (row) {
    
    //0. 输入检测
    if ( !row ) {
        console.log("oneRow","一条数据不符合！");
        return false;
    }
    
    if( !(_.isInteger(row.teanAId) && _.isInteger(row.teanBId)) ){
        console.log("oneRow", "teanA-BId 不符合要求");
        return false;
    }
    if( !is2TeamidOk(row.teanAId,    row.teanBId) ){
        console.log("oneRow","is2TeamidOk 不在210个国家里！");
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
    
    
    if(row.zlc==1){//中立场 - 地陪方若是在客场，需要转换到主场位置
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
        qwcWT_val = qwcWT.fhl0_12(row.fhlArea,  row.dp,  dp_wcp);
        //---确保不是undefined  --- 这个转换表没有0 不需要特殊处理
        if( qwcWT_val){
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
    }else {
        console.log("qwcWT_val: 世界队qwc没有计算成功")
    }
    
    return res_obj;
}


function process_rows (rows) {
    //0. 参数检测
    if( !(rows && _.isArray(rows)) || rows.length==0 ){
        console.log('process_rows:', '输入的数据数组不正常');
        return;
    }
    //1. 业务逻辑
    let tmp = rows.map(i=>{
        return process_onerow(i);
    });
    //过滤其中计算失败返回的 undefined
    return tmp.filter(i=>{
       return i;
    });
}

/**
 *      mysql中抓取 低赔胜 比赛, 设计使用 offset	 limit;
 *
 *      返回： 返回取到的数组
 */
async function getAllSize(){
    let tmp = await
        global.worldTeam.knex('football2018')
            .where   ('dp','!=' , 2)
            .andWhere('dp','!=' , 55)
            .andWhere('dp','!=' , 555)
            .andWhere('spf','!=', 2)
            .andWhere('spf','!=', 55)
            .whereRaw('dp=spf')
            .whereRaw('fhlArea!=55')
            .whereRaw('wc1!=55 and wc1 is not null')
            .whereRaw('wc3!=55 and wc3 is not null')
            .count('scheduleId as size');
    
    return tmp[0].size;//[ { size: 180091 } ]
}

async function getOffsetRows (offset, limit) {
    //1. 检查参数
    if( !(_.isInteger(offset) && _.isInteger(limit)) ){
        console.log('getRows:', 'offect/limit参数输入错误！');
        return ;
    }
    //
    let tmp = await
        global.worldTeam.knex('football2018')
            .select('scheduleId','leagueId','zlc','mtime','teanAId','teanBId','teanAzh','teanBzh','wc1','wc3','spf','dp','fhlArea')
            .where   ('dp','!=' , 2)
            .andWhere('dp','!=' , 55)
            .andWhere('dp','!=' , 555)
            .andWhere('spf','!=', 2)
            .andWhere('spf','!=', 55)
            .whereRaw('dp=spf')
            .whereRaw('fhlArea!=55')
            .whereRaw('wc1!=55 and wc1 is not null')
            .whereRaw('wc3!=55 and wc3 is not null')
            //--------------------------------------
            .limit(limit).offset(offset);
 
    return tmp;
}

/**
 *
 *      一次性批量处理，后续就是按照每条进行更新了
 *
 */
async function oneRunCircle(){
    
    //0. 获得已经入库所有符合条件 行数
    let n = await getAllSize();
    
    //1. 计算offset limit关系
    let limit  = 1000,
        count = 0;
        offset = 0;//从0开始
    
    //2. 批量处理
    //3. 插入新库
    async function Circle (offset)
    {
        /**
         *    获取单位偏移rows 计算后入库
         */
        let offsetRows = await getOffsetRows(offset, limit);
        console.log(offsetRows[0]);//testing
        let results = process_rows(offsetRows);
        
        console.log("单位Offset处理后符合条件的记录数：", results.length);
    
        await global.worldTeam.knex("worldteam2018").insert(results);// 插入到数据库
        
        /**
         *    准备开始下一轮
         */
        count++;
        offset = count*limit;
        if(offset < n){
            return await Circle(offset);
        }else {
            console.log("offset已经超界, 表示已经计算完全");
        }
    }
    await Circle(0);
    
    //4. 结尾
    console.log("oneRunCircle 结尾了 ...");
}


module.exports=oneRunCircle;









