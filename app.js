

let oneRunCircle = require("./worldteam");


/**
 *
 *      自动运行开始
 *
 *
 */


!(async () => {
    
    /** ==================================================
     *          以下是流程控制
     * ==================================================*/
    
    
    
    
    /** ===================
     *      01.配置文件
     * ===================*/
    global.worldTeam = {};
    // global.worldTeam.configgg = {};
    
    /** ===================
     *      02.全局注册
     * ===================*/
    global.worldTeam.knex = await require("knex")({
        client: "mysql",
        connection: {
            host : "127.0.0.1",
            port : 3307,
            user : "root",
            password : "root12345678",
            database : "HAIYU72COM"
        }
    });
    
    /** ===================
     *      03.业务逻辑
     * ===================*/
    await oneRunCircle();
    
  
    /** ===================
     *      04.回收清理
     * ===================*/
    await global.worldTeam.knex.destroy();

})();