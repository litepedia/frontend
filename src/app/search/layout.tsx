import { SearchInput } from "@/components/SearchInput";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="search-page">
      <SearchInput />
      {children}
    </div>
  );
}
