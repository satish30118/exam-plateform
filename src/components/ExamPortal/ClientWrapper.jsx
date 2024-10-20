"use client";

import { usePathname } from 'next/navigation';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useEffect } from 'react';
import { toast } from 'react-toastify';

export default function ClientWrapper({ children }) {
  const pathname = usePathname();

  // Hide Navbar and Footer if on /ExamPortal route
  const hideHeaderFooter = pathname.startsWith("/ExamPortal");
  const examMode = pathname.startsWith("/ExamPortal/MCQPortal");

  useEffect(() => {
    const enterFullScreen = () => {
      const docElm = document.documentElement;
      if (!document.fullscreenElement) {  // Only enter fullscreen if not already in it
        if (docElm.requestFullscreen) {
          docElm.requestFullscreen();
        } else if (docElm.mozRequestFullScreen) { // For Firefox
          docElm.mozRequestFullScreen();
        } else if (docElm.webkitRequestFullscreen) { // For Chrome, Safari, and Opera
          docElm.webkitRequestFullscreen();
        } else if (docElm.msRequestFullscreen) { // For IE/Edge
          docElm.msRequestFullscreen();
        }
      }
    };

    const exitFullScreen = () => {
      if (document.fullscreenElement) { // Only exit fullscreen if currently in fullscreen mode
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.mozCancelFullScreen) { // For Firefox
          document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) { // For Chrome, Safari, and Opera
          document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) { // For IE/Edge
          document.msExitFullscreen();
        }
      }
    };

    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        toast.warn("You exited fullscreen mode. Please stay in fullscreen for the exam.");
      }
    };

    if (hideHeaderFooter) {
      enterFullScreen(); // Enter fullscreen when on /ExamPortal
      document.addEventListener("fullscreenchange", handleFullscreenChange);
    }

    return () => {
      if (hideHeaderFooter) {
        exitFullScreen(); // Exit fullscreen when leaving /ExamPortal
        document.removeEventListener("fullscreenchange", handleFullscreenChange);
      }
    };
  }, [examMode]);

  return (
    <>
      {!hideHeaderFooter && <Navbar />}
      {children}
      {!hideHeaderFooter && <Footer />}
    </>
  );
}
