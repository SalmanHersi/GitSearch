import React from "react";
import { Box, Button, useDisclosure } from "@chakra-ui/react";
import History from "./History";

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <div className="flex justify-between items-center p-5">
      <div className=" flex justify-center items-center">
        <a href="http://localhost:3000/
        "> <img src="/imgs/logo4.png" alt="GitSearch Logo" className="w-32"/></a>
       <a href="http://localhost:3000/"><h3 className=" text-3xl">GitSearch</h3></a>
      </div>
      <div>
        <button className="rounded-md bg-green-300 p-2">
          <a href="http://localhost:3000/trending">🔥 Trending Users</a>
        </button>
      </div>
      <div>
        <button className="rounded-md bg-green-300 p-2">
          <a href="http://localhost:3000/repos">🗄️ Find Repos</a>
        </button>
      </div>
      <Box>
        <Button
          size="md"
          className="bg-green-300 hover:bg-green-500"
          onClick={onOpen}
        >
          Search History
        </Button>
      </Box>
      {isOpen && <History isOpen={isOpen} onClose={onClose} />}
    </div>
  );
};

export default Navbar;
