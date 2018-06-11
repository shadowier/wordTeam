const _ = require("lodash");


const knex =  require("knex")({
    client: "mysql",
    connection: {
        host : "127.0.0.1",
        port : 3307,
        user : "root",
        password : "root12345678",
        database : "HAIYU72COM"
    }
});








//test
!(async function  () {
    let hello = await getAllSize();
    console.log(hello);
})();