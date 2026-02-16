import type { Metadata } from "next";
import { Box, Container, Stack, Typography } from "@mui/material";

export const metadata: Metadata = {
  title: "Polityka prywatności - It's English O'Clock",
  description:
    "Polityka prywatności sklepu internetowego Its's English O'Clock.",
};

const sectionTitleSx = { color: "primary.main", fontWeight: 900 };
const paragraphSx = { opacity: 0.92 };
const orderedListSx = {
  pl: 3,
  my: 0,
  "& li + li": { mt: 1 },
};
const alphaListSx = {
  pl: 3,
  mt: 0.75,
  mb: 0,
  listStyleType: "lower-alpha",
  "& li + li": { mt: 0.6 },
};

const PrivacyPolicyPage = () => {
  return (
    <Container maxWidth="xl" sx={{ pt: { xs: 12, md: 14 }, pb: 8 }}>
      <Stack spacing={3}>
        <Stack spacing={1}>
          <Typography
            variant="h2"
            sx={{
              color: "primary.main",
              fontWeight: 900,
              fontSize: { xs: "2.5rem", md: "3.5rem" },
            }}
          >
            {`${metadata.title}`}
          </Typography>
        </Stack>

        <Stack spacing={1}>
          <Typography variant="h5" sx={sectionTitleSx}>
            § 1. Administrator danych
          </Typography>
          <Box component="ol" sx={orderedListSx}>
            <li>
              <Typography sx={paragraphSx}>
                Administratorem danych osobowych jest:
              </Typography>
              <Typography sx={paragraphSx}>
                [Imię i nazwisko / nazwa firmy]
              </Typography>
              <Typography sx={paragraphSx}>[adres]</Typography>
              <Typography sx={paragraphSx}>NIP: [___]</Typography>
              <Typography sx={paragraphSx}>
                e-mail kontaktowy w sprawach danych: [___]
              </Typography>
            </li>
            <li>
              <Typography sx={paragraphSx}>
                W sprawach związanych z ochroną danych można kontaktować się pod
                adresem: [___].
              </Typography>
            </li>
          </Box>
        </Stack>

        <Stack spacing={1}>
          <Typography variant="h5" sx={sectionTitleSx}>
            § 2. Zakres przetwarzanych danych
          </Typography>
          <Box component="ol" sx={orderedListSx}>
            <li>
              <Typography sx={paragraphSx}>
                Przetwarzamy dane podane przez użytkownika, w szczególności:
              </Typography>
              <Box component="ol" sx={alphaListSx}>
                <li>
                  <Typography sx={paragraphSx}>imię i nazwisko,</Typography>
                </li>
                <li>
                  <Typography sx={paragraphSx}>adres e-mail,</Typography>
                </li>
                <li>
                  <Typography sx={paragraphSx}>
                    dane do płatności i rozliczeń (w zakresie niezbędnym),
                  </Typography>
                </li>
                <li>
                  <Typography sx={paragraphSx}>
                    dane techniczne (np. IP, identyfikatory cookies, logi
                    techniczne),
                  </Typography>
                </li>
                <li>
                  <Typography sx={paragraphSx}>
                    dane podane przy reklamacji lub kontakcie.
                  </Typography>
                </li>
              </Box>
            </li>
            <li>
              <Typography sx={paragraphSx}>
                Podanie danych jest dobrowolne, ale w części przypadków
                niezbędne do zawarcia i wykonania umowy.
              </Typography>
            </li>
          </Box>
        </Stack>

        <Stack spacing={1}>
          <Typography variant="h5" sx={sectionTitleSx}>
            § 3. Cele i podstawy prawne przetwarzania
          </Typography>
          <Box component="ol" sx={orderedListSx}>
            <li>
              <Typography sx={paragraphSx}>
                Realizacja zamówień i dostarczanie PDF – podstawa: art. 6 ust. 1
                lit. b RODO (wykonanie umowy).
              </Typography>
            </li>
            <li>
              <Typography sx={paragraphSx}>
                Obsługa reklamacji i kontaktu posprzedażowego – art. 6 ust. 1
                lit. b oraz c RODO.
              </Typography>
            </li>
            <li>
              <Typography sx={paragraphSx}>
                Obowiązki księgowe/podatkowe – art. 6 ust. 1 lit. c RODO.
              </Typography>
            </li>
            <li>
              <Typography sx={paragraphSx}>
                Dochodzenie lub obrona roszczeń – art. 6 ust. 1 lit. f RODO.
              </Typography>
            </li>
            <li>
              <Typography sx={paragraphSx}>
                Newsletter / marketing e-mail [jeśli używasz] – art. 6 ust. 1
                lit. a RODO (zgoda).
              </Typography>
            </li>
            <li>
              <Typography sx={paragraphSx}>
                Analityka/marketing z użyciem cookies opcjonalnych – art. 6 ust.
                1 lit. a RODO (zgoda).
              </Typography>
            </li>
            <li>
              <Typography sx={paragraphSx}>
                Utrzymanie bezpieczeństwa serwisu i niezbędnych cookies – art. 6
                ust. 1 lit. f RODO.
              </Typography>
            </li>
          </Box>
        </Stack>

        <Stack spacing={1}>
          <Typography variant="h5" sx={sectionTitleSx}>
            § 4. Odbiorcy danych
          </Typography>
          <Box component="ol" sx={orderedListSx}>
            <li>
              <Typography sx={paragraphSx}>
                Dane mogą być powierzane podmiotom, które wspierają nas
                technicznie i organizacyjnie, np.:
              </Typography>
              <Box component="ol" sx={alphaListSx}>
                <li>
                  <Typography sx={paragraphSx}>
                    hosting i infrastruktura,
                  </Typography>
                </li>
                <li>
                  <Typography sx={paragraphSx}>operator płatności,</Typography>
                </li>
                <li>
                  <Typography sx={paragraphSx}>
                    dostawcy narzędzi analitycznych i mailingowych,
                  </Typography>
                </li>
                <li>
                  <Typography sx={paragraphSx}>biuro księgowe,</Typography>
                </li>
                <li>
                  <Typography sx={paragraphSx}>dostawcy IT.</Typography>
                </li>
              </Box>
            </li>
            <li>
              <Typography sx={paragraphSx}>
                Podmioty te przetwarzają dane na podstawie umów powierzenia, gdy
                jest to wymagane.
              </Typography>
            </li>
          </Box>
        </Stack>

        <Stack spacing={1}>
          <Typography variant="h5" sx={sectionTitleSx}>
            § 5. Przekazywanie danych poza EOG
          </Typography>
          <Box component="ol" sx={orderedListSx}>
            <li>
              <Typography sx={paragraphSx}>
                Co do zasady dane przetwarzane są w EOG.
              </Typography>
            </li>
            <li>
              <Typography sx={paragraphSx}>
                Jeżeli dane są przekazywane poza EOG (np. narzędzia chmurowe),
                odbywa się to wyłącznie na podstawie mechanizmów legalizujących
                transfer (np. decyzja adekwatności, standardowe klauzule
                umowne).
              </Typography>
            </li>
          </Box>
        </Stack>

        <Stack spacing={1}>
          <Typography variant="h5" sx={sectionTitleSx}>
            § 6. Okres przechowywania danych
          </Typography>
          <Box component="ol" sx={orderedListSx}>
            <li>
              <Typography sx={paragraphSx}>
                Dane związane z umową – przez czas wykonania umowy i przez okres
                wymagany przepisami (np. podatkowymi/rachunkowymi).
              </Typography>
            </li>
            <li>
              <Typography sx={paragraphSx}>
                Dane przetwarzane na podstawie zgody – do czasu jej wycofania.
              </Typography>
            </li>
            <li>
              <Typography sx={paragraphSx}>
                Dane do celów roszczeń – do czasu przedawnienia roszczeń.
              </Typography>
            </li>
            <li>
              <Typography sx={paragraphSx}>
                Dane techniczne/cookies – zgodnie z ustawieniami cookies i
                okresem retencji narzędzi.
              </Typography>
            </li>
          </Box>
        </Stack>

        <Stack spacing={1}>
          <Typography variant="h5" sx={sectionTitleSx}>
            § 7. Prawa osoby, której dane dotyczą
          </Typography>
          <Box component="ol" sx={orderedListSx}>
            <li>
              <Typography sx={paragraphSx}>Masz prawo do:</Typography>
              <Box component="ol" sx={alphaListSx}>
                <li>
                  <Typography sx={paragraphSx}>dostępu do danych,</Typography>
                </li>
                <li>
                  <Typography sx={paragraphSx}>sprostowania danych,</Typography>
                </li>
                <li>
                  <Typography sx={paragraphSx}>usunięcia danych,</Typography>
                </li>
                <li>
                  <Typography sx={paragraphSx}>
                    ograniczenia przetwarzania,
                  </Typography>
                </li>
                <li>
                  <Typography sx={paragraphSx}>przenoszenia danych,</Typography>
                </li>
                <li>
                  <Typography sx={paragraphSx}>
                    sprzeciwu wobec przetwarzania,
                  </Typography>
                </li>
                <li>
                  <Typography sx={paragraphSx}>
                    cofnięcia zgody w dowolnym momencie (bez wpływu na zgodność
                    z prawem wcześniejszego przetwarzania).
                  </Typography>
                </li>
              </Box>
            </li>
            <li>
              <Typography sx={paragraphSx}>
                Masz prawo złożyć skargę do Prezesa Urzędu Ochrony Danych
                Osobowych.
              </Typography>
            </li>
          </Box>
        </Stack>

        <Stack spacing={1}>
          <Typography variant="h5" sx={sectionTitleSx}>
            § 8. Cookies i technologie podobne
          </Typography>
          <Box component="ol" sx={orderedListSx}>
            <li>
              <Typography sx={paragraphSx}>
                Sklep wykorzystuje cookies i podobne technologie w celach:
              </Typography>
              <Box component="ol" sx={alphaListSx}>
                <li>
                  <Typography sx={paragraphSx}>
                    niezbędnych (działanie strony, bezpieczeństwo, sesja),
                  </Typography>
                </li>
                <li>
                  <Typography sx={paragraphSx}>funkcjonalnych,</Typography>
                </li>
                <li>
                  <Typography sx={paragraphSx}>analitycznych,</Typography>
                </li>
                <li>
                  <Typography sx={paragraphSx}>
                    marketingowych [jeśli używasz].
                  </Typography>
                </li>
              </Box>
            </li>
            <li>
              <Typography sx={paragraphSx}>
                Cookies inne niż niezbędne są uruchamiane po uzyskaniu zgody
                użytkownika.
              </Typography>
            </li>
            <li>
              <Typography sx={paragraphSx}>
                Zgoda może być w każdej chwili wycofana tak łatwo, jak została
                udzielona.
              </Typography>
            </li>
            <li>
              <Typography sx={paragraphSx}>
                Warunki korzystania z cookies można zmieniać także w
                ustawieniach przeglądarki i panelu cookies.
              </Typography>
            </li>
            <li>
              <Typography sx={paragraphSx}>
                Brak zgody na cookies opcjonalne nie uniemożliwia korzystania z
                podstawowych funkcji Sklepu.
              </Typography>
            </li>
          </Box>
        </Stack>

        <Stack spacing={1}>
          <Typography variant="h5" sx={sectionTitleSx}>
            § 9. Logi serwera
          </Typography>
          <Box component="ol" sx={orderedListSx}>
            <li>
              <Typography sx={paragraphSx}>
                Podczas korzystania ze strony automatycznie zapisywane mogą być
                dane techniczne (np. IP, czas żądania, typ przeglądarki) – w
                celach bezpieczeństwa i diagnostyki.
              </Typography>
            </li>
          </Box>
        </Stack>

        <Stack spacing={1}>
          <Typography variant="h5" sx={sectionTitleSx}>
            § 10. Zmiany Polityki Prywatności
          </Typography>
          <Box component="ol" sx={orderedListSx}>
            <li>
              <Typography sx={paragraphSx}>
                Polityka może być aktualizowana w razie zmian prawnych,
                technicznych lub organizacyjnych.
              </Typography>
            </li>
            <li>
              <Typography sx={paragraphSx}>
                Aktualna wersja jest zawsze publikowana na stronie Sklepu.
              </Typography>
            </li>
          </Box>
        </Stack>
      </Stack>
    </Container>
  );
};

export default PrivacyPolicyPage;
