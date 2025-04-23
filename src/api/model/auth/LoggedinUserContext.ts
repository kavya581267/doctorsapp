import { Role } from "../enums";
import { AdminDetails, Clinic } from "./Auth";

export class LoggedInUserContext {
  userDetails: AdminDetails
  clinicDetails: Clinic;
  clinicSchedule: string;
  roles: Role[];
  internalUserId: number;
  specialityId?:number
}