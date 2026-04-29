import { useEffect, useState } from "react";

function PromjenaNaslova() {
  const [brojKlikova, setBrojKlikova] = useState(0);

  useEffect(() => {
    document.title = `Klikova: ${brojKlikova}`;
  }, [brojKlikova]);

  return (
    <button onClick={() => setBrojKlikova(brojKlikova + 1)}>
      Klikni me ({brojKlikova})
    </button>
  );
}

export default PromjenaNaslova;
