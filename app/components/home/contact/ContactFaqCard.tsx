import { Box, Stack, Typography } from "@mui/material";
import { contactFaqCardStyles } from "./ContactFaqCard.styles";

const faqItems = [
  {
    question: "1) Co dostaje po zakupie?",
    answer: "PDF do pobrania (docelowo przez WooCommerce).",
  },
  {
    question: "2) Czy darmowki sa bez konta?",
    answer: "Tak. Docelowo klik i PDF otworzy sie w nowej karcie.",
  },
  {
    question: "3) Dla kogo sa materialy?",
    answer: "Dla uczniow, nauczycieli i do nauki solo - wybierz kategorie.",
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
