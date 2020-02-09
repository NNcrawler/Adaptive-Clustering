// Type definitions for [~k-means-cluster~]
// Project: [~THE PROJECT NAME~]
// Definitions by: [~YOUR NAME~] <[~A URL FOR YOU~]>

// export = KMeans;

type TwoDVector = {
  x: number,
  y: number
}

type Clusters = Map<TwoDVector, TwoDVector[]>;

type Output = {
  clusters: Clusters,
  centroids: TwoDVector[]
}

declare module "k-means-cluster" {

  export function kMeans(nCluster: number, data: TwoDVector[], options?: any): Output;
  export function shilouteIndex(clusters: Clusters, centroid: TwoDVector): number;
  export function clusterData(centroids: TwoDVector[], data: TwoDVector[]): Clusters;
}
