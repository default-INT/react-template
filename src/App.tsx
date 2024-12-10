import { CrossIcon } from '@/assets';
import baseStyles from '@/styles/base.styles.scss';

export const App = () => {
  const text = 'Some text';

  return (
    <div className={baseStyles.pageContainer}>
      <CrossIcon/>
      <div>{text}</div>
    </div>
  );
};
