export declare class CreateUserSupplementDto {
    supplementDatabaseId?: number;
    customName?: string;
    form: string;
    dosageAmount: number;
    dosageUnit: string;
    timesPerDay: number;
    schedules: string[];
    active?: boolean;
}
