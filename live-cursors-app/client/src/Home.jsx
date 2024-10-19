import useWebSocket from 'react-use-websocket';
import { useEffect, useRef } from 'react';
import throttle from 'lodash.throttle';

export function Home({ username }) {
  const baseUrl = 'ws://192.168.0.8:8765';
  const { sendJsonMessage } = useWebSocket(baseUrl, {
    queryParams: { username },
  });

  const THROTTLE = 50;
  const sendJsonMessageThrottled = useRef(throttle(sendJsonMessage, THROTTLE));

  useEffect(() => {
    sendJsonMessage({ type: 'init' });
    const handleMouseMove = (event) => {
      sendJsonMessageThrottled.current({
        x: event.clientX,
        y: event.clientY,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [sendJsonMessage, sendJsonMessageThrottled]);

  return <h1>Hello, {username} </h1>;
}
