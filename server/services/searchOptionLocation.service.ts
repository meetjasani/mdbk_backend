import sequelize from '../config/database'
import { QueryTypes } from 'sequelize';
import { SearchOptionLocation } from '../models'
import { SearchOptionLocationInput } from '../models/searchOptionLocation'


export default class SearchOptionLocationService {
  /**
   * Query for Get SearchOptionLocation 
   * @returns {Promise<QueryResult>}
   */
  public getSearchOptionLocation = async (id: number) => {
    return new Promise((resolve, reject) => {
      sequelize
        .query(
          `SELECT * FROM search_option_location WHERE id = '${id}'`,
          { type: QueryTypes.SELECT }
        )
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    });
  };


  /**
   * @param {object} searchOptionLocation
   * @return Success : searchOptionLocation object
   * @return Error : DB error
   */
  public createSearchOptionLocation = async (location: [SearchOptionLocationInput]) => {
    return new Promise((resolve, reject) => {
      SearchOptionLocation.bulkCreate(location)
        .then((data) => resolve(data))
        .catch((error) => reject(error))
    })
  }

  /**
   * @param {filter} filter
   * @return Success : [result:1]
   * @return Error : DB error
   */
  public deleteSearchOptionLocation = async (filter: any) => {
    return new Promise((resolve, reject) => {
      SearchOptionLocation.destroy(filter)
        .then((Data) => {
          resolve(Data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
}