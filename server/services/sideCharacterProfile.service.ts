import sequelize from '../config/database'
import { QueryTypes } from 'sequelize';
import { SideCharacterProfile } from '../models'
import { SideCharacterProfileInput } from '../models/sideCharacterProfile'

export default class SideCharacterProfileService {
  /**
   * Query for All Records
   * @returns {Promise<QueryResult>}
   */
  public getAllSideCharacters = async (): Promise<any> => {
    return new Promise((resolve, reject) => {
      sequelize
        .query(
          `SELECT * from side_character_profile`,
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
  public getSideCharacterProfile = async (id: number): Promise<any> => {
    return new Promise((resolve, reject) => {
      sequelize
        .query(
          `SELECT * from side_character_profile WHERE id = '${id}'`,
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
  public getSideCharacterByProfession = async (profession: string): Promise<any> => {
    return new Promise((resolve, reject) => {
      sequelize
        .query(
          `SELECT cp.id,cp.nick_name,cp.introduction,cp.profession,cp.member_id,
        cp.desired_date,cp.desired_time,cp.desired_project_type,cp.insurance_status,
        cp.desired_work_type,cp.is_experienced,cp.created_at,
	     	(SELECT array_to_string(array_agg(cpf.name), '/') FROM side_character_profile_field AS cpf WHERE cp.id = cpf.side_character_profile_id) AS field,
         (SELECT array_to_string(array_agg(workExp.position), ',') FROM side_character_profile_work_experience AS workExp WHERE cp.id = workExp.side_character_profile_id) AS workPosition,
         (SELECT array_to_string(array_agg(workExp.total_experience), ',') FROM side_character_profile_work_experience AS workExp WHERE cp.id = workExp.side_character_profile_id) AS workExperience
         FROM side_character_profile AS cp        
          WHERE cp.profession LIKE '%${profession}%'`,
          { type: QueryTypes.SELECT }
        )
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    });
  };

  /**
 * @param {object} client
 * @return Success : boolean
 * @return Error : DB error
 */
  public getSideCharacterByNickName = async (nickName: string): Promise<any> => {
    return new Promise((resolve, reject) => {
      sequelize
        .query(
          `SELECT * FROM side_character_profile WHERE nick_name = '${nickName}'`,
          { type: QueryTypes.SELECT }
        )
        .then((data) => resolve(data[0]))
        .catch((error) => reject(error));
    });
  };



  /**
 * Query for Get Record 
 * @returns {Promise<QueryResult>}
 */
  public getSideCharacterByMemberId = async (id: number): Promise<any> => {
    return new Promise((resolve, reject) => {
      sequelize
        .query(
          `SELECT * from side_character_profile AS sideCharacter WHERE sideCharacter.member_id = '${id}'`,
          { type: QueryTypes.SELECT }
        )
        .then((data) => resolve(data))
        .catch((error) => reject(error))
    })
  }

  /**
   * @param {object} sideCharacter
   * @return Success : user object
   * @return Error : DB error
   */
  public createSideCharacterProfile = async (sideCharacterData: SideCharacterProfileInput): Promise<any> => {
    return new Promise((resolve, reject) => {
      SideCharacterProfile.create(sideCharacterData)
        .then((data) => resolve(data))
        .catch((error) => reject(error))
    })
  }

  /**
   * @param {object} sideCharacterData
   * @param {filter} filter
   * @return Success : { result: [1] }
   * @return Error : DB error
   */
  public updateSideCharacterProfile = async (sideCharacterData: SideCharacterProfileInput, filter: any): Promise<any> => {
    return new Promise((resolve, reject) => {
      SideCharacterProfile.update(sideCharacterData, filter)
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
  public deleteSideCharacterProfile = async (filter: any): Promise<any> => {
    return new Promise((resolve, reject) => {
      SideCharacterProfile.destroy(filter)
        .then((Data) => {
          resolve(Data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
}
