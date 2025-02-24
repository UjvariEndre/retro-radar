import Sidebar from "./components/layout/Sidebar";
import "./globals.css";

export default function RootLayout() {
  return (
    <html lang="en">
      <body>
        <Sidebar>{<></>}</Sidebar>
      </body>
    </html>
  );
}
