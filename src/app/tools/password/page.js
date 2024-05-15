'use client'
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { useState, useEffect } from 'react';

function generatePassword(length, useUppercase, useNumbers, useSymbols) {
  const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
  const numberChars = '0123456789';
  const symbolChars = '!@#$%^&*()-=_+';

  let chars = lowercaseChars;
  if (useUppercase) chars += uppercaseChars;
  if (useNumbers) chars += numberChars;
  if (useSymbols) chars += symbolChars;

  let password = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    password += chars[randomIndex];
  }

  return password;
}

export default function PasswordGenerator() {
  const [length, setLength] = useState(16);
  const [useUppercase, setUseUppercase] = useState(true);
  const [useNumbers, setUseNumbers] = useState(false);
  const [useSymbols, setUseSymbols] = useState(true);
  const [password, setPassword] = useState('');

  const handleLengthChange = (e) => {
    setLength(e.target.value);
  };

  const handleUppercaseChange = () => {
    setUseUppercase(!useUppercase);
  };

  const handleNumbersChange = () => {
    setUseNumbers(!useNumbers);
  };

  const handleSymbolsChange = () => {
    setUseSymbols(!useSymbols);
  };

  const handleGeneratePassword = () => {
    setPassword(generatePassword(length, useUppercase, useNumbers, useSymbols));
  };

    useEffect(() => {
    handleGeneratePassword();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Password Generator</h1>
      <div className="mb-4">
        <label htmlFor="length" className="mr-2">Length:</label>
        <Input id="length"
          type="number"
          value={length}
          onChange={handleLengthChange} />

      </div>
      <div className="mb-4">
        <Checkbox type="checkbox"
          checked={useUppercase}
          onCheckedChange={handleUppercaseChange}
          id="uppercase"
          className="mr-2"/>

        <label htmlFor="uppercase" className="mr-4">Include Uppercase</label>
        <Checkbox
          type="checkbox"
          checked={useNumbers}
          onCheckedChange={handleNumbersChange}
          id="numbers"
          className="mr-2"
        />
        <label htmlFor="numbers" className="mr-4">Include Numbers</label>
        <Checkbox
          type="checkbox"
          checked={useSymbols}
          onCheckedChange={handleSymbolsChange}
          id="symbols"
          className="mr-2"
        />

        <label htmlFor="symbols">Include Symbols</label>
      </div>
    <Button onClick={handleGeneratePassword}>
        Generate Password
      </Button>
  
      <div className="mt-4">
        <label htmlFor="password" className="mr-2">Password:</label>
        <span id="password" className="border rounded px-2 py-1">{password}</span>
      </div>
    </div>
  );
}
