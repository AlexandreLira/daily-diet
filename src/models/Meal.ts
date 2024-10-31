export interface IMeal {
    id: number;
    name: string;
    description: string;
    date: Date;
    diet: boolean;
    created_at: Date;
    updated_at: Date;
}

export type IMealCreate = Pick<IMeal, 'name' | 'date' | 'diet' | 'description'>
export type IMealUpdate = Partial<Pick<IMeal, 'name' | 'date' | 'diet' | 'description'>> & Pick<IMeal, 'id'>