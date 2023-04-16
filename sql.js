const mysql = require("mysql");

require("dotenv").config();


let starConnection = mysql.createPool({
    host     : process.env.STAR_SQL_HOSTNAME,
    database : process.env.STAR_SQL_DATABASE,
    port     : process.env.STAR_SQL_PORT,
    user     : process.env.STAR_SQL_USERNAME,
    password : process.env.STAR_SQL_PASSWORD,
});


let nocbotConnection = mysql.createPool({
    host     : process.env.NOCBOT_SQL_HOSTNAME,
    database : process.env.NOCBOT_SQL_DATABASE,
    port     : process.env.NOCBOT_SQL_PORT,
    user     : process.env.NOCBOT_SQL_USERNAME,
    password : process.env.NOCBOT_SQL_PASSWORD,
});


const getSimData = (imsi) =>
    new Promise ((resolve, reject) => 
        nocbotConnection.query(
            `
            SELECT imsi, k, opc 
            FROM simcards
            WHERE imsi = '${imsi}'
            `,
            
            (err, rows) => {
                if (err) reject(err);
                else if (!rows[0]) reject('This sim card is not in the system!');
                else resolve(rows[0]);
            }
        )
    )


const getUsedIPs = () =>
    new Promise ((resolve, reject) =>
        starConnection.query(
            `
            SELECT srv_pty_ip
            FROM apn_cfg_profile
            `,
            
            (err, rows) => {
                if (err) reject(err)
                
                else {
                    let ipList = []
                    for (let ip of rows) {
                        ipList.push(ip.srv_pty_ip);
                    }
                    
                    resolve(ipList);
                }
            }
        )
    )


module.exports = { getSimData, getUsedIPs, nocbotConnection, starConnection };
