export class DatabaseConstants {
  static readonly MONGOOSE_POINT_SCHEMA = {
    type: {
      type: String,
      enum: ['Point'],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  };

  static readonly PAGINATE_LIMIT_DEFAULT: number = 10;
}