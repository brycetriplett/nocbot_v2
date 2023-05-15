const mysql = require("mysql2/promise");

let starConnection = mysql.createPool({
  host: process.env.STAR_SQL_HOSTNAME,
  database: process.env.STAR_SQL_DATABASE,
  port: process.env.STAR_SQL_PORT,
  user: process.env.STAR_SQL_USERNAME,
  password: process.env.STAR_SQL_PASSWORD,
});

const getUsedIPs = () =>
  new Promise((resolve, reject) =>
    starConnection.query(
      `
        SELECT srv_pty_ip
        FROM apn_cfg_profile
      `,

      (err, rows) => {
        if (err) reject(err);
        else {
          let ipList = [];
          for (let ip of rows) {
            ipList.push(ip.srv_pty_ip);
          }

          resolve(ipList);
        }
      }
    )
  );

module.exports = { getUsedIPs };
