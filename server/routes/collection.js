const express = require('express');
const router = express.Router();
const { Books } = require('../models')
const { Op } = require('sequelize');

router.get('/', async (req, res) => {
  const allBooks = await Books.findAll();
  res.json(allBooks);
});

router.post('/search', async (req, res) => {
  let { title_parameter, authors_parameter, genre_parameter, year_parameter } = req.body;
  let errors = [];

  if (!title_parameter || !authors_parameter || !genre_parameter || !year_parameter) {
    errors.push({ text: "Please input all the information about the book you wish to find" });
  }

  if (errors.length > 0) {
    res.json("Error with inputs");
  } else {
    const SearchResults = await Books.findAll({
      where: {
        title: { [Op.like]: `%${title_parameter}%` },
        authors: { [Op.like]: `%${authors_parameter}%` },
        genre: { [Op.like]: `%${genre_parameter}%` },
        year: { [Op.like]: `%${year_parameter}%` }
      }
    });
    res.json(SearchResults);
  }
});

router.get('/recommended', async (req, res) => {
  const topten = await Books.findAll({
    where: { reviews: 10 },
    limit: 10
  })
  res.send(topten);
})

router.post('/add', async (req, res) => {
  let { title, authors, genre, year, copies, reviews } = req.body;

  if (!title || !authors || !genre || !year || !copies || !reviews) {
    errors.push({ text: "Please input all the information about the book you wish to find" });
  }

  const book = await Books.findOne({
    where: {
      title: title,
      authors: authors,
      year: year,
      genre: genre,

    }
  });

  if (!book) {
    try {
      await Books.create(req.body)
      res.status(200).send("Book successfully added")
    }
    catch (error) {
      res.send(error);
    }
  }
  else {
    book.copies += copies;
    await book.save();
    res.status(200).send("Book successfully added")
  }
});

router.post('/remove', async (req, res) => {
  let { title, authors, year, copies } = req.body;

  if (!title || !authors || !year || !copies) {
    return res.status(400).send({ error: "Please provide all required parameters: title, authors, year, and copies" });
  }

  try {
    const book = await Books.findOne({
      where: {
        title: title,
        authors: authors,
        year: year
      }
    });

    if (!book) {
      return res.status(404).json({ error: "Book not found, check your inputs" });
    }

    if (book.copies <= copies) {
      await book.destroy();
    } else {
      book.copies -= copies;
      await book.save();
    }

    res.status(200).json({ message: "Book successfully removed or updated" });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});




module.exports = router;