import sequelizeConnection from '../config/database'
import { QueryTypes } from 'sequelize';
import bcrypt from 'bcryptjs'
import { Member } from '../models'
import { MemberInput, MemberOutput } from '../models/member'
import TokenService from './token.service'

export default class MemberService {

  public tokenService = new TokenService()
  /**
   * @param {object} member
   * @return Success : member object
   * @return Error : DB error
   */
  public createMember = async (member: MemberInput): Promise<any> => {
    return new Promise((resolve, reject) => {
      Member.create(member)
        .then((data) => {
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  /**
   * @param {object} member
   * @return Success : boolean
   * @return Error : DB error
   */
  public getMemberByEmail = async (email: string): Promise<any> => {
    return new Promise((resolve, reject) => {
      sequelizeConnection
        .query(
          `SELECT * FROM member WHERE email = '${email}'`,
          { type: QueryTypes.SELECT }
        )
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    });
  };

  /**
   * @param {String} password
   * @param {String} correctPassword
   * @return Success : true
   * @return Error : Passwords do not match error
   */
  public checkPassword = async (password: string, correctPassword: string): Promise<any> => {
    return new Promise((resolve, reject) => {
      bcrypt
        .compare(password, correctPassword)
        .then(isPasswordMatch => {
          resolve(isPasswordMatch)
        })
        .catch(error => {
          reject(error)
        })
    })
  }

  /**
   * @param {String} authToken
   * @return Success : member
   * @return Error : DB error
   */
  public validateAccess = async (authToken: string): Promise<any> => {
    return new Promise((resolve, reject) => {
      this.tokenService.verifyAccessToken(authToken)
        .then(member => {
          resolve(member);
        })
        .catch(error => {
          reject(error)
        })
    })
  }
}