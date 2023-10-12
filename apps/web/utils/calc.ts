import { COST_PER_REFRIGERATION_UNIT } from "@/lib/constants"

export const calculateRefrigerationCost = (days: number, temp: number) => {
  if (temp > 283) {
    return days * COST_PER_REFRIGERATION_UNIT * 1
  } else if (temp > 273) {
    return days * COST_PER_REFRIGERATION_UNIT * 10
  } else if (temp > 263) {
    return days * COST_PER_REFRIGERATION_UNIT * 100
  } else {
    return days * COST_PER_REFRIGERATION_UNIT * 1000
  }
}

export const calculateDays = (startDate: Date, endDate: Date) => {
  const days = Math.ceil((endDate.getTime() - startDate.getTime()) / 86400000)

  if (days < 1) {
    return 1
  } else {
    return days
  }
}
