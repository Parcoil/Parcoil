"use client";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Nav } from "@/components/component/Nav";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Copy } from "lucide-react";
import { toast } from "react-toastify";

const PasswordGenerator = () => {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(8);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);

  const generatePassword = () => {
    const numbers = "1234567890";
    const symbols = "!@#$%^&*()-=_+";

    let characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (includeNumbers) characters += numbers;
    if (includeSymbols) characters += symbols;

    let newPassword = "";
    for (let i = 0; i < length; i++) {
      newPassword += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    setPassword(newPassword);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
    toast.success("Copied Password to clipboard", {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  useEffect(() => {
    generatePassword();
  }, [length, includeNumbers, includeSymbols]);

  return (
    <>
      <Nav />
      <div className="dark:bg-slate-800 dark:text-white flex text-center justify-center items-center center font-bold">
        <div className="">
          <h2 className="text-3xl mb-5">Password Generator</h2>
          <div>
            <Label>Password Length:</Label>
            <Input
              type="number"
              value={length}
              className="mb-5 mt-5"
              onChange={(e) => setLength(e.target.value)}
            />
          </div>
          <div className="mb-5 ">
            <Label>Include Numbers:</Label>
            <Checkbox
              type="checkbox"
              checked={includeNumbers}
              onCheckedChange={() => setIncludeNumbers(!includeNumbers)}
            />
          </div>
          <div className="mb-5 ">
            <Label>Include Symbols:</Label>
            <Checkbox
              type="checkbox"
              checked={includeSymbols}
              onCheckedChange={() => setIncludeSymbols(!includeSymbols)}
            />
          </div>
          <Button onClick={generatePassword}>Generate Password</Button>
          <div>
            <div className="mt-10">
              <Label htmlFor="passwordout" className="font-bold">
                Generated Password:
              </Label>
              <Input
                type="text"
                value={password}
                id="passwordout"
                readOnly
                placeholder="Genarating..."
              />
              <Button className="mt-4" onClick={copyToClipboard}>
                <Copy size={16} className="mr-1" />
                Copy Password
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PasswordGenerator;
