import React from "react";
import { Box, Button, useDisclosure } from "@chakra-ui/react";
import History from "./History";
import Image from 'next/image'

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <div className="flex flex-col justify-between items-center p-5 space-y-5 mx-auto text-center lg:flex-row">
      <div className=" flex justify-center items-center">
        <a href="/
        "> <Image src="/imgs/logo4.png" alt="GitSearch Logo" width={100} height={100}/></a>
       <a href="http://localhost:3000/"><h3 className=" text-3xl text-white">GitSearch</h3></a>
      </div>
      <div>
        <button className="rounded-md py-2 px-4 text-gray-100 bg-gray-600 hover:bg-gray-700 focus:outline-none">
          <a href="/trending">🔥 Trending Users</a>
        </button>
      </div>
      <div className="">
        <button className="rounded-md py-2 px-4 text-gray-100 bg-gray-600 hover:bg-gray-700  focus:outline-none">
          <a href="/repos">🗄️ Find Repos</a>
        </button>
      </div>
      <Box>
        <Button
          className="rounded-md py-2 px-4 text-gray-100 bg-orange-500 hover:bg-gray-700 focus:outline-none"
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
