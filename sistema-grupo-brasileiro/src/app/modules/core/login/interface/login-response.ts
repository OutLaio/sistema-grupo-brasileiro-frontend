export interface LoginResponse {
    token: string,
    employee: {
        id: 0,
        userView: {
            id: 0,
            email: string,
            profileView: {
                id: 0,
                description: string
            }
        },
        name: string,
        lastname: string,
        phonenumber: string,
        sector: string,
        occupation: string,
        agency: string,
        avatar: 0
    }
}
 