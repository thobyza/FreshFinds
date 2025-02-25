import Category from '../models/category.model'
import SubCategory from '../models/subcategory.model'
import { Op } from "sequelize";

export const addCategory = async (req, res) => {
    try {
        const { category_name, sub_category_name } = req.body;

        if (category_name) {
            const findCategory = await Category.findOne({
                where: {
                    name: category_name
                }
            })

            if (findCategory) {
                return res.status(400).send({ message: 'Category is alread exist' })
            }

            await Category.create({
                name: category_name
            })
        }

        if (sub_category_name) {
            const findSubCategory = await SubCategory.findOne({
                where: {
                    name: sub_category_name
                }
            })
            if (findSubCategory) {
                return res.status(400).send({ message: 'Sub-category is alread exist' })
            }
            await SubCategory.create({
                name: sub_category_name
            })
        }
        return res.status(200).send({ message: 'Category has been added successfully' })
    } catch (error) {
        console.error(error)
        res.status(500).send({ message: error.message })
    }
}

export const getAllCategory = async (req, res) => {
    try {
        const {all, page, sortBy, sortOrder = 'asc', search = '' } = req.query;
        const limit = 5;
        const offset = (page - 1) * limit;

        if(!all){
            const allCategory = await Category.findAndCountAll({
                where: {
                    name: {
                        [Op.like]: `%${search}%`
                    }
                },
                order: [[sortBy, sortOrder.toUpperCase()]],
                limit: parseInt(limit),
                offset: parseInt(offset),
            });
    
            const totalPages = Math.ceil(allCategory.count / limit);
            return res.status(200).send({ result: allCategory, page, totalPages })
        }
        const allCategory = await Category.findAndCountAll()
        return res.status(200).send({ result: allCategory})
    } catch (error) {
        console.error(error)
        return res.status(500).send({ message: error.message })
    }
}

export const deleteCategory = async (req, res) => {
    try {
        const id = req.params.id;
        const findCategory = await Category.findOne({
            where: {
                id: id
            }
        })
        if (!findCategory) {
            return res.status(404).send({ message: 'Category not found' })
        }
        await Category.destroy({
            where: {
                id: id
            }
        })

        return res.status(200).send({ message: 'Category has been deleted' })
    } catch (error) {
        console.error(error)
        return res.status(500).send({ message: error.message })
    }
}

export const updateCategory = async (req, res) => {
    try {
        const { id, name, sub_category } = req.body

        const findCategory = await Category.findOne({
            where: {
                id: id
            }
        })

        if (!findCategory) {
            return res.status(404).send({ message: 'Category not found' })
        }

        if (sub_category) {
            await SubCategory.update(
                {
                    CategoryId: findCategory.id,
                },
                {
                    where: {
                        name: sub_category
                    }
                })
        }

        if (name) {
            await Category.update(
                {
                    name: name
                },
                {
                    where: {
                        id: id
                    }
                }
            )
        }
        return res.status(200).send({ message: 'Category updated' })
    } catch (error) {
        console.error(error)
        res.status(500).send({ message: error.message })
    }
}

export const getAllSubCategory = async (req, res) => {
    try {
        const { all, page, sortBy, sortOrder = 'asc', search = '' } = req.query;
        const limit = 5;
        const offset = (page - 1) * limit;

        if (all) {
            const allSubCategory = await SubCategory.findAndCountAll({
                where: {
                    name: {
                        [Op.like]: `%${search}%`
                    }
                },
                order: [[sortBy, sortOrder.toUpperCase()]],
                limit: parseInt(limit),
                offset: parseInt(offset),
            });
            const totalPages = Math.ceil(allSubCategory.count / limit);
            return res.status(200).send({ result: allSubCategory, totalPages })
        }
        const allSubCategory = await SubCategory.findAll({
            where: {
                CategoryId: null,
            },
        });
        return res.status(200).send({ result: allSubCategory })
    } catch (error) {
        console.error(error)
        res.status(500).send({ message: error.message })
    }
}

export const getAllSubCategoryById = async (req, res) => {
    try {
        const id = req.params.id //id category

        const allSubCategory = await SubCategory.findAll({
            where: {
                CategoryId: id
            }
        })
        return res.status(200).send({ result: allSubCategory })
    } catch (error) {
        console.error(error)
        res.status(500).send({ message: error.message })
    }
}

export const removeSubCategoryOfCategory = async (req, res) => {
    try {
        const { subId } = req.body

        const findSubCategory = await SubCategory.findOne({
            where: {
                id: subId
            }
        })

        if (!findSubCategory) {
            return res.status(404).search({ message: 'Sub category not found' })
        }

        await SubCategory.update(
            {
                CategoryId: null
            },
            {
                where: {
                    id: findSubCategory.id
                }
            }
        )
        return res.status(200).send({ message: 'Category updated' })

    } catch (error) {
        console.error(error)
        res.status(500).send({ message: error.message })
    }
}

export const updateSubCategory = async (req, res) => {
    try {
        const { id, name } = req.body

        const findSubCategory = await SubCategory.findOne({
            where: {
                id: id
            }
        })

        if (!findSubCategory) {
            return res.status(404).send({ message: 'Sub Category not found' })
        }

        await SubCategory.update(
            {
                name: name
            },
            {
                where: {
                    id: id
                }
            }
        )
        return res.status(200).send({ message: 'Sub Category updated' })
    } catch (error) {
        console.error(error)
        res.status(500).send({ message: error.message })
    }
}

export const deleteSubCategory = async (req, res) => {
    try {
        const id = req.params.id

        const findSubCategory = await SubCategory.findOne({
            where: {
                id: id
            }
        })

        if (!findSubCategory) {
            return res.status(404).send({ message: 'Sub category not found' });
        }

        await SubCategory.destroy({
            where: {
                id: id
            }
        })
        return res.status(200).send({ message: 'Category has been deleted' })
    } catch (error) {
        console.error(error)
        res.status(500).send({ message: error.message })
    }
}