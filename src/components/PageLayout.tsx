
import React from "react";

interface PageLayoutProps {
  children: React.ReactNode;
}

const PageLayout = ({ children }: PageLayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto">
        {children}
      </main>
    </div>
  );
};

export default PageLayout;
