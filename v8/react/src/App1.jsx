import "./App.css";

function App() {
  const ime = "Eldina";
  const godine = 33;

  return (
    <div>
      <h1>Hello React</h1>
      <p>Zdravo, {ime}</p>
      <p>Za 10 godina imat ćeš {godine + 10}.</p>
    </div>
  );
}

export default App;
