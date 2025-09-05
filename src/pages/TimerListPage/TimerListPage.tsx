import { useCallback, useState } from 'react';
import { Timer } from '@/components/Timer';
import baseStyles from '@/styles/base.styles.scss';
import { Button } from '@/components/Button';
import styles from './styles.scss';

export const TimerListPage = () => {
  const [timerList, setTimerList] = useState<string[]>([]);

  const handleAddTimer = useCallback(() => {
    const newTimerId = crypto.randomUUID();
    setTimerList(prev => [...prev, newTimerId]);
  }, []);

  const handleRemoveTimer = useCallback(() => {
    setTimerList(prev => {
      prev.pop();

      return [...prev];
    });
  }, []);

  return (
    <div className={baseStyles.pageContainer}>
      <div className={styles.panel}>
        <Button type='button' onClick={handleAddTimer}>Add</Button>
        <Button type='button' onClick={handleRemoveTimer}>Remove</Button>
      </div>
      <div className={styles.list}>
        {timerList.map(item => <Timer key={item}/>)}
      </div>
    </div>
  );
};
