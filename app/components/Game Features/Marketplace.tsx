function Marketplace() {
  return (
    <div className="flex justify-center items-center">
      <div className="w-[90%] flex flex-col justify-center items-center space-y-5 border-2 border-white py-5 rounded-2xl text-white">
        <div className="max-w-[600px] space-y-5">
          <div className="flex flex-col justify-center gap-4">
            <div className="text-2xl font-bold text-center">Market Place</div>
            <p>
              The Marketplace in the Monster Tamer RPG is your go-to hub for
              trading and acquiring essential items. Browse through a vast
              selection of gear, potions, and rare artifacts to enhance your
              monsters and boost your adventure. Make savvy purchases and trades
              to stay ahead in the world of taming!
            </p>
          </div>
          <img
            className="border-2 border-white rounded-2xl w-full"
            src="/images/logo.png"
            alt=""
          />
        </div>
      </div>
    </div>
  );
}
export default Marketplace;
