import { Request, Response } from 'express'
import httpStatus from 'http-status';
import { DistrictService } from '../services'

export class DistrictController {

    public districtService = new DistrictService()
    /**
     * @return Success : data
     * @return Error : {"error": { "code": HTTP_CODE, "message": ERROR_MESSAGE} }
     */
    public getAllDistrict = async (req: Request, res: Response): Promise<void> => {
        this.districtService
            .getAllDistrict()
            .then((data) => {
                res.status(httpStatus.OK).send({
                    "status": "success",
                    "data": data
                });
            }).catch((err) => {
                res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
                    "error": {
                        "status": "failure",
                        "message": err.message
                    }
                });
            });
    };

    /**
     * @param {Id} req.params.Id
     * @return Success : data
     * @return Error : error
     */
    public getDistrictById = async (req: Request, res: Response): Promise<void> => {
        const Id = parseInt(req.params.Id);
        this.districtService
            .getDistrictById(Id)
            .then((data) => {
                res.status(httpStatus.OK).send({
                    "status": "success",
                    "data": data.length > 0 ? data[0] : data
                });
            }).catch((err) => {
                res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
                    "error": {
                        "status": "failure",
                        "message": err.message
                    }
                });
            });
    };


    /**
     * @param {Id} req.params.Id
     * @return Success : data
     * @return Error : error
     */
    public getDistrictByProvinceId = async (req: Request, res: Response): Promise<void> => {
        const Id = parseInt(req.params.Id);
        this.districtService
            .getDistrictByProvinceId(Id)
            .then((data) => {
                res.status(httpStatus.OK).send({
                    "status": "success",
                    "data": data
                });
            }).catch((err) => {
                res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
                    "error": {
                        "status": "failure",
                        "message": err.message
                    }
                });
            });
    };

    /**
     * @input : Form( Object ) : req.body
     * @return Success : {departmentName: x,hodId:x,createdAt: x,createdBy: x,updatedAt:x,updatedBy:x}
     * @return Error : {"error": { "code": HTTP_CODE, "message": ERROR_MESSAGE} }
     */
    public createDistrict = async (req: Request, res: Response): Promise<void> => {
        const { districtName, provinceID }: { districtName: string, provinceID: number } = req.body
        const createDistrictData = {
            name: districtName,
            province_id: provinceID,
        };
        this.districtService
            .createDistrict(createDistrictData)
            .then((districtData) => {
                res.status(httpStatus.CREATED).send({
                    "status": "success",
                    "message": "District created successfully!!",
                });
            }).catch((err) => {
                res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
                    "error": {
                        "status": "failure",
                        "message": err.message
                    }
                });
            });
    }

    /**
     * @input : Form( Object ) : 
     * @return Success : { result: [1] }
     * @return Error : {"error": { "code": HTTP_CODE, "message": ERROR_MESSAGE} }
     */
    public updateDistrict = async (req: Request, res: Response): Promise<void> => {
        const { districtName, provinceID }: { districtName: string, provinceID: number } = req.body
        const filter = { where: { id: parseInt(req.params.Id) } }
        const updateDistrictData = {
            name: districtName,
            province_id: provinceID,
        }
        this.districtService
            .updateDistrict(updateDistrictData, filter)
            .then((districtData) => {
                res.status(httpStatus.OK).send({
                    "status": "success",
                    "message": 'District updated successfully!!'
                });
            }).catch((err) => {
                res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
                    "error": {
                        "status": "failure",
                        "message": err.message
                    }
                });
            });
    }
}