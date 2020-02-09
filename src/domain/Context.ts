import { Threshold, TrafficData } from "./Types";
import { Parameter } from "./Parameter";

type ContextData = {
  timeTrigger: number,
  param: Parameter,
  nextContext: string,
}

/**
 * Maintain lifecycle and state of context.
 */
export class Context {
  contextMap: Map<string, ContextData>
  currentContext: ContextData

  constructor(contextMap: Map<string, ContextData>, initialContext: string) {
    this.contextMap = contextMap;
    const selectedContext = this.contextMap.get(initialContext);
    if (typeof selectedContext === 'undefined') throw new Error("Context doesn't exist");
    this.currentContext = selectedContext;
  }

  public getThreshold(): Threshold {
    return {
      velocity: 0,
      intensity: 0
    }
  }

  public needRecalculate(data: TrafficData[]): boolean {
    let result;
    result = this.currentContext?.param.isAccurate(data);
    if (typeof result === 'undefined') {
      throw new Error("Context key or value doesn't exist");
    }
    return result;
  }

  public setContext(contextName: string) {
    const context = this.contextMap.get(contextName);
    if (typeof context === "undefined") throw new Error("Context doesn't exist");
    this.currentContext = context;
  }

  public needToChangeContext(timeTrigger: number): boolean {
    let nextContext = this.contextMap.get(this.currentContext.nextContext);
    if (typeof nextContext?.timeTrigger === "undefined") throw new Error("Context doesn't exist");
    return timeTrigger > nextContext?.timeTrigger;
  }
}
