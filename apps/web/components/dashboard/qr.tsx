import { RefObject, useEffect, useRef } from "react"
import QRCodeStyling from "@solana/qr-code-styling"

export const createQR = (
  content: string | URL,
  size = 512,
  backgroundColor = "#ffffff",
  color = "#000000"
) => {
  return new QRCodeStyling({
    type: "svg",
    width: size,
    height: size,
    data: String(content),
    qrOptions: {
      typeNumber: 0,
      mode: "Byte",
      errorCorrectionLevel: "Q",
    },
    backgroundOptions: { color: backgroundColor },
    dotsOptions: { type: "extra-rounded", color },
    cornersSquareOptions: {
      type: "extra-rounded",
      color,
    },
    cornersDotOptions: { type: "square", color },
  })
}

const QRCode = ({
  content,
  qrRef,
}: {
  content: string
  qrRef: RefObject<HTMLDivElement>
}) => {
  useEffect(() => {
    const qr = createQR(content, 256)

    if (qrRef.current) {
      qrRef.current.innerHTML = ""
      qr.append(qrRef.current)
    }
  }, [content])

  return (
    <div className="rounded-lg p-2 bg-white w-fit h-fit">
      <div ref={qrRef} />
    </div>
  )
}

export default QRCode
