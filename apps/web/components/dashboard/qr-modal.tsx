"use client"

import { forwardRef, HTMLAttributes, useState } from "react"
import { truncatePubkey } from "@/utils/truncate"
import { CopyIcon, QrCodeIcon } from "lucide-react"
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
              <QRCode content={content} />

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
            </div>
          </DialogContent>
        </Dialog>
      </>
    )
  }
)

export default QRModal
