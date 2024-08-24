
const Header = () => {
  return (
    <header className="bg-[#10163a] text-[#ffffff] flex justify-between items-center p-4">
      <div className="text-3xl font-anton text-white">
        Matrice.AI
      </div>
      <nav className="flex space-x-8">
        <a href="/projects" className="font-poppins hover:text-[#6a5fdf]">Projects</a>
        <a href="/tasks" className="font-poppins hover:text-[#6a5fdf]">Tasks</a>
        <a href="/deadlines" className="font-poppins hover:text-[#6a5fdf]">Deadlines</a>
      </nav>
      <div className="flex items-center space-x-4">
        
        <span className="font-poppins text-[#ffffff]">{"user.name"}</span>
      </div>
    </header>
  );
};

export default Header;
