/*
    "Paraphrased" code from Xuying's PIQUE-lite for the color code - thanks Xuying!
 */

const Severe = {
    name: 'Severe',
    color: '#E58F8F'
}
const High = {
    name: 'High',
    color: '#EAA27D'
};
const Elevated = {
    name: 'Elevated',
    color: '#E9DB7D'
};
const Guarded = {
    name: 'Guarded',
    color: '#8DB1E0'
};
const Low = {
    name: 'Low',
    color: '#8FBC94'
}

export default function NodeRiskColor(score,scale="normal") {
    const value = parseFloat(score);
    if (scale === "normal") {
        if (value <= 0.2) {
            return Severe.color
        } else if (value <= 0.4) {
            return High.color
        } else if (value <= 0.6) {
            return Elevated.color
        } else if (value <= 0.8) {
            return Guarded.color
        } else if (value <= 1.0) {
            return Low.color
        } else {
            return "grey"
        }
    }
    else if (scale === "diagnostic") {
        if (value <= 0.2) {
            return Low.color
        } else if (value <= 0.5) {
            return Guarded.color
        } else if (value <= 0.8) {
            return Elevated.color
        } else if (value <= 1.5) {
            return High.color
        } else {
            return Severe.color
        }
    }
}