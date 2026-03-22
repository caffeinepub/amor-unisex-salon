import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Appointment {
    id: bigint;
    service: string;
    date: string;
    name: string;
    time: string;
    submittedBy: Principal;
    email: string;
    notes: string;
    phone: string;
}
export interface backendInterface {
    bookAppointment(name: string, phone: string, email: string, service: string, date: string, time: string, notes: string): Promise<bigint>;
    cancelAppointment(appointmentId: bigint): Promise<void>;
    getAllAppointments(): Promise<Array<Appointment>>;
}
