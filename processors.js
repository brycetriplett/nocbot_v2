const telrad = require("./telrad.js");
const views = require("./blocks.js");


async function telradProcessor (command) {
    let [method, imsi, option] = command.text.split(' ');
    
    if (method === 'view') {
        const header = ':star: Telrad Sim Configuration'
        const result = await telrad.getSimConfig(imsi)

        return views.telradDefaultBlocks(command, result, header)
    }

    else if (method === 'delete') {
        const header = ':fire: Telrad Sim Configuration Delete'
        const result = await telrad.deleteSimConfig(imsi)

        return views.telradDeleteBlocks(imsi, command.user_name, result, header)
    }

    else if (method === 'add') {
        const header = ':heavy_plus_sign: Telrad Add Sim Configuration'
        const result = await telrad.addSimConfig(imsi);

        return views.telradDefaultBlocks(command, result, header)
    }

    else if (method === 'activate') {
        const header = ':heavy_check_mark: Telrad Sim Activate';
        const result = await telrad.updateActive(imsi, true);

        return views.telradDefaultBlocks(command, result, header)
    }

    else if (method === 'deactivate') {
        const header = ':no_entry_sign: Telrad Sim Deactivate'
        const result = await telrad.updateActive(imsi, false);

        return views.telradDefaultBlocks(command, result, header)
    }

    else if (method === 'speed') {
        const header = ':memo: Telrad Update Sim Speed'

        if (option.includes('50')) option = '50x2'
        else if (option.includes('100')) option = '100x10'
        else option = '25x2'

        const result = await telrad.updateSpeed(imsi, option);

        return views.telradDefaultBlocks(command, result, header)
    }
}


module.exports = { telradProcessor }