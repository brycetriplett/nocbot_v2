# nocbot_v2
<img src="https://github.com/brycetriplett/nocbot_v2/blob/main/github_pics/overview.png" alt="Alt text" width="600"></img>

## Slack Bot With Important Everyday WISP Network Tools
This application uses the Slack Bolt framework to process slash commands for performing different network tasks. Some of these tasks are:<br>
* Sim card CRUD operations in the Telrad and Ericsson LTE HSS
* Manipulate Radius logins in PPPoE server
* Ping internal management network IP addresses
* Enable and disable tower site power, temperature, and movement sensor alerts

Having these slash commands available in Slack minimizes the time it takes for customer service and tech support teams to complete network related changes and enables tech support to make network related changes while out in the field.

## Effective Error Reporting
<img src="https://github.com/brycetriplett/nocbot_v2/blob/main/github_pics/error.png" alt="Alt text" width="600"></img>

Upon receiving an action cancelling error, a traceback is recorded and sent to a Slack channel dedicated to error logs.

## Wiki
Head to the wiki for information on command usage <br>
https://github.com/brycetriplett/nocbot_v2/wiki
