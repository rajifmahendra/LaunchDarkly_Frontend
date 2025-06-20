import promoBanner from '../assets/promo-banner.jpg';

function BannerPromo() {
  return (
    <div className="w-full max-w-5xl mb-4">
      <img
        src={promoBanner}
        alt="Promo Banner"
        className="rounded-lg shadow"
      />
    </div>
  );
}

export default BannerPromo;
