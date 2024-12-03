import { useState, useEffect } from "react";
import "./App.css";
import { getCollection } from "../collectionInstance";
import { DBResponse } from "../messageTypes";
import * as mongoDB from "mongodb";

function App() {
  const [documentList, UpdateDocumentList] = useState("Loading");

  useEffect(async () => {
    let collection: DBResponse = await getCollection();
    if (collection.statusCode === 200) {
      const myColl = collection.response;
      console.log("response received from collection", myColl);
    }
  }, []);

  return (
    <>
      <div>
        <h6>Hello Mongodb , Netlify and vite-react</h6>
      </div>
    </>
  );
}

export default App;
