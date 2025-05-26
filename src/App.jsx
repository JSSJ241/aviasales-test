import { Filters } from "./components/Filters/Filters.jsx";
import { SortTabs } from "./components/SortTabs/SortTabs.jsx";
import { TicketList } from "./components/TicketList/TicketList.jsx";
import styles from './App.module.css';
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchTickets } from "./components/Tickets/ticketsSlice.js";
import airplaneLogo from './assets/Logo.png'

function App(){

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTickets());
  }, [dispatch]);

  return(
    <div>
      <header className={styles.header}>
        <img src={airplaneLogo} alt="logo" className={styles.logo} />
      </header>

    <div className={styles.wrapper}>
      <aside className={styles.sidebar}>
        <Filters />
      </aside>
      <main className={styles.content}>
        <SortTabs />
        <TicketList />
      </main>
    </div>
    </div>
  );
}

export default App;