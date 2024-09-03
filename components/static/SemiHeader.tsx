// components/Header.tsx
import { color } from 'chart.js/helpers';
import Link from 'next/link';
import styles from "./static.module.css";

interface props {
    children: React.ReactNode;
}

const SemiHeader: React.FC<props> = ({children}) => {
  return (
    <header className={styles.semi_header}>
      <div className={styles.semi_header}>
        {children}
      </div>
    </header>
  );
};

export default SemiHeader;
