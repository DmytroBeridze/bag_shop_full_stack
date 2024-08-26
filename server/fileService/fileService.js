import { v4 as uuidv4 } from "uuid";
import * as path from "path";
import fs from "fs";

class FileService {
  saveFile(file) {
    try {
      if (file) {
        // !------many-pictures---------
        return file.map((elem) => {
          const fileName = uuidv4() + ".jpg";
          const filePath = path.resolve("static", fileName);
          elem.mv(filePath);

          return fileName;
        });
        // !----------------
        // one picture

        // const fileName = Date.now().toString() + ".jpg";

        // const fileName = uuidv4() + ".jpg";
        // const filePath = path.resolve("static", fileName);
        // file.mv(filePath);
        // return fileName;
      } else return null;
    } catch (error) {
      console.log(error);
    }
  }
  // saveFile(file) {
  //   try {
  //     const fileName = uuidv4() + ".jpg";
  //     const filePath = path.resolve("static", fileName);
  //     file.mv(filePath);
  //     return fileName;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  deleteFile(fileName) {
    const arrFilenames = JSON.parse(fileName);
    console.log();

    try {
      arrFilenames &&
        arrFilenames.map((elem) => fs.unlinkSync(`static/${elem}`));
      // fs.unlinkSync("static/f3e61777-fb45-46d9-a04b-11a8b5b7b886.jpg");
    } catch (error) {
      console.log(error);
    }
  }

  // deleteFile(fileName) {
  //   try {
  //     const filePath = path.resolve("static", fileName);
  //     file.rm(filePath);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
}

export default new FileService();
