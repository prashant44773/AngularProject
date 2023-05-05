export class PIS {
    public intPISMasterID;
    public strPISDeviceID;
    public strPISDeviceIMEI;
    public strPISDeviceMake;
    public strPISDeviceModel;
    public intPISSeqID;
    public intParkingLotID;
    public strRemarks;
    public dteWarrantyStartDate;
    public dteWarrantyEndDate;
    public strParkingLotNames;
    public ParkingLot;
    public strWarrantyStartDate;
    public strWarrantyEndDate;
    public ParkingLots;
    public strPISDeviceSimNumber;
    public dteModifiedOn;
    public bActive;
    public bDeleted;
}

export class lotwithID{
    public intParkingLotID ?: number;
    public strParkingLotName ?: string;
}
