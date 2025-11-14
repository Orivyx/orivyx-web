export function Footer() {
  return (
    <footer className="pt-72 ">
      <div className="bg-black/50 px-[533px] grid grid-cols-2 h-[177px] items-center">
        <div className="font-extralight">
          <p>início</p>
          <p>sobre</p>
          <p>serviços</p>
          <p>contato</p>
        </div>
        <div className="flex flex-col items-center gap-2">
          <div className="flex flex-row justify-center items-center text-white gap-4">
            <div className="bg-white text-pink text-base px-6 py-3 rounded-3xl font-bold gap-1.5 hover:bg-zinc-300">
              <button className="">Consulte</button>
            </div>
          </div>
          <div className="font-extralight">
            <p>lsanchez@orivyx.com</p>
            <p>gmarques@orivyx.com</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
