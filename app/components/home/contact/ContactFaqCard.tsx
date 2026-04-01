import { Box, Stack, Typography } from "@mui/material";
import { contactFaqCardStyles } from "./ContactFaqCard.styles";

const faqItems = [
  {
    question: "1) Dla kogo są materiały?",
    answer:
      "Dla nauczycieli, korepetytorów oraz uczniów, którzy chcą uczyć się samodzielnie. Do każdego zadania dołączony jest klucz odpowiedzi.",
  },
  {
    question: "2) Gdzie znajdę zakupione materiały?",
    answer:
      "Zakupione pliki PDF będą dostępne do pobrania od razu po zakupie na stronie. Otrzymasz je również na adres e-mail podany przy zamówieniu.",
  },
  {
    question: "3) Czy dostanę dowód zakupu?",
    answer:
      "Tak. Faktura zostanie wygenerowana automatycznie i przesłana na podany adres e-mail.",
  },
] as const;

const ContactFaqCard = () => {
  return (
    <Box sx={contactFaqCardStyles.root}>
      <Stack spacing={1.75}>
        <Stack spacing={1}>
          <Typography variant="h6" sx={contactFaqCardStyles.title}>
            Mini FAQ
          </Typography>

          {faqItems.map((item, index) => (
            <Box key={item.question}>
              <Typography
                sx={
                  index === 0
                    ? contactFaqCardStyles.question
                    : contactFaqCardStyles.questionSpaced
                }
              >
                {item.question}
              </Typography>
              <Typography sx={contactFaqCardStyles.answer}>{item.answer}</Typography>
            </Box>
          ))}
        </Stack>
      </Stack>
    </Box>
  );
};

export default ContactFaqCard;
