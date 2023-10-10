import React from "react";
import { Box, Button, useDisclosure } from "@/app/chakra";
import History from "./History";

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <div className="flex justify-between items-center p-5">
      <div>
        <h2 className="text-2xl">GitSearch</h2>
      </div>
      <div>
        <button className=" rounded-md bg-green-300 p-2">
        <a href="http://localhost:3000/trending">🔥 Trending Users</a>
        </button>

      </div>
      <Box>
        <Button
          size="md"
          className=" bg-green-300 hover:bg-green-500"
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
