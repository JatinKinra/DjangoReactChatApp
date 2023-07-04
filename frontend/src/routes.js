import React from "react";
import { Routes, Route } from "react-router-dom";

import Chat from "./containers/Chat";
import Hoc from "./hoc/hoc";

const BaseRouter = () => (
  <Hoc>
    <Routes>
      <Route exact path="/:chatID/" element={<Chat />} />
    </Routes>
  </Hoc>
);

export default BaseRouter;