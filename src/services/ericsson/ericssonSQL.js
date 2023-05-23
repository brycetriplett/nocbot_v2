const mysql = require("mysql2/promise");

const connectionParams = {
  host: process.env.STAR_HOSTNAME,
  database: process.env.STAR_SQL_DATABASE,
  port: process.env.STAR_SQL_PORT,
  user: process.env.STAR_SQL_USERNAME,
  password: process.env.STAR_SQL_PASSWORD,
};

const getUsedIPs = async () => {
  const connection = await mysql.createConnection(connectionParams);

  try {
    const [results, fields] = await connection.execute(
      `
        SELECT srv_pty_ip
        FROM apn_cfg_profile
      `
    );

    let ipList = [];
    for (let ip of results) {
      ipList.push(ip.srv_pty_ip);
    }

    return ipList;
  } finally {
    await connection.end();
  }
};

module.exports = { getUsedIPs };
