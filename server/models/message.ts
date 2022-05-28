import { DataTypes, Model, Optional } from 'sequelize'
import sequelizeConnection from '../config/database'

interface MessageAttributes {
  id: number;
  member_id: number;
  message: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface MessageInput extends Optional<MessageAttributes, 'id'> {

}
export interface MessageOutput extends Required<MessageAttributes> { }

class Message extends Model<MessageAttributes, MessageInput> implements MessageAttributes {
  public id!: number;
  public member_id!: number;
  public message!: string;

  // timestamps!
  public readonly created_at!: Date;
  public readonly updated_at!: Date;
}

Message.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  member_id: {
    type: DataTypes.INTEGER,
    references: { model: 'member', key: 'id' },
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT',
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: true
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
  tableName: 'message',
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

export default Message
