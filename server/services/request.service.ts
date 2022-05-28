import sequelize from '../config/database'
import { QueryTypes } from 'sequelize';
import { Request } from '../models'
import { RequestInput } from '../models/request'

export default class RequestService {
  /**
   * Query for All Records
   * @returns {Promise<QueryResult>}
   */
  public getAllRequest = async (): Promise<any> => {
    return new Promise((resolve, reject) => {
      sequelize
        .query(
          `SELECT * FROM request`,
          { type: QueryTypes.SELECT }
        )
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    });
  };


  /**
   * Query for Get Record 
   * @returns {Promise<QueryResult>}
   */
  public getRequestById = async (id: number): Promise<any> => {
    return new Promise((resolve, reject) => {
      sequelize
        .query(
          `SELECT * FROM request WHERE id = '${id}'`,
          { type: QueryTypes.SELECT }
        )
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    });
  };


  /**
   * @param {object} user
   * @return Success : user object
   * @return Error : DB error
   */
  public createRequest = async (requestData: RequestInput): Promise<any> => {
    return new Promise((resolve, reject) => {
      Request.create(requestData)
        .then((data) => resolve(data))
        .catch((error) => reject(error))
    })
  };


  /**
   * @param {object} clientData
   * @param {filter} filter
   * @return Success : { result: [1] }
   * @return Error : DB error
   */
  public updateRequest = async (requestData: RequestInput, filter: any): Promise<any> => {
    return new Promise((resolve, reject) => {
      Request.update(requestData, filter)
        .then((Data) => {
          resolve(Data)
        }).catch((error) => {
          reject(error);
        });
    });
  };
}