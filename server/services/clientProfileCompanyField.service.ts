import sequelize from '../config/database'
import { QueryTypes } from 'sequelize';
import { ClientProfileCompanyField } from '../models'
import { ClientProfileCompanyFieldInput } from '../models/clientProfileCompanyField'


export default class ClientProfileFieldService {
  /**
   * Query for All Records
   * @returns {Promise<QueryResult>}
   */
  public getAllRecords = async (): Promise<any> => {
    return new Promise((resolve, reject) => {
      sequelize
        .query(
          `SELECT * FROM users`,
          { type: QueryTypes.SELECT }
        )
        .then((data) => resolve(data))
        .catch((error) => reject(error))
    })
  }


  /**
   * Query for Get Record 
   * @returns {Promise<QueryResult>}
   */
  public getRecord = async (id: number): Promise<any> => {
    return new Promise((resolve, reject) => {
      sequelize
        .query(
          `SELECT * FROM users WHERE id = '${id}'`,
          { type: QueryTypes.SELECT }
        )
        .then((data) => resolve(data))
        .catch((error) => reject(error))
    })
  }

  /**
   * @param {object} user
   * @return Success : user object
   * @return Error : DB error
   */
  public createClientProfileCompanyField = async (client: [ClientProfileCompanyFieldInput]): Promise<any> => {
    return new Promise((resolve, reject) => {
      ClientProfileCompanyField.bulkCreate(client)
        .then((data) => resolve(data))
        .catch((error) => reject(error))
    })
  }

  /**
   * @param {filter} filter
   * @return Success : [result:1]
   * @return Error : DB error
   */
  public deleteClientProfileCompanyField = async (filter: any): Promise<any> => {
    return new Promise((resolve, reject) => {
      ClientProfileCompanyField.destroy(filter)
        .then((Data) => {
          resolve(Data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
}