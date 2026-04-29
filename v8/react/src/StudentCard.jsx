function StudentCard({ ime, godine, smjer }) {
  return (
    <div className="card">
      <h2>{ime}</h2>
      <p>Godine: {godine}</p>
      <p>Smjer: {smjer}</p>
      <hr></hr>
    </div>
  );
}

export default StudentCard;
