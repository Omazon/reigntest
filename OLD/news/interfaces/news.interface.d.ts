import { Document } from 'mongoose';
export interface News extends Document {
    created_at: Date;
    title: string;
    url: null;
    author: string;
    points: number;
    story_text: string;
    comment_text: null;
    num_comments: number;
    story_id: null;
    story_title: null;
    story_url: null;
    parent_id: null;
    _tags: string[];
    objectID: string;
}
