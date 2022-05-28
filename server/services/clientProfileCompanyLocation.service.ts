import sequelize from '../config/database'
import { QueryTypes } from 'sequelize';
import { ClientProfileCompanyLocation } from '../models'
import { ClientProfileCompanyLocationInput } from '../models/clientProfileCompanyLocation'


export default class ClientProfileCompanyLocationService {
  /**
   * @param {object} client
   * @return Success : user object
   * @return Error : DB error
   */
  public createClientProfileCompanyLocation = async (client: [ClientProfileCompanyLocationInput]): Promise<any> => {
    return new Promise((resolve, reject) => {
      ClientProfileCompanyLocation.bulkCreate(client)
        .then((data) => resolve(data))
        .catch((error) => reject(error))
    })
  }

  /**
   * @param {filter} filter
   * @return Success : [result:1]
   * @return Error : DB error
   */
  public deleteClientProfileCompanyLocation = async (filter: any): Promise<any> => {
    return new Promise((resolve, reject) => {
      ClientProfileCompanyLocation.destroy(filter)
        .then((Data) => {
          resolve(Data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
}