//Estiak

import Header from "@/components/ecommarce/header";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <div className="container ">
        <Header />
      </div>
      {children}
    </div>
  );
};

export default AuthLayout;
