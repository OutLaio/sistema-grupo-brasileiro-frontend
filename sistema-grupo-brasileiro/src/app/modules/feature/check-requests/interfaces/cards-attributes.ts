export interface CardsAttributes {
    id: number;
    title: string;
    status: string;
    collaborator: {
        id: number,
        fullName: string,
        avatar: number
    } | null;
    client: {
        id: number,
        fullName: string,
        avatar: number
    };
}
