const telrad = require('./telrad.js');
const sql = require('./sql.js');



test('Can grab all used IPs and extract a free IP', async () => {
    const usedIPs = await telrad.getUsedIPs();
    const freeIP = await telrad.getFreeIP();

    expect(freeIP.constructor === String).toBeTruthy();
    expect(usedIPs.indexOf(freeIP)<0).toBeTruthy();
})


test('Can view a sim card from the system', async () => {
    let viewResult = await telrad.getSimConfig('111111111111111');
    expect(viewResult.IMSI).toBeTruthy();
})
