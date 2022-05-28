import sequelize from '../config/database'
import { QueryTypes } from 'sequelize';
import { ClientProfileIntroductoryImage } from '../models'
import { ClientProfileIntroductoryImageInput } from '../models/clientProfileIntroductoryImage'

export default class ClientProfileIntroductoryImageService {
  /**
   * @param {object} user
   * @return Success : user object
   * @return Error : DB error
   */
  public createClientProfileIntroductoryImg = async (img: [ClientProfileIntroductoryImageInput]): Promise<any> => {
    return new Promise((resolve, reject) => {
      ClientProfileIntroductoryImage.bulkCreate(img)
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
  public deleteClientProfileIntroductoryImg = async (filter: any): Promise<any> => {
    return new Promise((resolve, reject) => {
      ClientProfileIntroductoryImage.destroy(filter)
        .then((Data) => {
          resolve(Data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
}