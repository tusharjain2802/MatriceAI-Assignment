import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-gray-800 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/"><div className="text-lg italic font-bold">
          HEAD <span className='font-semibold not-italic '>HEAD</span>
        </div></Link>
        <nav>
          <Link to="/" className="text-white hover:text-gray-300 mx-2">
            1
          </Link>
          <Link to="/bills" className="text-white hover:text-gray-300 mx-2">
            2
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
