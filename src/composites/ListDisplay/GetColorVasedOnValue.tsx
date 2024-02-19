
export const getNormalColorBasedOnValue = (value: number) => {
    if (value < 0.2) return '#f3000d80'; 
    else if (value >= 0.2 && value < 0.4) return '#ff9c0080'; 
    else if (value >= 0.4 && value < 0.6) return '#ffee0080'; 
    else if (value >= 0.6 && value < 0.8) return '#008ff580'; 
    else return '#00a43380'; 
  };


export const getDiagnosticColorBasedOnValue = (value: number) => {
  if (value < 0.2) return '#00a43380'; 
  else if (value >= 0.2 && value < 0.5) return '#008ff580'; 
  else if (value >= 0.5 && value < 0.8) return '#ffee0080'; 
  else if (value >= 0.8 && value < .5) return '#ff9c0080'; 
  else return '#f3000d80'; 
};
