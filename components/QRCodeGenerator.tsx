// components/QRCodeGenerator.tsx
import { useState } from "react";
import QRCode from "qrcode.react";

const QRCodeGenerator = () => {
  const [input, setInput] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">QR Code Generator</h1>
      <input
        type="text"
        value={input}
        onChange={handleInputChange}
        className="border rounded p-2 w-full mb-4"
        placeholder="Enter text or URL"
      />
      {input && (
        <div className="p-4 border rounded bg-gray-100 inline-block">
          <QRCode value={input} size={128} />
        </div>
      )}
    </div>
  );
};

export default QRCodeGenerator;
