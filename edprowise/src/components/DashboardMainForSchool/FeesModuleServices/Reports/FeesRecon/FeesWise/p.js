useEffect(() => {

    const schoolFeesDue = parseFloat(feeBreakdowns['Fees Due-School Fees']?.total || 0);
    const oneTimeFeesDue = parseFloat(feeBreakdowns['Fees Due -One Time']?.total || 0);
    const closingAdvanceNum = parseFloat(closingAdvance || 0);
    const arrearFeesReceivedNum = parseFloat(arrearFeesReceived || 0);

    const totalA = schoolFeesDue + oneTimeFeesDue + closingAdvanceNum + arrearFeesReceivedNum;


    const schoolFeesReceivedNum = parseFloat(schoolFeesReceived || 0);
    const oneTimeFeesReceivedNum = parseFloat(oneTimeFeesReceived || 0);
    const lateAndExcessFeesNum = parseFloat(lateAndExcessFees || 0);
    const feesConcessionNum = parseFloat(feesConcession || 0);
    const openingAdvanceNum = parseFloat(openingAdvance || 0);
    const lossDueToLeftNum = parseFloat(lossDueToLeft || 0);
    const lossDueToLateAdmissionNum = parseFloat(lossDueToLateAdmission || 0);
    const defaulterFeesNum = parseFloat(defaulterFees || 0);

    const totalB = schoolFeesReceivedNum +
        oneTimeFeesReceivedNum +
        lateAndExcessFeesNum +
        feesConcessionNum +
        openingAdvanceNum +
        lossDueToLeftNum +
        lossDueToLateAdmissionNum +
        defaulterFeesNum;

    const differenceAB = totalA - totalB;


    const totalABreakdown = {};

    ['Fees Due-School Fees', 'Fees Due -One Time', 'Arrear Fees Received'].forEach(section => {
        if (feeBreakdowns[section]) {
            Object.entries(feeBreakdowns[section]).forEach(([k, v]) => {
                if (k !== 'total') {
                    totalABreakdown[k] = (totalABreakdown[k] || 0) + parseFloat(v || 0);
                }
            });
        }
    });
    totalABreakdown.total = totalA;


    const totalBBreakdown = {};


    ['School Fees Received', 'Fees Concession'].forEach(section => {
        if (feeBreakdowns[section]) {
            Object.entries(feeBreakdowns[section]).forEach(([k, v]) => {
                if (k !== 'total' && k !== 'lateExcessFee') {
                    totalBBreakdown[k] = (totalBBreakdown[k] || 0) + parseFloat(v || 0);
                }
            });
        }
    });


    if (feeBreakdowns['One Time Fees Received']) {
        Object.entries(feeBreakdowns['One Time Fees Received']).forEach(([k, v]) => {
            if (k !== 'total' && k !== 'lateExcessFee') {
                totalBBreakdown[k] = (totalBBreakdown[k] || 0) + parseFloat(v || 0);
            }
        });
    }


    ['Loss of fees due to left students', 'Loss of fees due to late Admission', 'Defaulter Fees'].forEach(section => {
        if (feeBreakdowns[section]) {
            Object.entries(feeBreakdowns[section]).forEach(([k, v]) => {
                if (k !== 'total') {
                    totalBBreakdown[k] = (totalBBreakdown[k] || 0) + parseFloat(v || 0);
                }
            });
        }
    });


    totalBBreakdown.lateExcessFee = lateAndExcessFeesNum;

    totalBBreakdown.total = totalB;


    const differenceBreakdown = {};
    const allKeys = new Set([
        ...Object.keys(totalABreakdown),
        ...Object.keys(totalBBreakdown)
    ]);

    allKeys.forEach(key => {
        if (key !== 'total') {
            const a = parseFloat(totalABreakdown[key] || 0);
            const b = parseFloat(totalBBreakdown[key] || 0);
            differenceBreakdown[key] = a - b;
        }
    });
    differenceBreakdown.total = differenceAB;


    setFeeBreakdowns(prev => ({
        ...prev,
        'Total (A)': totalABreakdown,
        'Total (B)': totalBBreakdown,
        'Difference (A-B)': differenceBreakdown
    }));

}, [
    feeBreakdowns,
    schoolFeesReceived,
    oneTimeFeesReceived,
    lateAndExcessFees,
    feesConcession,
    openingAdvance,
    closingAdvance,
    arrearFeesReceived,
    lossDueToLeft,
    lossDueToLateAdmission,
    defaulterFees
]);