export interface LoginResponse {
    token: string,
    employee: {
        id: 0,
        user: {
            id: 0,
            email: string,
            profile: {
                id: 0,
                description: string
            }
        },
        name: string,
        lastname: string,
        phoneNumber: string,
        sector: string,
        occupation: string,
        agency: string,
        avatar: 0
    }
}
 