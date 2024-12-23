import GoodsSchema from "../models/goods.js";
import fileService from "../fileService/fileService.js";

class GoodsService {
  // post
  async postGoods(goods, picture) {
    const modifiedPicture = picture
      ? Array.isArray(picture)
        ? picture
        : [picture]
      : null;
    const { name } = goods;
    const isUsed = await GoodsSchema.findOne({ name });
    if (isUsed) {
      throw new Error("This name already exists");
    }

    const fileName = fileService.saveFile(modifiedPicture);
    const createdGoods = await GoodsSchema.create({
      ...goods,
      picture: fileName,
    });

    return createdGoods;
  }

  //get
  async getAllGoods() {
    const allGoods = await GoodsSchema.find();
    return allGoods;
  }

  //get to id
  async getGoodsId(id) {
    if (!id) {
      throw new Error("ID not found");
    }
    const goodsId = await GoodsSchema.findById(id);
    return goodsId;
  }

  // put
  async putGoods(element, newPicture) {
    if (!element._id) {
      throw new Error("ID not found");
    }
    const notDeleted = JSON.parse(element.notDeletedPicture);

    const modifiedPicture = newPicture
      ? Array.isArray(newPicture)
        ? newPicture
        : [newPicture]
      : null;

    fileService.deleteFile(JSON.parse(element.deletedPicture));
    const fileName = fileService.saveFile(modifiedPicture);

    const updatedGoods = await GoodsSchema.findByIdAndUpdate(element._id, {
      ...element,
      picture: [...fileName, ...notDeleted],

      new: true,
    });
    return updatedGoods;
  }

  // delete
  async deleteGoods(id, picture) {
    if (!id) {
      throw new Error("Such product does not exist");
    }
    fileService.deleteFile(picture);
    const element = await GoodsSchema.findByIdAndDelete(id);
    return element;
  }
}

export default new GoodsService();
