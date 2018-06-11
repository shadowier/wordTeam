/**
 *
 *         国家队区位静态 + 中立场进退位兑换表
 *
 */


class qwcWordTeam {
    
    constructor() {
        
        /*
        * 一个scheduleid对应的返还率计算 + 低初赔0-12区位
        * 一个小区间里面 (11, 22]
        * */
        
        this.zone89 = [2, 1.8, 1.61, 1.5, 1.4, 1.33, 1.28, 1.22, 1.16, 1.12, 1.08, 1.04, 1];
        /*89+*/
        this.zone91 = [2.05, 1.85, 1.65, 1.53, 1.44, 1.36, 1.30, 1.25, 1.20, 1.15, 1.1, 1.05, 1];
        /*91+*/
        this.zone94 = [2.1, 1.91, 1.7, 1.61, 1.5, 1.4, 1.33, 1.28, 1.22, 1.16, 1.12, 1.08, 1.04];
        /*94+*/
    
        this.zone89zhu = [2,    2.2,  2.4,  2.6  ];
        this.zone91zhu = [2.05, 2.25, 2.45, 2.65 ];
        this.zone94zhu = [2.1,  2.3,  2.5,  2.7  ];
        
        this.zone89_k = [2.4, 2.20, 2.00, 1.80, 1.61, 1.50, 1.40, 1.33, 1.28, 1.22];
        /*89-*/
        this.zone91_k = [2.45, 2.25, 2.05, 1.85, 1.65, 1.53, 1.44, 1.36, 1.3, 1.25];
        /*91-*/
        this.zone94_k = [2.5, 2.30, 2.10, 1.91, 1.70, 1.61, 1.50, 1.40, 1.33, 1.28];
        /*94-*/
    }
    
    
    /* 小处理函数区域 */
    
    //spf
    small_spf(scoreArr) {
        
        if (scoreArr && scoreArr[0] && scoreArr[1] && scoreArr.length == 2) {
            
            let y = scoreArr[0] - scoreArr[1];
            
            if (y > 0) {
                return 1;
            } else if (y < 0) {
                return 0;
            } else if (y == 0) {
                return 2;
            } else {
            }
            
        } else {
            return 555;
        }
        
    }
    
    // 判断低赔在哪一边
    small_dp(cp1, cp3) {
        
        if (cp1 && cp3) {
            
            let y = cp1 - cp3;//低赔是小的那个
            if (y > 0) {
                return 0;//低赔在右
            } else if (y < 0) {
                return 1;
            } else {
                return 2;
            }
            
        } else {
            return 555;
        }
        
    }
    
    
    /*
      判断返还率在89/91/94
      (0,90)[90,92)[92,+--)
       a 返还率 = 94.3
      return 89/91/94
    */
    
    f899194(f) {
        
        let arr899194 = [90, 92];
        let tmp = [];
        
        for (let i = 0; i < arr899194.length; i++) {
            if (arr899194[i] <= f) {
                tmp.push(i);
            }
        }
        
        switch (tmp.length) {
            case 0:
                return 89;
                break;
            case 1:
                return 91;
                break;
            case 2:
                return 94;
                break;
            default:
                return false;
        }
        
    }
    
    /*
     * 判断在0-12的哪一区
     *  zone=（初赔）低赔数值的判断区间
     *  ---a=89/91/94
     *  ---b=低赔方在A/B 1/0
     *  ---c=低赔的初赔数值
     * */
    fhl0_12(a, b, c) {
        
        c = c*1;
        
        //0.参数检测
        if( !(a==89 || a==91 || a==94) ){
            console.log('fhl0_12', '不是89 91 94其中一个！');
            return;
        }
        if( b>=2 ){
            console.log('fhl0_12', 'dp方只能为1/0');
            return;
        }
        if( !c || c==55 || c==555 ){
            console.log('fhl0_12', '初赔数值不符合范围');
            return;
        }
        
        
        //1.业务流程
        if (a && b < 2 && c) {
            
            switch (b) {
                //---低赔在主场
                case 1:
                    if (a == 89) {
                        if (c > 2) {
                            let zone = this.zone89zhu;
                            for (let i = 0; i < zone.length - 1; i++) {
                                if (zone[i] < c && c <= zone[i + 1]) {
                                    return '-' + (i + 1);//返回 -1/-2/-3
                                }
                            }
                        } else {
                            let zone = this.zone89;
                            for (let i = 0; i < zone.length - 1; i++) {
                                if (zone[i] >= c && c > zone[i + 1]) {
                                    return i+1;
                                }
                            }
                        }
                    }
                    else if (a == 91) {
                        if (c > 2.05) {
                            let zone = this.zone91zhu;
                            for (let i = 0; i < zone.length - 1; i++) {
                                if (zone[i] < c && c <= zone[i + 1]) {
                                    return '-' + (i + 1);//返回 -1/-2
                                }
                            }
                        } else {
                            let zone = this.zone91;
                            for (let i = 0; i < zone.length - 1; i++) {
                                // console.log(zone[i], zone[i+1]);
                                if (zone[i] >= c && c > zone[i + 1]) {
                                    // console.log(i+1);
                                    return i+1;
                                }
                            }
                        }
                    }
                    else if (a == 94) {
                        if (c > 2.1) {
                            let zone = this.zone94zhu;
                            for (let i = 0; i < zone.length - 1; i++) {
                                if (zone[i] < c && c <= zone[i + 1]) {
                                    return '-' + (i + 1);//返回 -1/-2
                                }
                            }
                        } else {
                            let zone = this.zone94;
                            for (let i = 0; i < zone.length - 1; i++) {
                                if (zone[i] >= c && c > zone[i + 1]) {
                                    return i+1;
                                }
                            }
                        }
                    } else {}
                    break;
                
                //---低赔在客场
                case 0:
                    if (a == 89) {
                        let zone = this.zone89_k;
                        for (let i = 0; i < zone.length - 1; i++) {
                            if (zone[i] >= c && c > zone[i + 1]) {
                                return '-' + (i + 4);
                            }
                        }
                    }
                    else if (a == 91) {
                        let zone = this.zone91_k;
                        for (let i = 0; i < zone.length - 1; i++) {
                            if (zone[i] >= c && c > zone[i + 1]) {
                                return '-' + (i + 4);
                            }
                        }
                    }
                    else if (a == 94) {
                        let zone = this.zone94_k;
                        for (let i = 0; i < zone.length - 1; i++) {
                            if (zone[i] >= c && c > zone[i + 1]) {
                                return '-' + (i + 4);
                            }
                        }
                    } else {
                    }
                    break;
                
                //默认
                default:
                //return 555;
            }
            
        }
        
    }
    
    
}




/* 输入runmain->obj,返回新增tomysql字段 */
async function runmain2mysql(obj) {
    
    //对obj进行检测，确认输入值符合 计算程序设定
    if (!obj) {
        console.log(runmain2mysql, 'obj为空，取不到这个scheduleId');
        return null;
    }
    if(!obj.analysis) return null;
    if(!obj.leagueId) return null;
    if(!obj.oddslist) return null;
    
    
    let scheduleId = obj.scheduleId,
        leagueId = obj.leagueId,
        analysis = obj.analysis,
        oddslist = obj.oddslist,
        mobile = obj.mobile;
    
    
    let obj_mysql_colume;
    
    let SR = mobile.scoreReg;
    if(  SR && SR[0]!==null && SR[1]!==null  && Number.isInteger(SR[0]*SR[1])  )
    {
        
        {
            
            /* mysql字段全部小写 */
            obj_mysql_colume = {
                
                scheduleId: scheduleId,
                leagueId: leagueId,
                mtime: (analysis.matchTime) ? analysis.matchTime : analysis.regMTime.GMT,
                
                //zlc: analysis.zlc,
                score: mobile.scoreReg[0] + '-' + mobile.scoreReg[1],
                
                teanAId: (analysis.h2h_home) ? analysis.h2h_home : oddslist.hometeamID,
                teanBId: (analysis.h2h_away) ? analysis.h2h_away : oddslist.guestteamID,
                teanAzh: (analysis.hometeam) ? analysis.hometeam : oddslist.hometeam_cn,
                teanBzh: (analysis.guestteam) ? analysis.guestteam : oddslist.guestteam_cn,
                
                spf: '',//spf 1/0/2
                dp: '',//低赔在A=1; 在B=0; 2为相等,即没有低赔
                fhlArea: '',//89/91/94系
                qwc: 555,//普通区位
                qwm: 555,//中心区位
                
                //赔率部分
                wloddsId: oddslist.gameWarr[1],
                wc1: oddslist.gameWarr[3],
                wc2: oddslist.gameWarr[4],
                wc3: oddslist.gameWarr[5],
                wlcfhl: oddslist.gameWarr[9],
                wz1: oddslist.gameWarr[10],
                wz2: oddslist.gameWarr[11],
                wz3: oddslist.gameWarr[12],
                wlzfhl: oddslist.gameWarr[16],
                
                lboddsId: oddslist.gameLarr[1],
                lbc1: oddslist.gameLarr[3],
                lbc2: oddslist.gameLarr[4],
                lbc3: oddslist.gameLarr[5],
                lbcfhl: oddslist.gameLarr[9],
                lbz1: oddslist.gameLarr[10],
                lbz2: oddslist.gameLarr[11],
                lbz3: oddslist.gameLarr[12],
                lbzfhl: oddslist.gameLarr[16],
                
                version : 1, //入库数据版本标识
            };
            
            
            let qwcc = new qwc();
            obj_mysql_colume.spf = qwcc.small_spf(mobile.scoreReg);
            obj_mysql_colume.dp = qwcc.small_dp(obj_mysql_colume.wc1, obj_mysql_colume.wc3);
            obj_mysql_colume.fhlArea = qwcc.f899194(obj_mysql_colume.wlcfhl);
            
            let dp_wcp = '';
            switch (obj_mysql_colume.dp) {
                case 1:
                    dp_wcp = obj_mysql_colume.wc1;
                    break;
                case 0:
                    dp_wcp = obj_mysql_colume.wc3;
                    break;
                default:
                    dp_wcp = null;
            }
            
            let qwc_tmp = qwcc.fhl0_12(obj_mysql_colume.fhlArea, obj_mysql_colume.dp, dp_wcp);
            obj_mysql_colume.qwc = ( qwc_tmp || qwc_tmp == 0  ) ? qwc_tmp : 555 ;
            
        }
        
        
        /* 返回 */
        return obj_mysql_colume;
        
    }
    
    
    
}



module.exports = qwcWordTeam;




