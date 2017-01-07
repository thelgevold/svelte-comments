export class CommentService {
 
  saveComment(parentId, author, text) {
    return fetch(commentCtx.url, {
            method: 'POST',
            mode: 'cors',
            headers: new Headers({
		          'Content-Type': 'application/json'
            }),
            body: JSON.stringify({ 'parentId': parentId, 'articleId': commentCtx.articleId, 'author': author, 'text': text })
          });
  }

  getComments() {
    return fetch(commentCtx.url + commentCtx.articleId)
           .then((data) => {
             return data.json();
           });
  }
}
                    
                