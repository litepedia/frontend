
import {  SearchInput } from "@/components/SearchInput";

export default function Home() {

  return (
    <main className="main-page container">
      <Header />
      <SearchInput />
    </main>
  );
}

const Header = () => {
  return (
    <div className="main-page-header">
      <h2>Wikipedia</h2>
      <h4>The Free Encyclopedia</h4>
    </div>
  );
};


const languages = [
  { name: "HE", value: "he" },
  { name: "EN", value: "en" },
];

// const LanguageSelect = () => {
//   const [open, setOpen] = useState(false);
//   const ref = useRef<any>(null);
//   const la = useOutsideClick(ref, () => setOpen(false));
//   return (
//     <div className={styles.languageSelect} ref={ref}>
//       <div
//         className={styles.languageSelectSelected}
//         onClick={() => setOpen(true)}
//       >
//         EN
//       </div>
//       {open && (
//         <ul className={styles.languagesSelectList}>
//           {languages.map((language) => (
//             <li className={styles.languageSelectItem} key={language.value}>
//               {language.name}
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };
