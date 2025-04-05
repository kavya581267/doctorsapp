import { DayOfWeek } from "../enums"

export class ClinicSchedule {
    dayOfWeek: DayOfWeek
    openTime: string
    closeTime: string
    isClosed: boolean = false
}