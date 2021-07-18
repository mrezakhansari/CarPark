const { LoadText } = require('../utility')


module.exports = {
    USER: {
        getAllUsersFromBcts: LoadText(__dirname + '/user/get-all-users-from-bcts.sql')
    },
    VOYAGE: {
        loadLastVoyages: LoadText(__dirname + '/voyage/load-last-voyages.sql'),
        getLoadUnloadStatisticsByVoyageId: LoadText(__dirname + '/voyage/get-load-unload-statistics-by-voyageid.sql')
    },
    CAR:{
        getAllCars: LoadText(__dirname + '/api-car/get-all-cars.sql'),
        addNewCarInfo:LoadText(__dirname + '/api-car/add-new-car-info.sql'),
        updateCarInfo: LoadText(__dirname + '/api-car/update-car-info.sql'),
        deleteCarInfo:LoadText(__dirname + '/api-car/delete-car-info.sql')
    },
    VESSEL: {
        DECK: {
            getCntrInfoForStowage: LoadText(__dirname + '/vessel/deck/get-cntr-info-for-stowage.sql'),
            getListOfCntrsForStowage: LoadText(__dirname + '/vessel/deck/get-list-of-cntrs-for-stowage.sql'),
            getStowageInfoForCntrByVoyage: LoadText(__dirname + '/vessel/deck/get-stowage-info-for-cntr-by-voyage.sql'),
            isOccoupiedBayAddressInVoyage: LoadText(__dirname + '/vessel/deck/is-occoupied-bay-address-in-voyage.sql'),
            saveStowageAndShiftedup: LoadText(__dirname + '/vessel/deck/save-stowage-and-shiftedup.sql'),
            getHatchOperationTypes: LoadText(__dirname + '/vessel/deck/get-hatch-operation-types.sql'),
            getHatchDirection: LoadText(__dirname + '/vessel/deck/get-hatch-directions.sql'),
            saveVesselHatchInfo: LoadText(__dirname + '/vessel/deck/save-vessel-hatch-info.sql'),
            getVesselHatchInfoByVoyage: LoadText(__dirname + '/vessel/deck/get-vessel-hatch-info-by-voyage.sql')
        }
    },
    DAMAGE: {
        getDamageDefinition: LoadText(__dirname + '/damage/get-damage-definition.sql'),
        getDamageInfoByActId: LoadText(__dirname + '/damage/get-damage-info-by-actId.sql'),
        setDamageInfoByActId: LoadText(__dirname + '/damage/set-damage-info-by-actId.sql')
    },
    APPPREFERENCE:{
        getSetting: LoadText(__dirname + '/appPreference/get-setting.sql')
    }
}