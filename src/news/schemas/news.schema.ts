import { Schema } from 'mongoose';

export const NewsSchema = new Schema({
  created_at: Date,
  title: String,
  url: String,
  author: String,
  points: Number,
  story_text: String,
  comment_text: String,
  num_comments: Number,
  story_id: String,
  story_title: String,
  story_url: String,
  parent_id: String,
  _tags: [String],
  objectID: {
    type: String,
    unique: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});
