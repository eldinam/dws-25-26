import "./App.css";
import Brojac from "./components/Brojac";
import Korisnici from "./components/Korisnici";
import ListaStudenata from "./components/ListaStudenata";
import PretragaStudenata from "./components/PretragaStudenata";
import PromjenaNaslova from "./components/PromjenaNalova";
import Toggle from "./components/Toggle";
import UnosImena from "./components/UnosImena";
import StudentCard from "./StudentCard";

function App() {
  return (
    <div>
      <h1>Brojac</h1>
      <Brojac />
      <hr></hr>

      <h1>Toggle</h1>
      <Toggle />
      <hr></hr>

      <h1>Unos imena</h1>
      <UnosImena />
      <hr></hr>

      <h1>Lista studenata</h1>
      <StudentCard ime="Eldina" godine={20} smjer="TKN" />
      <StudentCard ime="Adis" godine={23} smjer="IT" />
      <StudentCard ime="Adna" godine={21} smjer="Matematika" />

      <hr></hr>

      <ListaStudenata />
      <hr></hr>
      <PretragaStudenata />
      <hr></hr>
      <PromjenaNaslova />
      <hr></hr>
      <Korisnici />
      <hr></hr>
    </div>
  );
}

export default App;
