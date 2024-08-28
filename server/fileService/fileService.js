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
      } else return [];
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
    try {
      fileName && fileName.map((elem) => fs.unlinkSync(`static/${elem}`));
      // arrFilenames &&
      //   arrFilenames.map((elem) => fs.unlinkSync(`static/${elem}`));
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
