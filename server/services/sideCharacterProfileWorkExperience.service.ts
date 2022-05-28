import sequelize from '../config/database'
import { QueryTypes } from 'sequelize';
import { SideCharacterProfileWorkExperience } from '../models'
import { SideCharacterProfileWorkExperienceInput } from '../models/sideCharacterProfileWorkExperience'

export default class SideCharacterProfileWorkExperienceService {
  /**
   * Query for Get Side character profile work experience 
   * @returns {Promise<QueryResult>}
   */
  public getSideCharacProfileWorkExp = async (id: number): Promise<any> => {
    return new Promise((resolve, reject) => {
      sequelize
        .query(
          `SELECT * FROM side_character_profile_work_experience WHERE id = '${id}'`,
          { type: QueryTypes.SELECT }
        )
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    });
  };

  /**
   * @param {object} workExperience
   * @return Success : data object
   * @return Error : DB error
   */
  public createSideCharacProfileWorkExp = async (experience: [SideCharacterProfileWorkExperienceInput]): Promise<any> => {
    return new Promise((resolve, reject) => {
      SideCharacterProfileWorkExperience.bulkCreate(experience)
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
  public deleteSideCharacProfileWorkExp = async (filter: any): Promise<any> => {
    return new Promise((resolve, reject) => {
      SideCharacterProfileWorkExperience.destroy(filter)
        .then((Data) => {
          resolve(Data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
}