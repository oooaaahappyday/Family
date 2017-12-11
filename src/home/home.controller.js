function HomeController(currentAuth) {
  const home = this
  home.logged = false;
  home.message = "";

  home.user = firebase.auth().currentUser;
  if (home.user) {
    home.logged = true;
    console.log(home.user);
  	home.message = 'Bienvenue'+ home.user;
  }
  console.log(home.logged);
  home.message = 'Bienvenue, veuillez vous connecter pour accéder aux informations de la famille';
}

export default HomeController