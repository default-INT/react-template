import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { Button } from '@/components/Button';
import styles from './styles.scss';

const formatTime = (ms: number): string => {
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  const milliseconds = Math.floor(ms % 1000);

  const mm = String(minutes).padStart(2, '0');
  const ss = String(seconds).padStart(2, '0');
  const mmm = String(milliseconds).padStart(3, '0');

  return `${mm}:${ss}.${mmm}`;
};

const FRAME_REFRESH_LIMIT = 100;

export const Timer = memo(() => {
  const [time, setTime] = useState(0);
  const [isStarted, setIsStarted] = useState(false);

  const startedTimeRef = useRef<number | null>(null);
  const requestFrameIdRef = useRef<number | null>(null);
  const offsetRef = useRef<number>(0);

  const lastUpdateRef = useRef<number>(0);

  const timerTick = useCallback(() => {
    if (!startedTimeRef.current) return;

    const nowPerf = performance.now();

    if (nowPerf - lastUpdateRef.current >= FRAME_REFRESH_LIMIT) {
      const now = Date.now();
      const diff = now - startedTimeRef.current + offsetRef.current;
      setTime(diff);
      lastUpdateRef.current = nowPerf;
    }

    requestFrameIdRef.current = requestAnimationFrame(timerTick);
  }, []);

  const handleStart = useCallback(() => {
    if (isStarted) return;

    startedTimeRef.current = Date.now();
    lastUpdateRef.current = performance.now();
    requestFrameIdRef.current = requestAnimationFrame(timerTick);
    setIsStarted(true);
  }, [isStarted, timerTick]);

  const handlePause = useCallback(() => {
    if (!isStarted || !requestFrameIdRef.current) return;

    cancelAnimationFrame(requestFrameIdRef.current);
    startedTimeRef.current = null;
    offsetRef.current = time;
    setIsStarted(false);
  }, [isStarted, time]);

  const handleReset = useCallback(() => {
    if (requestFrameIdRef.current) cancelAnimationFrame(requestFrameIdRef.current);
    startedTimeRef.current = null;
    offsetRef.current = 0;
    setTime(0);
    setIsStarted(false);
  }, []);

  useEffect(() => () => {
    if (!requestFrameIdRef.current) return;

    cancelAnimationFrame(requestFrameIdRef.current);
  }, []);

  return (
    <div className={styles.timer}>
      <span className={styles.counter}>{formatTime(time)}</span>
      <div className={styles.actions}>
        <Button
          onClick={isStarted ? handlePause : handleStart}
        >
          {isStarted ? 'Pause' : 'Start'}
        </Button>
        <Button onClick={handleReset}>Reset</Button>
      </div>
    </div>
  );
});

Timer.displayName = 'Timer';
