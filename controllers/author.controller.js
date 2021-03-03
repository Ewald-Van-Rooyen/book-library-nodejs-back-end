const {Author} = require("../models");

/**
 * AuthorController that handles all the router requests of CRUD functionality
 */
class AuthorController {

  async createAuthor(request, result) {
    const body = request.body;
    const username = request.headers["x-access-username"];

    if (!body) {
      return result.status(400).send("No request body present");
    }

    if (!body.firstName) {
      return result.status(400).send("No request body first name value present");
    }

    if (!body.lastName) {
      return result.status(400).send("No request body last name value present");
    }

    try {
      const newAuthor = await Author.create({...body, createdBy: username});
      return result.status(201).json(newAuthor);
    } catch (error) {
      return result.status(500).json({error: error.message});
    }
  }

  async getAllAuthors(request, result) {
    // Pagination, filtering, and ordering query params
    const {page, size, sortBy, orderBy, firstName, lastName} = request.query;

    const options = {};

    if (size) {
      options.limit = parseInt(size);
    }

    if (page) {
      options.offset = parseInt(size) * parseInt(page);
    }

    if (sortBy && orderBy) {
      options.order = [[sortBy, orderBy]];
    }

    if (firstName || lastName) {
      options.where = {};
    }

    if (firstName) {
      options.where["firstName"] = firstName;
    }

    if (lastName) {
      options.where["lastName"] = lastName;
    }

    try {
      const authors = await Author.findAll(options);
      return result.status(200).json(authors);
    } catch (error) {
      return result.status(500).json({error: error.message});
    }
  }

  async getAuthorById(request, result) {
    const {id} = request.params;

    if (!id) {
      return result.status(400).send("No id parameter present");
    }

    try {
      const author = await Author.findOne({
        where: {id: id},
      });

      if (author) {
        return result.status(200).json(author);
      }
      return result.status(404).send(`Author with id: ${id} could not be found`);

    } catch (error) {
      return result.status(500).json({error: error.message});
    }
  }

  async updateAuthor(request, result) {
    const {id} = request.params;
    const body = request.body;
    // Used to track what user alters the entity
    const username = request.headers["x-access-username"];

    if (!id) {
      return result.status(400).send("No id parameter present");
    }

    if (!body) {
      return result.status(400).send("No request body present");
    }

    try {
      const [updated] = await Author.update({...body, updatedBy: username}, {
        where: {id: id},
      });

      if (updated) {
        const updatedAuthor = await Author.findOne({
          where: {id: id},
        });
        return result.status(200).json(updatedAuthor);
      }

      return result.status(404).send(`Author with id: ${id} could not be found`);

    } catch (error) {
      return result.status(500).json({error: error.message});
    }
  }

  async removeAuthorById(request, result) {
    const {id} = request.params;

    if (!id) {
      return result.status(400).send("No id parameter present");
    }

    try {
      const deletedAuthor = await Author.destroy({
        where: {id: id},
      });

      if (deletedAuthor) {
        return result.status(204).send(`Author id: ${id} deleted`);
      }

      return result.status(404).json(`Author id: ${id} not found`);
    } catch (error) {
      return result.status(500).json({error: error.message});
    }
  }

}

module.exports = AuthorController;
