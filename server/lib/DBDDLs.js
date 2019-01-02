module.exports = {

    Opportunities : "CREATE TABLE IF NOT EXISTS `pg_data`.`Opportunities` (   \
        `gameId` VARCHAR(10) NOT NULL,                                  \
        `opportunityId` VARCHAR(45) NOT NULL,                   \
        `companyName` VARCHAR(100) NULL,                         \
        `quarter` VARCHAR(10) NOT NULL,                             \
        `TeoricalValue` DECIMAL NULL,                           \
        `VariationPerc` DECIMAL NULL,                           \
        `RealValue` DECIMAL NULL,                               \
        `QualificationLevel` INT NULL,                          \
        `TTC` INT NULL,                                         \
        `winner` VARCHAR(45) NOT NULL,                                         \
        `Status` VARCHAR(10) NULL,                              \
        PRIMARY KEY (`gameId`, `quarter`, `opportunityId`));",

    Features : "CREATE TABLE IF NOT EXISTS `pg_data`.`features` (             \
        `gameId` VARCHAR(10) NOT NULL,                                  \
        `opportunityId` VARCHAR(45) NOT NULL,                   \
        `quarter` VARCHAR(10) NOT NULL,                             \
        `featureName` VARCHAR(45) NOT NULL,                     \
        `featureScore` INT NULL,                                \
        PRIMARY KEY (`gameId`, `quarter` , `opportunityId`, `featureName`));",
    
    Pretenders : "CREATE TABLE IF NOT EXISTS `pg_data`.`pretenders` (         \
        `gameId` VARCHAR(10) NOT NULL,                                  \
        `opportunityId` VARCHAR(45) NOT NULL,                   \
        `quarter` VARCHAR(10) NOT NULL,                             \
        `companyId` VARCHAR(45) NOT NULL,                       \
        `trendScore` DECIMAL NULL,                              \
        `featureScore` DECIMAL NULL,                            \
        `BA` DECIMAL NULL,                                      \
        `BR` DECIMAL NULL,                                      \
        PRIMARY KEY (`gameId`, `quarter` ,`opportunityId`, `companyId`));",
      
    Trends : "CREATE TABLE IF NOT EXISTS `pg_data`.`trends` (                 \
        `gameId` VARCHAR(10) NOT NULL,                                  \
        `opportunityId` VARCHAR(45) NOT NULL,                   \
        `trend` VARCHAR(45) NOT NULL,                           \
        `quarter` VARCHAR(10) NOT NULL,                             \
        PRIMARY KEY (`gameId`, `opportunityId`, `trend`, `quarter`));",

    OppiesCompleted : "CREATE TABLE IF NOT EXISTS `pg_data`.`oppiesCompleted` (\
        `gameId` VARCHAR(10) NOT NULL,                                  \
        `companyId` VARCHAR(45) NOT NULL,                       \
        `opportunitiesId` VARCHAR(45) NOT NULL,                 \
        `quarter` VARCHAR(10) NOT NULL,                             \
        `ClosedValue` DECIMAL NULL,                             \
        `TTC` DECIMAL NULL,                                     \
        `budget` DECIMAL NULL,                                  \
        `hoursLeft` INT NULL,                                   \
        `idx` INT NULL,                                         \
        `outcome` VARCHAR(15) NULL,                             \
        PRIMARY KEY (`gameId`, `quarter` , `companyId`, `opportunitiesId`));",

    ProductFeatures : "CREATE TABLE IF NOT EXISTS `pg_data`.`productFeatures` (\
        `gameId` VARCHAR(10) NOT NULL,                                  \
        `companyId` VARCHAR(45) NOT NULL,                       \
        `quarter` VARCHAR(10) NOT NULL,                             \
        `productFeatureName` VARCHAR(45) NOT NULL,                  \
        `productFeatureScore` INT NULL,                         \
        PRIMARY KEY (`gameId`, `companyId`, `quarter`, `productFeatureName`));",
        
    PresalesTeam : "CREATE TABLE IF NOT EXISTS `pg_data`.`presalesTeam` (     \
        `gameId` VARCHAR(10) NOT NULL,                                  \
        `quarter` VARCHAR(10) NOT NULL,                             \
        `companyId` VARCHAR(45) NOT NULL,                       \
        `personId` VARCHAR(45) NOT NULL,                        \
        PRIMARY KEY (`gameId`, `quarter`,`companyId`, `personId`));",

    PersonDetails : "CREATE TABLE IF NOT EXISTS `pg_data`.`personDetails` (   \
        `gameId` VARCHAR(10) NOT NULL,                                  \
        `personId` VARCHAR(45) NOT NULL,                        \
        `name` VARCHAR(45) NULL,                                \
        `cost` DECIMAL NULL,                                    \
        `satisfactionLevel` DECIMAL NULL,                       \
        `quarter` VARCHAR(10) NOT NULL,                             \
        PRIMARY KEY (`gameId`, `quarter` , `personId`));",

    PersonTrends : "CREATE TABLE IF NOT EXISTS `pg_data`.`personTrends` (     \
        `gameId` VARCHAR(10) NOT NULL,                                  \
        `personId` VARCHAR(45) NOT NULL,                        \
        `quarter` VARCHAR(10) NOT NULL,                             \
        `trendName` VARCHAR(45) NOT NULL,                       \
        `trendScore` DECIMAL NULL,                              \
        PRIMARY KEY (`gameId`, `quarter` , `personId`, `trendName`));",

    PersonFeatures : "CREATE TABLE IF NOT EXISTS `pg_data`.`personFeatures` ( \
        `gameId` VARCHAR(10) NOT NULL,                                  \
        `personId` VARCHAR(45) NOT NULL,                        \
        `quarter` VARCHAR(10) NOT NULL,                             \
        `featureName` VARCHAR(45) NOT NULL,                     \
        `featureScore` VARCHAR(45) NULL,                        \
        PRIMARY KEY (`gameId`, `quarter` , `personId`, `featureName`));",

    games : "CREATE TABLE IF NOT EXISTS `pg_data`.`games` (     \
        `gameId` VARCHAR(10) NOT NULL,                                  \
        `startGame` DATETIME NULL,                              \
        `endGame` DATETIME NULL,                                \
        `gameInstance` BLOB NULL,                               \
        PRIMARY KEY (`gameId`));"
}