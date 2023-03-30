"use client";

import styles from "@/styles/Main.module.scss";
import { useOutsideClick } from "@/hooks";
import { useRef, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { useRouter } from "next/navigation";
import {  SearchInput } from "@/components/SearchInput";

export default function Home() {

  return (
    <main className={styles.container}>
      <Header />
      <SearchInput />
    </main>
  );
}

const Header = () => {
  return (
    <div className={styles.header}>
      <h2>Wikipedia</h2>
      <h4>The Free Encyclopedia</h4>
    </div>
  );
};

const languages = [
  { name: "HE", value: "he" },
  { name: "EN", value: "en" },
];

const LanguageSelect = () => {
  const [open, setOpen] = useState(false);
  const ref = useRef<any>(null);
  const la = useOutsideClick(ref, () => setOpen(false));
  return (
    <div className={styles.languageSelect} ref={ref}>
      <div
        className={styles.languageSelectSelected}
        onClick={() => setOpen(true)}
      >
        EN
      </div>
      {open && (
        <ul className={styles.languagesSelectList}>
          {languages.map((language) => (
            <li className={styles.languageSelectItem} key={language.value}>
              {language.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
