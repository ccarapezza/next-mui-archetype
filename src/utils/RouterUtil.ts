const createQueryString = (params: Array<{ name: string, value: string }>, searchParams: string) => {
    const urlParams = new URLSearchParams(searchParams)
    for (const { name, value } of params) {
        urlParams.set(name, value)
    }
    return urlParams.toString()
}

export default createQueryString;