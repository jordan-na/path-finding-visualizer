import Sidebar from "./components/sidebar/Sidebar";
import Grid from "./components/Grid/Grid";
import Header from "./components/Header/Header";
import classes from "./App.module.css";
import Messages from "./components/Messages/Messages";

function App() {

   return (
      <div className={classes.app}>
         <Sidebar />
         <main className={classes.main}>
            <Header />
            <Grid />
         </main>
         <Messages />
      </div>
   );
}

export default App;
