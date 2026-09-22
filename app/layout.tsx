import Providers from "./providers";
import ClientLayout from "./components/ClientLayout";
import "./globals.css";

export const metadata = {
  title: "Project Tracker",
  description: "Track your projects",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <ClientLayout>
            {children}
          </ClientLayout>
        </Providers>
      </body>
    </html>
  );
}