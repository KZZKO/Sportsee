// src/services/api.js

import {
    getUserMainDataMock,
    getUserActivityMock,
    getUserAverageSessionsMock,
    getUserPerformanceMock,
} from "./mock";

// Models
import AverageSessionsModel from "../models/AverageSessionsModel";
import PerformanceModel from "../models/PerformanceModel";

const URL = import.meta.env.VITE_API_URL;
const USE_MOCK = true;


export async function getUserMainData(userId) {
    const data = USE_MOCK
        ? getUserMainDataMock(userId)
        : await fetch(`${URL}/user/${userId}`)
            .then((res) => {
                if (!res.ok) throw new Error("Erreur lors du chargement des données utilisateur");
                return res.json();
            })
            .then((json) => json.data);

    return data;
}


export async function getUserActivity(userId) {
    const data = USE_MOCK
        ? getUserActivityMock(userId)
        : await fetch(`${URL}/user/${userId}/activity`)
            .then((res) => {
                if (!res.ok) throw new Error("Erreur lors du chargement de l'activité utilisateur");
                return res.json();
            })
            .then((json) => json.data);

    return data;
}


export async function getUserAverageSessions(userId) {
    const data = USE_MOCK
        ? getUserAverageSessionsMock(userId)
        : await fetch(`${URL}/user/${userId}/average-sessions`)
            .then((res) => {
                if (!res.ok) throw new Error("Erreur lors du chargement des sessions moyennes");
                return res.json();
            })
            .then((json) => json.data);


    return new AverageSessionsModel(data);
}


export async function getUserPerformance(userId) {
    const data = USE_MOCK
        ? getUserPerformanceMock(userId)
        : await fetch(`${URL}/user/${userId}/performance`)
            .then((res) => {
                if (!res.ok) throw new Error("Erreur lors du chargement des performances utilisateur");
                return res.json();
            })
            .then((json) => json.data);


    return new PerformanceModel(data);
}