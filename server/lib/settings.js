

var config = {

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
    improveFeatureMoneyRatio: 10,        /** K€ for each 1% score on a feature */

    meritIncreaseSatisfactionRatio:5,
    retentionBonusSatisfactionRatio:1,

    marketTrendPercentageVariationMin: -7,
    marketTrendPercentageVariationMax: 8,

    oppyTTCRatio:5,   // number of hours for each 5K oppy

    TokenExpirees : 3600,
    secret : "%DMX5@&MW5*caDiGU$$S7D5bGHL#w^FCX5Wap9VJYtr7",

    weighCompetition : {
        Trends : 37,
        Features : 23,
        BA : 24,
        BR : 16
    },

    penaltyDeclineToHire : 10,
    quarterLogFilePath : "qLog/",

    dbConnectionOri : {
        host : 'db_node',
        port : '3306',
        database: 'pg_data',
        user: 'pguser',
        passwd : 'pgpasswd'
    },

    dbConnection : {
        host : 'ves-london.ceohohnitre2.eu-west-2.rds.amazonaws.com',
        port : '3306',
        database: 'pg_data',
        user: 'pbg',
        passwd : 'pbgpasswd'
    },

    QIX : {
        host: 'pbgqix.expovin.it',
        port: 4747,
        QRSPort : 4242,
        ProxyPort: 4243,
        userDir : 'QT',
        userName: 'ptw',
        certsPath : '../certs',
        proxyTketPath : "/qps/pbg/ticket?xrfkey=",
        MAB : "90c257e1-c519-49b6-9a62-3528db0950fa",
        POT : "851550e8-da01-4387-84f3-640886a1d6c2",
        MABOppy : "69fcc214-5b76-4abb-a4d1-bf31136a7e28",
        Tasks : ["90c257e1-c519-49b6-9a62-3528db0950fa", "851550e8-da01-4387-84f3-640886a1d6c2", "69fcc214-5b76-4abb-a4d1-bf31136a7e28"],
        UserIdDef : "85bef0d4-3826-42d7-b559-b80bc966ef21"
    },

    O365Auth : {
        authority: "https://login.microsoftonline.com/common",
        authorize_endpoint: "/oauth2/v2.0/authorize",
        token_endpoint: "/oauth2/v2.0/token",
        client_id:"ad3a107b-6ea0-4ac3-984d-6abd0cc81262",
        client_secret : "retP06^@ehlaRAECIC709=}",
        redirect_uri: "https://itmil-ves/api/v1/users/auth/return", //Redirect URL for Oauth2
        scope: "user.read offline_access"
    },

    MAB : { 
            id: "6812021b-97c6-4110-b049-2f81eb72f59f",
            createdDate: "2018-12-26T22:25:03.726Z",
            modifiedDate: "2018-12-26T22:25:03.726Z",
            modifiedByUserName: "EC2AMAZ-L9N9VC9\\ves",
            value: "MAB",
            definition: {
                id: "7da7be76-ed06-4193-9ce2-483a702f54e2",
                name: "PCB",
                valueType: "Text",
                choiceValues: [
                    "POT",
                    "MAB"
                ],
                privileges: null
            },
            schemaPath: "CustomPropertyValue"      
    },


    POT : {
        id: "3b59bd97-28e2-4065-b5c9-2095d68b1251",
        createdDate: "2019-01-02T10:02:55.999Z",
        modifiedDate: "2019-01-02T10:02:55.999Z",
        modifiedByUserName: "EC2AMAZ-L9N9VC9\\ves",
        value: "POT",
        definition: {
            id: "7da7be76-ed06-4193-9ce2-483a702f54e2",
            name: "PCB",
            valueType: "Text",
            choiceValues: [
                "POT",
                "MAB"
            ],
            privileges: null
        },
        schemaPath: "CustomPropertyValue"
    }


}

module.exports = function(){

    if(process.env.NODE_ENV === "production"){
        console.log("Ambiente di produzione. Cambio parametri");
        config.QIX.host = "pbgqix.expovin.it";
        config.O365Auth.redirect_uri = "https://pbgame.expovin.it/api/v1/users/auth/return";
    }

    return (config);
}