import "./aboutUs.scss";

import glass from "../../../resources/icons/aboutUs/glass.svg";
import car from "../../../resources/icons/aboutUs/car.svg";
import like from "../../../resources/icons/aboutUs/like.svg";
import john from "../../../resources/img/aboutUs/john.jpg";
import jessica from "../../../resources/img/aboutUs/jessica.jpg";
import sam from "../../../resources/img/aboutUs/sam.jpg";
import edna from "../../../resources/img/aboutUs/edna.jpg";

import { fetchAllGoods } from "../../gallery/gallerySlice";
import { getAllPosts } from "../../adminPanel/addPostsForm/postSlice";
import pageUp from "../../../features/PageUp";

import { useEffect } from "react";
import { useDispatch } from "react-redux";

const AboutUs = () => {
  const dispatch = useDispatch();

  const eventsContent = [
    {
      icon: glass,
      title: "Icon block with text",
      text: "We think about the convenience of your choice.Our products are supplied with star rating that should help hesitant buyers to take a decision.What’s more, you can search our site if you know exactly what you are looking for or use a bunch of different filters that will considerably save your time and efforts.",
    },
    {
      icon: car,
      title: "Delivery to all regions",
      text: "We deliver our goods worldwide. No matter where you live, your order will be shipped in time and delivered right to your door or to any other location you have stated. The packages are handled with utmost care, so the ordered products will be handed to you safe and sound, just like you expect them to be.",
    },
    {
      icon: like,
      title: "The highest quality of products",
      text: "We guarantee the highest quality of the products we sell. Several decades of successful operation  and millions of happy customers let us feel certain about that. Besides, all items we sell pass   thorough quality control, so no characteristics  mismatch can escape the eye of our     professionals.",
    },
  ];
  const teamContent = [
    {
      name: "John Doe",
      photo: john,
      text: "Senior salesman with 15 years of experience. He knows everything about the products he offers.",
    },
    {
      name: "Jessica Priston",
      photo: jessica,
      text: "Mega positive shop assistant always ready to help you make the right choice and charm you with a smile.",
    },
    {
      name: "Sam Kromstain",
      photo: sam,
      text: "Wholesale manager. Contact him if you want to buy a batch of the products offered at our store.",
    },
    {
      name: "Edna Barton",
      photo: edna,
      text: "Quality control manager. Her mission is to check the products we ship and settle quality issues if any.",
    },
  ];
  const messages = [
    {
      name: "Mary Taba",
      text: "Guys, you rock! Made a purchase at your store recently. The order has been shipped and delivered on time. The quality is superb! The price is quite reasonable. Told all my friends about your excellent service and the variety of choice. I think I’ll be your loyal customer in future as well. I wish your store many more years of prosperity.",
    },
    {
      name: "Virginia Ubert",
      text: "Thank you again and again! I have experienced the fastest support ever. My order arrived on my door step the following day. Your team is always, friendly and very helpful. You managed to exceed my expectations!",
    },
    {
      name: "Alex Kim",
      text: "Testimonials come in different formats, but there are a few distinct qualities that all good testimonials have. Let's explore the elements you should look for when considering which testimonials to use. Each of these qualities can inspire readers and motivate them to take action.",
    },
  ];

  useEffect(() => {
    dispatch(fetchAllGoods());
    dispatch(getAllPosts());
    pageUp();
  }, []);

  return (
    <div className="about">
      <div className="main-container">
        <h1 className="about__title">About us</h1>

        {/* -------------requirements */}
        <section className="requirements">
          <h2 className="requirements__title">
            Catering to your requirements, handling your needs with care
          </h2>
          <p className="requirements__text">
            Our store is more than just another average online retailer. We sell
            not only top quality products, but give our customers a positive
            online shopping experience. Forget about struggling to do everything
            at once: taking care of the family, running your business, walking
            your dog, cleaning the house, doing the shopping, etc. Purchase the
            goods you need every day or just like in a few clicks or taps,
            depending on the device you use to access the Internet. We work to
            make your life more enjoyable.
          </p>
        </section>

        {/* ------------events */}
        <section className="events">
          <h2 className="events__title">Store events</h2>
          <div className="events__card-container">
            {eventsContent.map(({ icon, title, text }) => (
              <EventsCard key={title} icon={icon} title={title} text={text} />
            ))}
          </div>
        </section>

        {/* --------------OurTeam */}
        <section className="team">
          <h2 className="team__title">Store events</h2>
          <div className="team__card-container">
            {teamContent.map(({ name, photo, text }) => (
              <OurTeamCard name={name} photo={photo} text={text} key={name} />
            ))}
          </div>
        </section>

        {/*-------------- Testimonials */}
        <section className="testimonials">
          <h2 className="testimonials__title">Testimonials</h2>
          <div className="testimonials__message-container">
            {messages.map(({ name, text }) => (
              <Testimonials name={name} text={text} key={name} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

const EventsCard = ({ icon, title, text }) => (
  <div className="events__events-block">
    <div className="events__icon">
      <img src={icon} alt={title} />
    </div>
    <div className="events__info-container">
      <h3>{title}</h3>
      <p>{text}</p>
    </div>
  </div>
);

const OurTeamCard = ({ name, photo, text }) => (
  <div className="team__card">
    <div className="team__img">
      <img src={photo} alt={name} />
    </div>
    <div className="team__info-container">
      <h3>{name}</h3>
      <p>{text}</p>
    </div>
  </div>
);
const Testimonials = ({ name, text }) => (
  <div className="testimonials__message">
    <p className="testimonials__text">{text}</p>
    <p className="testimonials__name">{name}</p>
  </div>
);

export default AboutUs;
