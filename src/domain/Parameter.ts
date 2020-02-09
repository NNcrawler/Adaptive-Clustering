/// <reference path="../definition/k-means-cluster/index.d.ts"/>
import { TrafficData, Threshold } from "./Types";
import { shilouteIndex, clusterData, kMeans } from "k-means-cluster";

type TwoDVector = {
  x: number,
  y: number
}


/**
 * Calculate threshold and determine accuracy of the threshold using K-means clustering
 */
export class Parameter {
  value: Threshold;

  constructor(value: Threshold) {
    this.value = value;
  }

  public calculateValue(data: TrafficData[]): Threshold {
    const twoDVector = data.map(this.serializer);
    const { centroids } = kMeans(2, twoDVector);
    this.value = this.getThreshold(centroids);

    return this.value;
  }

  public isAccurate(data: TrafficData[]): boolean {
    const twoDVector = data.map((value) => ({
      x: value.velocity,
      y: value.intensity
    }))

    const clusters = clusterData(this.getCentroids(), twoDVector);

    const centroid = {
      x: this.value.velocity,
      y: this.value.intensity
    }
    return shilouteIndex(clusters, centroid) < 0.5;
  }

  public getValue(): Threshold {
    return this.value;
  }

  getCentroids(): TwoDVector[] {
    const lowerIntensityCentroid = this.value.intensity / 2;
    const upperIntensityCentroid = this.value.intensity + lowerIntensityCentroid;

    const lowerVelocityCentroid = this.value.velocity / 2;
    const upperVelocityCentroid = this.value.velocity + lowerVelocityCentroid;

    return [{ x: lowerVelocityCentroid, y: lowerIntensityCentroid }, { x: upperVelocityCentroid, y: upperIntensityCentroid }];
  }

  getThreshold(centroids: TwoDVector[]): Threshold {
    const mean = {
      x: (centroids[0].x + centroids[1].x) / 2,
      y: (centroids[0].y + centroids[1].y) / 2
    }

    return this.deserializer(mean);
  }

  serializer(threshold: Threshold): TwoDVector {
    return {
      x: threshold.velocity,
      y: threshold.intensity
    }
  }

  deserializer(twoDVector: TwoDVector): Threshold {
    return {
      velocity: twoDVector.x,
      intensity: twoDVector.y
    }
  }
}
