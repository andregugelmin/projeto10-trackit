import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginScreen from "./LoginScreen";
import RegisterScreen from "./RegisterScreen";
import HabitsScreen from "./HabitsScreen";
import TodayScreen from "./TodayScreen";
import HistoryScreen from "./HistoryScreen";

function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginScreen/>} />
        <Route path="/register" element={<RegisterScreen/>} />
        <Route path="/habits" element={<HabitsScreen/>} />
        <Route path="/today" element={<TodayScreen/>} />
        <Route path="/history" element={<HistoryScreen/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;