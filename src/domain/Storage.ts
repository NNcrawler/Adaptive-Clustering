import { TrafficData } from "./Types";

type Timestamp = number;

/**
 * Store historical data.
 */
export class Storage {
  data: Map<Timestamp, TrafficData>;

  constructor() {
    this.data = new Map<Timestamp, TrafficData>();
  }

  public put(timestamp: Timestamp, data: TrafficData) {
    this.data.set(timestamp, data);
  }

  public scan(lowerBoundTimestamp: Timestamp, upperBoundTimestamp: Timestamp): Map<Timestamp, TrafficData> {
    const scanResult = new Map<number, TrafficData>();
    this.data.forEach((trafficData, timestamp) => {
      if (timestamp > lowerBoundTimestamp && timestamp < upperBoundTimestamp) {
        scanResult.set(timestamp, trafficData);
      }
    });

    return scanResult;
  }
}
