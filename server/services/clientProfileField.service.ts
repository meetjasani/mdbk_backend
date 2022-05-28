import sequelize from '../config/database'
import { QueryTypes } from 'sequelize';
import { ClientProfileField } from '../models'
import { ClientProfileFieldInput } from '../models/clientProfileField'

export default class ClientProfileFieldService {
  /**
   * @param {object} ClientProfileField
   * @return Success : user object
   * @return Error : DB error
   */
  public createClientProfileField = async (client: [ClientProfileFieldInput]): Promise<any> => {
    return new Promise((resolve, reject) => {
      ClientProfileField.bulkCreate(client)
        .then((data) => {
          resolve(data)
        })
        .catch((error) => reject(error))
    })
  }


  /**
   * @param {filter} filter
   * @return Success : [result:1]
   * @return Error : DB error
   */
  public deleteClientProfileField = async (filter: any): Promise<any> => {
    return new Promise((resolve, reject) => {
      ClientProfileField.destroy(filter)
        .then((Data) => {
          resolve(Data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
}
