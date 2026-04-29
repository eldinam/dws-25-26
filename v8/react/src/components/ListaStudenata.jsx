function ListaStudenata() {
  const studenti = [
    { id: 1, ime: "Ahmed", godine: 20 },
    { id: 2, ime: "Semir", godine: 21 },
    { id: 3, ime: "Martina", godine: 22 },
  ];

  return (
    <ul>
      {studenti.map((student) => (
        <li key={student.id}>
          {student.ime} ({student.godine})
        </li>
      ))}
    </ul>
  );
}

export default ListaStudenata;
