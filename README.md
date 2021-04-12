# Whitelist/Unwhitelist ip-range on GKE

This action whitelistor un-whitelist ip/range on GKE private cluster

## Inputs

### `cluster_id`

**Required** Google Cloud Kubernetes Cluster ID.

### `whitelist`

Whether to whitelist or the other way arround. Default: "true"

### `cidr`

**Required** Ip range to whitelist or unwhitelist

### `name`

Display name for the ip range. Default: "Github Action"

## Example usage

You have to make sure `GOOGLE_APPLICATION_CREDENTIALS` is defined, from a previous step for example.
You may use [setup-gcloud](https://github.com/GoogleCloudPlatform/github-actions/tree/master/setup-gcloud) action and `export_default_credentials` parameter to true.

```action
uses: pactilis/gke-whitelist@master
with:
  zone: 'my-gcloud-zone'
  cluster_id: 'my-cluster-id'
  whitelist: 'true'
  cidr: '0.0.0.0/32'
```
