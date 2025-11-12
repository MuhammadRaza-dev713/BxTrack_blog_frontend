"use client";
import { useEffect } from "react";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import { setCredentials } from "../redux/slices/authSlice";

export default function Providers({ children }) {
  // Rehydrate auth from localStorage on client after mount.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    if (token && user) {
      try {
        const parsed = JSON.parse(user);
        // dispatch directly to the store (we're outside useDispatch here)
        store.dispatch(setCredentials({ token, user: parsed }));
      } catch (e) {
        // ignore parse errors
      }
    }
  }, []);

  return <Provider store={store}>{children}</Provider>;
}
