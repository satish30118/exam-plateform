"use client";

import { usePathname } from 'next/navigation';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useEffect } from 'react';
import { toast } from 'react-toastify';

export default function ClientWrapper({ children }) {
  const pathname = usePathname();
  const hideHeaderFooter = pathname.startsWith("/ExamPortal");


  // useEffect(() => {
  //   // Disable right-click context menu
  //   const handleContextMenu = (e) => {
  //     e.preventDefault();
  //   };

  //   // Disable F12, Ctrl + Shift + I, Ctrl + Shift + C, Ctrl + Shift + J, and Ctrl + U
  //   const handleKeyDown = (e) => {
  //     const isMac = /Mac|iPod|iPhone|iPad/.test(navigator.userAgent);
  //     if (e.key === 'F12' ||
  //       (isMac ? (e.metaKey && e.shiftKey && e.key === 'I') : (e.ctrlKey && e.shiftKey && e.key === 'I')) ||
  //       (isMac ? (e.metaKey && e.shiftKey && e.key === 'C') : (e.ctrlKey && e.shiftKey && e.key === 'C')) ||
  //       (isMac ? (e.metaKey && e.shiftKey && e.key === 'J') : (e.ctrlKey && e.shiftKey && e.key === 'J')) ||
  //       (isMac ? (e.metaKey && e.key === 'U') : (e.ctrlKey && e.key === 'U'))) {
  //       e.preventDefault();
  //     }

  //   };

  //   // Detect window resize to catch DevTools opening via resizing
  //   const handleResize = () => {
  //     if (window.outerWidth - window.innerWidth > 200 || window.outerHeight - window.innerHeight > 200) {
  //       toast.error("DevTools detected. Please close them.");
  //     }
  //   };

  //   // Add event listeners
  //   document.addEventListener('contextmenu', handleContextMenu);
  //   document.addEventListener('keydown', handleKeyDown);
  //   window.addEventListener('resize', handleResize);

  //   // Cleanup the event listeners on component unmount
  //   return () => {
  //     document.removeEventListener('contextmenu', handleContextMenu);
  //     document.removeEventListener('keydown', handleKeyDown);
  //     window.removeEventListener('resize', handleResize);
  //   };
  // }, []);

  return (
    <>
      {!hideHeaderFooter && <Navbar />}
      {children}
      {!hideHeaderFooter && <Footer />}
    </>
  );
}
