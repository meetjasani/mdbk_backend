import sequelize from '../config/database'
import { QueryTypes } from 'sequelize';
import { User } from '../models'
import { UserInput } from '../models/user'


export default class UserService {
  /**
   * Query for All Records
   * @returns {Promise<QueryResult>}
   */
  public getAllUser = (): Promise<any> => {
    return new Promise((resolve, reject) => {
      sequelize
        .query(
          `SELECT * FROM user`,
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
  public getUserById = async (id: number): Promise<any> => {
    return new Promise((resolve, reject) => {
      sequelize
        .query(
          `SELECT * FROM user WHERE id = '${id}'`,
          { type: QueryTypes.SELECT }
        )
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    });
  };

  /**
   * @param {object} user
   * @return Success : user object
   * @return Error : DB error
   */
  public createUser = async (userData: UserInput): Promise<any> => {
    return new Promise((resolve, reject) => {
      User.create(userData)
        .then((data) => resolve(data))
        .catch((error) => reject(error))
    })
  };

  /**
   * @param {object} clientData
   * @param {filter} filter
   * @return Success : { result: [1] }
   * @return Error : DB error
   */
  public updateUser = async (userData: UserInput, filter: any): Promise<any> => {
    return new Promise((resolve, reject) => {
      User.update(userData, filter)
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
  public deleteUser = async (filter: any): Promise<any> => {
    return new Promise((resolve, reject) => {
      User.destroy(filter)
        .then((Data) => {
          resolve(Data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }


  /**
   * @param {filter} filter
   * @return Success : [result:1]
   * @return Error : DB error
   */
  public deleteAllUsers = async (filter: any): Promise<any> => {
    return new Promise((resolve, reject) => {
      //user.destroyAll()
      User.destroy(filter)
        .then((Data) => {
          console.log('data', Data)
          resolve(Data);
        })
        .catch((error) => {
          console.log('error', error)
          reject(error);
        });
    });
  }
}