import { useEffect, useState } from "react";
import { WS_URL } from "../app/config";

export default function useSocket(token: string) {
  const [loading, setLoading] = useState<boolean>(true);
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    if (!token) return;

    const ws = new WebSocket("ws://localhost:8080?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJlNGQ2MGUxNC05NzhhLTQ1ODgtOTE0My00NjE1YzcyNzc1YjciLCJ1c2VybmFtZSI6ImlyaXRpa3lhZGF2QDEyMyIsImlhdCI6MTc2NjkyODQwOX0.cJ2OMwD-837eNx6EYbtG5-HoFZhP8YJZVU7pisN_3Lk");

    ws.onopen = () => {
      setSocket(ws);
      setLoading(false);
    };

  }, [token]);

  return {
    socket,
    loading,
  };
}
