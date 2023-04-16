const sql = require('./sql.js');


test('Can grab IMSI data from old Nocbot SQL Database', async () => {
    const simData = await sql.getSimData('111111111111111');
    sql.nocbotConnection.end();

    expect(simData.k).toBeTruthy();
})

test('Can retrieve all used IPs from the Ericsson DB', async () => {
    const usedIPs = await sql.getUsedIPs();
    sql.starConnection.end();

    expect(usedIPs.constructor === Array).toBeTruthy();
})