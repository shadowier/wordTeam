
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
                                if (zone[i] >= c && c > zone[i + 1]) {
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

let qwm = new qwcWordTeam();

console.log(qwm.fhl0_12(91,  0,    1.25   ));