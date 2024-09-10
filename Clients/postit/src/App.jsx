import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import SignUp from "./Components/SignUpComponents/SignUp";

function App() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      {
        <>
          <div>
            <SignUp />
          </div>
        </>
      }
    </MantineProvider>
  );
}

export default App;
