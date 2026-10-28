import { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardContent,
  Stack,
  Typography,
  Chip,
} from "@mui/material";
import type { CardResponse } from "../../types/card";
import Box from "@mui/material/Box";
import ContactlessIcon from "@mui/icons-material/Contactless";
import {
  getMyCards,
  blockCard,
  unblockCard,
} from "../../services/card.service";
import RequestCardDialog from "../../components/cards/RequestCardDialog";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
export default function Cards() {
  const [cards, setCards] = useState<CardResponse[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
const [showCardNumbers, setShowCardNumbers] = useState<
  Record<string, boolean>
>({});
  const loadCards = async () => {
    try {
      const data = await getMyCards();
      setCards(data);
    } catch (error) {
      console.error(error);
    }
  };

const formatCardNumber = (
  number: string,
  visible: boolean
) => {
  if (visible) {
    return number.replace(/(.{4})/g, "$1 ").trim();
  }

  const last4 = number.slice(-4);

  return `**** **** **** ${last4}`;
};
  useEffect(() => {
    loadCards();
  }, []);

  return (
    <Stack spacing={4}>
      {/* Header */}
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography variant="h4" fontWeight="bold">
          My Cards
        </Typography>

        <Button
          variant="contained"
          size="large"
          onClick={() => setDialogOpen(true)}
        >
          Request New Card
        </Button>
      </Stack>

      {/* Empty State */}
      {cards.length === 0 && (
        <Typography color="text.secondary">
          No cards available. Click "Request New Card" to create one.
        </Typography>
      )}

      {/* Cards */}
      <Stack
        direction="row"
        flexWrap="wrap"
        gap={3}
      >
        {cards.map((card) => (
          <Card
            key={card.cardNumber}
            sx={{
              width: 380,
              height: 250,
              borderRadius: 5,
              overflow: "hidden",
              color: "#fff",
              background:
                card.cardType === "DEBIT"
                  ? "linear-gradient(135deg,#0F2027,#203A43,#2C5364)"
                  : "linear-gradient(135deg,#4B134F,#C94B4B)",
                  backdropFilter: "blur(12px)",
border: "1px solid rgba(255,255,255,0.15)",
             transition: "all .35s ease",

cursor: "pointer",

"&:hover": {
  transform: "translateY(-10px) scale(1.02)",
  boxShadow: "0 18px 40px rgba(0,0,0,.45)",
},
            }}
          >
            <CardContent
  sx={{
    p: 3,
    position: "relative",
    overflow: "hidden",
  }}
>{/* Card Reflection */}
<Box
  sx={{
    position: "absolute",
    top: -60,
    right: -80,
    width: 220,
    height: 220,
    borderRadius: "50%",
    background:
      "radial-gradient(circle, rgba(255,255,255,0.22) 0%, transparent 70%)",
    pointerEvents: "none",
  }}
/>
              {/* Top */}
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
              <Stack spacing={0.3}>
  <Typography
    sx={{
      fontSize: 22,
      fontWeight: 700,
      letterSpacing: 1,
    }}
  >
    MyBank
  </Typography>

  <Typography
    sx={{
      fontSize: 12,
      color: "rgba(255,255,255,0.7)",
      letterSpacing: 2,
    }}
  >
    DIGITAL BANKING
  </Typography>
</Stack>

              <Chip
  label={`${card.cardType} CARD`}
  sx={{
    bgcolor: "rgba(255,255,255,0.15)",
    color: "#fff",
    fontWeight: 700,
    border: "1px solid rgba(255,255,255,0.3)",
    backdropFilter: "blur(8px)",
  }}
/>
              </Stack>

              {/* Chip */}
              {/* Chip and Contactless */}
<Box
  display="flex"
  justifyContent="space-between"
  alignItems="center"
  mt={3}
>
  {/* EMV Chip */}
  <Box
    sx={{
      width: 52,
      height: 38,
      borderRadius: 1,
      background:
        "linear-gradient(135deg,#d9d9d9,#bfbfbf,#f5f5f5)",
      position: "relative",
      boxShadow: "0 2px 6px rgba(0,0,0,.3)",
    }}
  >
    <Box
      sx={{
        position: "absolute",
        left: "50%",
        top: 0,
        bottom: 0,
        width: 2,
        bgcolor: "#888",
        transform: "translateX(-50%)",
      }}
    />

    <Box
      sx={{
        position: "absolute",
        top: "50%",
        left: 0,
        right: 0,
        height: 2,
        bgcolor: "#888",
        transform: "translateY(-50%)",
      }}
    />
  </Box>

  {/* Contactless Icon */}
  <ContactlessIcon
    sx={{
      fontSize: 34,
      color: "#fff",
    }}
  />
</Box>

              {/* Card Number */}
              <Stack
  direction="row"
  justifyContent="space-between"
  alignItems="center"
  sx={{ mt: 2 }}
>
  <Typography
    variant="h5"
    sx={{
      letterSpacing: 4,
      fontFamily: "monospace",
      fontWeight: 500,
    }}
  >
    {formatCardNumber(
      card.cardNumber,
      showCardNumbers[card.cardNumber] ?? false
    )}
  </Typography>

  <IconButton
    onClick={() =>
      setShowCardNumbers((prev) => ({
        ...prev,
        [card.cardNumber]:
          !prev[card.cardNumber],
      }))
    }
    sx={{ color: "#fff" }}
  >
    {showCardNumbers[card.cardNumber] ? (
      <VisibilityOffIcon />
    ) : (
      <VisibilityIcon />
    )}
  </IconButton>
</Stack>

              {/* Bottom Details */}
              <Stack
                direction="row"
                justifyContent="space-between"
                sx={{ mt: 4 }}
              >
                <Stack spacing={0.5}>
                  <Typography
  sx={{
    fontSize: 11,
    color: "rgba(255,255,255,0.7)",
    letterSpacing: 2,
  }}
>
  CARD HOLDER
</Typography>

                  <Typography fontWeight="bold">
                    {card.cardHolderName}
                  </Typography>
                </Stack>

                <Stack spacing={0.5}>
                  <Typography
  sx={{
    fontSize: 11,
    color: "rgba(255,255,255,0.7)",
    letterSpacing: 2,
  }}
>
  EXPIRES
</Typography>
                  <Typography fontWeight="bold">
                    {card.expiryDate}
                  </Typography>
                </Stack>
              </Stack>

              {/* Footer */}
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                sx={{ mt: 4 }}
              >
             <Chip
  label={card.status}
  sx={{
    bgcolor:
      card.status === "ACTIVE"
        ? "#00C853"
        : "#D50000",
    color: "#fff",
    fontWeight: "bold",
    px: 1,
  }}
/>

               <Box
  sx={{
    px: 2,
    py: 0.5,
    borderRadius: 2,
    bgcolor: "rgba(255,255,255,0.15)",
    backdropFilter: "blur(8px)",
  }}
>
  <Typography
    sx={{
      fontSize: 28,
      fontWeight: 900,
      letterSpacing: 2,
      color: "#fff",
      fontStyle: "italic",
    }}
  >
    {card.cardType === "DEBIT" ? "VISA" : "MASTERCARD"}
  </Typography>
</Box>
              </Stack>

              {/* Buttons */}
              <Stack
                direction="row"
                spacing={2}
                sx={{ mt: 3 }}
              >
                {card.status === "ACTIVE" ? (
                  <Button
                    fullWidth
                    variant="contained"
                    color="error"
                    onClick={async () => {
                      try {
                        await blockCard(card.cardNumber);
                        await loadCards();
                      } catch (error) {
                        console.error(error);
                      }
                    }}
                  >
                    Block Card
                  </Button>
                ) : (
                  <Button
                    fullWidth
                    variant="contained"
                    color="success"
                    onClick={async () => {
                      try {
                        await unblockCard(card.cardNumber);
                        await loadCards();
                      } catch (error) {
                        console.error(error);
                      }
                    }}
                  >
                    Activate Card
                  </Button>
                )}
              </Stack>
            </CardContent>
          </Card>
        ))}
      </Stack>

      {/* Request Dialog */}
      <RequestCardDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSuccess={loadCards}
      />
    </Stack>
  );
}