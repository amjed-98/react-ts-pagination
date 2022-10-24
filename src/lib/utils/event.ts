type EventType = keyof DocumentEventMap | 'pageChange';
type Listener = (event: CustomEvent<number>) => void;

const listenFor = (eventType: EventType, listener: Listener): (() => void) => {
  document.addEventListener(eventType, listener as never);
  return () => document.removeEventListener(eventType, listener as never);
};

const dispatchEvent = <Payload>(eventType: EventType, payload: Payload): void => {
  const event = new CustomEvent<Payload>(eventType, { detail: payload });
  document.dispatchEvent(event);
};

const unSubscribe = (eventType: EventType, listener: Listener): void => {
  document.removeEventListener(eventType, listener as never);
};

export { listenFor, dispatchEvent, unSubscribe };
