import Header from "@/components/ecommarce/header";
import { ThemeProvider } from "@/components/ecommarce/theme-provider";

const KitabGhorLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider>
      <div className="container ">
        <Header />
      </div>
      <main className="h-[calc(100vh-80px)] overflow-y-auto p-2 lg:p-6">
        {children}
      </main>
    </ThemeProvider>
  );
};

export default KitabGhorLayout;
