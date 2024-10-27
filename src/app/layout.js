// layout.js (Keep this as a server component)
import { SessionWrapper } from "@/components/SessionWrapper";
import "./globals.css"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ClientWrapper from "@/components/ClientWrapper";

export const metadata = {
  title: "Exam Point - Mock Test Platform",
  description: "Exam Point offers a comprehensive mock test platform for O Level, A Level, CCC, ADCA, DCA, CUET, and Tally courses. Practice with real exam simulations, complete with timers to enhance your exam readiness.",
  keywords: "mock tests, test, exam, exam akriti computer, O Level, A Level, CCC, ADCA, DCA, CUET, Tally, exam practice, online exams, real exam simulation, timed tests, Exam Point",
  author: "Satish Maurya",
  "og:title": "Exam Point - Mock Test Platform",
  "og:description": "Prepare for your exams with Exam Point. Get access to mock tests for O Level, A Level, CCC, ADCA, DCA, CUET, and Tally courses.",
  "og:image": "/img/share.png", 
  "og:url": "https://exam.akriticomputer.xyz", 
  "og:type": "website",
  "twitter:card": "summary_large_image",
  "twitter:title": "Exam Point - Mock Test Platform",
  "twitter:description": "Enhance your exam readiness with mock tests for O Level, A Level, CCC, ADCA, DCA, CUET, and Tally courses.",
  "twitter:image": "/img/share.png", 
  icons: {
    icon: "/img/logo.png", 
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
