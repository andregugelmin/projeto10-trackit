import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import UserContext from "./contexts/UserContext";
import LoginScreen from "./LoginScreen";
import RegisterScreen from "./RegisterScreen";
import HabitsScreen from "./HabitsScreen";
import TodayScreen from "./TodayScreen";
import HistoryScreen from "./HistoryScreen";

function App() {
  const [token, setToken] = useState("");

  return (
    <UserContext.Provider value={{token, setToken}}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginScreen/>} />
          <Route path="/register" element={<RegisterScreen/>} />
          <Route path="/habits" element={<HabitsScreen/>} />
          <Route path="/today" element={<TodayScreen/>} />
          <Route path="/history" element={<HistoryScreen/>} />
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  )
}

export default App;