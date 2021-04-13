# Whitelist/Unwhitelist ip-range on GKE

This action whitelist or un-whitelist ip/range on GKE private cluster

## Inputs

### `cluster_id`

**Required** Google Cloud Kubernetes Cluster ID.

### `location`

**Required** Google Cloud Kubernetes Cluster Zone/Location.

### `cidr`

**Required** IP range to whitelist or unwhitelist

### `whitelist`

Whether to whitelist or unwhitelist. Default: "true"

### `name`

Display name for the ip range. Default: "Github Action"

## Example usage

You have to make sure `GOOGLE_APPLICATION_CREDENTIALS` is defined, from a previous step for example.
You may use [setup-gcloud](https://github.com/GoogleCloudPlatform/github-actions/tree/master/setup-gcloud) action and `export_default_credentials` parameter to true.

```action
uses: pactilis/gke-whitelist@master
with:
  cluster_id: 'my-cluster-id'
  location: 'my-gcloud-zone'
  cidr: '0.0.0.0/32'
  whitelist: 'true'
```
