import { 
  Model, 
  DataTypes, 
  InferAttributes, 
  InferCreationAttributes, 
  CreationOptional, 
  ForeignKey, 
  NonAttribute, 
} from 'sequelize';
import DatabaseConnection from '../configs/database-config';
import User from './user';

class Article extends Model<InferAttributes<Article>, InferCreationAttributes<Article>> {

  declare id: CreationOptional<number>;

  declare userId: ForeignKey<User['id']>;

  declare user: NonAttribute<User>;

  declare title: string;

  declare description: string;

  declare createdAt: CreationOptional<Date>;
}

Article.init({

  id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },

  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  createdAt: {
    type: DataTypes.DATE,
    field: 'created_at',
  },
},
{
  tableName: 'articles',
  modelName: 'article',
  sequelize: DatabaseConnection,
});

const foreignKey = {
  name: 'userId',
  field: 'user_id',
  type: DataTypes.INTEGER
};

User.hasMany(Article, { foreignKey });

Article.belongsTo(User, { foreignKey });

export default Article;
