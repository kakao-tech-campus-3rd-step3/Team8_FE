import type { Client } from '@stomp/stompjs';

export function getSessionId(client: Client) {
  const url = (client.webSocket as any)._transport.url;
  const match = /\/([^\/]+)\/websocket/.exec(url);
  const sessionId = match ? match[1] : null;
  return sessionId;
}
