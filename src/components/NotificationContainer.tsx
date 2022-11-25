import React, { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { listen } from "@tauri-apps/api/event";
import "react-toastify/dist/ReactToastify.css";

interface ErrorPayload {
  message: string;
}

export const NotificationContainer = () => {
  useEffect(() => {
    const unlisten = listen<ErrorPayload>(
      "error",
      ({ payload: { message } }) => {
        toast.error(message);
      }
    );

    return () => {
      unlisten.then((f) => f());
    };
  }, []);

  return <ToastContainer theme="dark" position="top-left" />;
};
