const { LoadText } = require('../utility')


module.exports = {
    USER: {
        getAllUsersFromBcts: LoadText(__dirname + '/user/get-all-users-from-bcts.sql'),
        getAllUsers: LoadText(__dirname + '/api-user/get-all-users.sql'),
        getUserTypes: LoadText(__dirname + '/api-user/get-user-types.sql'),
        getUserTypesForMarketer: LoadText(__dirname + '/api-user/get-user-types-for-marketer.sql'),
        getUserInfoById: LoadText(__dirname + '/api-user/get-user-info-by-id.sql'),
        addNewUserInfo: LoadText(__dirname + '/api-user/add-new-user-info.sql'),
        addNewUserInfoFull: LoadText(__dirname + '/api-user/add-new-user-info-full.sql'),
        updateUserInfo: LoadText(__dirname + '/api-user/update-user-info.sql'),
        deleteUserInfo: LoadText(__dirname + '/api-user/delete-user-info.sql'),
        getUserInfoByUserCode: LoadText(__dirname + '/api-user/get-user-info-by-user-code.sql'),
        getUserInfoByPhoneNo: LoadText(__dirname + '/api-user/get-user-info-by-phone-no.sql'),
        updateUserPasswordInfo:LoadText(__dirname + '/api-user/update-user-password-info.sql')
    },
    DRIVER: {
        registerDriver: LoadText(__dirname + '/api-register/register-driver.sql'),
        checkUserExistsAlready: LoadText(__dirname + '/api-register/check-user-exists-already.sql'),
    },
    VOYAGE: {
        loadLastVoyages: LoadText(__dirname + '/voyage/load-last-voyages.sql'),
        getLoadUnloadStatisticsByVoyageId: LoadText(__dirname + '/voyage/get-load-unload-statistics-by-voyageid.sql')
    },
    CAR: {
        getAllCars: LoadText(__dirname + '/api-car/get-all-cars.sql'),
        addNewCarInfo: LoadText(__dirname + '/api-car/add-new-car-info.sql'),
        updateCarInfo: LoadText(__dirname + '/api-car/update-car-info.sql'),
        deleteCarInfo: LoadText(__dirname + '/api-car/delete-car-info.sql'),
    },
    QRLINK: {
        getAllQrLinks: LoadText(__dirname + '/api-qrLink/get-all-qr-links.sql'),
        addNewQrLinkInfo: LoadText(__dirname + '/api-qrLink/add-new-qr-link-info.sql'),
        updateQrLinkInfo: LoadText(__dirname + '/api-qrLink/update-qr-link-info.sql'),
        deleteQrLinkInfo: LoadText(__dirname + '/api-qrLink/delete-qr-link-info.sql'),
    },
    MESSAGETEMPLATE: {
        getAllMessageTemplates: LoadText(__dirname + '/api-messageTemplate/get-all-message-templates.sql'),
        addNewMessageTemplateInfo: LoadText(__dirname + '/api-messageTemplate/add-new-message-template-info.sql'),
        updateMessageTemplateInfo: LoadText(__dirname + '/api-messageTemplate/update-message-template-info.sql'),
        deleteMessageTemplateInfo: LoadText(__dirname + '/api-messageTemplate/delete-message-template-info.sql'),
    },
    USERCARASSIGN: {
        getUserCarAssignInfoBasedOnQrCode: LoadText(__dirname + '/api-userCarAssign/get-user-car-assign-info-based-on-qrCode.sql'),
        getAllUserCarAssignInfo: LoadText(__dirname + '/api-userCarAssign/get-all-user-car-assign-info.sql'),
        addNewAssignInfo: LoadText(__dirname + '/api-userCarAssign/add-new-assign-info.sql')
    },
    USERCARASSIGNMESSAGE: {
        saveMessage: LoadText(__dirname + '/api-userCarAssignMessage/save-message.sql')
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
    APPPREFERENCE: {
        getSetting: LoadText(__dirname + '/appPreference/get-setting.sql')
    }
}