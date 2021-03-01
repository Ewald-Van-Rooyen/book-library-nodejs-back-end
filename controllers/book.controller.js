const {Book} = require("../models");

class BookController {

  async createBook(request, result) {
    const body = request.body;
    const username = request.headers["x-access-username"];

    // todo investigate object verify method
    if (!body) {
      return result.status(400).send("No request body present");
    }

    if (!body.name) {
      return result.status(400).send("No request body name value present");
    }

    if (!body.yearPublished) {
      return result.status(400).send("No request body year published value present");
    }

    if (!body.isbnNumber) {
      return result.status(400).send("No request body isbn number value present");
    }

    if (!body.categoryId) {
      return result.status(400).send("No request body category id value present");
    }

    if (!body.authorId) {
      return result.status(400).send("No request body authorId id value present");
    }

    try {
      const newBook = await Book.create({...body, createdBy: username});
      return result.status(201).json(newBook);
    } catch (error) {
      return result.status(500).json({error: error.message});
    }
  }


  async getAllBooks(request, result) {
    const {page, size, sortBy, orderBy, name, isbnNumber, yearPublished} = request.query;

    const options = {include: ["author", "category"]};

    if (size) {
      options.limit = parseInt(size);
    }

    if (page) {
      options.offset = parseInt(size) * parseInt(page);
    }

    if (sortBy && orderBy) {
      options.order = [[sortBy, orderBy]];
    }

    if (name || isbnNumber || yearPublished) {
      options.where = {};
    }

    if (name) {
      options.where["name"] = name;
    }

    if (isbnNumber) {
      options.where["isbnNumber"] = isbnNumber;
    }

    try {
      const books = await Book.findAll(options);
      return result.status(200).json(books);
    } catch (error) {
      return result.status(500).json({error: error.message});
    }
  }

  async getBookById(request, result) {
    const {id} = request.params;

    if (!id) {
      return result.status(400).send("No id parameter present");
    }

    try {
      const book = await Book.findOne({
        where: {id: id},
        include: ["author", "category"],
      });

      if (book) {
        return result.status(200).json(book);
      }
      return result.status(404).send(`Book with id: ${id} could not be found`);

    } catch (error) {
      return result.status(500).json({error: error.message});
    }
  }


  async updateBook(request, result) {
    const {id} = request.params;
    const body = request.body;
    const username = request.headers["x-access-username"];

    if (!id) {
      return result.status(400).send("No id parameter present");
    }

    if (!body) {
      return result.status(400).send("No request body present");
    }

    try {
      const [updated] = await Book.update({...body, updatedBy: username}, {
        where: {id: id},
      });

      if (updated) {
        const updatedBook = await Book.findOne({
          where: {id: id},
        });
        return result.status(200).json(updatedBook);
      }

      return result.status(404).send(`Book with id: ${id} could not be found`);

    } catch (error) {
      return result.status(500).json({error: error.message});
    }
  }

  async removeBookById(request, result) {
    const {id} = request.params;

    if (!id) {
      return result.status(400).send("No id parameter present");
    }

    try {
      const deletedBook = await Book.destroy({
        where: {id: id},
      });

      if (deletedBook) {
        return result.status(204).send(`Book id: ${id} deleted`);
      }

      return result.status(404).json(`Book id: ${id} not found`);
    } catch (error) {
      return result.status(500).json({error: error.message});
    }
  }

}

module.exports = BookController;
