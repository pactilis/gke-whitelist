const container = require("@google-cloud/container");
const core = require("@actions/core");

const client = new container.v1.ClusterManagerClient();
const zone = core.getInput("zone");
const clusterId = core.getInput("cluster_id");
const cidr = core.getInput("cidr");
const whitelist = core.getInput("whitelist") === "true";
const name = core.getInput("name");

if (whitelist) {
  performWhitelist(cidr, name).catch((err) => {
    core.setFailed(err);
  });
} else {
  performUnwhitelist(cidr).catch((err) => {
    core.setFailed(err);
  });
}

/**
 * Whitelist a ip address on GKE private cluster master
 * @param {String} ipAddress Ip address to whitelist
 * @param {String} displayName name to give to the entry
 */
async function performWhitelist(ipAddress, displayName) {
  const projectId = await client.getProjectId();
  const request = {
    projectId,
    zone,
    clusterId,
  };
  const [{ masterAuthorizedNetworksConfig }] = await client.getCluster(request);
  return client.updateCluster({
    ...request,
    update: {
      desiredMasterAuthorizedNetworksConfig: {
        ...masterAuthorizedNetworksConfig,
        cidrBlocks: [
          ...masterAuthorizedNetworksConfig.cidrBlocks,
          {
            displayName,
            cidrBlock: `${ipAddress}/32`,
          },
        ],
      },
    },
  });
}

/**
 * Remove a cidr block from GKE private cluster master authorized ranges
 * @param {String} cidrBlock CIDR Block to remove
 */
async function performUnwhitelist(cidrBlock) {
  const projectId = await client.getProjectId();
  const request = {
    projectId,
    zone,
    clusterId,
  };
  const [{ masterAuthorizedNetworksConfig }] = await client.getCluster(request);
  return client.updateCluster({
    ...request,
    update: {
      desiredMasterAuthorizedNetworksConfig: {
        ...masterAuthorizedNetworksConfig,
        cidrBlocks: masterAuthorizedNetworksConfig.cidrBlocks.filter(
          (entry) => entry.cidrBlock !== cidrBlock
        ),
      },
    },
  });
}
