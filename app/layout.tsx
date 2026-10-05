import type { Metadata } from 'next';
import './globals.css';
export const metadata:Metadata={title:'Food Business | Factory Operations',description:'Private demonstration of connected food manufacturing workflows, digital records and batch traceability.',icons:{icon:'/favicon.svg'}};
export default function RootLayout({children}:Readonly<{children:React.ReactNode}>){return <html lang="en"><body>{children}</body></html>;}
