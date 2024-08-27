const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  imageUrl: { type: String, required: true },
  year: { type: Number, required: true },
  genre: { type: String, required: true },
  ratings: [
    {
      userId: { type: String, required: true },
      grade: { type: Number, required: true },
    },
  ],
  averageRating: { type: Number, default: 0 },
  userId: { type: String, required: true }, // userId qui est requis pour identifier le créateur du livre
});

module.exports = mongoose.model('Book', bookSchema);

// const mongoose = require('mongoose');

// const bookSchema = mongoose.Schema({
//   id: { type: Number, required: true },
//   title: { type: String, required: true },
//   author: { type: String, required: true },
//   userId: { type: String, required: true },
//   imageUrl: { type: String, required: true },
//   year: { type: Number, required: true },
//   genre: { type: String, required: true },
//   ratings: [
//     {
//       userId: { type: String, required: true },
//       grade: { type: Number, required: true },
//     },
//   ],
//   averageRating: { type: Number, default: 0 },
// });

// module.exports = mongoose.model('Book', bookSchema);
