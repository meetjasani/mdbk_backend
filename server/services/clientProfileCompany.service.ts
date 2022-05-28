import sequelize from '../config/database'
import { QueryTypes } from 'sequelize';
import { ClientProfileCompany } from '../models'
import { ClientProfileCompanyInput } from '../models/clientProfileCompany'


export default class ClientProfileCompanyService {
  /**
   * Query for Get Record 
   * @returns {Promise<QueryResult>}
   */
  public getClientProfileCompany = async (id: number): Promise<any> => {
    return new Promise((resolve, reject) => {
      sequelize
        .query(
          `SELECT * FROM client_profile_company where client_profile_id = ${id}`,
          { type: QueryTypes.SELECT }
        )
        .then((data) => {
          resolve(data)
        })
        .catch((error) => reject(error));
    });
  };

  /**
   * @param {object} user
   * @return Success : user object
   * @return Error : DB error
   */
  public createClientProfileCompany = async (client: ClientProfileCompanyInput): Promise<any> => {
    return new Promise((resolve, reject) => {
      ClientProfileCompany.create(client)
        .then((data) => resolve(data))
        .catch((error) => reject(error))
    })
  }


  /**
   * @param {object} clientCompanyData
   * @param {filter} filter
   * @return Success : { result: [1] }
   * @return Error : DB error
   */
  public updateClientProfileCompany = async (companyData: ClientProfileCompanyInput, filter: any): Promise<any> => {
    return new Promise((resolve, reject) => {
      ClientProfileCompany.update(companyData, filter)
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
  public deleteClientProfileCompany = async (filter: any): Promise<any> => {
    return new Promise((resolve, reject) => {
      ClientProfileCompany.destroy(filter)
        .then((Data) => {
          resolve(Data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
}