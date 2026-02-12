import localFont from "next/font/local";
import Nav from "@/components/nav/Nav";
import BackgroundGraphic from "@/components/background/bg-graphics";
import "./globals.css";
import Footer from "@/components/footer/Footer";
import { AuthProvider } from "@/context/AuthContext";

const geistSans = localFont({
    src: "./fonts/GeistVF.woff",
    variable: "--font-geist-sans",
    weight: "100 900",
});
const geistMono = localFont({
    src: "./fonts/GeistMonoVF.woff",
    variable: "--font-geist-mono",
    weight: "100 900",
});

export const metadata = {
    title: "AllerNote",
    description: "An application for allergy management",
    icons: {
        icon: "/logo.png",
        apple: "/logo.png",
    }
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
        <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
        <AuthProvider>
            <Nav />
            <main className="body-spacing ">
                {children}
            </main>
            <Footer />
        </AuthProvider>
        <div className="fixed bottom-0 right-0 -z-50">
            <BackgroundGraphic />
        </div>
        </body>
        </html>
    );
}
