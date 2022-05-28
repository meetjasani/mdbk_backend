import sequelize from '../config/database'
import { QueryTypes } from 'sequelize';
import { SideCharacterProfileField } from '../models'
import { SideCharacterProfileFieldInput } from '../models/sideCharacterProfileField'

export default class SideCharacterProfileFieldService {
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
        .catch((error) => reject(error));
    });
  };


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
        .catch((error) => reject(error));
    });
  };

  /**
   * @param {object} ClientProfileField
   * @return Success : user object
   * @return Error : DB error
   */
  public createSideCharacProfileField = async (sideCharac: [SideCharacterProfileFieldInput]): Promise<any> => {
    return new Promise((resolve, reject) => {
      SideCharacterProfileField.bulkCreate(sideCharac)
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
  public deleteSideCharacProfileField = async (filter: any) => {
    return new Promise((resolve, reject) => {
      SideCharacterProfileField.destroy(filter)
        .then((Data) => {
          resolve(Data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
}