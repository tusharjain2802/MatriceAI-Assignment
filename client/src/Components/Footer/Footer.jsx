

const Footer = () => {
  return (
    <footer className="bg-[#10163a] text-[#ffffff] text-center p-4 mt-8">
      <div className="font-anton text-lg text-white">
        Matrice.AI
      </div>
      <p className="font-poppins mt-2 text-[#ffffff]">
        © {new Date().getFullYear()} Matrice.AI. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
