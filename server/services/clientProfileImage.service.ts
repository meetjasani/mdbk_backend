import sequelize from '../config/database'
import { QueryTypes } from 'sequelize';
import { ClientProfileImage } from '../models'
import { ClientProfileImageInput } from '../models/clientProfileImage'

export default class ClientProfileFieldService {
  /**
   * @param {object} user
   * @return Success : user object
   * @return Error : DB error
   */
  public createClientProfileImg = async (img: [ClientProfileImageInput]): Promise<any> => {
    return new Promise((resolve, reject) => {
      ClientProfileImage.bulkCreate(img)
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
  public deleteClientProfileImg = async (filter: any): Promise<any> => {
    return new Promise((resolve, reject) => {
      ClientProfileImage.destroy(filter)
        .then((Data) => {
          resolve(Data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
}