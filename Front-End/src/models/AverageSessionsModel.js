export default class AverageSessionsModel {
    constructor(data) {
        const days = ["L", "M", "M", "J", "V", "S", "D"];

        this.sessions = data.sessions.map((session, index) => ({
            id: index,
            day: days[index],
            sessionLength: session.sessionLength,
        }));
    }
}