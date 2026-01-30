import "./styles.css";
import "./ui/app.ts";
import { initI18n } from "./ui/i18n";

// Initialize i18n before the app starts
initI18n().catch((err) => {
  console.error("Failed to initialize i18n:", err);
});
