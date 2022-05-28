import sequelize from '../config/database'
import { QueryTypes } from 'sequelize';
import { ClientProfileLocation } from '../models'
import { ClientProfileLocationInput } from '../models/clientProfileLocation'

export default class ClientProfileLocationService {
  /**
   * @param {object} user
   * @return Success : user object
   * @return Error : DB error
   */
  public createClientProfileLocation = async (client: [ClientProfileLocationInput]): Promise<any> => {
    return new Promise((resolve, reject) => {
      ClientProfileLocation.bulkCreate(client)
        .then((data) => resolve(data))
        .catch((error) => reject(error))
    })
  }

  /**
   * @param {filter} filter
   * @return Success : [result:1]
   * @return Error : DB error
   */
  public deleteClientProfileLocation = async (filter: any): Promise<any> => {
    return new Promise((resolve, reject) => {
      ClientProfileLocation.destroy(filter)
        .then((Data) => {
          resolve(Data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
}