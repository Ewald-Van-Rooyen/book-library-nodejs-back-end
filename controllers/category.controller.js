const {Category} = require("../models");

class CategoryController {

  async createCategory(request, result) {
    const body = request.body;
    const username = request.headers["x-access-username"];

    if (!body) {
      return result.status(400).send("No request body present");
    }

    if (!body.name) {
      return result.status(400).send("No request body name value present");
    }

    if (!body.description) {
      return result.status(400).send("No request body description value present");
    }

    try {
      const newCategory = await Category.create({...body, createdBy: username});
      return result.status(201).json(newCategory);
    } catch (error) {
      return result.status(500).json({error: error.message});
    }
  }

  async getAllCategories(request, result) {
    const {page, size, sortBy, orderBy, name, description} = request.query;

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

    if (name || description) {
      options.where = {};
    }

    if (name) {
      options.where["name"] = name;
    }

    if (description) {
      options.where["description"] = description;
    }

    try {
      const categories = await Category.findAll(options);
      return result.status(200).json(categories);
    } catch (error) {
      return result.status(500).json({error: error.message});
    }
  }

  async getCategoryById(request, result) {
    const {id} = request.params;

    if (!id) {
      return result.status(400).send("No id parameter present");
    }

    try {
      const category = await Category.findOne({
        where: {id: id},
      });

      if (category) {
        return result.status(200).json(category);
      }
      return result.status(404).send(`Category with id: ${id} could not be found`);

    } catch (error) {
      return result.status(500).json({error: error.message});
    }
  }

  async updateCategory(request, result) {
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
      const [updated] = await Category.update({...body, updatedBy: username}, {
        where: {id: id},
      });

      if (updated) {
        const updatedCategory = await Category.findOne({
          where: {id: id},
        });
        return result.status(200).json(updatedCategory);
      }

      return result.status(404).send(`Category with id: ${id} could not be found`);

    } catch (error) {
      return result.status(500).json({error: error.message});
    }
  }


  async removeCategoryById(request, result) {
    const {id} = request.params;

    if (!id) {
      return result.status(400).send("No id parameter present");
    }

    try {
      const deletedCategory = await Category.destroy({
        where: {id: id},
      });

      if (deletedCategory) {
        return result.status(204).send(`Category id: ${id} deleted`);
      }

      return result.status(404).json(`Category id: ${id} not found`);
    } catch (error) {
      return result.status(500).json({error: error.message});
    }
  }

}

module.exports = CategoryController;
