export default async function request(
    url: string,
    method: "POST" | "GET",
    body: Record<PropertyKey, unknown>,
    getToken: () => Promise<string | null>
) {
    const token = await getToken();
    return fetch(url, {
        method,
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ body }),
    });
}