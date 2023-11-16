import { useEffect, useState } from "react";
import QRCode from "qrcode";
const QrCode = ({ url, name }) => {
  const [qr, setQr] = useState("");
  const [copyBtnText, setCopyBtnText] = useState("Copy the link");

  const handleCopy = () => {
    navigator.clipboard.writeText(url);
    setCopyBtnText("Copied");
    setTimeout(() => {
      setCopyBtnText("Copy the link");
    }, 3000);
  };

  useEffect(() => {
    QRCode.toDataURL(
      url,
      {
        width: 400,
        color: { dark: "#283618", light: "#606C38" },
        errorCorrectionLevel: "H",
      },
      (err, url) => {
        if (err) {
          console.error(err);
          return;
        }
        setQr(url);
      }
    );
  }, [url]);
  return (
    <div className="text-darkGreen flex flex-col items-center gap-10">
      <h1 className="text-2xl font-semibold text-center">
        Share this QR code to get suggestion
      </h1>
      {qr && (
        <>
          <div className="w-[300px]">
            <img src={qr} alt="QR code" />
          </div>
          <div className="text-3xl flex flex-col gap-5">
            <a
              className={
                "bg-darkGreen text-primary h-fit px-7 py-2 font-helvetica_compressed  "
              }
              href={qr}
              download={`${name}.png`}
            >
              Download the QR Code
            </a>
            <button
              className={
                "bg-green text-primary h-fit px-7 py-2 font-helvetica_compressed  "
              }
              onClick={handleCopy}
            >
              {copyBtnText}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default QrCode;
