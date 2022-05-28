import { DataTypes, Model, Optional } from 'sequelize'
import sequelizeConnection from '../config/database'

interface ClientProfileAttributes {
  id: number;
  member_id: number;
  nick_name: string;
  introduction: string;
  phone: string;
  profession: string;
  homepage_link: string;
  facebook_link: string;
  instagram_link: string;
  other_link: string;
  is_compnay: string;
  desired_date: string;
  desired_time: string;
  desired_project_type: string;
  insurance_status: string;
  desired_work_type: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface ClientProfileInput extends Optional<ClientProfileAttributes, 'id'> {

}
export interface ClientProfileOutput extends Required<ClientProfileAttributes> { }

class ClientProfile extends Model<ClientProfileAttributes, ClientProfileInput> implements ClientProfileAttributes {
  public id!: number;
  public member_id!: number;
  public nick_name!: string;
  public introduction!: string;
  public phone!: string;
  public profession!: string;
  public homepage_link!: string;
  public facebook_link!: string;
  public instagram_link!: string;
  public other_link!: string;
  public is_compnay!: string;
  public desired_date!: string;
  public desired_time!: string;
  public desired_project_type!: string;
  public insurance_status!: string;
  public desired_work_type!: string;

  // timestamps!
  public readonly created_at!: Date;
  public readonly updated_at!: Date;
}

ClientProfile.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  member_id: {
    type: DataTypes.INTEGER,
    references: { model: 'member', key: 'id' },
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT'
  },
  nick_name: {
    type: DataTypes.STRING,
    allowNull: true
  },
  introduction: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  phone: {
    type: DataTypes.STRING
  },
  profession: {
    type: DataTypes.TEXT
  },
  homepage_link: {
    type: DataTypes.STRING,
    allowNull: true
  },
  facebook_link: {
    type: DataTypes.STRING,
    allowNull: true
  },
  instagram_link: {
    type: DataTypes.STRING,
    allowNull: true
  },
  other_link: {
    type: DataTypes.STRING,
    allowNull: true
  },
  is_compnay: {
    type: DataTypes.ENUM('yes', 'no'),
    defaultValue: 'no'
  },
  desired_date: {
    type: DataTypes.ENUM('weekdays', 'weekend', 'weekdays-weekend')
  },
  desired_time: {
    type: DataTypes.ENUM('morning', 'afternoon', 'evening')
  },
  desired_project_type: {
    type: DataTypes.ENUM('short-term', 'long-term')
  },
  insurance_status: {
    type: DataTypes.ENUM('available', 'unavailable')
  },
  desired_work_type: {
    type: DataTypes.ENUM('workfrom-office', 'workfrom-home')
  },
  created_at: {
    type: DataTypes.DATE
  },
  updated_at: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  sequelize: sequelizeConnection,
  paranoid: false,
  freezeTableName: true,
  timestamps: true,
  tableName: 'client_profile',
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

export default ClientProfile