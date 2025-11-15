import React from 'react';
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "@/store";
import AppContent from "@/App";

const root = createRoot(document.getElementById("root")!);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <AppContent />
    </Provider>
  </React.StrictMode>
);
