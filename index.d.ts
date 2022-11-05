declare module "@vertx/eventbus-bridge-client.js" {
  import type { CloseEvent } from "sockjs-client";

  export interface EventBusOptions {
    vertxbus_ping_interval?: number;
    vertxbus_reconnect_attempts_max?: number;
    vertxbus_reconnect_delay_min?: number;
    vertxbus_reconnect_delay_max?: number;
    vertxbus_reconnect_exponent?: number;
    vertxbus_randomization_factor?: number;
  }

  export type EventBusHeaders = unknown;

  export interface EventBusError {
    failureCode: number;
    failureType: string;
    message: string;
  }

  export interface EventBusMessage<T> {
    type: string;
    address: string;
    body: T;
  }

  export type EventBusCallback<T> = (
    error: EventBusError | null,
    message: EventBusMessage<T>,
  ) => void;

  export default class EventBus {
    constructor(url: string, options?: EventBusOptions);

    onopen?: () => void;

    onreconnect?: () => void;

    onclose?: (e: CloseEvent) => void;

    onerror<T>(e: T): void;

    onevent: <T>(event: string, message: T) => boolean;

    send<TMessage, TCallback>(
      address: string,
      message: TMessage,
      headers?: EventBusHeaders,
      callback?: EventBusCallback<TCallback>,
    ): void;

    publish<TMessage>(
      address: string,
      message: TMessage,
      headers?: EventBusHeaders,
    ): void;

    registerHandler<TCallback>(
      address: string,
      headers: EventBusHeaders,
      callback: EventBusCallback<TCallback>,
    ): void;
    registerHandler<TCallback>(
      address: string,
      callback: EventBusCallback<TCallback>,
    ): void;

    unregisterHandler<TCallback>(
      address: string,
      headers: EventBusHeaders,
      callback: EventBusCallback<TCallback>,
    ): void;
    unregisterHandler<T>(address: string, callback: EventBusCallback<T>): void;

    close(): void;

    enablePing(enable: boolean): void;

    enableReconnect(enable: boolean): void;

    readonly pingInterval: number;
    readonly reconnectEnabled: boolean;
    readonly reconnectAttempts: number;
    readonly maxReconnectAttempts: number;
    readonly reconnectDelayMin: number;
    readonly reconnectDelayMax: number;
    readonly reconnectExponent: number;
    readonly randomizationFactor: number;
  }
}
