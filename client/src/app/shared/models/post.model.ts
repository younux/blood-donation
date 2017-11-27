/**
 * Created by younes.benhoumich on 27/11/2017.
 */

import {Author} from './author.model';
import {Comment} from './comment.model';

export class Post {
    slug: string;
    author: Author;
    title: string;
    content: string;
    html: string;
    publish: string;
    image: string;
    commentsCount: number;
    comments: Array<Comment>;

    constructor(slug: string,
                author: Author,
                title: string,
                content: string,
                html: string,
                publish: string,
                image: string,
                commentsCount?: number,
                comments?: Array<Comment>
                ){

      this.slug = slug;
      this.author = author;
      this.title = title;
      this.content = content;
      this.html = html;
      this.publish = publish;
      this.image = image;
      this.commentsCount = commentsCount || null;
      this.comments = comments || null;
    }

}
