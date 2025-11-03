const URL = import.meta.env.VITE_API_URL;

export async function getUserMainData(userId) {
    const response = await fetch(`${URL}/user/${userId}`);
    if (!response.ok) throw new Error('Erreur lors du chargement des données utilisateur');
    const result = await response.json();
    return result.data;
}

export async function getUserActivity(userId) {
    const response = await fetch(`${URL}/user/${userId}/activity`);
    if (!response.ok) throw new Error("Erreur lors du chargement de l'activité utilisateur");
    const result = await response.json();
    return result.data;
}

export async function getUserAverageSessions(userId) {
    const response = await fetch(`${URL}/user/${userId}/average-sessions`);
    if (!response.ok) throw new Error("Erreur lors du chargement des sessions moyennes");
    const result = await response.json();
    return result.data;
}

export async function getUserPerformance(userId) {
    const response = await fetch(`${URL}/user/${userId}/performance`);
    if (!response.ok) throw new Error("Erreur lors du chargement des performances utilisateur");
    const result = await response.json();
    return result.data;
}