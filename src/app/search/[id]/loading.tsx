import React from 'react'
import styles from '@/styles/SearchPage.module.scss'
import componentsStyles from "@/styles/Components.module.scss";

function loading() {
  return (
    <div className={styles.loaderContaier}>
      <div style={{ width: "30%" }} className={componentsStyles.skeleton}></div>
      <div style={{ width: "50%" }} className={componentsStyles.skeleton}></div>
      <div style={{ width: "70%" }} className={componentsStyles.skeleton}></div>
    </div>
  );
}

export default loading