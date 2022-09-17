

export default {
  data() {
    return {
      //publicPath:  `${process.env.BASE_UR}`,
    avatar: '/img/profile/avatar/user_256x256.png',
      img: '/img/background/y-so-serious-white.png'
    };
  },
  created() {
    document.title = "Login";
    document.body.style.backgroundImage = `url(${ this.img })`

  },
};

