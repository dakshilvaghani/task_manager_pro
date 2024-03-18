import mongoose from "mongoose";

const { Schema } = mongoose;

const taskSchema = new Schema(
  {
    priority: {
      type: String,
    },
    stage: {
      type: String,
      default: "todo",
      enum: ["todo", "in progress"],
    },
    activities: {
      type: {
        type: String,
        default: "assigned",
        enum: [
          "assigned",
          "started",
          "in progress",
          "bug",
          "completed",
          "commented",
          "pull up for",
        ],
      },
      activity: String,
      date: {
        type: Date,
        default: new Date(),
      },
      by: {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    },

    subTasks: [
      {
        title: String,
        date: Date,
        tag: String,
      },
    ],
    assets: [String],
    team: [{ type: Schema.Types.ObjectId, ref: "User" }],
    isTrashed: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Task = mongoose.model("Task", taskSchema);

export default Task;
