const mysql = require("mysql2/promise");

const connectionParams = {
  host: process.env.NOCBOT_SQL_HOSTNAME,
  database: process.env.NOCBOT_SQL_DATABASE,
  port: process.env.NOCBOT_SQL_PORT,
  user: process.env.NOCBOT_SQL_USERNAME,
  password: process.env.NOCBOT_SQL_PASSWORD,
};

const getSimData = async (imsi) => {
  const connection = await mysql.createConnection(connectionParams);

  try {
    const [results, fields] = await connection.execute(
      `
        SELECT imsi, k, opc 
        FROM simcards
        WHERE imsi = '${imsi}'
      `
    );
    return results[0];
  } finally {
    await connection.end();
  }
};

module.exports = { getSimData };
