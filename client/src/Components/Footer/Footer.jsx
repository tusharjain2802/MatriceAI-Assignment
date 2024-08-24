const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white p-4 mt-8 shadow-md">
      <div className="container mx-auto text-center">
        &copy; {new Date().getFullYear()} Name
      </div>
    </footer>
  );
};

export default Footer;
