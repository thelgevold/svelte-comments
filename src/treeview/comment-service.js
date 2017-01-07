import { CommentModel } from './comment-model';

export class CommentService {
  
  constructor() {
  }
  getComments() {
    var articleId = '55aeeaa406ceb0f38d857f6c';

    return fetch('http://www.syntaxsuccess.com/comment/' + articleId)
           .then((data) => {
             return data.json();
           });
  }
}
                    
                