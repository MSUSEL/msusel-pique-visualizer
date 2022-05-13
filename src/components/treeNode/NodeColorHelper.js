/*
    "Paraphrased" code from Xuying's PIQUE-lite for the color code - thanks Xuying!
 */


const Severe = {
    name: 'Severe',
    color: '#cb0032'
}
const High = {
    name: 'High',
    color: '#ff6500'
};
const Elevated = {
    name: 'Elevated',
    color: '#fde101'
};
const Guarded = {
    name: 'Guarded',
    color: '#3566cd'
};
const Low = {
    name: 'Low',
    color: '#009a66'
}

export default function NodeRiskColor(score) {
    const value = parseFloat(score);
    if (value <= 0.2){
        return Severe.color
    } else if (value <= 0.4){
        return High.color
    }else if (value <= 0.6) {
        return Elevated.color
    }else if (value <= 0.8) {
        return Guarded.color
    }else if (value <= 1.0) {
        return Low.color
    }
    else{
        return "grey"
    }
}