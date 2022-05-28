import { DataTypes, Model, Optional } from 'sequelize'
import sequelizeConnection from '../config/database'

interface MemberAttributes {
    id: number;
    name: string;
    password: string;
    email: string;
    coin_balance: number;
    login_type: string,
    status: string,
    created_at?: Date;
    updated_at?: Date;
}

export interface MemberInput extends Optional<MemberAttributes, 'id' | 'coin_balance' | 'login_type' | 'status'> {

}
export interface MemberOutput extends Required<MemberAttributes> { }

class Member extends Model<MemberAttributes, MemberInput> implements MemberAttributes {
    public id!: number;
    public name!: string;
    public password!: string;
    public email!: string;
    public coin_balance!: number;
    public login_type!: string;
    public status!: string;

    // timestamps!
    public readonly created_at!: Date;
    public readonly updated_at!: Date;
}

Member.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING
    },
    coin_balance: {
        type: DataTypes.DECIMAL
    },
    login_type: {
        type: DataTypes.ENUM('google', 'facebook', 'naver', 'kakaotalk', 'apple', 'website'),
        defaultValue: 'website'
    },
    status: {
        type: DataTypes.ENUM('enable', 'disable', 'deleted'),
        defaultValue: 'enable'
    },
    created_at: {
        type: DataTypes.DATE
    },
    updated_at: {
        type: DataTypes.DATE,
        allowNull: true
    },
}, {
    sequelize: sequelizeConnection,
    paranoid: false,
    freezeTableName: true,
    timestamps: true,
    tableName: 'member',
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

export default Member