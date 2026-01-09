import "./globals.css";


export const metadata = {
  title: "MSLR – My Shangri-La Referendum",
  description: "Official referendum voting system for Shangri-La",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 text-gray-900">
        <main className="max-full mx-auto ">
          {children}
        </main>
      </body>
    </html>
  );
}
