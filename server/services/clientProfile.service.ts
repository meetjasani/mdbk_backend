import sequelize from '../config/database'
import { QueryTypes } from 'sequelize';
import { ClientProfile as Client } from '../models'
import { ClientProfileInput } from '../models/clientProfile'


export default class ClientProfileService {
  /**
   * Query for All Records
   * @returns {Promise<QueryResult>}
   */
  public getAllClients = async (): Promise<{}> => {
    return new Promise((resolve, reject) => {
      sequelize
        .query(
          `select * from client_profile`,
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
  public getClientProfile = async (id: number): Promise<any> => {
    return new Promise((resolve, reject) => {
      sequelize
        .query(
          `SELECT * from client_profile AS client WHERE client.id = '${id}'`,
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
  public getClientProfileByMemberId = async (id: number): Promise<any> => {
    return new Promise((resolve, reject) => {
      sequelize
        .query(
          `SELECT * from client_profile AS client WHERE client.member_id = '${id}'`,
          { type: QueryTypes.SELECT }
        )
        .then((data) => resolve(data))
        .catch((error) => reject(error))
    })
  }

  /**
   * @param {object} client
   * @return Success : boolean
   * @return Error : DB error
   */
  public getClientByNickName = async (nickName: string): Promise<any> => {
    return new Promise((resolve, reject) => {
      sequelize
        .query(
          `SELECT * FROM client_profile WHERE nick_name = '${nickName}'`,
          { type: QueryTypes.SELECT }
        )
        .then((data) => resolve(data[0]))
        .catch((error) => reject(error));
    });
  };

  /**
 * @param {object} client
 * @return Success : boolean
 * @return Error : DB error
 */
  public getClientByProfession = (profession: string): Promise<any> => {
    return new Promise((resolve, reject) => {
      sequelize
        .query(
          `SELECT cp.id,cp.nick_name,cp.introduction,cp.profession, cpf.name AS field,
        cp.desired_date,cp.desired_time,cp.desired_project_type,cp.insurance_status,
        cp.desired_work_type,cp.is_compnay, cp.created_at    
         FROM client_profile AS cp
         LEFT OUTER JOIN client_profile_field AS cpf ON cp.id = cpf.client_profile_id
          WHERE cp.profession = '${profession}'`,
          { type: QueryTypes.SELECT }
        )
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    });
  };

  /**
   * @param {object} client
   * @return Success : user object
   * @return Error : DB error
   */
  public createClient = async (client: ClientProfileInput): Promise<any> => {
    return new Promise((resolve, reject) => {
      Client.create(client)
        .then((data) => resolve(data))
        .catch((error) => reject(error))
    })
  }


  /**
   * @param {object} clientData
   * @param {filter} filter
   * @return Success : { result: [1] }
   * @return Error : DB error
   */
  public updateClientProfile = async (clientData: ClientProfileInput, filter: any): Promise<any> => {
    return new Promise((resolve, reject) => {
      Client.update(clientData, filter)
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
  public deleteClientProfile = async (filter: any): Promise<any> => {
    return new Promise((resolve, reject) => {
      Client.destroy(filter)
        .then((Data) => {
          resolve(Data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
}