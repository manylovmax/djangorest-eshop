// import React, { useState } from "react";
// import axios from "axios";

import { useAuth } from "../hooks/useAuth";

// import constants from "../../constants";


export default function AccountPage() {
  const { logout } = useAuth();
  
  return (
    <div>
      <button onClick={logout} className="btn btn-danger">Выйти</button>
    </div>
  );
};