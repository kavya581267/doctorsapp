import { DayOfWeek } from "../enums"

export class ClinicSchedule {
    dayOfWeek: DayOfWeek
    openTime: string
    closeTime: string
    isClosed: boolean = false
}

export class ClinicScheduleUpdate {
    dayOfWeek: DayOfWeek
    openTime: string
    closeTime: string
    isClosed: boolean
}

export class ClinicScheduleResponse extends ClinicSchedule {
    clinicId: number
    id: number
    createdAt: string
    updatedAt: string
}