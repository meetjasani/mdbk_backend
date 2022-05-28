import { Request, Response } from 'express'
import httpStatus from 'http-status';
import { RequestService } from '../services'


export class RequestController {

    public requestService = new RequestService()
    /**
     * @return Success : data
     * @return Error : {"error": { "code": HTTP_CODE, "message": ERROR_MESSAGE} }
     */
    public getAllRequest = async (req: Request, res: Response): Promise<void> => {
        this.requestService
            .getAllRequest()
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
    public getRequestById = async (req: Request, res: Response): Promise<void> => {
        const Id = parseInt(req.params.Id);
        this.requestService
            .getRequestById(Id)
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
     * @input : Form( Object ) : req.body
     * @return Success : {departmentName: x,hodId:x,createdAt: x,createdBy: x,updatedAt:x,updatedBy:x}
     * @return Error : {"error": { "code": HTTP_CODE, "message": ERROR_MESSAGE} }
     */
    public createRequest = async (req: Request, res: Response): Promise<void> => {
        const request = req.body

        const createRequestData = {
            from_member_id:3,
           // from_member_id: request.fromMemberId,
            to_member_id: request.toMemberId,
            request_type: request.requestType,
            wage_type: request.wageType,
            amount: request.requestAmount,
            is_negotiable: request.isNegotiable,
            message_id: request.messageId,
            status: request.requestStatus,
        }
        this.requestService
            .createRequest(createRequestData)
            .then((requestData) => {
                res.status(httpStatus.CREATED).send({
                    "status": "success",
                    "message": "Request created successfully!!",
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
    public updateRequest = async (req: Request, res: Response): Promise<void> => {
        const request = req.body
        const filter = { where: { id: parseInt(req.params.Id) } }
        const updateRequestData = {
            from_member_id: request.fromMemberId,
            to_member_id: request.toMemberId,
            request_type: request.requestType,
            wage_type: request.wageType,
            amount: request.requestAmount,
            is_negotiable: request.isNegotiable,
            message_id: request.messageId,
            status: request.requestStatus,
        }
        this.requestService
            .updateRequest(updateRequestData, filter)
            .then((requestData) => {
                res.status(httpStatus.OK).send({
                    "status": "success",
                    "message": 'Request updated successfully!!'
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