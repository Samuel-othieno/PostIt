import "./App.css";
import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import Register from "./Components/Register";
import Group from "./Components/Group";
import MessagesList from "./Components/Messages/Group message List";
// import Register from "./Components/Register";

function App() {
  return (
    <MantineProvider>
      {
        <>
          <Register />
          <Group/>
          <MessagesList/>
        </>
      }
    </MantineProvider>
  );
}

export default App;
