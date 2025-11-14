export function Contact() {
  return (
    <section className="mx-[400px] pt-34">
      <div className="flex flex-col items-center bg-black/40 justify-center text-center rounded-2xl py-10 backdrop-blur-lg border border-white h-[190px]">
        <div className="flex items-center gap-3">
          <h1 className="font-manrope font-bold text-4xl text-pink">
            Entre em contato conosco
          </h1>
        </div>
        <p className="font-manrope text-3xl font-extralight mt-2">
          Seja bem-vindo a mundo
        </p>
        <img src="/logo.png" alt="Logo" className="h-14 object-contain" />
      </div>
    </section>
  );
}
