module.exports = {

    wsPort : 1337,

    MinQualificationLevel : 1,                      // Min  Rank for Oppy Qualification level
    MaxQualificationLevel : 5,                      // Max  Rank for Oppy Qualification level

    MinOppyValueVariationPercentage : -50,          // lowerbound variation between oppy teorical and real value (percentage)
    MaxOppyValueVariationPercentage : 15,           // upperbound variation between oppy teorical and real value (percentage)

    MinOpportunityCost : 4,
    MaxOpportunityCost: 25,

    NonLinearRandomCurves : [10, 5, 1, 0.2, 0.01],  // Power to the random base number to obtain different non linear curves
    NumberOfFeaturesPerPerson : 5,
    NumberOfTrendsPerPerson: 10,
    NumberOfSkillPerPerson: 10,
    NumberOfFeaturesPerOppy : 3,

    minSatisfactionLevel : 1,
    initSatisfactionLevel : 50,
    maxSatisfactionLevel : 100,
    CostSatisfactionModifier : 50,
    decSatisfactionQuarterPerc: 5,

    MinTrendScore : 35,
    MaxTrendScore : 100,
    TrendWeight : [8, 4, 2],
    FeatureWeigh : [8, 4, 2],

    MinFeatureScore : 50,
    MaxFeatureScore: 100,

    MinFeatureScore : 20,
    MaxFeatureScore : 100,
    
    MinSkillScore : 0,
    MaxSkillScore : 100,
    timePerQuarterPerPerson:240,
    
    /** Presales Cost in K€*/
    MinCost : 50,
    MaxCost : 100,
    
    TrendsComponentPercentage : 45,
    FeatureComponentPercentage : 20,
    skill : {
        'Business Acumen' : 20,
        'Willing to Learn' : 10,
        'Team worker' : 10
    },

    companyInitialBudget : 1000,
    companyInitialbrendRecognition : 0,

    campainUpperValueCostOnly: 10,
    campainCostBrandRatio : 5,
    campainCostHourRatio : 2,
    campainOverflow : 0.1,
    decreaseBrandperQuarterPerc:5,

    initRecursuveQuartelyCost: 50,
    BAMinitialHourCost : 80,
    BAMrecursiveHourQuartelyCost : 25,
    BAMSatisfactionLvlImpactPerc: 2,
    TOPSatisfactionLvlImpact:1,
    TOPinitialHourCost : 74,
    TOPrecursiveQuartelyHourCost: 22,

    numberOfProductFeatures : 6,
    featureMinChange : -7,
    featureMaxChange : 7,
    DMaxImprovableFeaturePerQuarter : 5,

    meritIncreaseSatisfactionRatio:5,
    retentionBonusSatisfactionRatio:1,

    marketTrendPercentageVariationMin: -7,
    marketTrendPercentageVariationMax: 8,

    weighCompetition : {
        Trends : 37,
        Features : 23,
        BA : 24,
        BR : 16
    },

    penaltyDeclineToHire : 10,
    quarterLogFilePath : "qLog/"

}