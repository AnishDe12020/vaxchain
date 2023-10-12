import { notFound } from "next/navigation"
import { truncatePubkey } from "@/utils/truncate"

import { prisma } from "@/lib/db"
import { Badge } from "@/components/ui/badge"
import QRModal from "@/components/dashboard/qr-modal"

const BatchPage = async ({
  params: { pubkey },
}: {
  params: {
    pubkey: string
  }
}) => {
  const batch = await prisma.batch.findUnique({
    where: {
      pubkey: pubkey,
    },
    include: {
      Vaccine: true,
    },
  })

  if (!batch) {
    return notFound()
  }

  return (
    <>
      <h1 className="text-3xl font-bold">{batch.name}</h1>
      <div className="flex gap-2 items-center">
        <p>{truncatePubkey(batch.pubkey)}</p>
        <QRModal content={batch.pubkey} />
      </div>

      <div className="flex gap-2 mt-4">
        {batch.status === "Manufactured" ? (
          <Badge className="bg-orange-500">Manufactured</Badge>
        ) : batch.status === "ReceivedByDoctor" ? (
          <Badge className="bg-green-500">Sold</Badge>
        ) : (
          <Badge className="bg-yellow-500">Stored</Badge>
        )}

        {batch.tempDefect ? (
          <Badge className="bg-red-500">Defect</Badge>
        ) : (
          <Badge className="bg-green-500">No defect</Badge>
        )}
      </div>

      <div className="flex flex-col gap-2 mt-4">
        <div className="flex gap-2 items-center">
          Manufacturer:
          <div className="flex gap-2 items-center">
            <p>{truncatePubkey(batch.manufacturer)}</p>
            <QRModal content={batch.manufacturer} />
          </div>
        </div>
        <div className="flex gap-2 items-center">
          Distributor:
          {batch.distributor ? (
            <div className="flex gap-2 items-center">
              <p>{truncatePubkey(batch.distributor)}</p>
              <QRModal content={batch.distributor} />
            </div>
          ) : (
            <span>-</span>
          )}
        </div>
        <div className="flex gap-2 items-center">
          Doctor:
          {batch.doctor ? (
            <div className="flex gap-2 items-center">
              <p>{truncatePubkey(batch.doctor)}</p>
              <QRModal content={batch.doctor} />
            </div>
          ) : (
            <span>-</span>
          )}
        </div>

        <p>Quantity: {batch.quantity}</p>
        <p>Price (per piece): {batch.costPerPiece}</p>
        <p>Total Price: {batch.quantity * batch.costPerPiece}</p>
      </div>

      <div className="flex flex-col gap-2 mt-4">
        {batch.Vaccine.map((vaccine) => (
          <div
            className="border rounded-lg bg-card py-2 px-3 flex items-center justify-between"
            key={vaccine.id}
          >
            <span>{vaccine.pubkey}</span>

            <QRModal content={vaccine.pubkey} />
          </div>
        ))}
      </div>
    </>
  )
}

export default BatchPage
