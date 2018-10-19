module.exports = {

    MinQualificationLevel : 1,                      // Min  Rank for Oppy Qualification level
    MaxQualificationLevel : 5,                      // Max  Rank for Oppy Qualification level

    MinOppyValueVariationPercentage : -50,          // lowerbound variation between oppy teorical and real value (percentage)
    MaxOppyValueVariationPercentage : 15,           // upperbound variation between oppy teorical and real value (percentage)

    NonLinearRandomCurves : [10, 5, 1, 0.2, 0.01],  // Power to the random base number to obtain different non linear curves
    NumberOfSkillPerPerson : 10,

    MinTrendScore : 50,
    MaxTrendScore : 100
}