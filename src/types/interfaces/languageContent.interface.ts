export interface LanguageContent {
  headphones: string;
  buy: string;
  wirelessHeadphones: string;
  favorites: string;
  basket: string;
  contacts: string;
  termsOfService: string;
  total: string;
  placeAnOrder: string;
  makingAnOrder: string;
  form: {
    [key: string]: string;
  };
  errors: {
    [key: string]: string;
  };
  alert: {
    successful: string;
  };
  headphoneDescription: { [id: number]: HeadphoneDescriptions };
}

interface HeadphoneDescriptions {
  description: string;
}
