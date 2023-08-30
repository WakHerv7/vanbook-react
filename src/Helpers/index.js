//---------------------------------------------------------
export const calculateAmount = (al, lineType) => {
    let ta = 0;
    al.map(elt => {
        ta += Number(elt[lineType]['amount']);
    })
    return ta
};   
//---------------------------------------------------------