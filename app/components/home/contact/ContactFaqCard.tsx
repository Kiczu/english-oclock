import { Box, Stack, Typography } from "@mui/material";
import { contactFaqCardStyles } from "./ContactFaqCard.styles";

const faqItems = [
  {
    question: "1) Dla kogo sa materialy?",
    answer:
      "Dla nauczycieli, korepetytorow oraz uczniow, ktorzy chca uczyc sie samodzielnie. Do kazdego zadania dolaczony jest klucz odpowiedzi.",
  },
  {
    question: "2) Gdzie znajde zakupione materialy?",
    answer:
      "Zakupione pliki PDF beda dostepne do pobrania od razu po zakupie na stronie. Otrzymasz je rowniez na adres e-mail podany przy zamowieniu.",
  },
  {
    question: "3) Czy dostane dowod zakupu?",
    answer:
      "Tak. Faktura zostanie wygenerowana automatycznie i przeslana na podany adres e-mail.",
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
