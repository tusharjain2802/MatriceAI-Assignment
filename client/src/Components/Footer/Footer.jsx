

const Footer = () => {
  return (
    <footer className="bg-[#10163a] text-[#ffffff] text-center p-4 mt-8">
      <div className="font-anton text-lg text-white">
        ProManage
      </div>
      <p className="font-poppins mt-2 text-[#ffffff]">
        © {new Date().getFullYear()} ProManage. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
