import headphonesData from '@data/headphones.json';
import star from '@assets/icons/interface_icons/star.svg';
import style from './Main.module.scss';

export const Main = () => {
  // console.log(headphones[0].img);

  const wiredHeadphones = headphonesData.slice(0, 6);
  const wirelessHeadpjones = headphonesData.slice(6);

  return (
    <main>
      <section className={style.headphones__wired}>
        <h2 className={style.title}>Наушники</h2>
        <ul className={style.headphones__list}>
          {wiredHeadphones.map((item) => (
            <li className={style.headphones__item} key={item.id}>
              <div className={style.wrapper__image}>
                <img
                  src={item.img}
                  alt="headphone image"
                  className={style.headphone__image}
                />
              </div>
              <ul className={style.description__list}>
                <li className={style.description__item}>
                  <div className={style.description__line}>
                    <div className={style.description__title}>{item.title}</div>
                    <div className={style.wrapper__price}>
                      <div className={style.description__price_new}>
                        {item.price} ₽
                      </div>
                      {item.old_price && (
                        <div className={style.description__price_old}>
                          {item.old_price} ₽
                        </div>
                      )}
                    </div>
                  </div>
                  <div className={style.description__line}>
                    <div className={style.wrapper__rate}>
                      <img src={star} alt="star" />
                      <div className={style.description__rate}>{item.rate}</div>
                    </div>
                    <div className={style.description__button}>Купить</div>
                  </div>
                </li>
              </ul>
            </li>
          ))}
        </ul>
      </section>
      <section className={style.headphones__wireless}>
        <h2 className={style.title}>Беспроводные наушники</h2>
        <ul className={style.headphones__list}>
          {wirelessHeadpjones.map((item) => (
            <li className={style.headphones__item} key={item.id}>
              <div className={style.wrapper__image}>
                <img
                  src={item.img}
                  alt="headphone image"
                  className={style.headphone__image}
                />
              </div>
              <ul className={style.description__list}>
                <li className={style.description__item}>
                  <div className={style.description__line}>
                    <div className={style.description__title}>{item.title}</div>
                    <div className={style.wrapper__price}>
                      <div className={style.description__price_new}>
                        {item.price} ₽
                      </div>
                      {item.old_price && (
                        <div className={style.description__price_old}>
                          {item.old_price} ₽
                        </div>
                      )}
                    </div>
                  </div>
                  <div className={style.description__line}>
                    <div className={style.wrapper__rate}>
                      <img src={star} alt="star" />
                      <div className={style.description__rate}>{item.rate}</div>
                    </div>
                    <div className={style.description__button}>Купить</div>
                  </div>
                </li>
              </ul>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
};
