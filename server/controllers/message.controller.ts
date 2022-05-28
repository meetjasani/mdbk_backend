import { Request, Response } from 'express'
import httpStatus from 'http-status';
import { MessageService } from '../services/'

export class MessageController {

    public messageService = new MessageService()

    /**
     * @return Success : data
     * @return Error : {"error": { "code": HTTP_CODE, "message": ERROR_MESSAGE} }
     */
    public getAllMessage = async (req: Request, res: Response): Promise<void> => {
        this.messageService
            .getAllMessage()
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
    public getMessageById = async (req: Request, res: Response): Promise<void> => {
        const Id: number = parseInt(req.params.Id);
        this.messageService
            .getMessageById(Id)
            .then((data) => {
                res.status(httpStatus.OK).send({
                    "status": "success",
                    "data": data[0]
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
     * @param {Id} memberId
     * @return Success : data
     * @return Error : error
     */
  public getMessageByMemberId = async (req: Request, res: Response): Promise<void> => {
    const memberId: number =1;
    this.messageService
        .getMessageById(memberId)
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
    public createMessage = async (req: Request, res: Response): Promise<void> => {
        const { memberId, msg }: { memberId: number, msg: string } = req.body
        const createMessageData = {
            member_id: 1,
           // member_id: memberId,
            message: msg,
        };
        this.messageService
            .createMessage(createMessageData)
            .then((messageData) => {
                res.status(httpStatus.CREATED).send({
                    "status": "success",
                    "message": "Message created successfully!!",
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
    public updateMessage = async (req: Request, res: Response): Promise<void> => {
        const { memberId, msg }: { memberId: number, msg: string } = req.body
        const filter = { where: { id: parseInt(req.params.Id) } }
        const updateMessageData = {
            member_id: memberId,
            message: msg,
        }
        this.messageService
            .updateMessage(updateMessageData, filter)
            .then((data) => {
                res.status(httpStatus.OK).send({
                    "status": "success",
                    "message": 'Message updated successfully!!'
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
     * @param  {Number} req.params.Id
     * @return Success : { result: [1] }
     * @return Error : {"error": { "code": HTTP_CODE, "message": ERROR_MESSAGE} }
     */
    public deleteMessage = async (req: Request, res: Response): Promise<void> => {
        const Id: number = parseInt(req.params.Id);
        const filter: any = { where: { id: Id } }
        this.messageService
            .deleteMessage(filter)
            .then((messageData) => {
                res.status(httpStatus.OK).send({
                    "status": "success",
                    "message": 'Message deleted successfully!!'
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
}