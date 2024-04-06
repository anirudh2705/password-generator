import React, { useCallback, useEffect, useRef, useState } from "react";

function LandingPage() {
  const [length, setLength] = useState(8);
  const [password, setPassword] = useState("");
  const [charAllowed, setCharAllowed] = useState(false);
  const [numberAllowed, setNumberAllowed] = useState(false);

  const generatePassword = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (charAllowed) str += "!@#$%^&*( ) _+";
    if (numberAllowed) str += "0123456789";

    for (let i = 0; i < length; i++) {
      const char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, charAllowed, numberAllowed]);

  useEffect(() => {
    generatePassword();
  }, [charAllowed, length, numberAllowed]);

  const selectReference = useRef()

  const copyPassswordhandler = () => {
    window.navigator.clipboard.writeText(password)
    selectReference.current?.select()
  }

  return (
    <div className="bg-gray-600 h-screen flex flex-col items-center justify-center">
      <div className="w-[30%] and h-[30%] flex justify-center items-center mx-auto">
        <img className="object-scale-down rounded-lg" src="https://images.ctfassets.net/lzny33ho1g45/password-security-p-img/72f3ab78724796a0990219ee8ed495c7/file.png?w=1520&fm=jpg&q=30&fit=thumb&h=760" alt="" />

      </div>
      <div className=" my-2.5 w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 text-yellow-400 bg-gray-700">
        <h1 className="text-white text-center my-3"> Password Generator </h1>
        <div className="flex shadow runded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            className="outline-none w-full rounded-lg "
            placeholder="Password"
            readOnly
            ref={selectReference}
          />
          <button onClick={copyPassswordhandler} className="outline-none rounded-lg bg-blue-700 text-white px-3 py-0.5 shrink-0">
            copy
          </button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={8}
              max={40}
              value={length}
              className="cursor-pointer"
              onChange={(e) => setLength(e.target.value)}
              
            />
            <label htmlFor="length">Length: {length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkBox"
              defaultChecked={charAllowed}
              onChange={() => setCharAllowed((prev) => !prev)}
            />
            <label htmlFor="charInp">Character</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkBox"
              defaultChecked={numberAllowed}
              onChange={() => setNumberAllowed((prev) => !prev)}
            />
            <label htmlFor="numberInp">Number</label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
