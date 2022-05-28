import sequelize from '../config/database'
import { QueryTypes } from 'sequelize';
import { SideCharacterProfilePortfolio } from '../models'
import { sideCharacterProfilePortfolioInput } from '../models/sideCharacterProfilePortfolio'

export default class SideCharacterProfilePortfolioService {
  /**
   * Query for Get Side character profile portfolio 
   * @returns {Promise<QueryResult>}
   */
  public getSideCharacProfilePortfolio = async (id: number): Promise<any> => {
    return new Promise((resolve, reject) => {
      sequelize
        .query(
          `SELECT * FROM side_character_profile_portfolio WHERE id = '${id}'`,
          { type: QueryTypes.SELECT }
        )
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    });
  };

  /**
   * @param {object} portfolio
   * @return Success : data object
   * @return Error : DB error
   */
  public createSideCharacProfilePortfolio = async (portfolio: [sideCharacterProfilePortfolioInput]): Promise<any> => {
    return new Promise((resolve, reject) => {
      SideCharacterProfilePortfolio.bulkCreate(portfolio)
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
  public deleteSideCharacProfilePortfolio = async (filter: any): Promise<any> => {
    return new Promise((resolve, reject) => {
      SideCharacterProfilePortfolio.destroy(filter)
        .then((Data) => {
          resolve(Data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
}