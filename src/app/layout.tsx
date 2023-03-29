
import QueryProvider from '@/QueryProvider';
import "@/styles/global.scss"
import "@/styles/reset.scss";
import styles from '@/styles/Components.module.scss'
export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <QueryProvider>
      <html lang="en">
        <body className={styles.layout}>{children}</body>
      </html>
    </QueryProvider>
  );
}
