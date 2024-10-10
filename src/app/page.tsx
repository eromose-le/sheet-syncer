"use client";

import Footer from "./components/Footer";
import Form from "./components/Form";
import Title from "./components/Title";

const App: React.FC = () => {
  return (
    <div className="h-screen w-full">
      <section className="bg-[#F1F4F7] h-[720px] flex items-center justify-center">
        <div className="flex flex-col md:flex-row items-center justify-start md:justify-between h-full w-full md:-mt-14 container-wrapper gap-2 md:gap-[32px]">
          <Title description="Facebook helps you connect and share with the people in your life." />

          <Form />
        </div>
      </section>

      <section className="flex items-center justify-center w-full">
        <Footer />
      </section>
    </div>
  );
};

export default App;
