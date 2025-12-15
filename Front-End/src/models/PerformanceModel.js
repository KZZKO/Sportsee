export default class PerformanceModel {
    constructor(data) {
        const kindMapping = {
            1: "Energie",
            2: "Cardio",
            3: "Intensité",
            4: "Vitesse",
            5: "Force",
            6: "Endurance",
        };

        this.data = data.data.map((item) => ({
            subject: kindMapping[item.kind],
            value: item.value,
        }));
    }
}