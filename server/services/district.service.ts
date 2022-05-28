import sequelize from '../config/database'
import { QueryTypes } from 'sequelize';
import { District } from '../models'
import { DistrictInput } from '../models/district'

export default class CoinsUseHistoryService {
    /**
     * Query for All Records
     * @returns {Promise<QueryResult>}
     */
    public getAllDistrict = async (): Promise<any> => {
        return new Promise((resolve, reject) => {
            sequelize
                .query(
                    `SELECT * FROM district`,
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
    public getDistrictById = async (id: number): Promise<any> => {
        return new Promise((resolve, reject) => {
            sequelize
                .query(
                    `SELECT * FROM district WHERE id = '${id}'`,
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
    public getDistrictByProvinceId = async (id: number): Promise<any> => {
        return new Promise((resolve, reject) => {
            sequelize
                .query(
                    `SELECT * from district WHERE province_id = '${id}'`,
                    { type: QueryTypes.SELECT }
                )
                .then((data) => resolve(data))
                .catch((error) => reject(error))
        })
    }

    /**
     * @param {object} user
     * @return Success : user object
     * @return Error : DB error
     */
    public createDistrict = async (districtData: DistrictInput): Promise<any> => {
        return new Promise((resolve, reject) => {
            District.create(districtData)
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
    public updateDistrict = async (districtData: DistrictInput, filter: any): Promise<any> => {
        return new Promise((resolve, reject) => {
            District.update(districtData, filter)
                .then((Data) => {
                    resolve(Data)
                }).catch((error) => {
                    reject(error);
                });
        });
    };
}