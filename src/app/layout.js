// layout.js (Keep this as a server component)
import { SessionWrapper } from "@/components/SessionWrapper";
import "./globals.css"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ClientWrapper from "@/components/ClientWrapper";

export const metadata = {
  title: "Exam Point",
  description: "Developed by Satish Maurya",
  icons: {
    icon: "/img/logo.png", // Path to the favicon
  },
};           


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <SessionWrapper>
          <ClientWrapper>{children}</ClientWrapper>
        </SessionWrapper>
        <ToastContainer />
      </body>
    </html>
  );
}
