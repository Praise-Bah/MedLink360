import "./globals.css";

export const metadata = {
  title: "MedLink Hospital System",
  description: "Modern hospital management platform",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-900">{children}</body>
    </html>
  );
}
