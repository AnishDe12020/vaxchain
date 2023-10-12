"use client"

import { forwardRef, HTMLAttributes, useRef, useState } from "react"
import { truncatePubkey } from "@/utils/truncate"
import html2canvas from "html2canvas"
import { CopyIcon, DownloadIcon, QrCodeIcon } from "lucide-react"
import { toast } from "sonner"

import { Button } from "../ui/button"
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog"
import QRCode from "./qr"

interface QRModalProps extends HTMLAttributes<HTMLButtonElement> {
  content: string
}

const QRModal = forwardRef<HTMLButtonElement, QRModalProps>(
  ({ content, children, ...props }, ref) => {
    const [isOpen, setIsOpen] = useState(false)

    const qrRef = useRef<HTMLDivElement>(null)

    return (
      <>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button ref={ref} {...props} size="sm">
              {children ?? <QrCodeIcon className="w-4 h-4" />}
            </Button>
          </DialogTrigger>

          <DialogContent className="w-96">
            <div className="flex flex-col items-center justify-center">
              <QRCode content={content} qrRef={qrRef} />

              <div className="flex items-center gap-4">
                <Button
                  onClick={() => {
                    navigator.clipboard.writeText(content)
                    toast.success("Copied to clipboard")
                  }}
                  variant="secondary"
                  className="mt-6"
                >
                  <CopyIcon className="w-4 h-4 mr-2" />
                  <span>{truncatePubkey(content)}</span>
                </Button>

                <Button
                  onClick={async () => {
                    const element = qrRef.current
                    if (!element) return
                    const canvas = await html2canvas(element)

                    const data = canvas.toDataURL("image/jpg")
                    const link = document.createElement("a")

                    if (typeof link.download === "string") {
                      link.href = data
                      link.download = `qr-${content}.jpg`

                      document.body.appendChild(link)
                      link.click()
                      document.body.removeChild(link)
                    } else {
                      window.open(data)
                    }

                    toast.success("Copied to clipboard")
                  }}
                  variant="secondary"
                  className="mt-6"
                >
                  <DownloadIcon className="w-4 h-4 mr-2" />
                  <span>Download</span>
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </>
    )
  }
)

export default QRModal
