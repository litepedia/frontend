import { SearchInput } from '@/components/SearchInput';
import React from 'react'
import styles from "@/styles/SearchPage.module.scss";

function layout({children}:{children:React.ReactNode}) {
  return (
    <div className={styles.layout}>
      <SearchInput />
      {children}
    </div>
  );
}

export default layout