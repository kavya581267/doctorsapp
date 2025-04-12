import { AdminDetails, Clinic } from "./Auth";

export class LoggedInUserContext {
  userDetails: AdminDetails
  clinicDetails: Clinic;
  clinicSchedule: string;
  roles: [];
  internalUserId: number;
}