import catalogDescBackpack from "../../resources/img/catalog/catalog-desc-backpackt.jpg";
import catalogDescBag3 from "../../resources/img/catalog/catalog-desc-bag3.jpg";
import catalogDescHandbag from "../../resources/img/catalog/catalog-desc-handbag.jpg";
import catalogDescWallet from "../../resources/img/catalog/catalog-desc-wallet.jpg";

const description = {
  backpacks: {
    text: " Backpacks--- What we sell are not just simple handbags; the products of our shop are the part of a style because nowadays handbag is the essential detail of the women’s wardrobe. We know how important it is for the modern women to have several interesting and trendy bags. Nowadays fashion is an integral part of the culture and social relations. It has a great influence on our psychological condition and we often find ourselves the hostages of some brands. Nevertheless trend things give a feeling of prosperity and well-being and we obtain complete satisfaction with the help of some stylish things. So that is why we want to mark out that the goods of our store are universal because they can satisfy clients with different demands. You know that our commodities are the perfect combination of the original design, fair price, brilliant durability and high quality. What can be better? Only our handbags have such unbelievable advantages and this fact proves that we are the true leaders in this sphere. We provide only branded goods - that's a part of our official policy. Even if you are not the biggest fan of fashion, our shop can still offer you some special propositions.",
    image: catalogDescBackpack,
  },
  bags: {
    text: "Bags----We have a perfect reputation and great experience in this sphere and that is why our products are so popular and have many faithful fans all over the country. What we sell are not just simple handbags; the products of our shop are the part of a style because nowadays handbag is the essential detail of the women’s wardrobe. We know how important it is for the modern women to have several interesting and trendy bags. Nowadays fashion is an integral part of the culture and social relations. It has a great influence on our psychological condition and we often find ourselves the hostages of some brands. Nevertheless trend things give a feeling of prosperity and well-being and we obtain complete satisfaction with the help of some stylish things. So that is why we want to mark out that the goods of our store are universal because they can satisfy clients with different demands. You know that our commodities are the perfect combination of the original design, fair price, brilliant durability and high quality. What can be better? Only our handbags have such unbelievable advantages and this fact proves that we are the true leaders in this sphere.",
    image: catalogDescBag3,
  },
  handbags: {
    text: "Handbags----Our store offers stylish, premium quality handbags at the lowest possible prices. We have a perfect reputation and great experience in this sphere and that is why our products are so popular and have many faithful fans all over the country. What we sell are not just simple handbags; the products of our shop are the part of a style because nowadays handbag is the essential detail of the women’s wardrobe. We know how important it is for the modern women to have several interesting and trendy bags. Nowadays fashion is an integral part of the culture and social relations. It has a great influence on our psychological condition and we often find ourselves the hostages of some brands. Nevertheless trend things give a feeling of prosperity and well-being and we obtain complete satisfaction with the help of some stylish things. So that is why we want to mark out that the goods of our store are universal because they can satisfy clients with different demands.",
    image: catalogDescHandbag,
  },
  wallets: {
    text: "Wallets----It has a great influence on our psychological condition and we often find ourselves the hostages of some brands. Nevertheless trend things give a feeling of prosperity and well-being and we obtain complete satisfaction with the help of some stylish things. So that is why we want to mark out that the goods of our store are universal because they can satisfy clients with different demands. You know that our commodities are the perfect combination of the original design, fair price, brilliant durability and high quality. What can be better? Only our handbags have such unbelievable advantages and this fact proves that we are the true leaders in this sphere. We provide only branded goods - that's a part of our official policy. Even if you are not the biggest fan of fashion, our shop can still offer you some special propositions. What can be better? Only our handbags have such unbelievable advantages and this fact proves that we are the true leaders in this sphere. We provide only branded goods - that's a part of our official policy. Even if you are not the biggest fan of fashion, our shop can still offer you some special propositions.",
    image: catalogDescWallet,
  },
};

const catalogGaleryDescription = (mainType) => {
  return description[mainType];
};

export default catalogGaleryDescription;
