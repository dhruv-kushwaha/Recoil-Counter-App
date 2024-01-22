import { RecoilRoot, useRecoilValue, useSetRecoilState } from "recoil";

import { countAtom, evenSelector } from "./store/atoms/count";
import { useState } from "react";

function App() {
  // wrap anyone that wants to use the teleported value inside a provider
  // recoil, redux, Themes in mUI
  // console.log(" app component re-rendered");

  return (
    <div>
      <RecoilRoot>
        <Count />
      </RecoilRoot>
    </div>
  );
}

function Count() {
  // console.log(" count component re-rendered");
  const count = useRecoilValue(countAtom);

  return (
    <div>
      <CountRenderer />
      <Input />
      <Buttons />
    </div>
  );
}

function Input() {
  const [inputValue, setInputValue] = useState("");
  return (
    <div>
      <input
        onChange={(e) => {
          setInputValue(e.target.value);
        }}
        type="text"
      />
    </div>
  );
}

function CountRenderer() {
  // console.log("CountRenderer Reloaded");
  return (
    <div>
      <EvenCountRenderer />
    </div>
  );
}

function EvenCountRenderer() {
  const count = useRecoilValue(countAtom);
  const isEven = useRecoilValue(evenSelector);

  // const isEven = useMemo(() => {
  //   return count % 2 == 0;
  // }, [count]);
  return (
    <div>
      <b>{count}</b>

      {isEven ? "It is EVEN" : ""}
    </div>
  );
}

function Buttons() {
  const setCount = useSetRecoilState(countAtom);
  return (
    <div>
      <button
        onClick={() => {
          setCount((count) => count + 1);
        }}
      >
        Increase
      </button>

      <button
        onClick={() => {
          setCount((count) => count - 1);
        }}
      >
        Decrease
      </button>
    </div>
  );
}

export default App;

// // 2 input boxes
// // title, description
// // todos
// // filter (gym) => atom
// // selector (the current set of todos)
