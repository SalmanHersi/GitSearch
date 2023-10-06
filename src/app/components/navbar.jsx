import React from "react";
import { Box, Button, Flex, useDisclosure } from "@/app/chakra";
import { Image } from "@/app/global";
import History from "./History";

const Navbar = ({ toggleHistory }) => {
  return (
    <div className="flex justify-between items-center p-5">
      <div>
        <h2 className="text-2xl">Labbers</h2>
      </div>
      <div className="text-2xl cursor-pointer" onClick={toggleHistory}>
        History
      </div>
    </div>
  );
};
export default Navbar;
