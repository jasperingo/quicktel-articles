import Article from '../models/article';

const ArticleRepository = {
  findAll() {
    return Article.findAll();
  }
};

export default ArticleRepository;
