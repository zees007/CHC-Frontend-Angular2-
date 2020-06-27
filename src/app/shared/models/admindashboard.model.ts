export class Admindashboard {

  constructor(
    public serial: string,
    public studentName: string,
    public studentFatherName: string,
    public studentDob: string,
    public studentClass: string,
    public studentSchoolName: string,
    public studentContactNumber: string,
    public studentEmail: string,
    public studentAddress: string,
    public feePaid: string,
    public feeBalance: string,
    public registeredDate: string,
    public studentImage: File
) {
}
}
