
import { Typography } from '@material-tailwind/react';


const Footer = () => {
  return (
    <footer className="bg-blue-gray-900 text-white py-3 mt-auto">
      <div className="container mx-auto px-4">
       
        <div className="  text-center">
          <Typography variant="body2">
            &copy; {new Date().getFullYear()} City Central Pharmacy. All rights reserved.
          </Typography>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
