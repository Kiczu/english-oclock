import type { Metadata } from "next";
import { Box, Container, Stack, Typography } from "@mui/material";

export const metadata: Metadata = {
  title: "Regulamin sklepu internetowego - It's English O'Clock",
  description:
    "Regulamin sklepu internetowego itsenglishoclock.pl (obowiązuje od 01.03.2026).",
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

const RegulaminPage = () => {
  return (
    <Container maxWidth="xl" sx={{ pt: { xs: 12, md: 14 }, pb: 8 }}>
      <Stack spacing={3}>
        <Stack spacing={1}>
          <Typography
            variant="h1"
            sx={{
              color: "primary.main",
              fontWeight: 900,
              fontSize: { xs: "2.5rem", md: "3.5rem" },
            }}
          >
            Regulamin sklepu internetowego
          </Typography>
          <Typography sx={paragraphSx}>
            ITSENGLISHOCLOCK.PL (obowiązuje od dnia 01.03.2026)
          </Typography>
        </Stack>

        <Stack spacing={1}>
          <Typography variant="h5" sx={sectionTitleSx}>
            § 1. Postanowienia ogólne
          </Typography>
          <Box component="ol" sx={orderedListSx}>
            <li>
              <Typography sx={paragraphSx}>
                Niniejszy Regulamin określa zasady korzystania ze sklepu
                internetowego dostępnego pod adresem: itsenglishoclock.pl
                (dalej: „Sklep”), w tym zasady składania zamówień na produkty
                cyfrowe, zawierania i wykonywania umów, a także zasady
                reklamacji i odstąpienia od umowy.
              </Typography>
            </li>
            <li>
              <Typography sx={paragraphSx}>Sklep prowadzony jest przez:</Typography>
              <Typography sx={paragraphSx}>Wioleta Jedziniak English o&apos;clock</Typography>
              <Typography sx={paragraphSx}>Wioleta Jedziniak</Typography>
              <Typography sx={paragraphSx}>NIP: 9131631102</Typography>
              <Typography sx={paragraphSx}>REGON: 389015402</Typography>
              <Typography sx={paragraphSx}>
                Adres prowadzenia działalności / adres korespondencyjny:
              </Typography>
              <Typography sx={paragraphSx}>
                Ciechów, ul. Słoneczna 31, 55-300 Środa Śląska
              </Typography>
              <Typography sx={paragraphSx}>e-mail: kontakt@itsenglishoclock.pl</Typography>
              <Typography sx={paragraphSx}>tel.: 512 457 536</Typography>
              <Typography sx={paragraphSx}>(dalej: „Sprzedawca”).</Typography>
            </li>
            <li>
              <Typography sx={paragraphSx}>
                Regulamin jest udostępniany nieodpłatnie na stronie Sklepu w
                sposób umożliwiający jego pozyskanie, odtwarzanie i utrwalenie.
              </Typography>
            </li>
            <li>
              <Typography sx={paragraphSx}>
                Klientem może być osoba fizyczna, osoba prawna lub jednostka
                organizacyjna posiadająca zdolność prawną.
              </Typography>
            </li>
            <li>
              <Typography sx={paragraphSx}>
                Konsument – osoba fizyczna dokonująca ze Sprzedawcą czynności
                niezwiązanej bezpośrednio z jej działalnością gospodarczą lub
                zawodową.
              </Typography>
            </li>
            <li>
              <Typography sx={paragraphSx}>
                Przedsiębiorca na prawach konsumenta – osoba fizyczna
                zawierająca umowę bezpośrednio związaną z jej działalnością
                gospodarczą, gdy z treści umowy wynika, że nie ma ona charakteru
                zawodowego.
              </Typography>
            </li>
          </Box>
        </Stack>

        <Stack spacing={1}>
          <Typography variant="h5" sx={sectionTitleSx}>
            § 2. Definicje
          </Typography>
          <Box component="ol" sx={orderedListSx}>
            <li>
              <Typography sx={paragraphSx}>
                Sklep – serwis internetowy dostępny pod adresem
                itsenglishoclock.pl, za pośrednictwem którego Klient może
                nabywać Produkty.
              </Typography>
            </li>
            <li>
              <Typography sx={paragraphSx}>
                Produkt – treść cyfrowa w postaci pliku PDF (materiały
                edukacyjne do nauki języka angielskiego), dostarczana online.
              </Typography>
            </li>
            <li>
              <Typography sx={paragraphSx}>
                Próbka darmowa – bezpłatny Produkt udostępniany przez
                Sprzedawcę.
              </Typography>
            </li>
            <li>
              <Typography sx={paragraphSx}>
                Umowa – umowa o dostarczenie treści cyfrowej zawierana na
                odległość.
              </Typography>
            </li>
            <li>
              <Typography sx={paragraphSx}>
                Dzień roboczy – dzień od poniedziałku do piątku, z wyłączeniem
                dni ustawowo wolnych od pracy.
              </Typography>
            </li>
          </Box>
        </Stack>

        <Stack spacing={1}>
          <Typography variant="h5" sx={sectionTitleSx}>
            § 3. Wymagania techniczne
          </Typography>
          <Box component="ol" sx={orderedListSx}>
            <li>
              <Typography sx={paragraphSx}>
                Do korzystania ze Sklepu wymagane są:
              </Typography>
              <Box component="ol" sx={alphaListSx}>
                <li>
                  <Typography sx={paragraphSx}>
                    urządzenie z dostępem do Internetu,
                  </Typography>
                </li>
                <li>
                  <Typography sx={paragraphSx}>
                    aktualna przeglądarka internetowa (Chrome, Firefox, Safari,
                    Edge lub równoważna),
                  </Typography>
                </li>
                <li>
                  <Typography sx={paragraphSx}>aktywny adres e-mail,</Typography>
                </li>
                <li>
                  <Typography sx={paragraphSx}>
                    oprogramowanie umożliwiające odczyt plików PDF.
                  </Typography>
                </li>
              </Box>
            </li>
            <li>
              <Typography sx={paragraphSx}>
                Sprzedawca informuje, że korzystanie z usług świadczonych drogą
                elektroniczną może wiązać się z typowymi zagrożeniami sieciowymi
                (np. malware, phishing). Klient powinien stosować aktualne
                zabezpieczenia.
              </Typography>
            </li>
          </Box>
        </Stack>

        <Stack spacing={1}>
          <Typography variant="h5" sx={sectionTitleSx}>
            § 4. Usługi świadczone drogą elektroniczną
          </Typography>
          <Box component="ol" sx={orderedListSx}>
            <li>
              <Typography sx={paragraphSx}>
                Sprzedawca świadczy nieodpłatnie usługi drogą elektroniczną w
                postaci:
              </Typography>
              <Box component="ol" sx={alphaListSx}>
                <li>
                  <Typography sx={paragraphSx}>
                    umożliwienia przeglądania treści Sklepu,
                  </Typography>
                </li>
                <li>
                  <Typography sx={paragraphSx}>formularza zamówienia,</Typography>
                </li>
                <li>
                  <Typography sx={paragraphSx}>formularza kontaktowego.</Typography>
                </li>
              </Box>
            </li>
            <li>
              <Typography sx={paragraphSx}>
                Umowa o świadczenie usług elektronicznych:
              </Typography>
              <Box component="ol" sx={alphaListSx}>
                <li>
                  <Typography sx={paragraphSx}>
                    w zakresie przeglądania treści – zawierana jest na czas
                    korzystania ze strony,
                  </Typography>
                </li>
                <li>
                  <Typography sx={paragraphSx}>
                    w zakresie formularza zamówienia – na czas składania
                    zamówienia,
                  </Typography>
                </li>
                <li>
                  <Typography sx={paragraphSx}>
                    w zakresie formularza kontaktowego – na czas obsługi
                    zapytania.
                  </Typography>
                </li>
              </Box>
            </li>
            <li>
              <Typography sx={paragraphSx}>
                Klient może złożyć reklamację usług elektronicznych na adres
                e-mail: kontakt@itsenglishoclock.pl. Reklamacja zostanie
                rozpatrzona w terminie do 14 dni.
              </Typography>
            </li>
          </Box>
        </Stack>

        <Stack spacing={1}>
          <Typography variant="h5" sx={sectionTitleSx}>
            § 5. Informacje o Produktach
          </Typography>
          <Box component="ol" sx={orderedListSx}>
            <li>
              <Typography sx={paragraphSx}>
                W Sklepie sprzedawane są treści cyfrowe (PDF) dostarczane
                online.
              </Typography>
            </li>
            <li>
              <Typography sx={paragraphSx}>
                Opisy Produktów zawierają co najmniej:
              </Typography>
              <Box component="ol" sx={alphaListSx}>
                <li>
                  <Typography sx={paragraphSx}>nazwę i opis materiału,</Typography>
                </li>
                <li>
                  <Typography sx={paragraphSx}>
                    cenę brutto (jeśli dotyczy),
                  </Typography>
                </li>
                <li>
                  <Typography sx={paragraphSx}>
                    sposób i termin dostarczenia,
                  </Typography>
                </li>
                <li>
                  <Typography sx={paragraphSx}>
                    informacje o kompatybilności i wymaganiach technicznych.
                  </Typography>
                </li>
              </Box>
            </li>
            <li>
              <Typography sx={paragraphSx}>
                Sprzedawca udostępnia również Próbki darmowe, jeżeli zostały
                oznaczone jako bezpłatne.
              </Typography>
            </li>
          </Box>
        </Stack>

        <Stack spacing={1}>
          <Typography variant="h5" sx={sectionTitleSx}>
            § 6. Ceny i płatności
          </Typography>
          <Box component="ol" sx={orderedListSx}>
            <li>
              <Typography sx={paragraphSx}>
                Wszystkie ceny podane w Sklepie są cenami brutto (zawierają
                podatek VAT, jeśli ma zastosowanie) i wyrażone są wyłącznie w
                PLN.
              </Typography>
            </li>
            <li>
              <Typography sx={paragraphSx}>
                Płatności elektroniczne realizowane są za pośrednictwem systemu
                Autopay (dalej: „Operator płatności”), zgodnie z opcjami
                płatności udostępnionymi w danym momencie w procesie składania
                zamówienia.
              </Typography>
            </li>
            <li>
              <Typography sx={paragraphSx}>
                Przed złożeniem zamówienia Klient jest informowany o łącznej
                cenie oraz ewentualnych dodatkowych kosztach (jeśli występują).
              </Typography>
            </li>
          </Box>
        </Stack>

        <Stack spacing={1}>
          <Typography variant="h5" sx={sectionTitleSx}>
            § 7. Zasady składania zamówień i zawarcia umowy
          </Typography>
          <Box component="ol" sx={orderedListSx}>
            <li>
              <Typography sx={paragraphSx}>
                Zamówienia można składać 24/7 za pośrednictwem strony Sklepu.
              </Typography>
            </li>
            <li>
              <Typography sx={paragraphSx}>
                W celu złożenia zamówienia Klient:
              </Typography>
              <Box component="ol" sx={alphaListSx}>
                <li>
                  <Typography sx={paragraphSx}>wybiera Produkt,</Typography>
                </li>
                <li>
                  <Typography sx={paragraphSx}>
                    uzupełnia dane wymagane do realizacji zamówienia,
                  </Typography>
                </li>
                <li>
                  <Typography sx={paragraphSx}>
                    wybiera metodę płatności (Autopay),
                  </Typography>
                </li>
                <li>
                  <Typography sx={paragraphSx}>akceptuje Regulamin,</Typography>
                </li>
                <li>
                  <Typography sx={paragraphSx}>
                    składa oświadczenia wymagane prawem (w tym dotyczące treści
                    cyfrowych),
                  </Typography>
                </li>
                <li>
                  <Typography sx={paragraphSx}>
                    zatwierdza zamówienie przyciskiem jednoznacznie wskazującym
                    obowiązek zapłaty.
                  </Typography>
                </li>
              </Box>
            </li>
            <li>
              <Typography sx={paragraphSx}>
                Umowa zostaje zawarta z chwilą skutecznego opłacenia zamówienia
                i potwierdzenia przyjęcia zamówienia do realizacji przez
                Sprzedawcę (wiadomość e-mail).
              </Typography>
            </li>
          </Box>
        </Stack>

        <Stack spacing={1}>
          <Typography variant="h5" sx={sectionTitleSx}>
            § 8. Dostarczenie Produktu
          </Typography>
          <Box component="ol" sx={orderedListSx}>
            <li>
              <Typography sx={paragraphSx}>
                Dostarczenie Produktu cyfrowego następuje niezwłocznie po
                zaksięgowaniu płatności, poprzez link do pobrania wysłany
                e-mailem.
              </Typography>
            </li>
            <li>
              <Typography sx={paragraphSx}>
                Sprzedawca dostarcza Produkt w formacie PDF.
              </Typography>
            </li>
            <li>
              <Typography sx={paragraphSx}>
                Klient powinien pobrać i zapisać plik po otrzymaniu dostępu.
              </Typography>
            </li>
            <li>
              <Typography sx={paragraphSx}>
                W przypadku problemów z dostępem Klient powinien niezwłocznie
                zgłosić problem na e-mail: kontakt@itsenglishoclock.pl.
              </Typography>
            </li>
          </Box>
        </Stack>

        <Stack spacing={1}>
          <Typography variant="h5" sx={sectionTitleSx}>
            § 9. Prawo odstąpienia od umowy
          </Typography>
          <Box component="ol" sx={orderedListSx}>
            <li>
              <Typography sx={paragraphSx}>
                Konsument (oraz przedsiębiorca na prawach konsumenta) może
                odstąpić od umowy zawartej na odległość w terminie 14 dni,
                chyba że zachodzi wyjątek wskazany w ust. 2.
              </Typography>
            </li>
            <li>
              <Typography sx={paragraphSx}>
                Prawo odstąpienia nie przysługuje w odniesieniu do umowy o
                dostarczanie treści cyfrowych niedostarczanych na nośniku
                materialnym, jeżeli:
              </Typography>
              <Box component="ol" sx={alphaListSx}>
                <li>
                  <Typography sx={paragraphSx}>
                    rozpoczęto świadczenie za wyraźną i uprzednią zgodą
                    konsumenta,
                  </Typography>
                </li>
                <li>
                  <Typography sx={paragraphSx}>
                    konsument został poinformowany o utracie prawa odstąpienia,
                  </Typography>
                </li>
                <li>
                  <Typography sx={paragraphSx}>
                    konsument przyjął to do wiadomości,
                  </Typography>
                </li>
                <li>
                  <Typography sx={paragraphSx}>
                    przedsiębiorca przekazał potwierdzenie zawarcia umowy.
                  </Typography>
                </li>
              </Box>
            </li>
            <li>
              <Typography sx={paragraphSx}>
                W przypadku braku spełnienia warunków z ust. 2, prawo
                odstąpienia przysługuje na zasadach ogólnych.
              </Typography>
            </li>
            <li>
              <Typography sx={paragraphSx}>
                Aby odstąpić od umowy, Klient składa jednoznaczne oświadczenie
                (e-mail lub formularz).
              </Typography>
            </li>
            <li>
              <Typography sx={paragraphSx}>
                Wzór formularza odstąpienia stanowi Załącznik nr 1 do
                Regulaminu.
              </Typography>
            </li>
          </Box>
        </Stack>

        <Stack spacing={1}>
          <Typography variant="h5" sx={sectionTitleSx}>
            § 10. Reklamacje dotyczące treści cyfrowych
          </Typography>
          <Box component="ol" sx={orderedListSx}>
            <li>
              <Typography sx={paragraphSx}>
                Sprzedawca odpowiada za zgodność treści cyfrowej z umową zgodnie
                z przepisami prawa.
              </Typography>
            </li>
            <li>
              <Typography sx={paragraphSx}>Reklamację można złożyć:</Typography>
              <Box component="ol" sx={alphaListSx}>
                <li>
                  <Typography sx={paragraphSx}>
                    e-mail: kontakt@itsenglishoclock.pl
                  </Typography>
                </li>
                <li>
                  <Typography sx={paragraphSx}>
                    pocztą: Wioleta Jedziniak English o&apos;clock, Ciechów,
                    ul. Słoneczna 31, 55-300 Środa Śląska
                  </Typography>
                </li>
              </Box>
            </li>
            <li>
              <Typography sx={paragraphSx}>
                Reklamacja powinna zawierać co najmniej:
              </Typography>
              <Box component="ol" sx={alphaListSx}>
                <li>
                  <Typography sx={paragraphSx}>dane Klienta,</Typography>
                </li>
                <li>
                  <Typography sx={paragraphSx}>opis niezgodności,</Typography>
                </li>
                <li>
                  <Typography sx={paragraphSx}>żądanie Klienta.</Typography>
                </li>
              </Box>
            </li>
            <li>
              <Typography sx={paragraphSx}>
                Sprzedawca rozpatruje reklamację bez zbędnej zwłoki, nie później
                niż w terminie 14 dni.
              </Typography>
            </li>
          </Box>
        </Stack>

        <Stack spacing={1}>
          <Typography variant="h5" sx={sectionTitleSx}>
            § 11. Licencja i prawa autorskie
          </Typography>
          <Box component="ol" sx={orderedListSx}>
            <li>
              <Typography sx={paragraphSx}>
                Produkty stanowią utwory chronione prawem autorskim.
              </Typography>
            </li>
            <li>
              <Typography sx={paragraphSx}>
                Z chwilą dostarczenia Produktu Klient otrzymuje niewyłączną,
                niezbywalną licencję do korzystania z materiału na własny użytek
                edukacyjny bez prawa:
              </Typography>
              <Box component="ol" sx={alphaListSx}>
                <li>
                  <Typography sx={paragraphSx}>odsprzedaży,</Typography>
                </li>
                <li>
                  <Typography sx={paragraphSx}>
                    publicznego udostępniania,
                  </Typography>
                </li>
                <li>
                  <Typography sx={paragraphSx}>
                    modyfikowania i rozpowszechniania bez zgody Sprzedawcy.
                  </Typography>
                </li>
              </Box>
            </li>
            <li>
              <Typography sx={paragraphSx}>
                Naruszenie praw autorskich może skutkować odpowiedzialnością
                cywilną i karną.
              </Typography>
            </li>
          </Box>
        </Stack>

        <Stack spacing={1}>
          <Typography variant="h5" sx={sectionTitleSx}>
            § 12. Dane osobowe
          </Typography>
          <Box component="ol" sx={orderedListSx}>
            <li>
              <Typography sx={paragraphSx}>
                Administratorem danych osobowych Klientów jest Sprzedawca:
                Wioleta Jedziniak English o&apos;clock (Wioleta Jedziniak).
              </Typography>
            </li>
            <li>
              <Typography sx={paragraphSx}>
                Szczegółowe zasady przetwarzania danych oraz cookies określa
                Polityka Prywatności dostępna na stronie Sklepu.
              </Typography>
            </li>
          </Box>
        </Stack>

        <Stack spacing={1}>
          <Typography variant="h5" sx={sectionTitleSx}>
            § 13. Pozasądowe sposoby rozpatrywania sporów
          </Typography>
          <Box component="ol" sx={orderedListSx}>
            <li>
              <Typography sx={paragraphSx}>
                Konsument może skorzystać z pozasądowych metod rozwiązywania
                sporów, w tym z pomocy miejskiego/powiatowego rzecznika
                konsumentów lub właściwego Wojewódzkiego Inspektoratu Inspekcji
                Handlowej.
              </Typography>
            </li>
            <li>
              <Typography sx={paragraphSx}>
                Informacje o procedurach dostępne są m.in. na stronach UOKiK.
              </Typography>
            </li>
          </Box>
        </Stack>

        <Stack spacing={1}>
          <Typography variant="h5" sx={sectionTitleSx}>
            § 14. Postanowienia końcowe
          </Typography>
          <Box component="ol" sx={orderedListSx}>
            <li>
              <Typography sx={paragraphSx}>
                W sprawach nieuregulowanych Regulaminem stosuje się przepisy
                prawa polskiego oraz prawa UE.
              </Typography>
            </li>
            <li>
              <Typography sx={paragraphSx}>
                Sprzedawca może zmienić Regulamin z ważnych przyczyn prawnych
                lub technicznych. Do umów zawartych przed zmianą stosuje się
                wersję Regulaminu obowiązującą w dacie zawarcia umowy.
              </Typography>
            </li>
            <li>
              <Typography sx={paragraphSx}>
                Regulamin wchodzi w życie z dniem 01.03.2026.
              </Typography>
            </li>
          </Box>
        </Stack>

        <Stack spacing={1}>
          <Typography variant="h5" sx={sectionTitleSx}>
            Załącznik nr 1 – wzór formularza odstąpienia od umowy
          </Typography>
          <Typography sx={paragraphSx}>[imię i nazwisko konsumenta]</Typography>
          <Typography sx={paragraphSx}>[adres]</Typography>
          <Typography sx={paragraphSx}>[e-mail]</Typography>
          <Typography sx={paragraphSx}>
            Niniejszym informuję o odstąpieniu od umowy o dostarczenie treści
            cyfrowej:
          </Typography>
          <Typography sx={paragraphSx}>Nazwa produktu: [___]</Typography>
          <Typography sx={paragraphSx}>Data zakupu: [___]</Typography>
          <Typography sx={paragraphSx}>Data: [___]</Typography>
          <Typography sx={paragraphSx}>
            Podpis (jeśli forma papierowa): [___]
          </Typography>
        </Stack>
      </Stack>
    </Container>
  );
};

export default RegulaminPage;
