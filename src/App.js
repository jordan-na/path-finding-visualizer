import Sidebar from "./components/sidebar/Sidebar";
import Grid from "./components/Grid/Grid";
import Header from "./components/Header/Header";
import classes from "./App.module.css";

function App() {
   return (
      <div className={classes.app}>
         <Sidebar />
         <main className={classes.main}>
            <Header />
            <Grid />
         </main>
      </div>
   );
}

export default App;
