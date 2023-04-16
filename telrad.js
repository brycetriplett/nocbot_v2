const { xml2js } = require('xml-js');
const axios = require('axios');
const ip = require('netmask');
const sql = require('./sql.js');

require("dotenv").config();


const username = process.env.BREEZEVIEW_USERNAME;
const password = process.env.BREEZEVIEW_PASSWORD;
const hosturl = process.env.BREEZEVIEW_HOSTURL;
const networkSubnet = process.env.BREEZEVIEW_MANAGED_SUBNET;

const auth = 'Basic ' + Buffer.from(`${username}:${password}`).toString('base64');


async function getSimConfig(imsi) {
    return await axios({
        method: 'GET',
        url: `${hosturl}/restconf/data/LTE_COMPACT_NCS_NETWORKING:LTENetwork/LTE_EPC_CENTRALIZED_HSS_CM:HSS/SubscribersList=${imsi}`,

        headers: {
            'Authorization': auth,
        }

    }).then((response) => {
        return xml2js(response.data, {compact: true, ignoreAttributes: true,}).SubscribersList;

    }).catch((err) => {
        throw new Error(err);
    })
}


async function updateSpeed(imsi, speed) {
    return await axios({
        method: 'PATCH',
        url: `${hosturl}/restconf/data/LTE_COMPACT_NCS_NETWORKING:LTENetwork/LTE_EPC_CENTRALIZED_HSS_CM:HSS/SubscribersList=${imsi}`,

        headers: {
            "Content-Type": "application/yang-data+xml",
            'Authorization': auth,
        },
        data:  `
            <SubscribersList>
                <AssociatedGlobalServiceProfileName>${speed}</AssociatedGlobalServiceProfileName>
            </SubscribersList>
        `

    }).then(() => {
        return getSimConfig(imsi);

    }).catch((err) => {
        throw new Error(err);
    })
}


async function updateActive(imsi, active) {
    let value
    if (active === true) {
        value = 'Active';

    }  else if (active === false) {
        value = 'Inactive';

    } else {
        throw new Error('Expected true or false value for active, received something else');
    }

    return await axios({
        method: 'PATCH',
        url: `${hosturl}/restconf/data/LTE_COMPACT_NCS_NETWORKING:LTENetwork/LTE_EPC_CENTRALIZED_HSS_CM:HSS/SubscribersList=${imsi}`,
        headers: {
            "Content-Type": "application/yang-data+xml",
            'Authorization': auth,
        },
        data: `
            <SubscribersList>
                <ImsiActivation>${value}</ImsiActivation>
            </SubscribersList>
        `

    }).then(() => {
        return getSimConfig(imsi);

    }).catch((err) => {
        throw new Error(err);
    })
}


async function deleteSimConfig(imsi) {
    return await axios({
        method: 'DELETE',
        url: `${hosturl}/restconf/data/LTE_COMPACT_NCS_NETWORKING:LTENetwork/LTE_EPC_CENTRALIZED_HSS_CM:HSS/SubscribersList=${imsi}`,
        headers: {
            "Content-Type": "application/yang-data+xml",
            'Authorization': auth,
        },

    }).then((response) => {
        return response.status;

    }).catch((err) => {
        throw new Error(err);
    })
}


async function getUsedIPs() {
    return await axios({
        method: 'GET',
        url: `${hosturl}/restconf/data/LTE_COMPACT_NCS_NETWORKING:LTENetwork/LTE_EPC_CENTRALIZED_HSS_CM:HSS`,

        headers: {
            'Authorization': auth,
        }

    }).then((response) => {
        const jsonData = xml2js(response.data, {compact: true, ignoreAttributes: true,}).HSS.SubscribersList;
        
        let result = []
        jsonData.forEach((item) => {
            if (item.PdnAddressAllocation) {
                result.push(item.PdnAddressAllocation._text);
            }
        })

        return result

    }).catch((err) => {
        throw new Error(err);
    })
}


async function getFreeIP() {
    try {
        const iPBlock = new ip.Netmask(networkSubnet);
        const usedIPs = await getUsedIPs();
        
        let result
        iPBlock.forEach((item) => {
            const lastOctet = item.split('.')[3]

            if (['0', '255'].indexOf(lastOctet)<0 && usedIPs.indexOf(item)<0) {
                result = item
            }
        })

        return result

    } catch (error) {
        throw new Error(error)
    }
}


async function addSimConfig(imsi) {
    try {
        const simData = await sql.getSimData(imsi);
        const freeIP = await getFreeIP();

        await axios({
            method: 'POST',
            url: `${hosturl}/restconf/data/LTE_COMPACT_NCS_NETWORKING:LTENetwork/LTE_EPC_CENTRALIZED_HSS_CM:HSS`,
            headers: {
                'Authorization': auth,
                "Content-Type": "application/yang-data+xml",
            },
            data: `
            <SubscribersList>
                <IMSI>${imsi}</IMSI>
                <AuthenticationKey>${simData.k}</AuthenticationKey>
                <OpcPresent>OPCValueUsed</OpcPresent>
                <OPorOPC>${simData.opc}</OPorOPC>
                <ImsiActivation>Active</ImsiActivation>
                <AssociatedGlobalServiceProfileName>100x10</AssociatedGlobalServiceProfileName>
                <PdnAddressAllocation>${freeIP}</PdnAddressAllocation>
                <AllowedEPCs>all</AllowedEPCs>
            </SubscribersList>
            `
        })

        return getSimConfig(imsi);

    } catch(error) {
        throw new Error(error)
    }
}

module.exports = { getSimConfig, deleteSimConfig, addSimConfig, updateActive, updateSpeed, getUsedIPs, getFreeIP }
