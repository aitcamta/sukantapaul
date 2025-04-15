import "react-toastify/dist/ReactToastify.css";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import Header from "../components/Header";
import { GlobalContextProvider } from "../context/Store";
import localFont from "next/font/local";

const DIGIB = localFont({
  src: [
    {
      path: "../../public/assets/fonts/DIGIB.ttf",
    },
  ],
  variable: "--font-DIGIB",
});
export const metadata = {
  title: "Welcome to MLA Sukanta Kumar Paul's Website",
  description:
    "Welcome to MLA Sukanta Kumar Paul's Website. Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={``}>
        <div suppressHydrationWarning={true} className={`${DIGIB.variable}`}>
          <GlobalContextProvider>
            <Header />
            {children}
            <ToastContainer
              position="top-right"
              autoClose={1500}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss={false}
              draggable
              pauseOnHover
              theme="light"
            />
          </GlobalContextProvider>
        </div>
      </body>
    </html>
  );
}
