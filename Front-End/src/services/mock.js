// src/services/mock.js

import {
    USER_MAIN_DATA,
    USER_ACTIVITY,
    USER_AVERAGE_SESSIONS,
    USER_PERFORMANCE,
} from "../data/mockData";

export function getUserMainDataMock(userId) {
    return USER_MAIN_DATA.find((user) => user.id === userId);
}

export function getUserActivityMock(userId) {
    return USER_ACTIVITY.find((user) => user.userId === userId);
}

export function getUserAverageSessionsMock(userId) {
    return USER_AVERAGE_SESSIONS.find((user) => user.userId === userId);
}

export function getUserPerformanceMock(userId) {
    return USER_PERFORMANCE.find((user) => user.userId === userId);
}