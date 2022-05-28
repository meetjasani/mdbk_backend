import sequelize from '../config/database'
import { QueryTypes } from 'sequelize';
import { ClientProfileCompanyHastag } from '../models'
import { ClientProfileCompanyHastagInput } from '../models/clientProfileCompanyHastag'

export default class ClientProfileHastagService {
  /**
   * @param {object} user
   * @return Success : user object
   * @return Error : DB error
   */
  public createClientProfileCompanyHashtag = async (client: [ClientProfileCompanyHastagInput]): Promise<any> => {
    return new Promise((resolve, reject) => {
      ClientProfileCompanyHastag.bulkCreate(client)
        .then((data) => resolve(data))
        .catch((error) => reject(error))
    })
  }

  /**
   * @param {filter} filter
   * @return Success : [result:1]
   * @return Error : DB error
   */
  public deleteClientProfileCompanyHashtag = async (filter: any): Promise<any> => {
    return new Promise((resolve, reject) => {
      ClientProfileCompanyHastag.destroy(filter)
        .then((Data) => {
          resolve(Data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
}