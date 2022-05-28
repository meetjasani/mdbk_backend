import sequelize from '../config/database'
import { QueryTypes } from 'sequelize';
import { SideCharacterProfileImage } from '../models'
import { SideCharacterProfileImageInput } from '../models/sideCharacterProfileImage'

export default class SideCharacterProfileImageService {
  /**
   * Query for Get Side character profile image 
   * @returns {Promise<QueryResult>}
   */
  public getSideCharacProfileImg = async (id: number): Promise<any> => {
    return new Promise((resolve, reject) => {
      sequelize
        .query(
          `SELECT * FROM side_character_profile_image WHERE id = '${id}'`,
          { type: QueryTypes.SELECT }
        )
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    });
  };

  /**
   * @param {object} img
   * @return Success : data object
   * @return Error : DB error
   */
  public createSideCharacProfileImg = async (img: [SideCharacterProfileImageInput]): Promise<any> => {
    return new Promise((resolve, reject) => {
      SideCharacterProfileImage.bulkCreate(img)
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
  public deleteSideCharacProfileImg = async (filter: any): Promise<any> => {
    return new Promise((resolve, reject) => {
      SideCharacterProfileImage.destroy(filter)
        .then((Data) => {
          resolve(Data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
}