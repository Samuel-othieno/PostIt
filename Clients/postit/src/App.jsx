import "./App.css";
import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import Register from "./Components/Register";
// import Register from "./Components/Register";

function App() {
  return <MantineProvider>{
   <Register/>
    }</MantineProvider>;
}

export default App;
