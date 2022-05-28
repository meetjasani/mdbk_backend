import sequelize from '../config/database'
import { QueryTypes } from 'sequelize';
import { SearchOption } from '../models'
import { SearchOptionInput } from '../models/searchOption'

export default class SearchOptionService {
  /**
   * Query for All search options
   * @returns {Promise<QueryResult>}
   */
  public getAllSearchOptions = async (): Promise<any> => {
    return new Promise((resolve, reject) => {
      sequelize
        .query(
          `SELECT * from search_option`,
          { type: QueryTypes.SELECT }
        )
        .then((data) => resolve(data))
        .catch((error) => reject(error))
    })
  }


  /**
   * Query for Get searchOption by id 
   * @returns {Promise<QueryResult>}
   */
  public getSearchOption = async (id: number): Promise<any> => {
    return new Promise((resolve, reject) => {
      sequelize
        .query(
          `SELECT * from search_option WHERE id = '${id}'`,
          { type: QueryTypes.SELECT }
        )
        .then((data) => resolve(data))
        .catch((error) => reject(error))
    })
  }

/**
 * Query for Get Record 
 * @returns {Promise<QueryResult>}
 */
 public getSearchOptionByMemberIdAndType = (id:number,type:string): Promise<any> => {
  return new Promise((resolve, reject) => {
    sequelize
      .query(
        `SELECT * from search_option WHERE member_id = '${id}' AND search_type = '${type}'`,
        { type: QueryTypes.SELECT }
      )
      .then((data) => resolve(data))
      .catch((error) => reject(error))
  })
}

  /**
   * @param {object} searchOption
   * @return Success : searchOption object
   * @return Error : DB error
   */
  public createSearchOption = async (searchOptionData: SearchOptionInput): Promise<any> => {
    return new Promise((resolve, reject) => {
      SearchOption.create(searchOptionData)
        .then((data) => resolve(data))
        .catch((error) => reject(error))
    })
  }


  /**
   * @param {object} searchOptionData
   * @param {filter} filter
   * @return Success : { result: [1] }
   * @return Error : DB error
   */
  public updateSearchOption = async (searchOptionData: SearchOptionInput, filter: any): Promise<any> => {
    return new Promise((resolve, reject) => {
      SearchOption.update(searchOptionData, filter)
        .then((Data) => {
          resolve(Data)
        }).catch((error) => {
          reject(error);
        });
    });
  };

  /**
   * @param {filter} filter
   * @return Success : [result:1]
   * @return Error : DB error
   */
  public deleteSearchOption = async (filter: any): Promise<any> => {
    return new Promise((resolve, reject) => {
      SearchOption.destroy(filter)
        .then((Data) => {
          resolve(Data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
}
