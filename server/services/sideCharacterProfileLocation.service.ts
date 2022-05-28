import sequelize from '../config/database'
import { QueryTypes } from 'sequelize';
import { SideCharacterProfileLocation } from '../models'
import { SideCharacterProfileLocationInput } from '../models/sideCharacterProfileLocation'

export default class SideCharacterProfileLocationService {
  /**
   * @param {object} user
   * @return Success : user object
   * @return Error : DB error
   */
  public createSideCharacProfileLocation = async (client: [SideCharacterProfileLocationInput]): Promise<any> => {
    return new Promise((resolve, reject) => {
      SideCharacterProfileLocation.bulkCreate(client)
        .then((data) => resolve(data))
        .catch((error) => reject(error))
    })
  }

  /**
   * @param {filter} filter
   * @return Success : [result:1]
   * @return Error : DB error
   */
  public deleteSideCharacProfileLocation = async (filter: any) => {
    return new Promise((resolve, reject) => {
      SideCharacterProfileLocation.destroy(filter)
        .then((Data) => {
          resolve(Data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
}