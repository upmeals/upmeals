export default interface DirectusUsersCreate {
    data: {
        email: string,
        provider: string,
        status: string,
    }
    |
    Array<{
        email: string,
        provider: string,
        status: string,
    }>,
    fields?: string
}