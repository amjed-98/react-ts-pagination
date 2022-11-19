type EventType = keyof DocumentEventMap | 'pageChange' | 'fetch';
type Listener<Payload> = (event: CustomEvent<Payload>) => void;

const listenFor = <Payload>(eventType: EventType, listener: Listener<Payload>): (() => void) => {
  document.addEventListener(eventType, listener as EventListener);

  return () => document.removeEventListener(eventType, listener as EventListener);
};

const dispatchEvent = <Payload>(eventType: EventType, payload: Payload): void => {
  const event = new CustomEvent<Payload>(eventType, { detail: payload });

  document.dispatchEvent(event);
};

const unSubscribe = <Payload>(eventType: EventType, listener: Listener<Payload>): void => {
  document.removeEventListener(eventType, listener as EventListener);
};

export { listenFor, dispatchEvent, unSubscribe };
