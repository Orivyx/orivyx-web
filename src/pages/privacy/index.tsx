import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function Privacy() {
  const navigate = useNavigate();

  return (
    <main
      className="
        min-h-screen
        text-white 
        bg-no-repeat bg-cover bg-center
        bg-[url('/bg-mobile.png')]
        sm:bg-[url('/bg.png')]
        py-12 px-4
      "
    >
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="font-manrope">Voltar</span>
        </button>

        <div className="bg-black/50 backdrop-blur-xl border border-white/20 rounded-3xl p-8 sm:p-12">
          <h1 className="font-onest text-3xl sm:text-4xl font-bold mb-2">
            Política de <span className="text-pink">Privacidade</span>
          </h1>
          <p className="text-white/60 font-manrope mb-8">
            Última atualização: Janeiro de 2026
          </p>

          <div className="space-y-8 font-manrope text-white/80 leading-relaxed">
            {/* Seção 1 */}
            <section>
              <h2 className="font-onest text-xl font-semibold text-white mb-3">
                1. Informações que Coletamos
              </h2>
              <p>
                Ao utilizar nosso site e serviços, podemos coletar as seguintes
                informações:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1 text-white/70">
                <li>Nome completo</li>
                <li>Endereço de e-mail</li>
                <li>Número de telefone</li>
                <li>Nome da empresa</li>
                <li>Cargo/função</li>
                <li>Mensagens enviadas através do formulário de contato</li>
                <li>Dados de navegação (cookies, IP, dispositivo)</li>
              </ul>
            </section>

            {/* Seção 2 */}
            <section>
              <h2 className="font-onest text-xl font-semibold text-white mb-3">
                2. Como Utilizamos suas Informações
              </h2>
              <p>Utilizamos suas informações para:</p>
              <ul className="list-disc list-inside mt-2 space-y-1 text-white/70">
                <li>Entrar em contato sobre nossos serviços</li>
                <li>Responder suas dúvidas e solicitações</li>
                <li>
                  Enviar informações relevantes sobre automação e tecnologia
                </li>
                <li>Melhorar nosso site e serviços</li>
                <li>Análise de tráfego e comportamento de navegação</li>
                <li>Personalização de anúncios</li>
              </ul>
            </section>

            {/* Seção 3 */}
            <section>
              <h2 className="font-onest text-xl font-semibold text-white mb-3">
                3. Cookies e Tecnologias de Rastreamento
              </h2>
              <p>Utilizamos cookies e tecnologias similares para:</p>
              <ul className="list-disc list-inside mt-2 space-y-1 text-white/70">
                <li>Google Analytics - análise de tráfego do site</li>
                <li>Google Ads - remarketing e conversões</li>
                <li>Armazenamento local - preferências do usuário</li>
              </ul>
              <p className="mt-3">
                Você pode gerenciar suas preferências de cookies através do
                banner exibido em sua primeira visita ao site.
              </p>
            </section>

            {/* Seção 4 */}
            <section>
              <h2 className="font-onest text-xl font-semibold text-white mb-3">
                4. Compartilhamento de Dados
              </h2>
              <p>
                Não vendemos, alugamos ou compartilhamos suas informações
                pessoais com terceiros, exceto:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1 text-white/70">
                <li>Quando necessário para prestação de nossos serviços</li>
                <li>Para cumprir obrigações legais</li>
                <li>Com seu consentimento expresso</li>
              </ul>
            </section>

            {/* Seção 5 */}
            <section>
              <h2 className="font-onest text-xl font-semibold text-white mb-3">
                5. Segurança dos Dados
              </h2>
              <p>
                Implementamos medidas de segurança técnicas e organizacionais
                para proteger suas informações contra acesso não autorizado,
                alteração, divulgação ou destruição.
              </p>
            </section>

            {/* Seção 6 */}
            <section>
              <h2 className="font-onest text-xl font-semibold text-white mb-3">
                6. Seus Direitos (LGPD)
              </h2>
              <p>
                De acordo com a Lei Geral de Proteção de Dados (LGPD), você tem
                direito a:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1 text-white/70">
                <li>Confirmar a existência de tratamento de dados</li>
                <li>Acessar seus dados pessoais</li>
                <li>Corrigir dados incompletos ou desatualizados</li>
                <li>Solicitar a exclusão de seus dados</li>
                <li>Revogar o consentimento a qualquer momento</li>
              </ul>
            </section>

            {/* Seção 7 */}
            <section>
              <h2 className="font-onest text-xl font-semibold text-white mb-3">
                7. Retenção de Dados
              </h2>
              <p>
                Mantemos suas informações pelo tempo necessário para cumprir as
                finalidades descritas nesta política, ou conforme exigido por
                lei.
              </p>
            </section>

            {/* Seção 8 */}
            <section>
              <h2 className="font-onest text-xl font-semibold text-white mb-3">
                8. Contato
              </h2>
              <p>
                Para exercer seus direitos ou esclarecer dúvidas sobre esta
                política, entre em contato:
              </p>
              <div className="mt-3 p-4 bg-white/5 rounded-xl">
                <p className="text-pink font-semibold">Orivyx Tecnologia</p>
                <p className="text-white/70">E-mail: contato@orivyx.com</p>
                <p className="text-white/70">WhatsApp: (11) 92092-6916</p>
              </div>
            </section>

            {/* Seção 9 */}
            <section>
              <h2 className="font-onest text-xl font-semibold text-white mb-3">
                9. Alterações nesta Política
              </h2>
              <p>
                Podemos atualizar esta política periodicamente. Recomendamos que
                você revise esta página regularmente para se manter informado
                sobre quaisquer alterações.
              </p>
            </section>
          </div>

          {/* Footer */}
          <div className="mt-10 pt-6 border-t border-white/10 text-center">
            <img
              src="/logo.png"
              alt="Orivyx"
              className="h-8 mx-auto opacity-60"
            />
            <p className="text-white/40 text-sm mt-2 font-manrope">
              © 2026 Orivyx. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
